import { monitoredRequest } from '../../../../server/sync-monitor.mjs';
import { env } from 'cloudflare:workers';
import { earningsHandler } from '../../../../server/earnings.mjs';
export const dynamic = 'force-dynamic';
export const GET = (request: Request) => new URL(request.url).pathname.endsWith('/report')?monitoredRequest(request,env,'youtube-earnings-sync',()=>earningsHandler(request,env)):new URL(request.url).pathname.endsWith('/videos')?monitoredRequest(request,env,'youtube-ranking-sync',()=>earningsHandler(request,env)):earningsHandler(request,env);
