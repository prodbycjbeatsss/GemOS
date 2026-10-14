import { monitoredRequest } from '../../../../server/sync-monitor.mjs';
import { env } from 'cloudflare:workers';
import { payoutsHandler } from '../../../../server/payouts.mjs';
export const dynamic='force-dynamic';
export const GET=(request:Request)=>new URL(request.url).pathname.endsWith('/report')?monitoredRequest(request,env,'youtube-payouts-sync',()=>payoutsHandler(request,env)):payoutsHandler(request,env);

export const POST=(request:Request)=>payoutsHandler(request,env);
