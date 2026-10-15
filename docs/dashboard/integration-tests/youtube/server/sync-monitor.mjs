import { rememberRequest, rememberAnalytics } from './sync-targets.mjs';
import { startRun, finishRun, getRun, recoverRuns, CHECKER, RunError } from './automation-runs.mjs';
const uuid=/^[a-f0-9-]{36}$/;
// Instrument real server handlers, not browser-reported success. No request bodies/provider payloads are persisted.
export async function monitoredRequest(request,env,automation,work){
 const owner=request.headers.get('oai-authenticated-user-id');
 if(!owner||request.method==='POST'&&request.headers.get('Origin')!==new URL(request.url).origin)return work();
 const moveCopy=automation==='drive-release-ready'?request.clone():null;
 let run;
 try{run=await startRun(env,owner,'card-refresh',null,null,automation);}catch(e){return Response.json({error:e instanceof RunError?e.message:'Sync recording is unavailable. Try again.'},{status:e instanceof RunError?e.status:503});}
 try{
  const response=await work();let data=null;try{data=await response.clone().json();}catch{}
  const result={httpStatus:response.status,partial:response.ok&&partial(automation,data),noOp:false};
  let status=response.ok?'succeeded':'failed',code=response.ok?null:'sync-failed';
  if(automation==='drive-release-ready'&&!response.ok){
   let input;try{input=await moveCopy.json();}catch{}
   if(input?.folder){const move=await env.DB.prepare('SELECT status FROM drive_release_moves WHERE user_id=? AND folder_id=?').bind(owner,input.folder).first();if(move?.status==='pending'){status='unconfirmed';code='move-unconfirmed';}}
  }
  await finishRun(env,run,status,result,code);if(response.ok)await rememberRequest(request,env,automation,run.startedAt);return response;
 }catch(e){await finishRun(env,run,'failed',null,'sync-incomplete');throw e;}
}
export function partial(key,d){if(!d)return true;
 if(key==='release-metadata-sync')return d.classificationUnavailable===true||d.videos?.some(v=>v.classification==='pending');
 if(key==='shorts-analytics-sync')return d.warnings?.length>0||d.current?.views===null;
 if(key==='youtube-earnings-sync')return d.total===null;
 if(key==='youtube-ranking-sync')return d.titlesAvailable===false;
 if(key==='email-list-sync')return d.active===null||d.signups===null||d.unsubscribes===null||d.campaignAvailable===false;
 if(key==='youtube-payouts-sync')return d.currentEstimate?.total===null||d.unpaid===null;
 return false;
}
// The analytics card performs several sequential requests. Record one logical sync, not one row per query.
export async function monitoredAnalytics(request,env,work){
 const owner=request.headers.get('oai-authenticated-user-id'),trace=request.headers.get('X-GemOS-Sync-ID'),step=request.headers.get('X-GemOS-Sync-Step');
 if(!owner||request.method!=='POST'||request.headers.get('Origin')!==new URL(request.url).origin||!uuid.test(trace||'')||!['ownership','probe','current','previous'].includes(step))return work();
 await recoverRuns(env,owner);
 const selectionRequest=step==='previous'?request.clone():null;
 const contextKey='trace:'+trace;
 let row=await env.DB.prepare('SELECT * FROM automation_runs WHERE user_id=? AND automation=? AND context_key=? LIMIT 1').bind(owner,'shorts-analytics-sync',contextKey).first(),run;
 if(!row){if(!['ownership','probe'].includes(step))return Response.json({error:'Start a new analytics sync.'},{status:409});
  try{run=await startRun(env,owner,'card-refresh',null,contextKey,'shorts-analytics-sync');}catch(e){return Response.json({error:e instanceof RunError?e.message:'Sync recording unavailable.'},{status:e.status||503});}
  row=await getRun(env,owner,run.id);
 }else run={id:row.id,owner,automation:'shorts-analytics-sync',rootId:row.root_id,retryOf:null,startedAt:row.started_at};
 if(row.status!=='running')return Response.json({error:'This sync has ended. Start a new sync.'},{status:409});
 const progress=row.result_json?JSON.parse(row.result_json):{steps:[],partial:false};
 const expected=progress.steps.length?({ownership:'probe',probe:'current',current:'previous'})[progress.steps.at(-1).name]:step;
 if(step!==expected||progress.steps.at(-1)?.status==='running')return Response.json({error:'This sync step is already running or out of order.'},{status:409});
 progress.steps.push({name:step,status:'running'});
 const claim=await env.DB.prepare("UPDATE automation_runs SET result_json=? WHERE user_id=? AND id=? AND status='running' AND result_json IS ?").bind(JSON.stringify(progress),owner,run.id,row.result_json).run();
 if(claim.meta.changes!==1)return Response.json({error:'Sync changed. Start a new sync.'},{status:409});
 try{
  const response=await work();let data=null;try{data=await response.clone().json();}catch{}
  let usable=response.ok&&data!==null;
  if(step==='ownership'){usable=usable&&Array.isArray(data.items)&&data.items.length>0;let sample;try{sample=JSON.parse(request.headers.get('X-GemOS-Sync-Selection')||'null');}catch{}if(sample?.ids)usable=usable&&data.items.length===sample.ids.length&&data.items.every(i=>sample.ids.includes(i.id)&&i.snippet?.channelId===sample.channel);}
  else usable=usable&&Array.isArray(data.columnHeaders)&&(!data.rows||Array.isArray(data.rows));
  if(step==='probe')usable=usable&&data.columnHeaders.some(c=>c.name==='day')&&data.rows?.length===1;
  if(['current','previous'].includes(step)){
   if(data?.rows?.length>1)usable=false;
   if(!data?.rows?.length)progress.partial=true;else for(const metric of ['views','averageViewPercentage','likes','subscribersGained','shares']){const i=data.columnHeaders.findIndex(h=>h.name===metric),raw=data.rows[0]?.[i];const value=typeof raw==='number'?raw:typeof raw==='string'&&/^-?\d+(?:\.\d+)?$/.test(raw.trim())?Number(raw):null;if(value===null||!Number.isFinite(value)||value<0&&metric!=='likes'||metric!=='averageViewPercentage'&&!Number.isSafeInteger(value))progress.partial=true;}
  }
  progress.steps.at(-1).status=usable?'succeeded':'failed';
  if(!usable){await finishRun(env,run,'failed',progress,response.ok?'report-unavailable':'sync-failed');}
  else if(step==='previous'){await finishRun(env,run,'succeeded',progress);await rememberAnalytics(selectionRequest,env,run.startedAt);}
  else await env.DB.prepare("UPDATE automation_runs SET result_json=? WHERE user_id=? AND id=? AND status='running'").bind(JSON.stringify(progress),owner,run.id).run();
  return response;
 }catch(e){await finishRun(env,run,'failed',null,'sync-incomplete');throw e;}
}
