import {salesReport, observedOptions} from './payhip-report.mjs';
const headers = {'Content-Type':'application/json', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff'};
const json = (data, status=200) => new Response(JSON.stringify(data), {status,headers});
class SafeError extends Error { constructor(message,status=400){super(message);this.status=status;} }
const random = () => [...crypto.getRandomValues(new Uint8Array(32))].map(v=>v.toString(16).padStart(2,'0')).join('');
const digest = async value => [...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))].map(v=>v.toString(16).padStart(2,'0')).join('');
function equal(a,b){if(typeof a!=='string'||typeof b!=='string'||a.length!==b.length)return false;let diff=0;for(let i=0;i<a.length;i++)diff|=a.charCodeAt(i)^b.charCodeAt(i);return diff===0;}
async function seal(value,env,owner,decrypt=false){
 const key=await crypto.subtle.importKey('raw',new Uint8Array(env.PAYHIP_TOKEN_KEY.match(/../g).map(v=>parseInt(v,16))),'AES-GCM',false,['encrypt','decrypt']);
 const additionalData=new TextEncoder().encode('payhip:'+owner);
 if(decrypt){const v=JSON.parse(value);return new TextDecoder().decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:new Uint8Array(v.iv),additionalData},key,new Uint8Array(v.data)));}
 const iv=crypto.getRandomValues(new Uint8Array(12));const encrypted=await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData},key,new TextEncoder().encode(value));return JSON.stringify({iv:[...iv],data:[...new Uint8Array(encrypted)]});
}
async function body(request){
 if(!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json'))throw new SafeError('Send JSON.',415);
 if(Number(request.headers.get('Content-Length'))>32768)throw new SafeError('Request is too large.',413);
 const reader=request.body?.getReader();if(!reader)throw new SafeError('Missing request body.');let chunks=[],length=0;
 for(;;){const {done,value}=await reader.read();if(done)break;length+=value.length;if(length>32768){await reader.cancel();throw new SafeError('Request is too large.',413);}chunks.push(value);}
 const bytes=new Uint8Array(length);let offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.length;}
 let value;try{value=JSON.parse(new TextDecoder().decode(bytes));}catch{throw new SafeError('Invalid JSON.');}if(!value||typeof value!=='object'||Array.isArray(value))throw new SafeError('Invalid request.');return value;
}
const record = (env,owner) => env.DB.prepare('SELECT * FROM payhip_settings WHERE user_id=?').bind(owner).first();
function publicSettings(row,env){
 let webhookUrl=null;try{const u=new URL(env.PAYHIP_RECEIVER_URL);if(u.protocol==='https:'&&row?.signature_ciphertext){u.pathname='/webhook/'+row.connection_id;webhookUrl=u.href;}}catch{}
 return {keySaved:Boolean(row?.signature_ciphertext),monthlyTarget:row?.monthly_target??null,updatedAt:row?.updated_at??null,verifiedAt:row?.verified_at??null,webhookUrl,receiverEnabled:env.PAYHIP_RECEIVER_ENABLED==='true',storeUrl:'https://payhip.com/prodbycjbeatsssbeatstore'};
}
function normalise(p){
 if(!['paid','refunded'].includes(p.type))throw new SafeError('Unsupported event.',422);
 if(typeof p.id!=='string'||!p.id.length||p.id.length>128||typeof p.currency!=='string'||!/^[A-Z]{3}$/.test(p.currency))throw new SafeError('Invalid transaction.',422);
 const amount=p.type==='refunded'?p.amount_refunded:0, date=p.type==='paid'?p.date:p.date_refunded;
 if(!Number.isSafeInteger(p.price)||p.price<0||p.price>100000000||!Number.isSafeInteger(amount)||amount<0||amount>p.price||!Number.isSafeInteger(date)||date<0||date>Date.now()/1000+300)throw new SafeError('Invalid amounts or date.',422);
 if(!Array.isArray(p.items)||p.items.length<1||p.items.length>100)throw new SafeError('Invalid items.',422);
 const items=p.items.map(i=>{const id=String(i.product_id??'');const quantity=Number(i.quantity);if(!/^[a-zA-Z0-9_-]{1,128}$/.test(id)||!Number.isSafeInteger(quantity)||quantity<1||quantity>10000)throw new SafeError('Invalid item.',422);const text=(v,n=256)=>typeof v==='string'&&v.length<=n?v.trim():null;
 const variantId=typeof i.variant_id==='number'&&Number.isSafeInteger(i.variant_id)?String(i.variant_id):text(i.variant_id,128);
 const variantName=text(i.variant_name);
 if(variantId&&!/^[a-zA-Z0-9_-]{1,128}$/.test(variantId))throw new SafeError('Invalid variation.',422);
 return {productId:id,quantity,hasVariant:typeof i.has_variant==='boolean'?i.has_variant:null,variantId:variantId||null,variantName:variantName||null,productName:text(i.product_name)};}).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
 return {id:p.id,type:p.type,currency:p.currency,price:p.price,refunded:amount,date,items};
}
export async function payhipHandler(request,env,action){
 try {
  if(!env.DB||!/^[a-f0-9]{64}$/i.test(env.PAYHIP_TOKEN_KEY||''))throw new SafeError('Payhip settings are temporarily unavailable.',503);
  if(action==='ingest'){
   if(request.method!=='POST')throw new SafeError('Method not allowed.',405);
   if(!env.PAYHIP_RELAY_SECRET||!equal(request.headers.get('X-GemOS-Relay'),env.PAYHIP_RELAY_SECRET))throw new SafeError('Not authorised.',401);
   const connection=request.headers.get('X-GemOS-Connection');if(!/^[a-f0-9]{64}$/.test(connection||''))throw new SafeError('Not authorised.',401);
   const row=await env.DB.prepare('SELECT * FROM payhip_settings WHERE connection_id=?').bind(connection).first();if(!row?.signature_ciphertext)throw new SafeError('Not authorised.',401);
   const payload=await body(request);const expected=await seal(row.signature_ciphertext,env,row.user_id,true);
   if(!equal(payload.signature,expected))throw new SafeError('Not authorised.',401);
   const value=normalise(payload), fingerprint=await digest(JSON.stringify(value)),now=Date.now();
   await env.DB.batch([
    env.DB.prepare('INSERT OR IGNORE INTO payhip_events (user_id,event_hash,transaction_id,type,currency,price,refunded,occurred_at,received_at,items_json) VALUES (?,?,?,?,?,?,?,?,?,?)').bind(row.user_id,fingerprint,value.id,value.type,value.currency,value.price,value.refunded,value.date*1000,now,JSON.stringify(value.items)),
    env.DB.prepare('UPDATE payhip_settings SET verified_at=? WHERE user_id=? AND signature_ciphertext=?').bind(now,row.user_id,row.signature_ciphertext)
   ]);
   return json({accepted:true});
  }
  const owner=request.headers.get('oai-authenticated-user-id');if(!owner)throw new SafeError('Sign in to this private page first.',401);
  if(['report','mapping','exclude'].includes(action)){
   if(action==='report'&&request.method!=='GET'||action!=='report'&&request.method!=='POST')throw new SafeError('Method not allowed.',405);
   if(request.method==='POST'&&request.headers.get('Origin')!==new URL(request.url).origin)throw new SafeError('Request origin does not match this page.',403);
   const events=(await env.DB.prepare('SELECT * FROM payhip_events WHERE user_id=? ORDER BY received_at LIMIT 10001').bind(owner).all()).results;
   if(events.length>10000)throw new SafeError('Order history needs a paged import before reporting can continue.',503);
   const mappings=(await env.DB.prepare('SELECT option_key,tier FROM payhip_mappings WHERE user_id=?').bind(owner).all()).results;
   const exclusions=(await env.DB.prepare('SELECT transaction_id FROM payhip_exclusions WHERE user_id=?').bind(owner).all()).results;
   if(action==='mapping'){
    const v=await body(request);if(Object.keys(v).some(k=>!['optionKey','tier'].includes(k))||typeof v.optionKey!=='string'||!['standard','premium','exclusive',null].includes(v.tier))throw new SafeError('Choose a licence tier.');
    if(!observedOptions(events).some(o=>o.key===v.optionKey))throw new SafeError('This licence option has not been received.',422);
    if(v.tier===null)await env.DB.prepare('DELETE FROM payhip_mappings WHERE user_id=? AND option_key=?').bind(owner,v.optionKey).run();
    else await env.DB.prepare('INSERT INTO payhip_mappings (user_id,option_key,tier,updated_at) VALUES (?,?,?,?) ON CONFLICT(user_id,option_key) DO UPDATE SET tier=excluded.tier,updated_at=excluded.updated_at').bind(owner,v.optionKey,v.tier,Date.now()).run();
    return json({saved:true});
   }
   if(action==='exclude'){
    const v=await body(request);if(Object.keys(v).some(k=>!['transactionId','excluded'].includes(k))||typeof v.transactionId!=='string'||typeof v.excluded!=='boolean'||!events.some(e=>e.transaction_id===v.transactionId))throw new SafeError('Choose a received order.');
    if(v.excluded)await env.DB.prepare('INSERT INTO payhip_exclusions (user_id,transaction_id,updated_at) VALUES (?,?,?) ON CONFLICT(user_id,transaction_id) DO UPDATE SET updated_at=excluded.updated_at').bind(owner,v.transactionId,Date.now()).run();
    else await env.DB.prepare('DELETE FROM payhip_exclusions WHERE user_id=? AND transaction_id=?').bind(owner,v.transactionId).run();
    return json({saved:true});
   }
   const query=new URL(request.url).searchParams,year=Number(query.get('year')),month=query.get('month')===null?null:Number(query.get('month'));
   const current=Number(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',year:'numeric'}).format(new Date()));
   if(!Number.isInteger(year)||year<2000||year>current||month!==null&&(!Number.isInteger(month)||month<1||month>12))throw new SafeError('Choose a valid period.');
   return json(salesReport(events,mappings,exclusions,year,month,publicSettings(await record(env,owner),env)));
  }
  if(action!=='settings')throw new SafeError('Not found.',404);
  if(request.method==='GET')return json(publicSettings(await record(env,owner),env));
  if(request.method!=='POST')throw new SafeError('Method not allowed.',405);
  if(request.headers.get('Origin')!==new URL(request.url).origin)throw new SafeError('Request origin does not match this page.',403);
  const value=await body(request);if(Object.keys(value).some(k=>!['apiKey','monthlyTarget'].includes(k)))throw new SafeError('Unexpected settings.');
  const before=await record(env,owner);const now=Date.now();
  let signature=before?.signature_ciphertext??null, verified=before?.verified_at??null,target=before?.monthly_target??null;
  if('apiKey' in value){if(typeof value.apiKey!=='string'||value.apiKey.trim().length<8||value.apiKey.trim().length>512)throw new SafeError('Enter your Payhip API key.');signature=await seal(await digest(value.apiKey.trim()),env,owner);verified=null;}
  if('monthlyTarget' in value){if(!Number.isInteger(value.monthlyTarget)||value.monthlyTarget<1||value.monthlyTarget>1000000)throw new SafeError('Enter a whole monthly target between £1 and £1,000,000.');target=value.monthlyTarget;}
  if(!Object.keys(value).length)throw new SafeError('No changes to save.');
  await env.DB.prepare('INSERT INTO payhip_settings (user_id,connection_id,signature_ciphertext,monthly_target,updated_at,verified_at) VALUES (?,?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET signature_ciphertext=CASE WHEN ? THEN excluded.signature_ciphertext ELSE signature_ciphertext END,monthly_target=CASE WHEN ? THEN excluded.monthly_target ELSE monthly_target END,updated_at=excluded.updated_at,verified_at=CASE WHEN ? THEN NULL ELSE verified_at END').bind(owner,before?.connection_id??random(),signature,target,now,verified,Number('apiKey' in value),Number('monthlyTarget' in value),Number('apiKey' in value)).run();
  return json(publicSettings(await record(env,owner),env));
 }catch(error){return json({error:error instanceof SafeError?error.message:'Payhip could not complete this request. Try again.'},error instanceof SafeError?error.status:500);}
}
