import { recoverRuns, getRun, publicRun, reportRuns, dismissRun, CHECKER, RunError } from './automation-runs.mjs';
import { runOwnerChecker } from './capture.mjs';
const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
const json=(body,status=200)=>Response.json(body,{status,headers});
export async function automationHandler(request,env){
 try{
  const owner=request.headers.get('oai-authenticated-user-id');if(!owner)return json({error:'Sign in to this private page.'},401);
  await recoverRuns(env,owner);
  if(request.method==='GET'){
   const q=new URL(request.url).searchParams,id=q.get('id');
   if(id){const r=await getRun(env,owner,id);if(!r)return json({error:'Run not found.'},404);return json({run:publicRun(r)});}
   const offset=Number(q.get('offset')||0),automation=q.get('automation')||'',attention=q.get('attention');
   if(!Number.isSafeInteger(offset)||offset<0||offset>100000||offset%10||automation&&automation!==CHECKER||attention&&!['0','1'].includes(attention))throw new RunError('Invalid history filter.');
   return json(await reportRuns(env,owner,{offset,automation,attention:attention==='1'}));
  }
  if(request.method!=='POST')return json({error:'Method not allowed.'},405);
  if(request.headers.get('Origin')!==new URL(request.url).origin)return json({error:'Request origin does not match.'},403);
  const text=await request.text();if(text.length>2048)throw new RunError('Request too large.');let input;try{input=JSON.parse(text);}catch{throw new RunError('Invalid request.');}
  if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!['action','id','reason'].includes(k))||typeof input.id!=='string'||!/^[a-f0-9-]{36}$/.test(input.id))throw new RunError('Choose a saved run.');
  if(input.action==='dismiss'){await dismissRun(env,owner,input.id,input.reason);return json({saved:true});}
  if(input.action!=='retry')throw new RunError('Unsupported action.');
  const original=await getRun(env,owner,input.id);if(!original)return json({error:'Run not found.'},404);
  if(original.automation!==CHECKER)throw new RunError('Retry is not supported for this automation.');
  const selection=await env.DB.prepare('SELECT channel_id FROM youtube_release_selections WHERE user_id=? LIMIT 2').bind(owner).all();
  if(selection.results.length!==1)throw new RunError('Select one current release in Audience & Performance before retrying.',409);
  // A retry is a fresh check of the current selection, never a reconstruction of a missed window.
  try{return json({result:await runOwnerChecker(env,owner,selection.results[0].channel_id,'retry',input.id)});}
  catch(e){if(e instanceof RunError)throw e;return json({error:'The retry did not complete. Its outcome is saved in run history.'},502);}
 }catch(e){return json({error:e instanceof RunError?e.message:'Automation records could not be loaded or saved. Refresh and try again.'},e instanceof RunError?e.status:500);}
}
