import {env} from 'cloudflare:workers';
import {costsHandler} from '../../../server/subscriptions.mjs';
export const dynamic='force-dynamic';
export const GET=(request:Request)=>costsHandler(request,env);
export const POST=(request:Request)=>costsHandler(request,env);
