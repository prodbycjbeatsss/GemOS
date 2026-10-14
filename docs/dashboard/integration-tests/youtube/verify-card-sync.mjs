import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync,readdirSync} from 'node:fs';
import {getAnalyticsCache} from './server/analytics-cache.mjs';
import {syncCard} from './server/card-sync.mjs';
import {getTarget,saveTarget,capabilities} from './server/sync-targets.mjs';
import {automationHandler} from './server/automations.mjs';
import {reportRuns} from './server/automation-runs.mjs';
import {assetHandler,DRIVE_SCOPE} from './server/assets.mjs';
import {seal,SCOPES} from './server/youtube.mjs';
const sql=new DatabaseSync(':memory:');for(const f of readdirSync('drizzle').filter(f=>f.endsWith('.sql')).sort())sql.exec(readFileSync('drizzle/'+f,'utf8'));
const DB={prepare(q){let args=[];const s={bind(...v){args=v;return s;},async first(){return sql.prepare(q).get(...args)||null;},async all(){return {results:sql.prepare(q).all(...args)};},async run(){return {meta:{changes:Number(sql.prepare(q).run(...args).changes)}};}};return s;},async batch(stmts){sql.exec('BEGIN');try{const r=[];for(const s of stmts)r.push(await s.run());sql.exec('COMMIT');return r;}catch(e){sql.exec('ROLLBACK');throw e;}}};
const origin='https://gemos-youtube-import-test.prodbycjbeatsss.chatgpt.site',env={DB,GOOGLE_CLIENT_ID:'fake.apps.googleusercontent.com',GOOGLE_CLIENT_SECRET:'FAKE',YOUTUBE_TOKEN_KEY:'ab'.repeat(32),GOOGLE_REDIRECT_URI:origin+'/api/youtube/callback'};
const req=(path='/api/automations',body=null,owner='owner',requestOrigin=origin)=>new Request(origin+path,{method:body?'POST':'GET',headers:{'oai-authenticated-user-id':owner,Origin:requestOrigin,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});
const realFetch=globalThis.fetch;let calls=[];
try{
 const cipher=await seal('FAKE_ACCESS',env,'owner');sql.prepare('INSERT INTO youtube_connections VALUES (?,?,?,?,?,?,?,?,?)').run('owner',env.GOOGLE_CLIENT_ID,cipher,cipher,Date.now()+90*86400000,[...SCOPES,DRIVE_SCOPE].join(' '),JSON.stringify([{id:'UC_TEST',title:'Example'}]),Date.now(),'revision');
 assert.equal((await syncCard(req(),env,'3.4')).status,'skipped');assert.equal((await syncCard(req(),env,'1.1')).status,'skipped');assert.equal((await syncCard(req(),env,'2.3')).status,'skipped');assert.equal((await syncCard(req(),env,'2.1')).status,'skipped','missing sample does not invent a selection');
 globalThis.fetch=async(input,options={})=>{const u=new URL(input);calls.push({url:u,method:options.method||'GET'});
 if(u.hostname==='youtubeanalytics.googleapis.com'){const names=['views','averageViewPercentage','likes','subscribersGained','shares'];return Response.json(u.searchParams.get('dimensions')==='day'?{columnHeaders:[{name:'day'},...names.map(name=>({name}))],rows:[['2026-10-10',10,40,0,0,0]]}:{columnHeaders:names.map(name=>({name})),rows:[[10,40,0,0,0]]});}
 if(u.hostname==='www.googleapis.com'&&u.pathname==='/youtube/v3/videos')return Response.json({items:[{id:'abcdefghijk',snippet:{channelId:'UC_TEST',title:'Example',publishedAt:'2026-10-01T12:00:00Z'},status:{privacyStatus:'public'},statistics:{viewCount:'10'}}]});
 if(u.pathname.endsWith('/files')){const q=u.searchParams.get('q')||'';return Response.json({files:q.includes("'production12345' in parents")?[{id:'project12345678',name:'Example project',mimeType:'application/vnd.google-apps.folder',parents:['production12345']}]:[]});}
 const id=u.pathname.split('/').at(-1);return Response.json({id,name:id,mimeType:'application/vnd.google-apps.folder',parents:id==='project12345678'?['production12345']:[],capabilities:{canAddChildren:true,canMoveItemWithinDrive:true}});
 };
 const sample={ids:['abcdefghijk'],channel:'UC_TEST',endDate:'2026-10-12',rangeDays:7,confirmed:true};
 let result=await syncCard(req(),env,'2.1',sample);assert.equal(result.status,'completed');assert.equal((await getTarget(env,'owner','shorts-analytics-sync')).channel,'UC_TEST');assert.equal((await getTarget(env,'other','shorts-analytics-sync')),null);assert.equal(calls.length,4);const cache=await getAnalyticsCache(env,'owner',[{id:'UC_TEST'}]);assert.equal(cache.current.views,10);assert.equal(cache.rangeDays,7);assert.equal(await getAnalyticsCache(env,'other',[{id:'UC_TEST'}]),null);assert.equal(await getAnalyticsCache(env,'owner',[{id:'UC_OTHER'}]),null);assert.equal((await reportRuns(env,'owner')).cards.find(c=>c.id==='2.1').latest.status,'succeeded');
 // Persisted sample works without a browser/session hint; no guessed sample replaces it.
 calls=[];result=await syncCard(req(),env,'2.1');assert.equal(result.status,'completed');assert.equal(calls.length,4);
 sql.prepare("INSERT INTO automation_locks VALUES (?,?,?,?)").run('owner','sync-card:2.1','busy',Date.now()+300000);await assert.rejects(syncCard(req(),env,'2.1'),/already syncing/);sql.prepare("DELETE FROM automation_locks WHERE automation='sync-card:2.1'").run();
 const connected=await assetHandler(req('/api/youtube/drive-folders',{production:'production12345',queue:'queue123456789'}),env,'drive-folders');assert.equal(connected.status,200);await assetHandler(req('/api/youtube/drive-select',{folder:'project12345678'}),env,'drive-select');calls=[];result=await syncCard(req(),env,'1.2');assert.equal(result.status,'completed');assert.ok(calls.length>0);assert.ok(calls.every(c=>c.method==='GET'),'main/card Sync cannot move/publish: Drive requests are all reads');
 assert.equal((await capabilities(env,'owner'))['1.2'],true);
 const empty=(await syncCard(req(),env,'2.2'));assert.equal(empty.status,'skipped');
 const before=calls.length;assert.equal((await automationHandler(req('/api/automations',{action:'sync-card',card:'1.2'},'owner','https://evil.invalid'),env)).status,403);assert.equal(calls.length,before);
 assert.equal((await automationHandler(req('/api/automations',{action:'sync-card',card:'1.2',url:'https://evil.invalid'}),env)).status,400);assert.equal((await automationHandler(req('/api/automations',{action:'sync-card',card:'__proto__'}),env)).status,400);assert.equal((await automationHandler(req('/api/automations',{action:'sync-card',card:'1.2'},''),env)).status,401);
 await saveTarget(env,'owner','email-list-sync',{month:'2026-10'});assert.equal((await getTarget(env,'owner','email-list-sync')).month,'2026-10');assert.equal((await getTarget(env,'other','email-list-sync')),null);
 console.log('Card Sync passed: real analytics replay/persistence, owner isolation, no guessed samples, unavailable/manual skips, duplicate lease, actual Drive discovery/check with GET-only provider calls, fixed routes, auth/origin and input guards.');
}finally{globalThis.fetch=realFetch;}
