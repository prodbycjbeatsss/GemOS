import { env } from 'cloudflare:workers';
import { publishingHandler } from '../../../../server/publishing.mjs';
export const dynamic='force-dynamic';
const route=(request:Request)=>publishingHandler(request,env,new URL(request.url).pathname.split('/').at(-1));
export const GET=route;export const POST=route;
