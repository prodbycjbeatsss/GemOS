import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { seal, SCOPES } from './server/youtube.mjs';
import { captureHandler, captureRelease, qualifies, parseViews, WINDOW_START, WINDOW_END } from './server/capture.mjs';
const sql=new DatabaseSync(':memory:');for(const file of ['0000_yummy_tusk.sql','0001_breezy_the_professor.sql'])sql.exec(readFileSync('drizzle/'+file,'utf8'));
const DB={prepare(query){let values=[];const statement={bind(...args){values=args;return statement;},async first(){return sql.prepare(query).get(...values)||null;},async all(){return {results:sql.prepare(query).all(...values)};},async run(){return {meta:{changes:Number(sql.prepare(query).run(...values).changes)}};}};return statement;},async batch(statements){sql.exec('BEGIN');try{const results=[];for(const s of statements)results.push(await s.run());sql.exec('COMMIT');return results;}catch(e){sql.exec('ROLLBACK');throw e;}}};
const origin='https://gemos-youtube-import-test.prodbycjbeatsss.chatgpt.site',env={DB,GOOGLE_CLIENT_ID:'fake.apps.googleusercontent.com',GOOGLE_CLIENT_SECRET:'FAKE',YOUTUBE_TOKEN_KEY:'ab'.repeat(32),GOOGLE_REDIRECT_URI:origin+'/api/youtube/callback',YOUTUBE_UPDATER_KEY:'FAKE_UPDATER'};
let now=Date.parse('2026-01-02T00:00:00Z');const realNow=Date.now;Date.now=()=>now;
const cipher=await seal('FAKE_ACCESS',env,'owner');sql.prepare('INSERT INTO youtube_connections VALUES (?,?,?,?,?,?,?,?,?)').run('owner',env.GOOGLE_CLIENT_ID,cipher,cipher,now+90*86400000,SCOPES.join(' '),JSON.stringify([{id:'UC_TEST',title:'Example'}]),now,'revision');
const p=new Date(now-WINDOW_START).toISOString(),id='abcdefghijk';
for(const [value,expected] of [['0',0],['600',600],['-1',null],['1.5',null],[undefined,null],['9007199254740992',null]])assert.equal(parseViews(value),expected);
assert.equal(qualifies(p,now,now),true);assert.equal(qualifies(p,now+WINDOW_END-WINDOW_START,now+WINDOW_END-WINDOW_START),true);assert.equal(qualifies(p,now-1,now),false);assert.equal(qualifies(p,now,now+900001),false);assert.equal(qualifies(p,now,now-1),false);
const request=(action,method='GET',body,headers={})=>new Request(origin+'/api/youtube/'+action,{method,headers:{'oai-authenticated-user-id':'owner',Origin:origin,...headers},...(body?{body:JSON.stringify(body)}:{})});
let calls=0,viewCount='0',visibility='public',publishedAt=p,channelId='UC_TEST',latency=0,disconnect=false;
globalThis.fetch=async()=>{calls++;now+=latency;if(disconnect)sql.prepare('DELETE FROM youtube_connections').run();return new Response(JSON.stringify({items:[{id,snippet:{channelId,title:'Example',publishedAt},status:{privacyStatus:visibility},statistics:{viewCount}}]}));};
const invoke=async(action,method='GET',body,headers)=>{const r=await captureHandler(request(action,method,body,headers),env,action);return {status:r.status,data:await r.json()};};
let result=await invoke('release','POST',{name:'Example',ids:[id],confirmed:true,channelId});assert.equal(result.status,200);assert.equal(result.data.videos[0].snapshotViews,0);assert.equal(calls,2);
viewCount='999';await captureRelease(env,'owner',channelId,{refreshOnly:true});// Read the selection through a new request.
result=await captureHandler(request('release?channel=UC_TEST'),env,'release');assert.equal((await result.json()).release.videos[0].snapshotViews,0,'first capture remains frozen');
const before=calls;now+=2*86400000;await captureRelease(env,'owner',channelId);assert.equal(calls,before,'finished release skips Google');
assert.equal((await invoke('release','POST',{name:'Example',ids:[id],confirmed:true,channelId},{Origin:'https://other.invalid'})).status,403);
assert.equal((await captureHandler(request('release?channel=UC_TEST','GET',null,{'oai-authenticated-user-id':'other'}),env,'release')).status,401);
assert.equal((await invoke('run-captures','POST',null,{Authorization:'Bearer wrong'})).status,401);
assert.equal((await captureHandler(request('run-captures','POST',null,{Authorization:'Bearer undefined'}),{...env,YOUTUBE_UPDATER_KEY:undefined},'run-captures')).status,401);
for(const [jobName,expected] of [['projects/example/locations/europe-west2/jobs/gemos-youtube-capture','scheduled'],['gemos-youtube-capture','scheduled'],['other-job','manual-service-check'],['/jobs/gemos-youtube-capture','manual-service-check'],[undefined,'manual-service-check']]){
 const headers={Authorization:'Bearer FAKE_UPDATER',...(jobName?{'X-CloudScheduler-JobName':jobName}:{})};
 result=await invoke('run-captures','POST',null,headers);assert.equal(result.status,200);assert.equal(result.data.captured,0);assert.equal(sql.prepare('SELECT outcome FROM youtube_capture_runs ORDER BY rowid DESC LIMIT 1').get().outcome,expected);
}

// New publication timestamps cannot inherit an earlier snapshot. Private/missing/negative/late values do not rank.
for(const mode of ['private','missing','negative','late','early','foreign','valid']){
 now=Date.parse('2026-02-02T00:00:00Z');publishedAt=new Date(now-WINDOW_START).toISOString();visibility=mode==='private'?'private':'public';viewCount=mode==='missing'?undefined:mode==='negative'?'-1':'5';latency=mode==='late'?900001:0;channelId=mode==='foreign'?'OTHER':'UC_TEST';if(mode==='early')publishedAt=new Date(now-WINDOW_START+1).toISOString();
 sql.prepare('UPDATE youtube_release_selections SET metadata_json=?').run(JSON.stringify([{id,title:'Example',publishedAt,visibility,snapshotViews:null}]));
 const report=await captureRelease(env,'owner','UC_TEST',{refreshOnly:true});assert.equal(report.videos[0].snapshotViews,mode==='valid'?5:null,mode);
 sql.prepare('DELETE FROM youtube_view_snapshots WHERE published_at=?').run(publishedAt);
}
channelId='UC_TEST';latency=0;disconnect=true;await assert.rejects(captureRelease(env,'owner',channelId,{refreshOnly:true}),/Connection changed/);assert.equal(sql.prepare('SELECT COUNT(*) AS n FROM youtube_view_snapshots').get().n,1);
Date.now=realNow;
console.log(JSON.stringify({passed:true,checks:['window boundaries and response time','zero versus unavailable','owner isolation and same-origin writes','saved release restoration','immutable first snapshot','publication timestamp separation','old counts never backfill','private/missing/negative/early/late/foreign values excluded','finished releases skip Google','unattended key auth and scheduled run log','disconnect race']}));
