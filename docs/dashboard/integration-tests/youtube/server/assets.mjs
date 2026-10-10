import { access, configured } from './youtube.mjs';
import { projectMetadata } from './project-name.mjs';
export const DRIVE_MOVE_SCOPE = 'https://www.googleapis.com/auth/drive.metadata';
export const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.metadata.readonly';
const folderMime = 'application/vnd.google-apps.folder';
const connectedFile = f => ({id:f.id,name:f.name,modifiedTime:f.modifiedTime || null,size:String(f.size)});
const roles = ['project','stems','beatwav','mp3','remix','thumbnail','video','shorts'];
export const LABELS = ['Project ZIP','Stems archive','Beat WAV','Beat MP3','Remix WAV','Thumbnail','YouTube video','Six Shorts'];
class AssetError extends Error { constructor(message, status = 400) { super(message); this.status = status; } }
const validId = value => typeof value === 'string' && /^[A-Za-z0-9_-]{10,200}$/.test(value);
export function folderId(value) {
  if (validId(value)) return value;
  try { const u = new URL(value); const match = u.pathname.match(/^\/drive\/folders\/([A-Za-z0-9_-]{10,200})\/?$/); if (u.protocol === 'https:' && u.hostname === 'drive.google.com' && match) return match[1]; } catch {}
  throw new AssetError('Enter a Google Drive project folder link.');
}
export function compatible(file, role) {
  if (file.trashed || file.mimeType === folderMime || /\(wip\)/i.test(file.name) || !Number.isFinite(Number(file.size)) || Number(file.size) <= 0) return false;
  const ext = file.name.split('.').at(-1).toLowerCase(), mime = file.mimeType;
  const extensions = {remix:['wav'],beatwav:['wav'],mp3:['mp3'],stems:['zip','7z'],project:['zip'],thumbnail:['jpg','jpeg','png','webp'],video:['mp4'],shorts:['mp4']}[role];
  const mimes = {wav:['audio/wav','audio/x-wav','audio/wave','audio/vnd.wave'],mp3:['audio/mpeg','audio/mp3'],zip:['application/zip','application/x-zip-compressed'], '7z':['application/x-7z-compressed'],jpg:['image/jpeg'],jpeg:['image/jpeg'],png:['image/png'],webp:['image/webp'],mp4:['video/mp4']};
  // Generic MIME does not establish a format; such files require deeper validation.
  return extensions.includes(ext) && mimes[ext].includes(mime);
}
function marker(file, role) {
  const name = file.name.toLowerCase();
  if(role==='beatwav')return !marker(file,'remix') && /\[beat\]|\b(?:type beat|beat|tagged)\b/.test(name);
  return ({remix:/\[remix\]|\bremix\b/,mp3:/\[beat\]|\b(?:type beat|beat|tagged)\b/,stems:/\bstems?\b/,project:/\[zip\]|\b(?:project|release)\b/,thumbnail:/\b(?:thumbnail|artwork|cover)\b/,video:/\b(?:youtube|main)\b/,shorts:/\bshorts?\b/}[role]).test(name);
}
export function evaluate(files, mappings = {}, folderProblems = {}) {
  const directories = {remix:'audio',beatwav:'audio',mp3:'audio',stems:'stems',project:'project',thumbnail:'artwork',video:'artwork',shorts:'shorts'};
  const assets = roles.map((role,index) => {
    const candidates = files.filter(f=>f.directory===directories[role] && compatible(f,role));
    const marked = candidates.filter(f=>marker(f,role));
    const selectedIds = mappings[role] || [], selected = candidates.filter(f=>selectedIds.includes(f.id));
    const base = {role,label:LABELS[index],candidates:candidates.map(f=>({id:f.id,name:f.name})),files:[],count:0};
    if(['remix','beatwav'].includes(role)&&selectedIds.some(id=>(mappings[role==='remix'?'beatwav':'remix']||[]).includes(id)))return {...base,state:'Needs confirmation',reason:'Beat WAV and Remix WAV require distinct files.'};
    if(folderProblems[directories[role]]) return {...base,state:'Needs confirmation',reason:'Multiple matching subfolders; use one designated folder.'};
    if(selectedIds.length && selected.length !== selectedIds.length) return {...base,state:'Needs confirmation',reason:'A confirmed file is missing, moved, empty, WIP or has an incompatible type.'};
    if(role==='shorts') {
      const slots = new Map();
      for(const f of marked){const n=f.name.match(/\bshorts?[\s_-]*(0?[1-6])\b/i); if(n){const key=Number(n[1]);slots.set(key,[...(slots.get(key)||[]),f]);}}
      const numbered = [...slots.entries()].sort(([a],[b])=>a-b).filter(([,v])=>v.length===1).map(([,v])=>v[0]);
      const chosen = selectedIds.length ? selected : numbered;
      const ambiguous = !selectedIds.length && (candidates.some(f=>!numbered.includes(f)) || [...slots.values()].some(v=>v.length>1));
      return {...base,files:chosen.map(connectedFile),count:chosen.length,state:ambiguous?'Needs confirmation':chosen.length===6?'Pass':'Missing',reason:ambiguous?'Confirm six distinct clip files and their Tuesday–Sunday order.':`${chosen.length}/6 clips identified`};
    }
    const chosen = selectedIds.length ? selected : marked;
    if(chosen.length===1) return {...base,state:'Pass',files:chosen.map(connectedFile),count:1,reason:selectedIds.length?'Remembered file association':'Clear role match'};
    if(candidates.length) return {...base,state:'Needs confirmation',reason:'Choose the correct file for this role.'};
    const wip = files.some(f=>f.directory===directories[role] && /\(wip\)/i.test(f.name));
    return {...base,state:'Missing',reason:wip?'No eligible file; unfinished (WIP) files are excluded.':'No eligible file found'};
  });
  const beat=assets.find(a=>a.role==='beatwav'),remix=assets.find(a=>a.role==='remix');
  if(beat.files.some(f=>remix.files.some(other=>other.id===f.id))){for(const asset of [beat,remix]){asset.state='Needs confirmation';asset.reason='Beat WAV and Remix WAV require distinct files.';}}
  return assets;
}
// A saved seven-category scan cannot qualify the newly required Beat WAV.
export function currentResult(result) {
  if(!result)return null;
  const assets=roles.map((role,index)=>result.assets.find(a=>a.role===role)||{role,label:LABELS[index],state:'Unchecked',reason:'Sync to check this newly required file.',files:[],candidates:[],count:0});
  return {...result,assets,total:roles.length,ready:assets.filter(a=>a.state==='Pass').length,needsRescan:assets.some(a=>a.state==='Unchecked')};
}
async function tables(env,owner) {
  await env.DB.prepare('CREATE TABLE IF NOT EXISTS drive_asset_state (user_id TEXT PRIMARY KEY, folder_id TEXT NOT NULL, mappings_json TEXT NOT NULL, result_json TEXT, checked_at INTEGER)').run();
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS drive_release_projects (user_id TEXT NOT NULL, folder_id TEXT NOT NULL, name TEXT NOT NULL, stage TEXT NOT NULL DEFAULT 'manual', mappings_json TEXT NOT NULL DEFAULT '{}', result_json TEXT, checked_at INTEGER, PRIMARY KEY(user_id,folder_id))").run();
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS drive_release_settings (user_id TEXT PRIMARY KEY, production_id TEXT NOT NULL DEFAULT '', queue_id TEXT NOT NULL DEFAULT '', released_id TEXT NOT NULL DEFAULT '', selected_id TEXT NOT NULL DEFAULT '', catalogue_json TEXT NOT NULL DEFAULT '[]', discovered_at INTEGER)").run();
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS drive_release_reviews (user_id TEXT NOT NULL,folder_id TEXT NOT NULL,metadata_json TEXT NOT NULL,signature TEXT NOT NULL,reviewed_at INTEGER NOT NULL,PRIMARY KEY(user_id,folder_id))").run();
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS drive_release_moves (user_id TEXT NOT NULL,folder_id TEXT NOT NULL,source_id TEXT NOT NULL,target_id TEXT NOT NULL,status TEXT NOT NULL,started_at INTEGER NOT NULL,completed_at INTEGER,PRIMARY KEY(user_id,folder_id))").run();
  const legacy=await env.DB.prepare('SELECT * FROM drive_asset_state WHERE user_id = ?').bind(owner).first();
  // Copy the old result once without replacing newer per-project scans/selections.
  if(legacy)await env.DB.prepare('INSERT OR IGNORE INTO drive_release_projects (user_id,folder_id,name,mappings_json,result_json,checked_at) VALUES (?,?,?,?,?,?)').bind(owner,legacy.folder_id,legacy.result_json?JSON.parse(legacy.result_json).projectName:'Saved project',legacy.mappings_json,legacy.result_json,legacy.checked_at).run();
  await env.DB.prepare('INSERT OR IGNORE INTO drive_release_settings (user_id,selected_id) VALUES (?,?)').bind(owner,legacy?.folder_id || '').run();
}
async function projectStatus(env,owner) {
  const settings=await env.DB.prepare('SELECT * FROM drive_release_settings WHERE user_id = ?').bind(owner).first();
  const rows=(await env.DB.prepare('SELECT * FROM drive_release_projects WHERE user_id = ? ORDER BY name,folder_id LIMIT 201').bind(owner).all()).results;
  if(rows.length>200)throw new AssetError('The test catalogue is limited to 200 projects.',422);
  const catalogue=JSON.parse(settings.catalogue_json),live=new Map(catalogue.map(p=>[p.id,p]));
  const projects=rows.map(row=>({id:row.folder_id,name:row.name,stage:live.get(row.folder_id)?.stage || (row.stage==='manual'?'manual':'unavailable'),metadata:projectMetadata(row.name),checkedAt:row.checked_at || null}));
  const selected=rows.find(row=>row.folder_id===settings.selected_id);
  const reviews=(await env.DB.prepare('SELECT * FROM drive_release_reviews WHERE user_id=?').bind(owner).all()).results;
  const moves=(await env.DB.prepare('SELECT * FROM drive_release_moves WHERE user_id=?').bind(owner).all()).results;
  for(const project of projects){const review=reviews.find(r=>r.folder_id===project.id),move=moves.find(r=>r.folder_id===project.id);project.review=review?{metadata:JSON.parse(review.metadata_json),reviewedAt:review.reviewed_at}:null;project.preparation=move?{status:move.status,completedAt:move.completed_at}:null;}
  return {folders:{production:settings.production_id,queue:settings.queue_id,released:settings.released_id},projects,discoveredAt:settings.discovered_at,folderId:settings.selected_id,result:selected?.result_json?currentResult(JSON.parse(selected.result_json)):null};
}
async function discoverProjects(env,owner,folders) {
  const values=Object.values(folders).filter(Boolean);
  if(!folders.production)throw new AssetError('Connect the In Production folder first.');
  if(new Set(values).size!==values.length)throw new AssetError('Use different folders for each release stage.');
  const catalogue=[],roots=[];
  for(const [stage,id] of Object.entries(folders)){
    if(!id)continue;
    const root=await drive(env,owner,'files/'+id,{fields:'id,name,mimeType,trashed,parents',supportsAllDrives:'true'});
    if(root.trashed||root.mimeType!==folderMime)throw new AssetError('Each connection must be a music-release stage folder.');
    roots.push(root);
    for(const file of await children(env,owner,id))if(!file.trashed&&file.mimeType===folderMime){
      if(!validId(file.id)||typeof file.name!=='string')throw new AssetError('Drive returned an invalid project folder.',502);
      if(values.includes(file.id))throw new AssetError('Stage folders must be separate, not nested inside each other.');
      catalogue.push({id:file.id,name:file.name,stage});
      if(catalogue.length>200)throw new AssetError('The test catalogue is limited to 200 release folders.',422);
    }
  }
  if(roots.some(root=>root.parents?.some(id=>values.includes(id))))throw new AssetError('Stage folders must be separate, not nested inside each other.');
  if(new Set(catalogue.map(p=>p.id)).size!==catalogue.length)throw new AssetError('A project appeared in multiple stages. Refresh after Drive finishes syncing.',409);
  const now=Date.now();
  // Publish the complete discovery snapshot atomically; a failed listing changes nothing.
  const statements=[env.DB.prepare('UPDATE drive_release_settings SET production_id=?,queue_id=?,released_id=?,catalogue_json=?,discovered_at=? WHERE user_id=?').bind(folders.production,folders.queue,folders.released,JSON.stringify(catalogue),now,owner)];
  for(const project of catalogue)statements.push(env.DB.prepare('INSERT INTO drive_release_projects (user_id,folder_id,name,stage) VALUES (?,?,?,?) ON CONFLICT(user_id,folder_id) DO UPDATE SET name=excluded.name,stage=excluded.stage').bind(owner,project.id,project.name,project.stage));
  const existing=(await env.DB.prepare('SELECT folder_id FROM drive_release_projects WHERE user_id=? LIMIT 201').bind(owner).all()).results;
  if(new Set([...existing.map(p=>p.folder_id),...catalogue.map(p=>p.id)]).size>200)throw new AssetError('The test catalogue is limited to 200 saved projects.',422);
  await env.DB.batch(statements);
  return projectStatus(env,owner);
}
async function drive(env,owner,path,params={},init={}) {
  const session=await access(env,owner);
  if(![DRIVE_SCOPE,DRIVE_MOVE_SCOPE].some(scope=>(session.row.scopes||'').split(' ').includes(scope))) throw new AssetError('Add read-only Drive access first.',403);
  if(init.method==='PATCH'&&!(session.row.scopes||'').split(' ').includes(DRIVE_MOVE_SCOPE))throw new AssetError('Enable folder moves before confirming this release.',403);
  const url=new URL('https://www.googleapis.com/drive/v3/'+path);url.search=new URLSearchParams(params);
  const r=await fetch(url,{...init,headers:{Authorization:'Bearer '+session.token,'Content-Type':'application/json'},signal:AbortSignal.timeout(20000)});
  if(!r.ok) throw new AssetError(r.status===404?'Folder unavailable or access denied.':r.status===403?'Drive access denied. Enable the Drive API and grant read-only metadata access.':'Drive could not complete the scan. Retry later.',r.status===401?401:r.status===403||r.status===404?403:502);
  const body=await r.json();
  const current=await env.DB.prepare('SELECT revision FROM youtube_connections WHERE user_id = ?').bind(owner).first();
  if(!current||current.revision!==session.row.revision) throw new AssetError('Connection changed. Scan cancelled.',401);
  return body;
}
async function children(env,owner,id) {
  let pageToken='',files=[];
  for(let page=0;page<4;page++) {
    const body=await drive(env,owner,'files',{q:`'${id}' in parents and trashed = false`,pageSize:'100',fields:'nextPageToken,incompleteSearch,files(id,name,mimeType,size,modifiedTime,parents,trashed)',supportsAllDrives:'true',includeItemsFromAllDrives:'true',...(pageToken?{pageToken}:{})});
    if(!Array.isArray(body.files)||body.incompleteSearch) throw new AssetError('Drive returned an incomplete folder listing. No readiness result was saved.',502);
    files.push(...body.files);pageToken=body.nextPageToken;
    if(!pageToken)return files;
  }
  throw new AssetError('Folder exceeds the bounded test scan. No readiness result was saved.',422);
}
export async function scan(env,owner,id,mappings={}) {
  const root=await drive(env,owner,'files/'+id,{fields:'id,name,mimeType,trashed',supportsAllDrives:'true'});
  if(root.mimeType!==folderMime||root.trashed)throw new AssetError('Choose a project folder, not a file.');
  const entries=await children(env,owner,id),files=[],problems={};
  for(const directory of ['project','audio','stems','artwork','shorts']) {
    const folders=entries.filter(f=>f.mimeType===folderMime&&f.name.toLowerCase()===directory);
    if(folders.length>1){problems[directory]=true;continue;}
    if(folders.length===1)files.push(...(await children(env,owner,folders[0].id)).map(f=>({...f,directory})));
  }
  const assets=evaluate(files,mappings,problems);
  if(mappings.shorts){const a=assets.find(a=>a.role==='shorts');a.files.sort((x,y)=>mappings.shorts.indexOf(x.id)-mappings.shorts.indexOf(y.id));}
  return {folderId:id,projectName:root.name,checkedAt:Date.now(),assets,ready:assets.filter(a=>a.state==='Pass').length,total:roles.length,source:'Google Drive metadata',publicationConnected:false};
}
export function reviewMetadata(input) {
  if(!input||typeof input!=='object'||Array.isArray(input))throw new AssetError('Review the project metadata.');
  const text=(key,limit,required=false)=>{if(typeof input[key]!=='string'||input[key].length>limit||/[\x00-\x1f]/.test(input[key]))throw new AssetError('Check '+key+'.');const v=input[key].trim();if(required&&!v)throw new AssetError('Add '+key+' before saving the review.');return v;};
  const artist=text('artist',160,true),title=text('title',160,true),key=text('key',24),credits=text('credits',240);
  const bpm=input.bpm===''||input.bpm===null?null:Number(input.bpm);
  if(bpm!==null&&(!Number.isInteger(bpm)||bpm<30||bpm>300))throw new AssetError('BPM must be a whole number from 30 to 300, or blank.');
  if(key&&!/^[A-G](?:#|b)?(?:m|maj|min)?$/i.test(key))throw new AssetError('Use a musical key such as B#m, or leave it blank.');
  return {artist,title,bpm,key:key||null,credits};
}
export function releaseSignature(result) {
  return JSON.stringify([result.projectName,...result.assets.map(a=>[a.role,a.state,...a.files.map(f=>[f.id,f.name,f.modifiedTime||null,f.size||null])])]);
}
async function saveScan(env,owner,id,result){await env.DB.prepare('UPDATE drive_release_projects SET result_json=?,checked_at=?,name=? WHERE user_id=? AND folder_id=?').bind(JSON.stringify(result),result.checkedAt,result.projectName,owner,id).run();}
async function prepareRelease(env,owner,id,saved,input,action){
  const settings=await env.DB.prepare('SELECT * FROM drive_release_settings WHERE user_id=?').bind(owner).first();
  const existing=await env.DB.prepare('SELECT * FROM drive_release_moves WHERE user_id=? AND folder_id=?').bind(owner,id).first();
  const root=await drive(env,owner,'files/'+id,{fields:'id,name,mimeType,trashed,parents,driveId,capabilities(canMoveItemWithinDrive)',supportsAllDrives:'true'});
  if(root.trashed||root.mimeType!==folderMime)throw new AssetError('The release folder is unavailable.',409);
  const stage=root.parents?.length===1&&root.parents[0]===settings.production_id?'production':root.parents?.length===1&&root.parents[0]===settings.queue_id?'queue':null;
  if(!stage)throw new AssetError('Use a project directly inside connected In Production or Release Queue.',409);
  if(action==='drive-review'){
    if(existing?.status==='pending')throw new AssetError('A folder move is unresolved. Confirm ready again to reconcile its result.',409);
    const metadata=reviewMetadata(input.metadata);
    const current=await scan(env,owner,id,JSON.parse(saved.mappings_json));
    // Reuse explicitly reviewed order, including automatically numbered clips.
    const shorts=current.assets.find(a=>a.role==='shorts');const old=JSON.parse(saved.result_json||'null');
    if(!old||releaseSignature(old)!==releaseSignature(current)) {await saveScan(env,owner,id,current);throw new AssetError('Files changed since the displayed check. Close and reopen Prepare release to review the updated files.',409);}
    if(shorts.state==='Pass'&&input.shortsReviewed!==true)throw new AssetError('Review the Tuesday–Sunday Shorts order.');
    await env.DB.prepare('INSERT INTO drive_release_reviews VALUES (?,?,?,?,?) ON CONFLICT(user_id,folder_id) DO UPDATE SET metadata_json=excluded.metadata_json,signature=excluded.signature,reviewed_at=excluded.reviewed_at').bind(owner,id,JSON.stringify(metadata),releaseSignature(current),Date.now()).run();
    await saveScan(env,owner,id,current);
    return {...await projectStatus(env,owner),notice:'Review saved.'};
  }
  const review=await env.DB.prepare('SELECT * FROM drive_release_reviews WHERE user_id=? AND folder_id=?').bind(owner,id).first();
  if(!review)throw new AssetError('Save your metadata and Shorts review first.',409);
  if(input.reviewedAt!==review.reviewed_at)throw new AssetError('The review changed. Reopen Prepare release.',409);
  const current=await scan(env,owner,id,JSON.parse(saved.mappings_json));await saveScan(env,owner,id,current);
  if(current.ready!==8||releaseSignature(current)!==review.signature)throw new AssetError('Files changed or are incomplete. Reopen Prepare release, review and save again.',409);
  if(root.driveId)throw new AssetError('Folder approval currently supports My Drive only.',422);
  if(existing?.status==='pending'&&stage==='production')throw new AssetError('A move may still be running. Check Drive before retrying; no second move was sent.',409);
  if(existing&&existing.target_id!==settings.queue_id)throw new AssetError('The queue connection changed after approval. Resolve the previous move first.',409);
  if(stage==='production'){
    if(!settings.queue_id)throw new AssetError('Connect Release Queue first.');
    const destination=await drive(env,owner,'files/'+settings.queue_id,{fields:'id,mimeType,trashed,driveId,capabilities(canAddChildren)',supportsAllDrives:'true'});
    if(destination.trashed||destination.mimeType!==folderMime||destination.driveId||destination.capabilities?.canAddChildren!==true||root.capabilities?.canMoveItemWithinDrive!==true)throw new AssetError('The connected folders do not permit this My Drive move.',403);
    const connection=await env.DB.prepare('SELECT scopes FROM youtube_connections WHERE user_id=?').bind(owner).first();
    if(!connection?.scopes?.split(' ').includes(DRIVE_MOVE_SCOPE))throw new AssetError('Enable folder moves before confirming this release.',403);
    const latest=await drive(env,owner,'files/'+id,{fields:'id,parents,trashed',supportsAllDrives:'true'});
    if(latest.trashed||latest.parents?.length!==1||latest.parents[0]!==settings.production_id)throw new AssetError('The folder moved during preparation. Refresh the list and review again.',409);
    const claim=await env.DB.prepare("INSERT INTO drive_release_moves (user_id,folder_id,source_id,target_id,status,started_at) SELECT ?,?,?,?,?,? FROM drive_release_reviews WHERE user_id=? AND folder_id=? AND reviewed_at=? AND signature=? ON CONFLICT(user_id,folder_id) DO NOTHING").bind(owner,id,settings.production_id,settings.queue_id,'pending',Date.now(),owner,id,review.reviewed_at,review.signature).run();
    if(claim.meta.changes!==1)throw new AssetError('This release has already been approved or a move is pending. Refresh the release list.',409);
    try{
      // Exactly one metadata-only PATCH; never retry an uncertain external write.
      await drive(env,owner,'files/'+id,{addParents:settings.queue_id,removeParents:settings.production_id,fields:'id,parents',supportsAllDrives:'true'},{method:'PATCH',body:'{}'});
      const moved=await drive(env,owner,'files/'+id,{fields:'id,parents',supportsAllDrives:'true'});
      if(moved.parents?.length!==1||moved.parents[0]!==settings.queue_id)throw new AssetError('Move not verified.',409);
    }catch{throw new AssetError('The move result is uncertain. Check Drive, then Confirm ready again to reconcile. No automatic retry will run.',409);}
  }else if(!existing){await env.DB.prepare('INSERT INTO drive_release_moves (user_id,folder_id,source_id,target_id,status,started_at) VALUES (?,?,?,?,?,?)').bind(owner,id,settings.queue_id,settings.queue_id,'pending',Date.now()).run();}
  if(existing?.status==='completed')return {...await projectStatus(env,owner),notice:'Already confirmed ready in Release Queue.'};
  const now=Date.now(),catalogue=JSON.parse(settings.catalogue_json).map(p=>p.id===id?{...p,stage:'queue'}:p);
  await env.DB.batch([
    env.DB.prepare("UPDATE drive_release_moves SET status='completed',completed_at=? WHERE user_id=? AND folder_id=?").bind(now,owner,id),
    env.DB.prepare("UPDATE drive_release_projects SET stage='queue' WHERE user_id=? AND folder_id=?").bind(owner,id),
    env.DB.prepare('UPDATE drive_release_settings SET catalogue_json=? WHERE user_id=?').bind(JSON.stringify(catalogue),owner)
  ]);
  return {...await projectStatus(env,owner),notice:'Confirmed ready in Release Queue. Scheduling is the next step.'};
}
export async function assetHandler(request,env,action) {
  const headers={'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
  try {
    const owner=request.headers.get('oai-authenticated-user-id');if(!owner)throw new AssetError('Sign in to this private page.',401);
    if(!configured(env))throw new AssetError('Google connection setup is incomplete.',503);
    await tables(env,owner);
    if(action==='drive-status'&&request.method==='GET') {
      const connection=await env.DB.prepare('SELECT scopes FROM youtube_connections WHERE user_id = ?').bind(owner).first();
      return Response.json({moveGranted:Boolean(connection?.scopes?.split(' ').includes(DRIVE_MOVE_SCOPE)),driveGranted:[DRIVE_SCOPE,DRIVE_MOVE_SCOPE].some(scope=>connection?.scopes?.split(' ').includes(scope)),...await projectStatus(env,owner)},{headers});
    }
    if(request.method!=='POST')throw new AssetError('Method not allowed.',405);
    if(request.headers.get('Origin')!==new URL(request.url).origin)throw new AssetError('Request origin does not match.',403);
    const text=await request.text();if(text.length>8192)throw new AssetError('Request too large.',413);
    let input;try{input=JSON.parse(text);}catch{throw new AssetError('Invalid request.');}
    if(!input||typeof input!=='object'||Array.isArray(input))throw new AssetError('Send an object with the folder settings.');
    if(action==='drive-folders'){
      const folders={production:folderId(input.production),queue:input.queue?folderId(input.queue):'',released:input.released?folderId(input.released):''};
      return Response.json(await discoverProjects(env,owner,folders),{headers});
    }
    if(action==='drive-discover'){
      const current=await projectStatus(env,owner);
      return Response.json(await discoverProjects(env,owner,current.folders),{headers});
    }
    const id=folderId(input.folder);
    const saved=await env.DB.prepare('SELECT * FROM drive_release_projects WHERE user_id=? AND folder_id=?').bind(owner,id).first();
    if(action==='drive-select'){
      if(!saved)throw new AssetError('Refresh the release list before selecting this project.',404);
      await env.DB.prepare('UPDATE drive_release_settings SET selected_id=? WHERE user_id=?').bind(id,owner).run();
      return Response.json(await projectStatus(env,owner),{headers});
    }
    if(['drive-review','drive-ready'].includes(action)){
      if(!saved)throw new AssetError('Select and Sync a saved project first.',404);
      return Response.json(await prepareRelease(env,owner,id,saved,input,action),{headers});
    }
    let mappings=saved?JSON.parse(saved.mappings_json):{};
    if(action==='drive-confirm') {
      if(!roles.includes(input.role)||!Array.isArray(input.ids)||input.ids.some(v=>!validId(v))||new Set(input.ids).size!==input.ids.length||input.ids.length!==(input.role==='shorts'?6:1))throw new AssetError('Choose the required distinct files.');
      // Re-scan before accepting an association; client-supplied IDs are never authority.
      const current=await scan(env,owner,id,{}),asset=current.assets.find(a=>a.role===input.role);
      if(input.ids.some(v=>!asset.candidates.some(f=>f.id===v)))throw new AssetError('File no longer qualifies for this role.');
      mappings={...mappings,[input.role]:input.ids};
    } else if(action!=='drive-scan')throw new AssetError('Not found.',404);
    const result=await scan(env,owner,id,mappings);
    // Apply the explicitly selected Short order to day assignments.
    if(mappings.shorts){const a=result.assets.find(a=>a.role==='shorts');a.files.sort((x,y)=>mappings.shorts.indexOf(x.id)-mappings.shorts.indexOf(y.id));}
    const count=(await env.DB.prepare('SELECT folder_id FROM drive_release_projects WHERE user_id=? LIMIT 201').bind(owner).all()).results.length;
    if(!saved&&count>=200)throw new AssetError('The test catalogue is limited to 200 saved projects.',422);
    await env.DB.batch([
      env.DB.prepare('INSERT INTO drive_release_projects (user_id,folder_id,name,mappings_json,result_json,checked_at) VALUES (?,?,?,?,?,?) ON CONFLICT(user_id,folder_id) DO UPDATE SET name=excluded.name,mappings_json=excluded.mappings_json,result_json=excluded.result_json,checked_at=excluded.checked_at').bind(owner,id,result.projectName,JSON.stringify(mappings),JSON.stringify(result),result.checkedAt),
      env.DB.prepare('UPDATE drive_release_settings SET selected_id=? WHERE user_id=?').bind(id,owner)
    ]);
    return Response.json(result,{headers});
  }catch(error){return Response.json({error:error instanceof AssetError?error.message:'The file scan failed. Last successful results were not changed.'},{status:error instanceof AssetError?error.status:502,headers});}
}
