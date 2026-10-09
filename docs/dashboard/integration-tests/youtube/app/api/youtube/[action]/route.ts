import { assetHandler } from '../../../../server/assets.mjs';
import { env } from 'cloudflare:workers';
import { captureHandler } from '../../../../server/capture.mjs';
import { handle } from '../../../../server/youtube.mjs';
export const dynamic = 'force-dynamic';
const route = (request: Request) => { const action = new URL(request.url).pathname.split('/').at(-1); return action?.startsWith('drive-') ? assetHandler(request, env, action) : ['release','run-captures','capture-health','scheduler-config'].includes(action || '') ? captureHandler(request, env, action) : handle(request, env, action); };
export const GET = route;
export const POST = route;
