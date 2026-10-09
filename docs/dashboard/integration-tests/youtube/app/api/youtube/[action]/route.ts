import { env } from 'cloudflare:workers';
import { handle } from '../../../../server/youtube.mjs';
export const dynamic = 'force-dynamic';
const route = (request: Request) => handle(request, env, new URL(request.url).pathname.split('/').at(-1));
export const GET = route;
export const POST = route;
