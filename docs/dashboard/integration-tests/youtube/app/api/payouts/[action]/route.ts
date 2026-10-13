import { env } from 'cloudflare:workers';
import { payoutsHandler } from '../../../../server/payouts.mjs';
export const dynamic='force-dynamic';
export const GET=(request:Request)=>payoutsHandler(request,env);
