const keys={
 'youtube-earnings-sync':['channel','year','month'],
 'youtube-payouts-sync':['account','channel'],
 'email-list-sync':['month'],
 'payhip-sales-sync':['year','month']
};
export async function getTarget(env,owner,key){const row=await env.DB.prepare('SELECT target_json FROM automation_sync_targets WHERE user_id=? AND automation=?').bind(owner,key).first();return row?JSON.parse(row.target_json):null;}
export async function saveTarget(env,owner,key,target,startedAt=Date.now()){await env.DB.prepare('INSERT INTO automation_sync_targets (user_id,automation,target_json,updated_at) VALUES (?,?,?,?) ON CONFLICT(user_id,automation) DO UPDATE SET target_json=excluded.target_json,updated_at=excluded.updated_at WHERE automation_sync_targets.updated_at<=excluded.updated_at').bind(owner,key,JSON.stringify(target),startedAt).run();}
export async function rememberRequest(request,env,key,startedAt=Date.now()){if(!keys[key])return;const params=new URL(request.url).searchParams,target={};for(const k of keys[key]){const v=params.get(k);if(v!==null&&v.length<=160)target[k]=v;}await saveTarget(env,request.headers.get('oai-authenticated-user-id'),key,target,startedAt);}
export function validSample(v){
 if(!v||!Array.isArray(v.ids)||v.ids.length<1||v.ids.length>5||v.ids.some(id=>typeof id!=='string'||! /^[\w-]{11}$/.test(id))||new Set(v.ids).size!==v.ids.length||![7,28,90,365].includes(v.rangeDays)||typeof v.channel!=='string'||v.channel.length>100||!/^\d{4}-\d{2}-\d{2}$/.test(v.endDate||''))return false;
 const d=new Date(v.endDate+'T12:00:00Z');return Number.isFinite(+d)&&d.toISOString().slice(0,10)===v.endDate&&v.endDate<new Date().toISOString().slice(0,10);
}
export async function rememberAnalytics(request,env,startedAt=Date.now()){
 let v,input;try{v=JSON.parse(request.headers.get('X-GemOS-Sync-Selection')||'null');input=await request.clone().json();}catch{return;}
 if(!validSample(v)||input?.params?.ids!=='channel=='+v.channel||input?.params?.filters!=='video=='+v.ids.join(','))return;
 await saveTarget(env,request.headers.get('oai-authenticated-user-id'),'shorts-analytics-sync',{ids:v.ids,channel:v.channel,endDate:v.endDate,rangeDays:v.rangeDays},startedAt);
}
export async function savedConnection(env,owner){const row=await env.DB.prepare('SELECT channels_json,scopes FROM youtube_connections WHERE user_id=?').bind(owner).first();return {row,channels:row?JSON.parse(row.channels_json):[]};}
export async function capabilities(env,owner){
 const google=await savedConnection(env,owner),mail=await env.DB.prepare('SELECT user_id FROM mailchimp_settings WHERE user_id=?').bind(owner).first(),payhip=await env.DB.prepare('SELECT user_id FROM payhip_settings WHERE user_id=?').bind(owner).first();
 const driveTable=await env.DB.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='drive_release_settings'").first();const drive=driveTable?await env.DB.prepare('SELECT production_id,selected_id FROM drive_release_settings WHERE user_id=?').bind(owner).first():null;
 const release=await env.DB.prepare('SELECT channel_id FROM youtube_release_selections WHERE user_id=? LIMIT 2').bind(owner).all();const sample=await getTarget(env,owner,'shorts-analytics-sync');
 const scopes=(google.row?.scopes||'').split(' ');
 return {'1.1':false,'1.2':Boolean(google.row&&drive?.production_id&&scopes.some(s=>s.includes('drive.metadata'))),'2.1':Boolean(google.row&&(google.channels.length===1||google.channels.some(c=>c.id===sample?.channel))),'2.2':Boolean(google.row&&release.results.length===1),'2.3':Boolean(mail),'3.1':Boolean(payhip),'3.2':Boolean(google.row&&scopes.some(s=>s.endsWith('yt-analytics-monetary.readonly'))),'3.3':Boolean(google.row&&scopes.some(s=>s.endsWith('adsense.readonly'))),'3.4':false};
}
