import { api, access } from './youtube.mjs';
import { saveTarget } from './sync-targets.mjs';
const metrics=['views','averageViewPercentage','likes','subscribersGained','shares'];
const counts=['views','likes','subscribersGained','shares'];
const shift=(value,days)=>{const d=new Date(value+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+days);return d.toISOString().slice(0,10);};
export const reportingYesterday=()=>{const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'America/Los_Angeles',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).map(p=>[p.type,p.value]));return shift(p.year+'-'+p.month+'-'+p.day,-1);};
function fail(message,status=502){const e=new Error(message);e.status=status;return e;}
function rows(data,required){if(!Array.isArray(data.columnHeaders)||data.columnHeaders.some(c=>typeof c.name!=='string')||data.rows!==undefined&&!Array.isArray(data.rows))throw fail('YouTube returned an unreadable Shorts report.');const names=data.columnHeaders.map(c=>c.name);if(required.some(n=>!names.includes(n)))throw fail('YouTube did not provide the required Shorts classification.');return (data.rows||[]).map(row=>{if(!Array.isArray(row)||row.length!==names.length)throw fail('YouTube returned an incomplete Shorts row.');return Object.fromEntries(names.map((name,i)=>[name,row[i]]));});}
function value(raw,key){const n=typeof raw==='number'?raw:typeof raw==='string'&&/^-?\d+(?:\.\d+)?$/.test(raw.trim())?Number(raw):null;return n!==null&&Number.isFinite(n)&&(n>=0||key==='likes')&&(key==='averageViewPercentage'||Number.isSafeInteger(n))?n:null;}
export async function channelShorts(env,owner,input){
 const startedAt=Date.now();
 if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!['channel','rangeDays','endDate'].includes(k)))throw fail('Choose a channel and supported date range.',400);
 const rangeDays=input.rangeDays??28,endDate=input.endDate??reportingYesterday();
 if(![7,28,90,365].includes(rangeDays)||typeof endDate!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(endDate)||!Number.isFinite(Date.parse(endDate+'T12:00:00Z'))||new Date(endDate+'T12:00:00Z').toISOString().slice(0,10)!==endDate||endDate>reportingYesterday()||endDate<'2019-01-01')throw fail('Choose a supported range ending before today in YouTube reporting time.',400);
 const connection=await access(env,owner),channels=JSON.parse(connection.row.channels_json);const channel=input.channel||(channels.length===1?channels[0].id:null);
 if(!channels.some(c=>c.id===channel))throw fail('Choose one of your connected YouTube channels first.',400);
 const query=async(params)=>{const url=new URL('https://youtubeanalytics.googleapis.com/v2/reports');url.search=new URLSearchParams({ids:'channel=='+channel,...params});return api(env,owner,url);};
 const warnings=[];
 async function period(start,end,label){
  const daily=[];let complete=false;
  for(let page=0;page<20;page++){
   const data=await query({startDate:start,endDate:end,dimensions:'day,creatorContentType',metrics:counts.join(','),sort:'day',maxResults:'200',startIndex:String(page*200+1)});
   const part=rows(data,['day','creatorContentType']);daily.push(...part);if(part.length<200){complete=true;break;}
  }
  if(!complete)throw fail('The Shorts report exceeded the safe pagination limit. No partial total was saved.');
  const seen=new Set();for(const row of daily){if(!/^\d{4}-\d{2}-\d{2}$/.test(row.day)||row.day<start||row.day>end||typeof row.creatorContentType!=='string')throw fail('YouTube returned unexpected Shorts reporting dates.');const key=row.day+':'+row.creatorContentType;if(seen.has(key))throw fail('YouTube repeated a reporting row. No duplicate totals were saved.');seen.add(key);}
  const shorts=daily.filter(r=>r.creatorContentType==='SHORTS'),totals={};
  for(const key of counts){let total=shorts.length?0:null;for(const row of shorts){const n=value(row[key],key);if(n===null||!Number.isSafeInteger(total+n)){total=null;break;}total+=n;}totals[key]=total;if(total===null)warnings.push({period:label,metric:key,reason:'No usable Shorts source value returned'});}
  // Request the provider aggregate. Never average daily percentages or infer Shorts from duration.
  const retention=rows(await query({startDate:start,endDate:end,dimensions:'creatorContentType',metrics:'averageViewPercentage'}),['creatorContentType']);const matches=retention.filter(r=>r.creatorContentType==='SHORTS');if(matches.length>1)throw fail('YouTube returned more than one Shorts retention aggregate.');
  totals.averageViewPercentage=matches.length?value(matches[0].averageViewPercentage,'averageViewPercentage'):null;
  if(totals.averageViewPercentage===null)warnings.push({period:label,metric:'averageViewPercentage',reason:'Shorts aggregate average viewed unavailable'});
  return {totals,latest:shorts.map(r=>r.day).sort().at(-1)||null};
 }
 const start=shift(endDate,1-rangeDays),previousEnd=shift(start,-1),previousStart=shift(start,-rangeDays);
 const current=await period(start,endDate,'current'),previous=await period(previousStart,previousEnd,'previous');
 const report={source:'YouTube Analytics API v2',scope:'Channel-wide YouTube Shorts',scopeType:'channel-shorts',channelId:channel,channelTitle:channels.find(c=>c.id===channel).title,videos:[],requestedEnd:endDate,rangeDays,currentPeriod:{start,end:endDate},previousPeriod:{start:previousStart,end:previousEnd},reportingTimezone:'America/Los_Angeles',latestReturnedDay:current.latest,fetchedAt:new Date().toISOString(),current:current.totals,previous:previous.totals,warnings,coverage:'All channel activity classified as SHORTS by YouTube. Reporting may be delayed; missing rows are not treated as zero. Average viewed is Google’s period aggregate. TikTok and Reels are not connected.'};
 const currentConnection=await env.DB.prepare('SELECT revision FROM youtube_connections WHERE user_id=? AND client_id=?').bind(owner,env.GOOGLE_CLIENT_ID).first();if(currentConnection?.revision!==connection.row.revision)throw fail('Your Google connection changed. Sync again.',401);
 await env.DB.prepare('INSERT INTO analytics_sync_cache (user_id,report_json,updated_at) VALUES (?,?,?) ON CONFLICT(user_id) DO UPDATE SET report_json=excluded.report_json,updated_at=excluded.updated_at WHERE analytics_sync_cache.updated_at<=excluded.updated_at').bind(owner,JSON.stringify(report),startedAt).run();
 await saveTarget(env,owner,'shorts-analytics-sync',{scopeType:'channel-shorts',channel,rangeDays},startedAt);
 return report;
}
export async function channelShortsHandler(request,env){try{const owner=request.headers.get('oai-authenticated-user-id');if(!owner)throw fail('Sign in first.',401);if(request.method!=='POST')throw fail('Method not allowed.',405);if(request.headers.get('Origin')!==new URL(request.url).origin)throw fail('Request origin does not match this page.',403);const text=await request.text();if(text.length>1024)throw fail('Request too large.',413);let input;try{input=JSON.parse(text);}catch{throw fail('Invalid request.',400);}return Response.json(await channelShorts(env,owner,input),{headers:{'Cache-Control':'no-store'}});}catch(e){return Response.json({error:e.status?e.message:'Shorts reporting could not complete. Try Sync again.'},{status:e.status||502,headers:{'Cache-Control':'no-store'}});}}
