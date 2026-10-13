import { env } from 'cloudflare:workers';
import { automationHandler } from '../../../server/automations.mjs';
export const dynamic='force-dynamic';
export const GET=(request:Request)=>automationHandler(request,env);
export const POST=(request:Request)=>automationHandler(request,env);
