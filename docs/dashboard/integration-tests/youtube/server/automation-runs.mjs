import { AUTOMATIONS, CARDS } from './automation-registry.mjs';
// Durable owner-scoped execution records. Never store provider payloads or secrets.
export const CHECKER = 'youtube-snapshot-checker';
export const RUN_TIMEOUT = 300000;
export class RunError extends Error { constructor(message,status=400){super(message);this.status=status;} }
export async function recoverRuns(env,owner){
 // An expired lease does not prove an external action failed. Keep the outcome unconfirmed.
 await env.DB.prepare("UPDATE automation_runs SET status='unconfirmed',error_code='completion-unconfirmed',issue_state='open' WHERE user_id=? AND status='running' AND started_at<=?").bind(owner,Date.now()-RUN_TIMEOUT).run();
 await env.DB.prepare('DELETE FROM automation_locks WHERE user_id=? AND expires_at<=?').bind(owner,Date.now()).run();
}
export async function getRun(env,owner,id){return env.DB.prepare('SELECT * FROM automation_runs WHERE user_id=? AND id=?').bind(owner,id).first();}
export async function startRun(env,owner,trigger,retryOf=null,contextKey=null,automation=CHECKER){
 if(!AUTOMATIONS[automation])throw new RunError('Unsupported automation.');
 await recoverRuns(env,owner);
 let original=null;
 if(retryOf){original=await getRun(env,owner,retryOf);if(!original||original.automation!==CHECKER||!['failed','unconfirmed'].includes(original.status)||original.issue_state!=='open')throw new RunError('This run is no longer eligible for retry.',409);}
 if(original&&original.context_key!==contextKey)throw new RunError('The selected release changed. Review or dismiss the original issue; retry will not resolve a different release.',409);
 const id=crypto.randomUUID(),now=Date.now();
 const lockKey=[CHECKER,'shorts-analytics-sync'].includes(automation)?automation:automation+':'+id;
 const lock=await env.DB.prepare('INSERT INTO automation_locks (user_id,automation,run_id,expires_at) VALUES (?,?,?,?) ON CONFLICT(user_id,automation) DO UPDATE SET run_id=excluded.run_id,expires_at=excluded.expires_at WHERE automation_locks.expires_at<=?').bind(owner,lockKey,id,now+RUN_TIMEOUT,now).run();
 if(lock.meta.changes!==1)throw new RunError('This automation is already running. Refresh its result shortly.',409);
 try{
   // Recheck the issue after acquiring the lease; prevents two sequential stale retries.
   if(original){original=await getRun(env,owner,retryOf);if(!original||original.issue_state!=='open')throw new RunError('This issue has already been resolved.',409);}
   await env.DB.prepare('INSERT INTO automation_runs (id,user_id,automation,trigger,status,started_at,context_key,retry_of,root_id) VALUES (?,?,?,?,?,?,?,?,?)').bind(id,owner,automation,trigger,'running',now,contextKey,retryOf,original?.root_id||id).run();
 }catch(e){await env.DB.prepare('DELETE FROM automation_locks WHERE user_id=? AND automation=? AND run_id=?').bind(owner,lockKey,id).run();throw e;}
 return {id,owner,automation,lockKey,startedAt:now,rootId:original?.root_id||id,retryOf};
}
export async function finishRun(env,run,status,result=null,errorCode=null){
 if(!['succeeded','failed','unconfirmed'].includes(status))throw new RunError('Invalid completion status.');
 // Fencing: a timed-out worker cannot overwrite recovery or a newer attempt.
 const update=env.DB.prepare("UPDATE automation_runs SET status=?,finished_at=?,result_json=?,error_code=?,issue_state=? WHERE id=? AND user_id=? AND status='running' AND EXISTS (SELECT 1 FROM automation_locks WHERE user_id=? AND automation=? AND run_id=? AND expires_at>?)").bind(status,Date.now(),result?JSON.stringify(result):null,errorCode,status==='failed'||status==='unconfirmed'?'open':'none',run.id,run.owner,run.owner,run.lockKey||run.automation||CHECKER,run.id,Date.now());
 const steps=[update];
 if(status==='succeeded'&&run.retryOf){
   steps.push(env.DB.prepare("UPDATE automation_runs SET issue_state='resolved',resolved_by=? WHERE user_id=? AND root_id=? AND issue_state='open' AND status IN ('failed','unconfirmed') AND EXISTS (SELECT 1 FROM automation_runs completed WHERE completed.id=? AND completed.user_id=? AND completed.status='succeeded')").bind(run.id,run.owner,run.rootId,run.id,run.owner));
 }
 steps.push(env.DB.prepare('DELETE FROM automation_locks WHERE user_id=? AND automation=? AND run_id=?').bind(run.owner,run.lockKey||run.automation||CHECKER,run.id));
 const changed=await env.DB.batch(steps);
 return changed[0].meta.changes===1;
}
const errors={'provider-unavailable':'YouTube could not complete this check.','connection-unavailable':'The Google connection needs checking.','check-incomplete':'The checker stopped before completing.','sync-failed':'The sync could not complete. Open the source card for details.','sync-incomplete':'The sync stopped before completing.','report-unavailable':'The provider did not return a usable report.','move-unconfirmed':'The folder move result is uncertain. Open Release Readiness to reconcile it; do not repeat the move blindly.','completion-unconfirmed':'No completion was recorded within five minutes. The result is unconfirmed.'};
export function publicRun(r){return {id:r.id,automation:r.automation,name:AUTOMATIONS[r.automation]?.name||r.automation,card:AUTOMATIONS[r.automation]?.card||null,trigger:r.trigger,status:r.status,startedAt:r.started_at,finishedAt:r.finished_at,durationMs:r.finished_at===null?null:Math.max(0,r.finished_at-r.started_at),error:errors[r.error_code]||null,result:r.result_json?JSON.parse(r.result_json):null,retryOf:r.retry_of,rootId:r.root_id,issueState:r.issue_state,resolvedBy:r.resolved_by,dismissedReason:r.dismissed_reason,dismissedAt:r.dismissed_at,canRetry:r.automation===CHECKER&&['failed','unconfirmed'].includes(r.status)&&r.issue_state==='open',canDismiss:['failed','unconfirmed'].includes(r.status)&&r.issue_state==='open'};}
export async function dismissRun(env,owner,id,reason){
 if(typeof reason!=='string'||!reason.trim()||reason.trim().length>500)throw new RunError('Enter a dismissal reason (1–500 characters).');
 const changed=await env.DB.prepare("UPDATE automation_runs SET issue_state='dismissed',dismissed_reason=?,dismissed_at=? WHERE user_id=? AND id=? AND issue_state='open' AND status IN ('failed','unconfirmed')").bind(reason.trim(),Date.now(),owner,id).run();
 if(changed.meta.changes!==1)throw new RunError('This issue has already changed. Refresh the history.',409);
}
export async function reportRuns(env,owner,{offset=0,automation='',attention=false}={}){
 await recoverRuns(env,owner);
 const totals=await env.DB.prepare("SELECT COUNT(*) AS runs,COUNT(DISTINCT CASE WHEN issue_state='open' AND status IN ('failed','unconfirmed') THEN automation END) AS attention, SUM(CASE WHEN issue_state='open' AND status IN ('failed','unconfirmed') THEN 1 ELSE 0 END) AS issues FROM automation_runs WHERE user_id=?").bind(owner).first();
 const where='user_id=?'+(automation?' AND automation=?':'')+(attention?" AND issue_state='open' AND status IN ('failed','unconfirmed')":'');
 const args=[owner,...(automation?[automation]:[])];
 const order="CASE WHEN issue_state='open' AND status IN ('failed','unconfirmed') THEN 0 ELSE 1 END,started_at DESC,id DESC";
 const rows=await env.DB.prepare('SELECT * FROM automation_runs WHERE '+where+' ORDER BY '+order+' LIMIT 11 OFFSET ?').bind(...args,offset).all();
 const last=await env.DB.prepare('SELECT MAX(started_at) AS time FROM automation_runs WHERE user_id=? AND trigger=?').bind(owner,'scheduled').first();
 const grid=[];
 for(const card of CARDS){
  const keys=Object.keys(AUTOMATIONS).filter(k=>AUTOMATIONS[k].card===card.id);
  let latest=null,lastSuccess=null,attentionRun=null,issueCount=0;
  if(keys.length){const marks=keys.map(()=>'?').join(',');
   latest=await env.DB.prepare('SELECT * FROM automation_runs WHERE user_id=? AND automation IN ('+marks+') ORDER BY started_at DESC,id DESC LIMIT 1').bind(owner,...keys).first();
   const good=await env.DB.prepare("SELECT MAX(finished_at) AS time FROM automation_runs WHERE user_id=? AND status='succeeded' AND automation IN ("+marks+')').bind(owner,...keys).first();lastSuccess=good?.time||null;
   const issue=await env.DB.prepare("SELECT *,COUNT(*) OVER() AS issue_count FROM automation_runs WHERE user_id=? AND issue_state='open' AND status IN ('failed','unconfirmed') AND automation IN ("+marks+') ORDER BY started_at DESC,id DESC LIMIT 1').bind(owner,...keys).first();attentionRun=issue?publicRun(issue):null;issueCount=issue?.issue_count||0;
  }
  grid.push({...card,latest:latest?publicRun(latest):null,lastSuccess,attentionRun,issueCount});
 }
 const costsTable=await env.DB.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='subscription_costs'").first();
 if(costsTable){const saved=await env.DB.prepare('SELECT updated_at FROM subscription_costs WHERE user_id=?').bind(owner).first();grid.find(c=>c.id==='3.4').lastSaved=saved?.updated_at||null;}
 return {attentionCount:totals.attention,issueCount:totals.issues||0,totalRuns:totals.runs,runs:rows.results.slice(0,10).map(publicRun),hasMore:rows.results.length>10,offset,updatedAt:Date.now(),cards:grid,automations:Object.entries(AUTOMATIONS).map(([id,a])=>({id,...a})),coverage:'Dashboard syncs and the scheduled YouTube checker are monitored. Page-load data refreshes are genuine runs; viewing this status grid only reads records. Uploads and memory imports are not connected.',lastScheduledStart:last?.time||null};
}
