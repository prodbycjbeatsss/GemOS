import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {assetHandler,DRIVE_SCOPE,evaluate} from './server/assets.mjs';
import {projectMetadata} from './server/project-name.mjs';
import {seal,SCOPES} from './server/youtube.mjs';
const sql=new DatabaseSync(':memory:');sql.exec(readFileSync('drizzle/0000_yummy_tusk.sql','utf8'));
const DB={prepare(query){let values=[];return {bind(...v){values=v;return this;},async first(){return sql.prepare(query).get(...values)||null;},async all(){return {results:sql.prepare(query).all(...values)};},async run(){return {meta:{changes:Number(sql.prepare(query).run(...values).changes)}};}};},async batch(statements){sql.exec('BEGIN');try{const results=[];for(const statement of statements)results.push(await statement.run());sql.exec('COMMIT');return results;}catch(e){sql.exec('ROLLBACK');throw e;}}};
const origin='https://gemos-youtube-import-test.prodbycjbeatsss.chatgpt.site';
const env={DB,GOOGLE_CLIENT_ID:'fake.apps.googleusercontent.com',GOOGLE_CLIENT_SECRET:'FAKE_SECRET',YOUTUBE_TOKEN_KEY:'ab'.repeat(32),GOOGLE_REDIRECT_URI:origin+'/api/youtube/callback'};
for(const owner of ['owner','other'])sql.prepare('INSERT INTO youtube_connections VALUES (?,?,?,?,?,?,?,?,?)').run(owner,env.GOOGLE_CLIENT_ID,await seal('FAKE_REFRESH',env,owner),await seal('FAKE_ACCESS',env,owner),Date.now()+3600000,[...SCOPES,DRIVE_SCOPE].join(' '),'[]',Date.now(),'revision');
const req=(action,body,owner='owner',requestOrigin=origin)=>new Request(origin+'/api/youtube/'+action,{method:body?'POST':'GET',headers:{'oai-authenticated-user-id':owner,...(body?{Origin:requestOrigin}:{})},...(body?{body:JSON.stringify(body)}:{})});
const call=async(action,body,owner,requestOrigin)=>{const response=await assetHandler(req(action,body,owner,requestOrigin),env,action);return {status:response.status,data:await response.json()};};
const mime='application/vnd.google-apps.folder';
const folder=(id,name,parents=[])=>({id,name,mimeType:mime,parents});
const f=(id,name,directory,mimeType)=>({id,name,directory,mimeType,size:'100'});
const files=[f('remix_file_001','Unmarked custom.wav','audio','audio/x-wav'),f('beat_file_0001','[BEAT] Track.wav','audio','audio/x-wav'),f('stems_file_001','Track stems.7z','stems','application/x-7z-compressed'),f('project_zip_001','[ZIP] Track.zip','project','application/zip')];
const A='release_a_0001',B='release_b_0001';
const roots=new Map([
 ['production_0001',folder('production_0001','In Production',['music_root_001'])],
 ['queue_root_0001',folder('queue_root_0001','Release Queue',['music_root_001'])],
 ['released_000001',folder('released_000001','Released',['music_root_001'])],
 [A,folder(A,'Artist - Track [87BPM] [B#m] [x @collaborator]',['production_0001'])],
 [B,folder(B,'Artist - Other Track',['production_0001'])]
]);
const lists=new Map([
 ['production_0001',[roots.get(A),roots.get(B),{id:'extra_file_001',name:'notes.txt',mimeType:'text/plain'},{id:'shortcut_001',name:'Shortcut',mimeType:'application/vnd.google-apps.shortcut'}]],
 ['queue_root_0001',[]],['released_000001',[]],
 [A,[folder('audio_folder_001','AUDIO'),folder('stems_folder_001','STEMS'),folder('project_folder_001','PROJECT')]],
 [B,[]],['audio_folder_001',files.slice(0,2)],['stems_folder_001',[files[2]]],['project_folder_001',[files[3]]]
]);
let failFolder='',incomplete=false,overLimit=false;
const methods=[];
globalThis.fetch=async(url,options={})=>{
 const u=new URL(url);assert.equal(u.origin,'https://www.googleapis.com');assert.ok(u.pathname.startsWith('/drive/v3/files'));methods.push(options.method || 'GET');
 const id=u.pathname.split('/').at(-1);
 if(id!=='files')return roots.has(id)?Response.json(roots.get(id)):new Response('{}',{status:404});
 const parent=u.searchParams.get('q').match(/^'([^']+)'/)[1];
 if(parent===failFolder)return new Response('{}',{status:403});
 if(incomplete&&parent==='production_0001')return Response.json({files:[],incompleteSearch:true});
 if(overLimit&&parent==='production_0001')return Response.json({files:Array.from({length:201},(_,i)=>folder('overflow_folder_'+i,'Track '+i))});
 return Response.json({files:lists.get(parent)||[]});
};
// Seed an old seven-category result and association before first upgraded request.
sql.exec('CREATE TABLE drive_asset_state (user_id TEXT PRIMARY KEY,folder_id TEXT,mappings_json TEXT,result_json TEXT,checked_at INTEGER)');
const oldAssets=evaluate(files,{remix:['remix_file_001']}).filter(a=>a.role!=='beatwav');
sql.prepare('INSERT INTO drive_asset_state VALUES (?,?,?,?,?)').run('owner',A,JSON.stringify({remix:['remix_file_001']}),JSON.stringify({folderId:A,projectName:roots.get(A).name,checkedAt:123,assets:oldAssets,total:7,ready:3}),123);
let status=(await call('drive-status')).data;assert.equal(status.folderId,A);assert.equal(status.result.checkedAt,123);assert.equal(status.result.total,8);assert.equal(status.result.needsRescan,true);
const folders={production:'production_0001',queue:'queue_root_0001',released:'released_000001'};
let connected=await call('drive-folders',folders);assert.equal(connected.status,200);assert.equal(connected.data.projects.length,2);assert.equal(connected.data.folderId,A);assert.equal(connected.data.projects[0].stage,'production');
const md=connected.data.projects.find(p=>p.id===A).metadata;assert.equal(md.artist,'Artist');assert.equal(md.title,'Track');assert.equal(md.bpm,87);assert.equal(md.key,'B#m');assert.deepEqual(md.credits,['x @collaborator']);assert.equal(md.suggested,true);
assert.equal((await call('drive-select',{folder:B})).data.result,null);
let scanB=await call('drive-scan',{folder:B});assert.equal(scanB.status,200);assert.equal(scanB.data.ready,0);
assert.equal((await call('drive-select',{folder:A})).data.result.checkedAt,123);
let scanA=await call('drive-scan',{folder:A});assert.equal(scanA.status,200);assert.equal(scanA.data.ready,4);assert.equal(scanA.data.assets.find(a=>a.role==='remix').reason,'Remembered file association');
assert.equal((await call('drive-select',{folder:B})).data.result.checkedAt,scanB.data.checkedAt);
assert.equal((await call('drive-status')).data.folderId,B);
assert.equal((await call('drive-select',{folder:A},'other')).status,404);
assert.equal((await call('drive-status',undefined,'other')).data.projects.length,0);
assert.equal((await call('drive-folders',folders,'owner','https://evil.example')).status,403);
// Moving/renaming a project updates discovery metadata, never its saved associations.
roots.set(A,folder(A,'Artist - Track renamed [90BPM]',['queue_root_0001']));lists.set('production_0001',[roots.get(B)]);lists.set('queue_root_0001',[roots.get(A)]);
let moved=await call('drive-discover',{});assert.equal(moved.status,200);assert.equal(moved.data.folderId,B);assert.equal(moved.data.projects.find(p=>p.id===A).stage,'queue');assert.equal(moved.data.projects.find(p=>p.id===A).metadata.bpm,90);
assert.equal((await call('drive-select',{folder:A})).data.result.checkedAt,scanA.data.checkedAt);
assert.equal((await call('drive-scan',{folder:A})).data.assets.find(a=>a.role==='remix').state,'Pass');
const snapshot=(await call('drive-status')).data;
failFolder='released_000001';assert.equal((await call('drive-discover',{})).status,403);failFolder='';
assert.deepEqual((await call('drive-status')).data.projects,snapshot.projects);assert.equal((await call('drive-status')).data.discoveredAt,snapshot.discoveredAt);
incomplete=true;assert.equal((await call('drive-discover',{})).status,502);incomplete=false;
overLimit=true;assert.equal((await call('drive-discover',{})).status,422);overLimit=false;
assert.equal((await call('drive-folders',{production:'production_0001',queue:'production_0001'})).status,400);
assert.equal((await call('drive-folders',{production:'https://evil.example/folder'})).status,400);
assert.deepEqual((await call('drive-status')).data.folders,folders);
lists.set('queue_root_0001',[]);let removed=await call('drive-discover',{});assert.equal(removed.data.projects.find(p=>p.id===A).stage,'unavailable');assert.equal(removed.data.result.checkedAt,(await call('drive-status')).data.result.checkedAt);
assert.ok(methods.every(method=>method==='GET'));
assert.equal(projectMetadata('No separator [87BPM] [90BPM]').bpm,null);assert.equal(projectMetadata('No separator').artist,null);
console.log(JSON.stringify({passed:true,checks:['legacy scan and association migration','direct-folder discovery skips files/shortcuts','independent per-project scans and selection restoration','owner isolation','same-origin settings','stable-ID move/rename discovery','failed/incomplete/oversized discovery preserves saved catalogue','removed project preserves saved scan','folder metadata remains suggestions','Google requests remain read-only'],liveDriveVerified:false,renderedUIVerified:false}));
