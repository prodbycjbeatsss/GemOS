const json=(v,s=200)=>new Response(JSON.stringify(v),{status:s,headers:{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
class SafeError extends Error{constructor(m,s=400){super(m);this.status=s;}}
const count=v=>Number.isSafeInteger(v)&&v>=0?v:null;
async function crypt(value,env,owner,decode=false){
 const k=await crypto.subtle.importKey('raw',Uint8Array.from(env.PAYHIP_TOKEN_KEY.match(/../g),x=>parseInt(x,16)),'AES-GCM',false,['encrypt','decrypt']);const additionalData=new TextEncoder().encode('mailchimp:'+owner);
 if(decode){const v=JSON.parse(value);return new TextDecoder().decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:new Uint8Array(v.iv),additionalData},k,new Uint8Array(v.data)));}
 const iv=crypto.getRandomValues(new Uint8Array(12));return JSON.stringify({iv:[...iv],data:[...new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData},k,new TextEncoder().encode(value)))]});
}
async function provider(key,path){
 const dc=key.split('-').at(-1);if(!/^us\d{1,3}$/.test(dc))throw new SafeError('Enter a valid Mailchimp API key.');
 let r;try{r=await fetch('https://'+dc+'.api.mailchimp.com/3.0/'+path,{headers:{Authorization:'Basic '+btoa('gemos:'+key)},redirect:'manual',signal:AbortSignal.timeout(20000)});}catch{throw new SafeError('Mailchimp could not be reached. Try Refresh again.',502);}
 if(r.status>=300&&r.status<400)throw new SafeError('Mailchimp returned an unexpected redirect. Connection was not saved.',502);
 if(!r.ok)throw new SafeError(r.status===401?'Mailchimp access rejected. Replace the saved key.':r.status===403?'Your Mailchimp plan or permissions do not allow this report.':'Mailchimp report unavailable. Try again later.',r.status===401?401:502);
 try{return await r.json();}catch{throw new SafeError('Mailchimp returned an unreadable report.',502);}
}
export function activityReport(rows,month,created,now=Date.now()){
 const today=new Date(now).toISOString().slice(0,10),start=month+'-01',createdDay=String(created||'').slice(0,10);const end=month===today.slice(0,7)?today:new Date(Date.UTC(Number(month.slice(0,4)),Number(month.slice(5,7)),0)).toISOString().slice(0,10);
 const from=createdDay>start?createdDay:start;if(!/^\d{4}-\d{2}-\d{2}$/.test(from)||from>end)return {signups:null,unsubscribes:null,coverage:'No activity coverage for this month.'};
 const days=new Map(rows.map(r=>[r.day,r]));let subs=0,unsubs=0;
 for(let d=new Date(from+'T00:00:00Z');d.toISOString().slice(0,10)<=end;d.setUTCDate(d.getUTCDate()+1)){const row=days.get(d.toISOString().slice(0,10));if(!row||count(row.subs)===null||count(row.unsubs)===null)return {signups:null,unsubscribes:null,coverage:'Incomplete daily report · monthly activity unavailable.'};subs+=row.subs;unsubs+=row.unsubs;}
 return {signups:subs,unsubscribes:unsubs,coverage:'Mailchimp daily sign-ups/unsubscribes; excludes automation activity and other adds/removes. Provider day boundaries; current day may be delayed.'};
}
export function campaignSummary(c){if(!c)return null;const status={save:'Draft',paused:'Paused',schedule:'Scheduled',sending:'Sending',sent:'Sent'}[c.status]||'Unknown';const sentDate=c.status==='sent'&&Number.isFinite(Date.parse(c.send_time))?c.send_time:null;return {subject:c.settings?.subject_line||c.settings?.title||'Untitled newsletter',status,date:sentDate||c.create_time||null,dateLabel:sentDate?'Sent':'Created',clickRate:typeof c.report_summary?.click_rate==='number'?c.report_summary.click_rate:null,clicks:count(c.report_summary?.subscriber_clicks)};}
export async function mailchimpHandler(request,env,action){try{
 const owner=request.headers.get('oai-authenticated-user-id');if(!owner)throw new SafeError('Sign in first.',401);
 if(!env.DB||!/^[a-f0-9]{64}$/i.test(env.PAYHIP_TOKEN_KEY||''))throw new SafeError('Connection storage unavailable.',503);
 const row=await env.DB.prepare('SELECT * FROM mailchimp_settings WHERE user_id=?').bind(owner).first();
 const settings=r=>({keySaved:!!r?.key_ciphertext,audienceId:r?.audience_id||null,audienceName:r?.audience_name||null,verifiedAt:r?.verified_at||null});
 if(action==='settings'&&request.method==='GET')return json(settings(row));
 if(request.method==='POST'){
 if(request.headers.get('Origin')!==new URL(request.url).origin)throw new SafeError('Invalid request origin.',403);
 if(!request.headers.get('Content-Type')?.startsWith('application/json'))throw new SafeError('Send JSON.',415);
 const reader=request.body?.getReader();if(!reader)throw new SafeError('Missing request body.');let chunks=[],size=0;for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>2048){await reader.cancel();throw new SafeError('Request too large.',413);}chunks.push(value);}const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}const text=new TextDecoder().decode(bytes);if(text.length>2048)throw new SafeError('Request too large.',413);let v;try{v=JSON.parse(text);}catch{throw new SafeError('Invalid JSON.');}
 if(action==='disconnect'){await env.DB.prepare('DELETE FROM mailchimp_settings WHERE user_id=?').bind(owner).run();return json(settings(null));}
 if(action!=='settings'||!v||typeof v!=='object'||Object.keys(v).some(k=>!['apiKey','audienceId'].includes(k)))throw new SafeError('Invalid settings.');
 const key=v.apiKey===undefined&&row?await crypt(row.key_ciphertext,env,owner,true):v.apiKey?.trim();if(typeof key!=='string'||! /^[a-f0-9]{32}-us\d{1,3}$/i.test(key))throw new SafeError('Enter a valid Mailchimp key.');
 const data=await provider(key,'lists?count=100&fields=lists.id,lists.name,total_items');if(!Array.isArray(data.lists)||data.total_items>100)throw new SafeError('Audience discovery unavailable.');
 const chosen=data.lists.find(l=>l.id===(v.audienceId||row?.audience_id))||(data.lists.length===1?data.lists[0]:null);
 if(!chosen)return json({needsAudience:true,audiences:data.lists.map(l=>({id:l.id,name:l.name}))});
 const now=Date.now();await env.DB.prepare('INSERT INTO mailchimp_settings (user_id,key_ciphertext,audience_id,audience_name,verified_at) VALUES (?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET key_ciphertext=excluded.key_ciphertext,audience_id=excluded.audience_id,audience_name=excluded.audience_name,verified_at=excluded.verified_at').bind(owner,await crypt(key,env,owner),chosen.id,chosen.name,now).run();return json(settings({key_ciphertext:true,audience_id:chosen.id,audience_name:chosen.name,verified_at:now}));
 }
 if(request.method!=='GET')throw new SafeError('Method not allowed.',405);
 if(action==='members'){
 if(!row)throw new SafeError('Connect Mailchimp first.',409);
 const offset=Number(new URL(request.url).searchParams.get('offset')||0);if(!Number.isInteger(offset)||offset<0||offset>100000)throw new SafeError('Invalid page.');
 const key=await crypt(row.key_ciphertext,env,owner,true),id=encodeURIComponent(row.audience_id);
 const data=await provider(key,'lists/'+id+'/members?status=subscribed&count=50&offset='+offset+'&sort_field=timestamp_signup&sort_dir=DESC&fields=members.email_address,members.timestamp_signup,members.timestamp_opt,members.status,members.source,total_items');
 return json({members:(data.members||[]).map(m=>({email:m.email_address,signup:m.timestamp_signup||null,confirmed:m.timestamp_opt||null,status:m.status,source:m.source||null})),total:count(data.total_items),offset});
 }
 if(action!=='report')throw new SafeError('Not found.',404);if(!row)throw new SafeError('Connect Mailchimp above to load your email list.',409);
 const month=new URL(request.url).searchParams.get('month');if(!/^20\d{2}-(0[1-9]|1[0-2])$/.test(month||'')||month>new Date().toISOString().slice(0,7))throw new SafeError('Choose a valid month.');
 const key=await crypt(row.key_ciphertext,env,owner,true),id=encodeURIComponent(row.audience_id);
 const list=await provider(key,'lists/'+id+'?fields=id,name,date_created,stats.member_count');
 const tasks=await Promise.allSettled([provider(key,'lists/'+id+'/activity?count=180&fields=activity.day,activity.subs,activity.unsubs'),provider(key,'campaigns?list_id='+id+'&sort_field=create_time&sort_dir=DESC&count=1&fields=campaigns.status,campaigns.create_time,campaigns.send_time,campaigns.settings,campaigns.report_summary')]);
 const activity=tasks[0].status==='fulfilled'?activityReport(tasks[0].value.activity||[],month,list.date_created):{signups:null,unsubscribes:null,coverage:'Monthly activity report unavailable.'};const campaigns=tasks[1].status==='fulfilled'?tasks[1].value.campaigns:null;
 const refreshedAt=Date.now();await env.DB.prepare('UPDATE mailchimp_settings SET verified_at=? WHERE user_id=? AND key_ciphertext=?').bind(refreshedAt,owner,row.key_ciphertext).run();
 return json({active:count(list.stats?.member_count),audienceName:list.name,month,...activity,campaign:campaigns?campaignSummary(campaigns[0]):null,campaignAvailable:Array.isArray(campaigns),refreshedAt});
 }catch(e){return json({error:e instanceof SafeError?e.message:'Mailchimp request failed. Try again.'},e instanceof SafeError?e.status:500);}}
