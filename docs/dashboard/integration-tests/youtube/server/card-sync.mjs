import { scheduleHandler } from './youtube-schedule.mjs';
import { weeklyHandler } from './weekly-shorts.mjs';
import { channelShortsHandler } from './channel-shorts.mjs';
import { getTarget, savedConnection, capabilities } from './sync-targets.mjs';
import { monitoredRequest, partial } from './sync-monitor.mjs';
import { assetHandler } from './assets.mjs';
import { captureRelease } from './capture.mjs';
import { earningsHandler } from './earnings.mjs';
import { payoutsHandler } from './payouts.mjs';
import { mailchimpHandler } from './mailchimp.mjs';
import { payhipHandler } from './payhip.mjs';
import { RunError } from './automation-runs.mjs';
// Fixed server-side routing: the caller cannot supply a URL, method, credentials or move action.
export async function syncCard(request,env,card,sample=null){
 const owner=request.headers.get('oai-authenticated-user-id');if(!owner)throw new RunError('Sign in first.',401);
 const available=await capabilities(env,owner);if(!Object.hasOwn(available,card))throw new RunError('Unknown dashboard card.');
 if(!available[card])return {card,status:'skipped',message:card==='3.4'?'Manual records do not need a provider sync.':card==='1.1'?'Connect YouTube and choose a schedule channel on Release Buffer.':'Connect this source on its card first.'};
 const token=crypto.randomUUID(),now=Date.now(),key='sync-card:'+card;
 const lease=await env.DB.prepare('INSERT INTO automation_locks (user_id,automation,run_id,expires_at) VALUES (?,?,?,?) ON CONFLICT(user_id,automation) DO UPDATE SET run_id=excluded.run_id,expires_at=excluded.expires_at WHERE automation_locks.expires_at<=?').bind(owner,key,token,now+300000,now).run();
 if(lease.meta.changes!==1)throw new RunError('This card is already syncing. Refresh its status shortly.',409);
 const make=(path,params={},body=null,extra={})=>{const url=new URL(path,new URL(request.url).origin);url.search=new URLSearchParams(params);return new Request(url,{method:body?'POST':'GET',headers:{'oai-authenticated-user-id':owner,Origin:url.origin,'Content-Type':'application/json',...extra},...(body?{body:JSON.stringify(body)}:{})});};
 let partialData=false;
 const run=async(key,path,params,body,work)=>{const req=make(path,params,body);const r=await monitoredRequest(req,env,key,()=>work(req));if(!r.ok)throw new RunError('Sync could not complete. Open the source card or run history for details.',r.status);const d=await r.json();if(partial(key,d))partialData=true;return d;};
 const google=await savedConnection(env,owner),unique=google.channels.length===1?google.channels[0].id:null;
 try{
  if(card==='1.1'){
   const target=await getTarget(env,owner,'youtube-schedule-sync');const channel=target?.channel||unique;
   if(!channel)return {card,status:'skipped',message:'Choose your schedule channel in Release Buffer first.'};
   await run('youtube-schedule-sync','/api/youtube/schedule',{}, {channel},r=>scheduleHandler(r,env));
  }else if(card==='1.2'){
   await run('drive-catalogue-sync','/api/youtube/drive-discover',{}, {},r=>assetHandler(r,env,'drive-discover'));
   const setting=await env.DB.prepare('SELECT selected_id FROM drive_release_settings WHERE user_id=?').bind(owner).first();
   if(setting?.selected_id)await run('drive-assets-sync','/api/youtube/drive-scan',{}, {folder:setting.selected_id},r=>assetHandler(r,env,'drive-scan'));
   else return {card,status:'partial',message:'Release list refreshed. Choose a project for its file check.'};
  }else if(card==='2.1'){
   const saved=await getTarget(env,owner,'shorts-analytics-sync');
   const channel=sample?.channel||saved?.channel||unique;
   if(!google.channels.some(c=>c.id===channel))return {card,status:'skipped',message:'Choose your YouTube channel in Audience & Performance first.'};
   const rangeDays=sample?.rangeDays||saved?.rangeDays||28;
   const report=await run('shorts-analytics-sync','/api/youtube/shorts-report',{}, {channel,rangeDays,...(sample?.endDate?{endDate:sample.endDate}:{})},r=>channelShortsHandler(r,env));
   partialData=report.warnings.length>0;
  }else if(card==='2.2'){
   const target=await getTarget(env,owner,'weekly-shorts-sync');const channel=target?.channel||unique;if(!channel)return {card,status:'skipped',message:'Choose a weekly Shorts channel first.'};
   await run('release-metadata-sync','/api/youtube/weekly-shorts',{}, {channel,weekOffset:target?.weekOffset||0},r=>weeklyHandler(r,env));
  }else if(card==='2.3'){
   const target=await getTarget(env,owner,'email-list-sync')||{month:new Date().toISOString().slice(0,7)};
   await run('email-list-sync','/api/mailchimp/report',target,null,r=>mailchimpHandler(r,env,'report'));
  }else if(card==='3.1'){
   const p=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',year:'numeric',month:'numeric'}).formatToParts(new Date());
   const target=await getTarget(env,owner,'payhip-sales-sync')||{year:p.find(x=>x.type==='year').value,month:p.find(x=>x.type==='month').value};
   await run('payhip-sales-sync','/api/payhip/report',target,null,r=>payhipHandler(r,env,'report'));
  }else if(card==='3.2'){
   const p=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',year:'numeric',month:'numeric'}).formatToParts(new Date()).map(x=>[x.type,x.value]));
   const target=await getTarget(env,owner,'youtube-earnings-sync')||{channel:unique,year:p.year,month:p.month};if(!target.channel)return {card,status:'skipped',message:'Choose an earnings channel first.'};
   await run('youtube-earnings-sync','/api/earnings/report',target,null,r=>earningsHandler(r,env));
   await run('youtube-ranking-sync','/api/earnings/videos',{...target,offset:'0'},null,r=>earningsHandler(r,env));
  }else if(card==='3.3'){
   let target=await getTarget(env,owner,'youtube-payouts-sync');
   if(!target){const response=await payoutsHandler(make('/api/payouts/accounts'),env);if(!response.ok)throw new RunError('Payout account discovery failed. Open Finance.',response.status);const data=await response.json();if(data.accounts?.length!==1)return {card,status:'skipped',message:'Choose your AdSense account on the payout card first.'};target={account:data.accounts[0].id,...(unique?{channel:unique}:{})};}
   await run('youtube-payouts-sync','/api/payouts/report',target,null,r=>payoutsHandler(r,env));
  }
  return {card,status:partialData?'partial':'completed',message:partialData?'Sync completed with partial provider data. See the source card.':'Sync completed. Recorded results are refreshed below.'};
 }finally{await env.DB.prepare('DELETE FROM automation_locks WHERE user_id=? AND automation=? AND run_id=?').bind(owner,key,token).run();}
}
