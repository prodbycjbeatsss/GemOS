import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync,readdirSync} from 'node:fs';
import {startRun,finishRun,reportRuns,getRun,dismissRun,recoverRuns,RUN_TIMEOUT} from './server/automation-runs.mjs';
import {automationHandler} from './server/automations.mjs';
import {runOwnerChecker,WINDOW_START,captureHandler} from './server/capture.mjs';
import {seal,SCOPES} from './server/youtube.mjs';
const sql=new DatabaseSync(':memory:');for(const f of readdirSync('drizzle').filter(f=>f.endsWith('.sql')).sort())sql.exec(readFileSync('drizzle/'+f,'utf8'));
const DB={prepare(query){let values=[];const s={bind(...v){values=v;return s;},async first(){return sql.prepare(query).get(...values)||null;},async all(){return {results:sql.prepare(query).all(...values)};},async run(){return {meta:{changes:Number(sql.prepare(query).run(...values).changes)}};}};return s;},async batch(stmts){sql.exec('BEGIN');try{const r=[];for(const s of stmts)r.push(await s.run());sql.exec('COMMIT');return r;}catch(e){sql.exec('ROLLBACK');throw e;}}};
const origin='https://test.invalid',env={DB,GOOGLE_CLIENT_ID:'fake.apps.googleusercontent.com',GOOGLE_CLIENT_SECRET:'FAKE',YOUTUBE_TOKEN_KEY:'ab'.repeat(32),GOOGLE_REDIRECT_URI:'https://gemos-youtube-import-test.prodbycjbeatsss.chatgpt.site/api/youtube/callback',YOUTUBE_UPDATER_KEY:'FAKE'};
const realNow=Date.now,realFetch=globalThis.fetch;let now=Date.parse('2026-10-13T12:00:00Z');Date.now=()=>now;
try{
 let r=await reportRuns(env,'owner');assert.equal(r.totalRuns,0);assert.equal(r.attentionCount,0);
 let run=await startRun(env,'owner','scheduled',null,'context');assert.equal((await getRun(env,'owner',run.id)).status,'running','start persisted before completion');
 await assert.rejects(startRun(env,'owner','retry'),/already running/,'concurrent checker blocked');
 now+=RUN_TIMEOUT;await recoverRuns(env,'owner');r=await reportRuns(env,'owner');assert.equal(r.runs[0].status,'unconfirmed');assert.equal(r.attentionCount,1);
 assert.equal(await finishRun(env,run,'succeeded',{captured:0}),false,'late completion fenced');
 await assert.rejects(startRun(env,'owner','retry',run.id,'changed'),/selected release changed/);
 const retry=await startRun(env,'owner','retry',run.id,'context');await finishRun(env,retry,'failed',null,'provider-unavailable');assert.equal((await getRun(env,'owner',run.id)).issue_state,'open');
 r=await reportRuns(env,'owner');assert.equal(r.attentionCount,1,'headline counts automations rather than duplicate failed attempts');assert.equal(r.issueCount,2);
 const good=await startRun(env,'owner','retry',retry.id,'context');await finishRun(env,good,'succeeded',{captured:0,noOp:true});assert.equal((await getRun(env,'owner',run.id)).issue_state,'resolved');assert.equal((await getRun(env,'owner',retry.id)).resolved_by,good.id);assert.equal((await reportRuns(env,'owner')).attentionCount,0);
 await assert.rejects(startRun(env,'owner','retry',run.id,'context'),/no longer eligible/);
 run=await startRun(env,'owner','scheduled',null,'context');await finishRun(env,run,'failed',null,'connection-unavailable');await assert.rejects(dismissRun(env,'other',run.id,'Reason'),/already changed/);await assert.rejects(dismissRun(env,'owner',run.id,'  '),/reason/);await dismissRun(env,'owner',run.id,'Handled elsewhere');assert.equal((await getRun(env,'owner',run.id)).dismissed_reason,'Handled elsewhere');assert.equal((await getRun(env,'owner',run.id)).status,'failed');
 for(let i=0;i<12;i++){now++;const x=await startRun(env,'owner','scheduled');await finishRun(env,x,'succeeded',{captured:0,noOp:true});}
 run=await startRun(env,'owner','scheduled');await finishRun(env,run,'failed',null,'provider-unavailable');now++;const recent=await startRun(env,'owner','scheduled');await finishRun(env,recent,'succeeded',{captured:0,noOp:true});r=await reportRuns(env,'owner');assert.equal(r.runs[0].id,run.id,'attention before newest success');assert.equal(r.runs.length,10);assert.equal(r.hasMore,true);assert.ok((await reportRuns(env,'owner',{offset:10})).runs.length>0);assert.equal((await reportRuns(env,'other')).totalRuns,0);
 const req=(method='GET',body,headers={},query='')=>new Request(origin+'/api/automations'+query,{method,headers:{'oai-authenticated-user-id':'owner',Origin:origin,...headers},...(body?{body:JSON.stringify(body)}:{})});
 assert.equal((await automationHandler(req('GET',null,{'oai-authenticated-user-id':''}),env)).status,401);
 assert.equal((await automationHandler(req('POST',{action:'dismiss',id:run.id,reason:'x'},{Origin:'https://evil.invalid'}),env)).status,403);
 assert.equal((await automationHandler(req('GET',null,{'oai-authenticated-user-id':'other'},'?id='+run.id),env)).status,404);
 assert.equal((await automationHandler(req('GET',null,{},'?offset=-1'),env)).status,400);assert.equal((await automationHandler(req('GET',null,{},'?automation=unknown'),env)).status,400);
 assert.equal((await automationHandler(req('POST',{action:'retry',id:run.id,token:'bad'}),env)).status,400);
 // Real checker with failure, saved safe error, linked API retry, no-op and missed-window results.
 const cipher=await seal('FAKE_ACCESS',env,'checker-owner');sql.prepare('INSERT INTO youtube_connections VALUES (?,?,?,?,?,?,?,?,?)').run('checker-owner',env.GOOGLE_CLIENT_ID,cipher,cipher,now+90*86400000,SCOPES.join(' '),JSON.stringify([{id:'UC_TEST',title:'Example'}]),now,'revision');
 const id='abcdefghijk',publishedAt=new Date(now-WINDOW_START).toISOString();
 const meta=[{id,title:'Example',publishedAt,visibility:'public',snapshotViews:null}];sql.prepare('INSERT INTO youtube_release_selections VALUES (?,?,?,?,?,?)').run('checker-owner','UC_TEST','Example',JSON.stringify([id]),JSON.stringify(meta),now);
 globalThis.fetch=async()=>new Response(JSON.stringify({error:'SECRET provider body'}),{status:502});
 await assert.rejects(runOwnerChecker(env,'checker-owner','UC_TEST','scheduled'),/YouTube could not return/);
 const failed=(await reportRuns(env,'checker-owner')).runs[0];assert.equal(failed.status,'failed');assert.ok(!JSON.stringify(failed).includes('SECRET'));
 globalThis.fetch=async()=>new Response(JSON.stringify({items:[{id,snippet:{channelId:'UC_TEST',title:'Example',publishedAt},status:{privacyStatus:'public'},statistics:{viewCount:'0'}}]}));
 const retryRequest=new Request(origin+'/api/automations',{method:'POST',headers:{'oai-authenticated-user-id':'checker-owner',Origin:origin},body:JSON.stringify({action:'retry',id:failed.id})});
 let response=await automationHandler(retryRequest,env);assert.equal(response.status,200);assert.equal((await response.json()).result.captured,1);assert.equal((await getRun(env,'checker-owner',failed.id)).issue_state,'resolved');
 const noop=await runOwnerChecker(env,'checker-owner','UC_TEST','scheduled');assert.equal(noop.noOp,true);assert.equal(noop.captured,0);
 sql.prepare('DELETE FROM youtube_view_snapshots WHERE user_id=?').run('checker-owner');now+=86400000;const missed=await runOwnerChecker(env,'checker-owner','UC_TEST','scheduled');assert.equal(missed.missedWindows,1);assert.equal(missed.captured,0);assert.equal((await getRun(env,'checker-owner',missed.runId)).status,'succeeded');
 assert.equal((await captureHandler(new Request(origin+'/api/youtube/run-captures',{method:'POST',headers:{Authorization:'Bearer wrong'}}),env,'run-captures')).status,401);
 // A failed owner must not erase another owner's successful scheduled result.
 const otherCipher=await seal('FAKE_OTHER_ACCESS',env,'second-owner');sql.prepare('INSERT INTO youtube_connections VALUES (?,?,?,?,?,?,?,?,?)').run('second-owner',env.GOOGLE_CLIENT_ID,otherCipher,otherCipher,now+90*86400000,SCOPES.join(' '),JSON.stringify([{id:'UC_OTHER',title:'Other'}]),now,'other-revision');
 const otherId='lmnopqrstuv',fresh=new Date(now-WINDOW_START).toISOString();
 sql.prepare('UPDATE youtube_release_selections SET metadata_json=? WHERE user_id=?').run(JSON.stringify([{...meta[0],publishedAt:fresh}]),'checker-owner');
 sql.prepare('INSERT INTO youtube_release_selections VALUES (?,?,?,?,?,?)').run('second-owner','UC_OTHER','Other',JSON.stringify([otherId]),JSON.stringify([{id:otherId,title:'Other',publishedAt:fresh,visibility:'public',snapshotViews:null}]),now);
 globalThis.fetch=async url=>new URL(url).searchParams.get('id')===id?new Response('SECRET',{status:502}):new Response(JSON.stringify({items:[{id:otherId,snippet:{channelId:'UC_OTHER',title:'Other',publishedAt:fresh},status:{privacyStatus:'public'},statistics:{viewCount:'1'}}]}));
 response=await captureHandler(new Request(origin+'/api/youtube/run-captures',{method:'POST',headers:{Authorization:'Bearer FAKE','X-CloudScheduler-JobName':'gemos-youtube-capture'}}),env,'run-captures');assert.equal(response.status,503);const partial=await response.json();assert.equal(partial.failures,1);assert.equal(partial.captured,1);assert.equal((await reportRuns(env,'second-owner')).runs[0].status,'succeeded');assert.equal((await reportRuns(env,'checker-owner')).runs[0].status,'failed');assert.equal((await reportRuns(env,'second-owner')).attentionCount,0);
 console.log('Automation checks passed: durable starts, timeout recovery/fencing, owner isolation, concurrency, context-bound retries, linked resolution, dismissal audit, attention ordering/counts, pagination, auth/origin/validation, real checker failure/retry/no-op/missed-window and redaction.');
}finally{Date.now=realNow;globalThis.fetch=realFetch;}
