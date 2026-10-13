import {access,api,configured,ADSENSE_SCOPE} from './youtube.mjs';
import {earningsHandler} from './earnings.mjs';
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
// Guidance only: payments API does not expose holds, custom thresholds or balance periods.
export function payoutTiming(unpaid,now=new Date()){
 const parts=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(now).map(p=>[p.type,p.value]));
 const year=Number(parts.year),month=Number(parts.month)-1,day=Number(parts.day);
 const monthName=d=>d.toLocaleDateString('en-GB',{month:'long',year:'numeric',timeZone:'UTC'});
 const cycleStart=new Date(Date.UTC(year,month-1,1)),cycleEnd=new Date(Date.UTC(year,month,0));
 const expectedCycle='1–'+cycleEnd.getUTCDate()+' '+monthName(cycleStart);
 const windowMonth=new Date(Date.UTC(year,month+(day>26?1:0),1));
 const window='21–26 '+monthName(windowMonth);
 // Parse only explicit GBP with a validated grouping/decimal format. Never infer currency.
 const match=typeof unpaid==='string'?unpaid.match(/^£((?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{2})?)(?:\s+GBP)?$/):null;
 const gbp=match?Number(match[1].replaceAll(',','')):null;
 const below=gbp!==null&&Number.isFinite(gbp)&&gbp<60;
 const title=below?'Waiting for £60':gbp!==null?'21–26 '+windowMonth.toLocaleDateString('en-GB',{month:'short',year:'numeric',timeZone:'UTC'}):'Date unavailable';
 const detail=below?'Below the standard £60 GBP threshold. No payout date can be estimated yet.':gbp!==null?'Conditional issue window: '+window+'. This is an estimate, not a scheduled payment.':'A payout date cannot be estimated from this balance. The usual issue window is the 21st–26th of an eligible month.';
 return {status:below?'below-threshold':gbp!==null?'conditional':'unavailable',title,detail,earningsPeriod:'Not supplied by AdSense',expectedCycle,cycleNote:'Usual monthly cycle: '+expectedCycle+'. '+(day<=12?'Normally finalised between 7–12 '+monthName(new Date(Date.UTC(year,month,1)))+'. ':'')+'This is calendar guidance, not the verified period of your balance. Unpaid earnings may include earlier rolled-over months.',conditions:'Payment depends on your balance reaching your account’s threshold by the 20th and any holds being cleared by then. The £60 figure is Google’s standard GBP minimum; a higher custom threshold may apply. Holds and custom thresholds are not supplied here. Issue dates do not confirm bank arrival.'};
}
export function combinedEstimate(unpaid,current,now=new Date()){
 const m=typeof unpaid==='string'?unpaid.match(/^£((?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{2})?)(?:\s+GBP)?$/):null;
 const balance=m?Number(m[1].replaceAll(',','')):null;
 const estimate=current?.currency==='GBP'&&typeof current.total==='number'&&Number.isFinite(current.total)?current.total:null;
 const combined=balance!==null&&Number.isFinite(balance)&&estimate!==null?Math.round((balance+estimate)*100)/100:null;
 const parts=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(now).map(p=>[p.type,p.value]));
 const year=+parts.year,month=+parts.month-1,day=+parts.day;
 const period=new Date(Date.UTC(year,month,1)).toLocaleDateString('en-GB',{month:'long',year:'numeric',timeZone:'UTC'});
 let timing=payoutTiming(unpaid,now);
 if(balance!==null&&balance<60&&combined!==null&&combined>=60){
 const target=new Date(Date.UTC(year,month+1,1));
 timing={...timing,status:'conditional',title:'21–26 '+target.toLocaleDateString('en-GB',{month:'short',year:'numeric',timeZone:'UTC'}),detail:'Estimated issue window: 21–26 '+target.toLocaleDateString('en-GB',{month:'long',year:'numeric',timeZone:'UTC'})+'. Current-month earnings must first be finalised. Subject to finalisation; not a scheduled payment.'};
 }
 if(timing.status==='conditional'&&balance>=60)timing.detail+=' Based on finalised balance; current-month estimates belong to a later payment cycle.';
 return {combined,balance,periodLabel:period+' + carried balance',timing};
}
export async function payoutsHandler(request,env){
 try{
 const owner=request.headers.get('oai-authenticated-user-id');if(!owner)throw new PayoutError('Sign in to this private dashboard first.',401);
 const url=new URL(request.url),selected=url.searchParams.get('account'),channel=url.searchParams.get('channel');
 if(request.method!=='GET')throw new PayoutError('Method not allowed.',405);
 if(!['/api/payouts/accounts','/api/payouts/report'].includes(url.pathname))throw new PayoutError('Not found.',404);
 if(!configured(env))throw new PayoutError('Google connection setup is unavailable.',503);
 const session=await access(env,owner);if(!(session.row.scopes||'').split(' ').includes(ADSENSE_SCOPE))throw new PayoutError('Connect payouts to add read-only AdSense access.',403);
 const list=await accounts(env,owner);if(url.pathname.endsWith('/accounts'))return Response.json({accounts:list,checkedAt:new Date().toISOString()},{headers});
 if(!validAccount(selected)||!list.some(a=>a.id===selected))throw new PayoutError('Choose one of your connected AdSense accounts.',403);
 const channels=JSON.parse(session.row.channels_json||'[]');if(channel&&!channels.some(c=>c.id===channel))throw new PayoutError('Choose one of your connected YouTube channels.',403);
 if(!url.pathname.endsWith('/report'))throw new PayoutError('Not found.',404);
 const data=await api(env,owner,new URL('https://adsense.googleapis.com/v2/'+selected+'/payments'));const report=paymentReport(data.payments||[],selected);
 const diagnostics={totalRecords:(data.payments||[]).length,youtubePaid:report.payments.length,otherPaid:(data.payments||[]).filter(p=>/^\d{4}-\d{2}-\d{2}$/.test(p.name?.split('/').at(-1)||'')).length};
 let currentEstimate=null;if(channel){const now=new Date(),parts=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',year:'numeric',month:'numeric'}).formatToParts(now).map(p=>[p.type,p.value]));const u=new URL('/api/earnings/report',url.origin);u.search=new URLSearchParams({channel,year:parts.year,month:parts.month});const r=await earningsHandler(new Request(u,{headers:request.headers}),env);currentEstimate=r.ok?await r.json():{total:null,error:'Selected-channel estimate unavailable'};}
 const now=new Date();const combined=combinedEstimate(report.unpaid,currentEstimate,now);
 return Response.json({...report,currentEstimate,...combined,diagnostics,accountTitle:list.find(a=>a.id===selected).title,refreshedAt:now.toISOString(),coverage:'Live AdSense unpaid balance plus selected-channel current-month YouTube Analytics estimate in GBP. Provisional, subject to adjustments. The selected account/channel pairing follows your connection; Google does not expose membership verification here. AdSense balance may cover several channels and carried months. Payment dates are Pacific credited dates, not bank arrival. Available YouTube payment records only; historical earnings periods are not supplied. Holds and custom thresholds are not exposed.'},{headers});
 }catch(e){return Response.json({error:e.status?e.message:'AdSense payouts could not be loaded. Try again.',...(e.code?{code:e.code}:{}),...(e.helpUrl?{helpUrl:e.helpUrl}:{})},{status:e.status||500,headers});}
}
