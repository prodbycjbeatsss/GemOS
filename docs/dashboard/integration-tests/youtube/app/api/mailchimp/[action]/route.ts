import { env } from 'cloudflare:workers';
import { mailchimpHandler } from '../../../../server/mailchimp.mjs';
export const dynamic = 'force-dynamic';
const route=(request:Request)=>mailchimpHandler(request,env,new URL(request.url).pathname.split('/').at(-1));
export const GET=route;
export const POST=route;
