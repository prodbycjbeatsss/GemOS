export {monthlyPence,dueDate,monthReport} from '../ui/subscription-model.mjs';
const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
const json=(v,status=200)=>Response.json(v,{status,headers});
class InputError extends Error{constructor(message,status=400){super(message);this.status=status;}}
const frequencies=['weekly','monthly','quarterly','yearly'];
const categories=['AI','Music','Other'];
const idPattern=/^[a-zA-Z0-9_-]{1,80}$/;
function validDate(s){if(typeof s!=='string'||!/^20\d{2}-\d{2}-\d{2}$/.test(s))return false;const d=new Date(s+'T12:00:00Z');return Number.isFinite(+d)&&d.toISOString().slice(0,10)===s;}
function text(v,max,required=false){if(typeof v!=='string'||v.length>max||required&&!v.trim())throw new InputError('Check the name and text fields.');return v.trim();}
function shape(v,keys){if(!v||typeof v!=='object'||Array.isArray(v)||Object.keys(v).some(k=>!keys.includes(k)))throw new InputError('Invalid record fields.');}
export function validateState(v){
 shape(v,['subscriptions','topups']);if(!Array.isArray(v.subscriptions)||!Array.isArray(v.topups)||v.subscriptions.length>300||v.topups.length>1000)throw new InputError('Too many records or an invalid list.');
 const ids=new Set();const identity=r=>{if(typeof r.id!=='string'||!idPattern.test(r.id)||ids.has(r.id))throw new InputError('Invalid or duplicate record ID.');ids.add(r.id);if(typeof r.archived!=='boolean')throw new InputError('Invalid archive status.');};
 const subscriptions=v.subscriptions.map(r=>{shape(r,['id','archived','versions']);identity(r);if(!Array.isArray(r.versions)||!r.versions.length||r.versions.length>100)throw new InputError('Invalid subscription history.');const dates=new Set();
 const versions=r.versions.map(x=>{shape(x,['effective','name','category','pricePence','frequency','anchor','status','plan','otherPlans','website','notes']);if(!validDate(x.effective)||!validDate(x.anchor)||dates.has(x.effective))throw new InputError('Check effective and payment dates.');dates.add(x.effective);if(!categories.includes(x.category)||!frequencies.includes(x.frequency)||!['active','cancelled'].includes(x.status))throw new InputError('Check category, billing frequency and status.');if(!Number.isSafeInteger(x.pricePence)||x.pricePence<0||x.pricePence>10000000)throw new InputError('Enter a GBP price between £0 and £100,000.');const website=text(x.website,500);if(website){let u;try{u=new URL(website);}catch{throw new InputError('Enter a full https website URL.');}if(u.protocol!=='https:'||u.username||u.password)throw new InputError('Use an https website URL.');}
 return {...x,name:text(x.name,100,true),plan:text(x.plan,100),otherPlans:text(x.otherPlans,2000),website,notes:text(x.notes,2000)};}).sort((a,b)=>a.effective.localeCompare(b.effective));return {id:r.id,archived:r.archived,versions};});
 const topups=v.topups.map(r=>{shape(r,['id','archived','provider','date','amountPence','credits','project','notes']);identity(r);if(!validDate(r.date)||!Number.isSafeInteger(r.amountPence)||r.amountPence<=0||r.amountPence>10000000)throw new InputError('Check top-up date and GBP amount.');return {...r,provider:text(r.provider,100,true),credits:text(r.credits,100),project:text(r.project,100),notes:text(r.notes,2000)};});return {subscriptions,topups};
}
export async function costsHandler(request,env){try{
 const owner=request.headers.get('oai-authenticated-user-id');if(!owner)throw new InputError('Sign in to your private dashboard.',401);if(!env.DB)throw new InputError('Saved records are unavailable.',503);
 if(!['GET','POST'].includes(request.method))throw new InputError('Method not allowed.',405);
 if(request.method==='POST'){if(request.headers.get('Origin')!==new URL(request.url).origin)throw new InputError('Invalid request origin.',403);if(!request.headers.get('Content-Type')?.startsWith('application/json'))throw new InputError('Send JSON.',415);}
 await env.DB.prepare('CREATE TABLE IF NOT EXISTS subscription_costs (user_id TEXT PRIMARY KEY, state_json TEXT NOT NULL, revision INTEGER NOT NULL, updated_at INTEGER NOT NULL)').run();
 const row=await env.DB.prepare('SELECT * FROM subscription_costs WHERE user_id=?').bind(owner).first();
 if(request.method==='GET'){const state=row?JSON.parse(row.state_json):{subscriptions:[],topups:[]};return json({state,revision:row?.revision||0,updatedAt:row?.updated_at||null});}
 const reader=request.body?.getReader();if(!reader)throw new InputError('Missing record data.');let bytes=[],size=0;for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>512000){await reader.cancel();throw new InputError('Record data is too large.',413);}bytes.push(value);}const buffer=new Uint8Array(size);let offset=0;for(const b of bytes){buffer.set(b,offset);offset+=b.length;}let body;try{body=JSON.parse(new TextDecoder().decode(buffer));}catch{throw new InputError('Invalid record data.');}
 shape(body,['state','revision']);if(!Number.isSafeInteger(body.revision)||body.revision<0)throw new InputError('Invalid saved revision.');const state=validateState(body.state),revision=body.revision+1,now=Date.now();let result;
 if(body.revision===0){result=await env.DB.prepare('INSERT INTO subscription_costs (user_id,state_json,revision,updated_at) VALUES (?,?,?,?) ON CONFLICT(user_id) DO NOTHING').bind(owner,JSON.stringify(state),revision,now).run();}
 else result=await env.DB.prepare('UPDATE subscription_costs SET state_json=?,revision=?,updated_at=? WHERE user_id=? AND revision=?').bind(JSON.stringify(state),revision,now,owner,body.revision).run();
 if(!result.meta?.changes)throw new InputError('Records changed in another tab. Reload the saved list before editing again.',409);
 return json({state,revision,updatedAt:now});
 }catch(e){return json({error:e instanceof InputError?e.message:'Subscription records could not be saved or loaded. Try again.'},e instanceof InputError?e.status:500);}}
