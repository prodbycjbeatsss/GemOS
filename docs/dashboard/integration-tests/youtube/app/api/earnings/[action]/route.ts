import { env } from 'cloudflare:workers';
import { earningsHandler } from '../../../../server/earnings.mjs';
export const dynamic = 'force-dynamic';
export const GET = (request: Request) => earningsHandler(request, env);
