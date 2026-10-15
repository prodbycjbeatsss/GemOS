import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync,readdirSync} from 'node:fs';
import {monitoredRequest,monitoredAnalytics} from './server/sync-monitor.mjs';
import {startRun,finishRun,reportRuns,getRun} from './server/automation-runs.mjs';
import {automationHandler} from './server/automations.mjs';
const sql=new DatabaseSync(':memory:');for(const file of readdirSync('drizzle').filter(x=>x.endsWith('.sql')).sort())sql.exec(readFileSync('drizzle/'+file,'utf8'));
const DB={prepare(query){let args=[];const s={bind(...v){args=v;return s;},async first(){return sql.prepare(query).get(...args)||null;},async all(){return {results:sql.prepare(query).all(...args)};},async run(){return {meta:{changes:Number(sql.prepare(query).run(...args).changes)}};}};return s;},async batch(stmts){sql.exec('BEGIN');try{const r=[];for(const s of stmts)r.push(await s.run());sql.exec('COMMIT');return r;}catch(e){sql.exec('ROLLBACK');throw e;}}};
const env={DB},origin='https://test.invalid';let now=Date.now();const realNow=Date.now;Date.now=()=>now;
const request=(path='/api/mailchimp/report',method='GET',headers={},body)=>new Request(origin+path,{method,headers:{'oai-authenticated-user-id':'owner',Origin:origin,...headers},...(body?{body:JSON.stringify(body)}:{})});
try{
 let workCalls=0;
 let response=await monitoredRequest(request(),env,'email-list-sync',async()=>{workCalls++;return Response.json({active:5,signups:2,unsubscribes:0,campaignAvailable:true});});assert.equal(response.status,200);assert.equal(workCalls,1);
 let grid=(await reportRuns(env,'owner')).cards;assert.equal(grid.length,9);const email=grid.find(c=>c.id==='2.3');assert.equal(email.latest.status,'succeeded');const goodTime=email.lastSuccess;
 now+=1000;response=await monitoredRequest(request(),env,'email-list-sync',async()=>Response.json({error:'SECRET provider response'},{status:502}));assert.equal(response.status,502);grid=(await reportRuns(env,'owner')).cards;assert.equal(grid.find(c=>c.id==='2.3').latest.status,'failed');assert.equal(grid.find(c=>c.id==='2.3').lastSuccess,goodTime,'failed refresh preserves last successful sync');assert.ok(!JSON.stringify(grid).includes('SECRET'));
 now++;await monitoredRequest(request(),env,'email-list-sync',async()=>Response.json({active:5,signups:null,unsubscribes:null,campaignAvailable:false}));assert.equal((await reportRuns(env,'owner')).cards.find(c=>c.id==='2.3').latest.result.partial,true);assert.equal((await reportRuns(env,'owner')).cards.find(c=>c.id==='2.3').issueCount,1,'later success does not hide unresolved older issue');
 // One automation history row for all sequential analytics queries.
 const trace=crypto.randomUUID(),stage=s=>request('/api/youtube/query','POST',{'X-GemOS-Sync-ID':trace,'X-GemOS-Sync-Step':s},{base:'example'});
 const before=sql.prepare("SELECT COUNT(*) n FROM automation_runs WHERE automation='shorts-analytics-sync'").get().n;
 await monitoredAnalytics(stage('ownership'),env,async()=>Response.json({items:[{id:'example'}]}));
 assert.equal((await reportRuns(env,'owner')).cards.find(c=>c.id==='2.1').latest.status,'running');
 assert.equal((await monitoredAnalytics(stage('current'),env,async()=>{throw Error('must not run');})).status,409,'out-of-order step blocked');
 const columns=['views','averageViewPercentage','likes','subscribersGained','shares'].map(name=>({name}));
 await monitoredAnalytics(stage('probe'),env,async()=>Response.json({columnHeaders:[{name:'day'},...columns],rows:[['2026-10-10',1,40,0,0,0]]}));
 await monitoredAnalytics(stage('current'),env,async()=>Response.json({columnHeaders:columns,rows:[[5,40,-1,0,0]]}));
 await monitoredAnalytics(stage('previous'),env,async()=>Response.json({columnHeaders:columns,rows:[[2,30,0,0,0]]}));
 const analytic=(await reportRuns(env,'owner')).cards.find(c=>c.id==='2.1').latest;assert.equal(analytic.status,'succeeded');assert.equal(analytic.result.partial,false);assert.equal(analytic.result.steps.length,4);assert.equal(sql.prepare("SELECT COUNT(*) n FROM automation_runs WHERE automation='shorts-analytics-sync'").get().n,before+1);
 assert.equal((await monitoredAnalytics(stage('previous'),env,async()=>{throw Error('must not repeat');})).status,409);
 const noDataTrace=crypto.randomUUID();await monitoredAnalytics(request('/api/youtube/query','POST',{'X-GemOS-Sync-ID':noDataTrace,'X-GemOS-Sync-Step':'probe'},{}),env,async()=>Response.json({columnHeaders:[{name:'day'}],rows:[]}));assert.equal(sql.prepare('SELECT status FROM automation_runs WHERE context_key=?').get('trace:'+noDataTrace).status,'failed');
 // Card reads and monitoring reads are separate: GET status/history never insert runs.
 const total=sql.prepare('SELECT COUNT(*) n FROM automation_runs').get().n;
 for(let i=0;i<3;i++){const r=await automationHandler(request('/api/automations'),env);assert.equal(r.status,200);assert.equal((await r.json()).cards.length,9);}
 assert.equal(sql.prepare('SELECT COUNT(*) n FROM automation_runs').get().n,total,'loading/refreshing automation grid creates no runs');
 assert.equal((await reportRuns(env,'other')).cards.find(c=>c.id==='2.3').latest,null);
 sql.prepare('INSERT INTO subscription_costs VALUES (?,?,?,?)').run('owner','{"subscriptions":[],"topups":[]}',1,now);assert.equal((await reportRuns(env,'owner')).cards.find(c=>c.id==='3.4').lastSaved,now);
 assert.equal((await reportRuns(env,'owner')).cards.find(c=>c.id==='1.1').canSync,false);
 // Independent read-only report refreshes must not block rapid period switches.
 const a=await startRun(env,'owner','card-refresh',null,null,'youtube-earnings-sync'),b=await startRun(env,'owner','card-refresh',null,null,'youtube-earnings-sync');assert.notEqual(a.id,b.id);await finishRun(env,a,'succeeded',{partial:false});await finishRun(env,b,'succeeded',{partial:false});
 // External move uncertainty is explicitly unconfirmed, not a retryable failure.
 sql.exec('CREATE TABLE drive_release_moves (user_id TEXT,folder_id TEXT,status TEXT)');sql.prepare('INSERT INTO drive_release_moves VALUES (?,?,?)').run('owner','folder','pending');const moveRequest=request('/api/youtube/drive-ready','POST',{}, {folder:'folder'});await monitoredRequest(moveRequest,env,'drive-release-ready',async()=>{await moveRequest.json();return Response.json({error:'uncertain'},{status:409});});const move=(await reportRuns(env,'owner')).cards.find(c=>c.id==='1.2').latest;assert.equal(move.status,'unconfirmed');assert.equal(move.canRetry,false);
 // Unauthenticated and cross-origin rejected operations are not recorded as owner jobs.
 const count=sql.prepare('SELECT COUNT(*) n FROM automation_runs').get().n;await monitoredRequest(request('/api/mailchimp/report','GET',{'oai-authenticated-user-id':''}),env,'email-list-sync',async()=>new Response('',{status:401}));await monitoredRequest(request('/api/youtube/drive-ready','POST',{Origin:'https://evil.invalid'},{}),env,'drive-release-ready',async()=>new Response('',{status:403}));assert.equal(sql.prepare('SELECT COUNT(*) n FROM automation_runs').get().n,count);
 for(const [file,key] of [['earnings','youtube-earnings-sync'],['payouts','youtube-payouts-sync'],['mailchimp','email-list-sync'],['payhip','payhip-sales-sync']])assert.ok(readFileSync('app/api/'+file+'/[action]/route.ts','utf8').includes(key));
 console.log('Sync monitoring passed: one logical analytics sync, ordering/no-data failure, per-card latest status/retained last success, partial data, owner isolation, no runs from grid reads, manual/unconnected states, concurrent period reads, uncertain move safety and auth/origin guards.');
}finally{Date.now=realNow;}
