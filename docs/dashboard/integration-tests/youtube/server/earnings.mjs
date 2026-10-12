import { access, api, configured, MONETARY_SCOPE } from './youtube.mjs';
const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
class RevenueError extends Error{constructor(message,status=400){super(message);this.status=status;}}
const pacificDate=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'America/Los_Angeles',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
export function periodRange(year,month,today=pacificDate()){
 if(!/^\d{4}$/.test(year||'')||+year<2019||+year>+today.slice(0,4)||month!==null&&(!/^(?:[1-9]|1[0-2])$/.test(month)||+month<1))throw new RevenueError('Choose a valid earnings period.');
 const start=year+'-'+(month?month.padStart(2,'0'):'01')+'-01';
 const end=new Date(Date.UTC(+year,month?+month:12,0)).toISOString().slice(0,10);
 if(start>today)throw new RevenueError('Future earnings are not available.');
 return {start,end:end>today?today:end};
}
export function reportRows(data,names){
 if(!Array.isArray(data.columnHeaders)||data.rows!==undefined&&!Array.isArray(data.rows))throw new RevenueError('YouTube returned an incomplete earnings report.',502);
 const indices=names.map(n=>data.columnHeaders.findIndex(h=>h.name===n));if(indices.some(i=>i<0))throw new RevenueError('YouTube returned an incomplete earnings report.',502);
 return (data.rows||[]).map(row=>Object.fromEntries(names.map((n,i)=>{const v=row[indices[i]];if(n==='estimatedRevenue'&&(typeof v!=='number'||!Number.isFinite(v)))throw new RevenueError('YouTube returned an invalid earnings amount.',502);return [n,v];})));
}
export function summary(rows){
 const categories={long:0,shorts:0,other:0},byDay=new Map();
 for(const r of rows){if(!/^\d{4}-\d{2}-\d{2}$/.test(r.day)||typeof r.creatorContentType!=='string')throw new RevenueError('YouTube returned invalid earnings categories.',502);const key=r.creatorContentType==='VIDEO_ON_DEMAND'?'long':r.creatorContentType==='SHORTS'?'shorts':'other';categories[key]+=r.estimatedRevenue;byDay.set(r.day,(byDay.get(r.day)||0)+r.estimatedRevenue);}
 const days=[...byDay].sort(([a],[b])=>a.localeCompare(b)).map(([date,amount])=>({date,amount}));
 if(rows.length&&!rows.some(r=>['VIDEO_ON_DEMAND','SHORTS'].includes(r.creatorContentType))){categories.long=null;categories.shorts=null;}
 return {total:rows.length?days.reduce((s,d)=>s+d.amount,0):null,categories:rows.length?categories:null,days,reportedThrough:days.at(-1)?.date||null};
}
async function query(env,owner,channel,range,params){const u=new URL('https://youtubeanalytics.googleapis.com/v2/reports');u.search=new URLSearchParams({ids:'channel=='+channel,startDate:range.start,endDate:range.end,metrics:'estimatedRevenue',currency:'GBP',...params});return api(env,owner,u);}
// Reconcile monetary video totals with an independent content-type activity report.
export function splitVideos(videos,types,total){
 const sums={long:0,shorts:0,other:0};let classified=false;
 for(const v of videos){const values=types.get(v.video);const type=values?.size===1?[...values][0]:null;const key=type==='VIDEO_ON_DEMAND'?'long':type==='SHORTS'?'shorts':'other';if(key!=='other')classified=true;sums[key]+=v.estimatedRevenue;}
 const sum=videos.reduce((a,v)=>a+v.estimatedRevenue,0);if(Math.abs(sum-total)>0.05)throw new RevenueError('Content split does not reconcile with the channel total.',502);
 if(!classified)throw new RevenueError('YouTube has not returned recognised content types for these earnings.',502);
 return sums;
}
async function recoverSplit(env,owner,channel,range,total){
 const videos=[];let complete=false;
 for(let page=0;page<5;page++){const raw=await query(env,owner,channel,range,{dimensions:'video',sort:'-estimatedRevenue',maxResults:'200',startIndex:String(page*200+1)});const rows=reportRows(raw,['video','estimatedRevenue']);if(rows.some(v=>! /^[\w-]{11}$/.test(v.video)))throw new RevenueError('YouTube returned an invalid video.',502);videos.push(...rows);if(rows.length<200){complete=true;break;}}
 if(!complete)throw new RevenueError('Content split exceeds the current reporting limit.',502);
 const types=new Map();
 for(let offset=0;offset<videos.length;offset+=50){const ids=videos.slice(offset,offset+50).map(v=>v.video).join(',');const raw=await query(env,owner,channel,range,{metrics:'views',dimensions:'video,creatorContentType',filters:'video=='+ids,sort:'-views',maxResults:'200'});const rows=reportRows(raw,['video','creatorContentType']);for(const r of rows){if(!types.has(r.video))types.set(r.video,new Set());types.get(r.video).add(r.creatorContentType);}}
 return splitVideos(videos,types,total);
}
export async function earningsHandler(request,env){
 try{
 const owner=request.headers.get('oai-authenticated-user-id');if(!owner)throw new RevenueError('Sign in to this private dashboard first.',401);
 if(request.method!=='GET')throw new RevenueError('Method not allowed.',405);
 if(!configured(env))throw new RevenueError('Google connection setup is unavailable.',503);
 const u=new URL(request.url),range=periodRange(u.searchParams.get('year'),u.searchParams.get('month'));
 const session=await access(env,owner);
 if(!(session.row.scopes||'').split(' ').includes(MONETARY_SCOPE))throw new RevenueError('Connect earnings to add read-only revenue access.',403);
 const channels=JSON.parse(session.row.channels_json),channel=u.searchParams.get('channel');if(!channels.some(c=>c.id===channel))throw new RevenueError('Choose one of your connected YouTube channels.',403);
 const offset=+(u.searchParams.get('offset')||0);if(!Number.isInteger(offset)||offset<0||offset>10000||offset%10!==0)throw new RevenueError('Invalid ranking page.');
 if(u.pathname.endsWith('/videos')){
 const raw=await query(env,owner,channel,range,{dimensions:'video',sort:'-estimatedRevenue',maxResults:'11',startIndex:String(offset+1)});
 const ranked=reportRows(raw,['video','estimatedRevenue']);const rows=ranked.slice(0,10);if(rows.some(r=>! /^[\w-]{11}$/.test(r.video)))throw new RevenueError('YouTube returned an invalid video.',502);
 let titles=new Map(),titlesAvailable=true;
 if(rows.length)try{const v=new URL('https://www.googleapis.com/youtube/v3/videos');v.search=new URLSearchParams({part:'snippet',id:[...new Set(rows.map(r=>r.video))].join(',')});const d=await api(env,owner,v);titles=new Map((d.items||[]).map(i=>[i.id,i.snippet?.title]));}catch{titlesAvailable=false;}
 return Response.json({videos:rows.map(r=>({id:r.video,type:'UNSPECIFIED',amount:r.estimatedRevenue,title:titles.get(r.video)||'Video title unavailable'})),offset,nextOffset:ranked.length>10?offset+10:null,page:offset/10+1,pageSize:10,titlesAvailable}, {headers});
 }
 if(!u.pathname.endsWith('/report'))throw new RevenueError('Not found.',404);
 const data=await query(env,owner,channel,range,{dimensions:'day,creatorContentType',sort:'day',maxResults:'2000'});
 const result=summary(reportRows(data,['day','creatorContentType','estimatedRevenue']));let splitNote='';
 if(result.total!==null&&result.categories?.long===null){try{result.categories=await recoverSplit(env,owner,channel,{...range,end:result.reportedThrough},result.total);splitNote='Content split reconciled from video revenue and separate YouTube content-type reports.';}catch(e){splitNote=e.status?e.message:'Content split is temporarily unavailable.';}}
 return Response.json({...result,splitNote,range,currency:'GBP',channelTitle:channels.find(c=>c.id===channel).title,refreshedAt:new Date().toISOString(),coverage:'Estimated channel revenue, including supported non-ad revenue; subject to adjustment. YouTube uses Pacific reporting days. Estimates are separate from AdSense payments.'},{headers});
 }catch(e){return Response.json({error:e instanceof RevenueError||e.status?e.message:'Earnings could not be loaded. Try again.'},{status:e.status||500,headers});}
}
