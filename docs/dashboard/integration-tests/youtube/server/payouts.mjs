import {access,api,configured,ADSENSE_SCOPE} from './youtube.mjs';
const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
class PayoutError extends Error{constructor(message,status=400){super(message);this.status=status;}}
const validAccount=v=>typeof v==='string'&&/^accounts\/[A-Za-z0-9_-]{1,100}$/.test(v);
async function accounts(env,owner){
 const list=[];let token='';
 for(let page=0;page<20;page++){const url=new URL('https://adsense.googleapis.com/v2/accounts');url.searchParams.set('pageSize','100');if(token)url.searchParams.set('pageToken',token);const d=await api(env,owner,url);if(d.accounts!==undefined&&!Array.isArray(d.accounts))throw new PayoutError('AdSense returned an unreadable account list.',502);for(const a of d.accounts||[]){if(!validAccount(a.name))throw new PayoutError('AdSense returned an invalid account.',502);list.push({id:a.name,title:typeof a.displayName==='string'&&a.displayName.trim()?a.displayName:a.name.split('/')[1]});}token=d.nextPageToken||'';if(!token)return list;if(typeof token!=='string'||token.length>2048)throw new PayoutError('AdSense returned an invalid page token.',502);}
 throw new PayoutError('Too many AdSense accounts to list. Try a different Google account.',502);
}
function dateValue(value){if(!value)return null;const {year,month,day}=value;if(![year,month,day].every(Number.isInteger)||year<1900||year>3000||month<1||month>12||day<1||day>31)return null;const d=new Date(Date.UTC(year,month-1,day));return d.getUTCFullYear()===year&&d.getUTCMonth()===month-1&&d.getUTCDate()===day?d.toISOString().slice(0,10):null;}
export function paymentReport(items,account){
 if(!Array.isArray(items))throw new PayoutError('AdSense returned an unreadable payment list.',502);
 const prefix=account+'/payments/',seen=new Set(),payments=[];let unpaid=null,hasYoutube=false;
 for(const p of items){if(typeof p.name!=='string'||!p.name.startsWith(prefix))throw new PayoutError('AdSense returned a payment for another account.',502);const name=p.name.slice(prefix.length);if(!/^youtube-(?:unpaid|\d{4}-\d{2}-\d{2})$/.test(name))continue;if(seen.has(p.name))throw new PayoutError('AdSense returned duplicate payments.',502);seen.add(p.name);hasYoutube=true;if(typeof p.amount!=='string'||!p.amount.trim()||p.amount.length>100)throw new PayoutError('AdSense returned an invalid payment amount.',502);const amount=p.amount.trim();if(name==='youtube-unpaid')unpaid=amount;else payments.push({id:p.name,date:dateValue(p.date),amount});}
 payments.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||b.id.localeCompare(a.id));return {unpaid,payments,hasYoutube};
}
export async function payoutsHandler(request,env){
 try{
 const owner=request.headers.get('oai-authenticated-user-id');if(!owner)throw new PayoutError('Sign in to this private dashboard first.',401);if(request.method!=='GET')throw new PayoutError('Method not allowed.',405);if(!configured(env))throw new PayoutError('Google connection setup is unavailable.',503);
 const session=await access(env,owner);if(!(session.row.scopes||'').split(' ').includes(ADSENSE_SCOPE))throw new PayoutError('Connect payouts to add read-only AdSense access.',403);
 const url=new URL(request.url),list=await accounts(env,owner);if(url.pathname.endsWith('/accounts'))return Response.json({accounts:list,checkedAt:new Date().toISOString()},{headers});
 if(!url.pathname.endsWith('/report'))throw new PayoutError('Not found.',404);const selected=url.searchParams.get('account');if(!validAccount(selected)||!list.some(a=>a.id===selected))throw new PayoutError('Choose one of your connected AdSense accounts.',403);
 const data=await api(env,owner,new URL('https://adsense.googleapis.com/v2/'+selected+'/payments'));const report=paymentReport(data.payments||[],selected);
 return Response.json({...report,accountTitle:list.find(a=>a.id===selected).title,refreshedAt:new Date().toISOString(),coverage:'YouTube payments reported by AdSense. Current unpaid balance is separate from estimated channel revenue. Payment dates are credited dates in Google’s Pacific billing timezone; they do not confirm arrival in your bank. Only records available from AdSense are shown. Amounts and currencies are preserved as reported.'},{headers});
 }catch(e){return Response.json({error:e.status?e.message:'AdSense payouts could not be loaded. Try again.'},{status:e.status||500,headers});}
}
