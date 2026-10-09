import { access, configured } from './youtube.mjs';
export const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.metadata.readonly';
const folderMime = 'application/vnd.google-apps.folder';
const roles = ['remix','mp3','stems','project','thumbnail','video','shorts'];
export const LABELS = ['Remix WAV','Beat MP3','Stems archive','Project ZIP','Thumbnail','YouTube video','Six Shorts'];
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
  const extensions = {remix:['wav'],mp3:['mp3'],stems:['zip','7z'],project:['zip'],thumbnail:['jpg','jpeg','png','webp'],video:['mp4'],shorts:['mp4']}[role];
  const mimes = {wav:['audio/wav','audio/x-wav','audio/wave','audio/vnd.wave'],mp3:['audio/mpeg','audio/mp3'],zip:['application/zip','application/x-zip-compressed'], '7z':['application/x-7z-compressed'],jpg:['image/jpeg'],jpeg:['image/jpeg'],png:['image/png'],webp:['image/webp'],mp4:['video/mp4']};
  // Generic MIME does not establish a format; such files require deeper validation.
  return extensions.includes(ext) && mimes[ext].includes(mime);
}
function marker(file, role) {
  const name = file.name.toLowerCase();
  return ({remix:/\[remix\]|\bremix\b/,mp3:/\[beat\]|\b(?:type beat|beat|tagged)\b/,stems:/\bstems?\b/,project:/\[zip\]|\b(?:project|release)\b/,thumbnail:/\b(?:thumbnail|artwork|cover)\b/,video:/\b(?:youtube|main)\b/,shorts:/\bshorts?\b/}[role]).test(name);
}
export function evaluate(files, mappings = {}, folderProblems = {}) {
  const directories = {remix:'audio',mp3:'audio',stems:'stems',project:'project',thumbnail:'artwork',video:'artwork',shorts:'shorts'};
  return roles.map((role,index) => {
    const candidates = files.filter(f=>f.directory===directories[role] && compatible(f,role));
    const marked = candidates.filter(f=>marker(f,role));
    const selectedIds = mappings[role] || [], selected = candidates.filter(f=>selectedIds.includes(f.id));
    const base = {role,label:LABELS[index],candidates:candidates.map(f=>({id:f.id,name:f.name})),files:[],count:0};
    if(folderProblems[directories[role]]) return {...base,state:'Needs confirmation',reason:'Multiple matching subfolders; use one designated folder.'};
    if(selectedIds.length && selected.length !== selectedIds.length) return {...base,state:'Needs confirmation',reason:'A confirmed file is missing, moved, empty, WIP or has an incompatible type.'};
    if(role==='shorts') {
      const slots = new Map();
      for(const f of marked){const n=f.name.match(/\bshorts?[\s_-]*(0?[1-6])\b/i); if(n){const key=Number(n[1]);slots.set(key,[...(slots.get(key)||[]),f]);}}
      const numbered = [...slots.values()].filter(v=>v.length===1).map(v=>v[0]);
      const chosen = selectedIds.length ? selected : numbered;
      const ambiguous = !selectedIds.length && (candidates.some(f=>!numbered.includes(f)) || [...slots.values()].some(v=>v.length>1));
      return {...base,files:chosen.map(f=>({id:f.id,name:f.name})),count:chosen.length,state:ambiguous?'Needs confirmation':chosen.length===6?'Pass':'Missing',reason:ambiguous?'Confirm six distinct clip files and their Tuesday–Sunday order.':`${chosen.length}/6 clips identified`};
    }
    const chosen = selectedIds.length ? selected : marked;
    if(chosen.length===1) return {...base,state:'Pass',files:chosen.map(f=>({id:f.id,name:f.name})),count:1,reason:selectedIds.length?'Remembered file association':'Clear role match'};
    if(candidates.length) return {...base,state:'Needs confirmation',reason:'Choose the correct file for this role.'};
    const wip = files.some(f=>f.directory===directories[role] && /\(wip\)/i.test(f.name));
    return {...base,state:'Missing',reason:wip?'No eligible file; unfinished (WIP) files are excluded.':'No eligible file found'};
  });
}
async function tables(env) {
  await env.DB.prepare('CREATE TABLE IF NOT EXISTS drive_asset_state (user_id TEXT PRIMARY KEY, folder_id TEXT NOT NULL, mappings_json TEXT NOT NULL, result_json TEXT, checked_at INTEGER)').run();
}
async function drive(env,owner,path,params={}) {
  const session=await access(env,owner);
  if(!(session.row.scopes||'').split(' ').includes(DRIVE_SCOPE)) throw new AssetError('Add read-only Drive access first.',403);
  const url=new URL('https://www.googleapis.com/drive/v3/'+path);url.search=new URLSearchParams(params);
  const r=await fetch(url,{headers:{Authorization:'Bearer '+session.token},signal:AbortSignal.timeout(20000)});
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
  return {folderId:id,projectName:root.name,checkedAt:Date.now(),assets,ready:assets.filter(a=>a.state==='Pass').length,total:7,source:'Google Drive metadata',publicationConnected:false};
}
export async function assetHandler(request,env,action) {
  const headers={'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
  try {
    const owner=request.headers.get('oai-authenticated-user-id');if(!owner)throw new AssetError('Sign in to this private page.',401);
    if(!configured(env))throw new AssetError('Google connection setup is incomplete.',503);
    await tables(env);
    const saved=await env.DB.prepare('SELECT * FROM drive_asset_state WHERE user_id = ?').bind(owner).first();
    if(action==='drive-status'&&request.method==='GET') {
      const connection=await env.DB.prepare('SELECT scopes FROM youtube_connections WHERE user_id = ?').bind(owner).first();
      return Response.json({driveGranted:Boolean(connection?.scopes?.split(' ').includes(DRIVE_SCOPE)),folderId:saved?.folder_id||'',result:saved?.result_json?JSON.parse(saved.result_json):null},{headers});
    }
    if(request.method!=='POST')throw new AssetError('Method not allowed.',405);
    if(request.headers.get('Origin')!==new URL(request.url).origin)throw new AssetError('Request origin does not match.',403);
    const text=await request.text();if(text.length>8192)throw new AssetError('Request too large.',413);
    let input;try{input=JSON.parse(text);}catch{throw new AssetError('Invalid request.');}
    const id=folderId(input.folder);
    let mappings=saved?.folder_id===id?JSON.parse(saved.mappings_json):{};
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
    await env.DB.prepare('INSERT INTO drive_asset_state (user_id,folder_id,mappings_json,result_json,checked_at) VALUES (?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET folder_id=excluded.folder_id,mappings_json=excluded.mappings_json,result_json=excluded.result_json,checked_at=excluded.checked_at').bind(owner,id,JSON.stringify(mappings),JSON.stringify(result),result.checkedAt).run();
    return Response.json(result,{headers});
  }catch(error){return Response.json({error:error instanceof AssetError?error.message:'The file scan failed. Last successful results were not changed.'},{status:error instanceof AssetError?error.status:502,headers});}
}
