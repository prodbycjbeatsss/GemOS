import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {assetHandler,DRIVE_SCOPE,DRIVE_MOVE_SCOPE,evaluate,reviewMetadata} from './server/assets.mjs';
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
const methods=[];let timeoutAfterMove=false;let patches=0;
globalThis.fetch=async(url,options={})=>{
 const u=new URL(url);assert.equal(u.origin,'https://www.googleapis.com');assert.ok(u.pathname.startsWith('/drive/v3/files'));methods.push(options.method || 'GET');
 const id=u.pathname.split('/').at(-1);
 if(options.method==='PATCH'){patches++;assert.equal(options.body,'{}');assert.equal(u.searchParams.get('addParents'),'queue_root_0001');assert.equal(u.searchParams.get('removeParents'),'production_0001');roots.get(id).parents=['queue_root_0001'];if(timeoutAfterMove)throw Error('timeout');return Response.json(roots.get(id));}
 if(id!=='files')return roots.has(id)?Response.json(roots.get(id)):new Response('{}',{status:404});
 const parent=u.searchParams.get('q').match(/^'([^']+)'/)[1];
 if(parent===failFolder)return new Response('{}',{status:403});
 if(incomplete&&parent==='production_0001')return Response.json({files:[],incompleteSearch:true});
 if(overLimit&&parent==='production_0001')return Response.json({files:Array.from({length:201},(_,i)=>folder('overflow_folder_'+i,'Track '+i))});
 return Response.json({files:lists.get(parent)||[]});
};
for(const root of roots.values())root.capabilities={canMoveItemWithinDrive:true,canAddChildren:true};
const folders={production:'production_0001',queue:'queue_root_0001',released:'released_000001'};
assert.equal((await call('drive-folders',folders)).status,200);
assert.equal((await call('drive-scan',{folder:A})).status,200);
const metadata={artist:'Artist',title:'Track',bpm:'87',key:'B#m',credits:'@collaborator'};
assert.equal((await call('drive-review',{folder:A,metadata},'other')).status,404);
assert.equal((await call('drive-review',{folder:A,metadata},'owner','https://evil.example')).status,403);
assert.throws(()=>reviewMetadata({...metadata,bpm:'87.5'}));assert.throws(()=>reviewMetadata({...metadata,artist:''}));assert.throws(()=>reviewMetadata({...metadata,key:'javascript:bad'}));
assert.equal((await call('drive-review',{folder:A,metadata})).status,200);
let review=(await call('drive-status')).data.projects.find(p=>p.id===A).review;
assert.equal((await call('drive-ready',{folder:A,reviewedAt:review.reviewedAt})).status,409);assert.equal(patches,0);
files[0].name='[REMIX] Track.wav';files.push(f('beat_mp3_0001','[BEAT] Track.mp3','audio','audio/mpeg'));
lists.set('audio_folder_001',[files[0],files[1],files[4]]);
lists.get(A).push(folder('art_folder_0001','ARTWORK'),folder('short_folder_01','SHORTS'));
lists.set('art_folder_0001',[f('thumb_file_001','Track Thumbnail.png','artwork','image/png'),f('video_file_001','Track YouTube Video.mp4','artwork','video/mp4')]);
lists.set('short_folder_01',[6,2,1,5,3,4].map(n=>({...f('short_file_000'+n,'Track Short 0'+n+'.mp4','shorts','video/mp4'),modifiedTime:'2026-10-10T12:00:00Z'})));
let full=await call('drive-scan',{folder:A});assert.equal(full.data.ready,8);assert.deepEqual(full.data.assets.at(-1).files.map(f=>f.name),[1,2,3,4,5,6].map(n=>'Track Short 0'+n+'.mp4'));
assert.equal((await call('drive-review',{folder:A,metadata})).status,400);
let saved=await call('drive-review',{folder:A,metadata,shortsReviewed:true});assert.equal(saved.status,200);review=saved.data.projects.find(p=>p.id===A).review;assert.equal(review.metadata.artist,'Artist');
assert.equal((await call('drive-ready',{folder:A,reviewedAt:review.reviewedAt-1})).status,409);
assert.equal((await call('drive-ready',{folder:A,reviewedAt:review.reviewedAt})).status,403);assert.equal(patches,0);
sql.prepare('UPDATE youtube_connections SET scopes=? WHERE user_id=?').run([...SCOPES,DRIVE_SCOPE,DRIVE_MOVE_SCOPE].join(' '),'owner');
lists.get('short_folder_01')[0].modifiedTime='2026-10-10T13:00:00Z';
assert.equal((await call('drive-ready',{folder:A,reviewedAt:review.reviewedAt})).status,409);assert.equal(patches,0);
saved=await call('drive-review',{folder:A,metadata,shortsReviewed:true});assert.equal(saved.status,200);review=saved.data.projects.find(p=>p.id===A).review;
roots.get('queue_root_0001').driveId='shared';assert.equal((await call('drive-ready',{folder:A,reviewedAt:review.reviewedAt})).status,403);delete roots.get('queue_root_0001').driveId;
roots.get(A).capabilities.canMoveItemWithinDrive=false;assert.equal((await call('drive-ready',{folder:A,reviewedAt:review.reviewedAt})).status,403);roots.get(A).capabilities.canMoveItemWithinDrive=true;
timeoutAfterMove=true;assert.equal((await call('drive-ready',{folder:A,reviewedAt:review.reviewedAt})).status,409);assert.equal(patches,1);
let confirmed=await call('drive-ready',{folder:A,reviewedAt:review.reviewedAt});assert.equal(confirmed.status,200);assert.equal(patches,1);assert.equal(confirmed.data.projects.find(p=>p.id===A).stage,'queue');assert.equal(confirmed.data.projects.find(p=>p.id===A).preparation.status,'completed');
assert.equal((await call('drive-ready',{folder:A,reviewedAt:review.reviewedAt})).status,200);assert.equal(patches,1);
assert.equal((await call('drive-status',undefined,'other')).data.projects.length,0);
assert.equal((await call('drive-review',{folder:B,metadata})).status,409);
console.log(JSON.stringify({passed:true,checks:['metadata validation and per-owner persistence','incomplete and changed files block approval','six Shorts ordered by number','explicit Shorts review','missing permission blocks writes','My Drive and capabilities guarded','metadata-only exact parent move','uncertain-write reconciliation without duplicate PATCH','queue approval is not scheduling'],liveMoveVerified:false}));
