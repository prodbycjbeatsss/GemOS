import { env } from 'cloudflare:workers';
import { payhipHandler } from '../../../../server/payhip.mjs';
export const dynamic = 'force-dynamic';
const route = (request: Request) => payhipHandler(request, env, new URL(request.url).pathname.split('/').at(-1));
export const GET = route;
export const POST = route;
