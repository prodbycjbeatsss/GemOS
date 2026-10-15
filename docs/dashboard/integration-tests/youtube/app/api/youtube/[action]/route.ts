import { scheduleHandler } from '../../../../server/youtube-schedule.mjs';
import { weeklyHandler } from '../../../../server/weekly-shorts.mjs';
import { channelShortsHandler } from '../../../../server/channel-shorts.mjs';
import { assetHandler } from '../../../../server/assets.mjs';
import { env } from 'cloudflare:workers';
import { captureHandler } from '../../../../server/capture.mjs';
import { handle } from '../../../../server/youtube.mjs';
import { monitoredRequest, monitoredAnalytics } from '../../../../server/sync-monitor.mjs';
export const dynamic='force-dynamic';
const route=(request:Request)=>{
 const action=new URL(request.url).pathname.split('/').at(-1);
 const work=()=>action==='schedule'?scheduleHandler(request,env):action==='weekly-shorts'?weeklyHandler(request,env):action==='shorts-report'?channelShortsHandler(request,env):action?.startsWith('drive-')?assetHandler(request,env,action):['release','run-captures','capture-health','scheduler-config'].includes(action||'')?captureHandler(request,env,action):handle(request,env,action);
 if(action==='query')return monitoredAnalytics(request,env,work);
 const keys:Record<string,string>={'schedule':'youtube-schedule-sync','weekly-shorts':'release-metadata-sync','shorts-report':'shorts-analytics-sync','drive-scan':'drive-assets-sync','drive-confirm':'drive-assets-sync','drive-discover':'drive-catalogue-sync','drive-folders':'drive-catalogue-sync','drive-ready':'drive-release-ready','release':'release-metadata-sync'};
 return request.method==='POST'&&keys[action||'']?monitoredRequest(request,env,keys[action||''],work):work();
};
export const GET=route;export const POST=route;
