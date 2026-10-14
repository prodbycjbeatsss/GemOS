import { env } from 'cloudflare:workers';
import { payhipHandler } from '../../../../server/payhip.mjs';
import { monitoredRequest } from '../../../../server/sync-monitor.mjs';
export const dynamic='force-dynamic';
const route=(request:Request)=>{const action=new URL(request.url).pathname.split('/').at(-1);const work=()=>payhipHandler(request,env,action);return action==='report'&&request.method==='GET'?monitoredRequest(request,env,'payhip-sales-sync',work):work();};
export const GET=route;export const POST=route;
