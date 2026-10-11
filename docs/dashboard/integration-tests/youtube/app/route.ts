import dashboardStyles from '../ui/dashboard.css?raw';
import { env } from 'cloudflare:workers';
import html from '../ui/index.html?raw';
import { configured } from '../server/youtube.mjs';
export const dynamic = 'force-dynamic';
export function GET(request: Request) {
  if (!request.headers.get('oai-authenticated-user-id')) return new Response('Sign in to this private page.', { status: 401 });
  const page = html.replace('<link rel="stylesheet" href="/dashboard.css">', `<style id="dashboard-shell-styles">${dashboardStyles}</style>`).replace('</head>', `<script>window.GEMOS_SERVER_AVAILABLE=true;window.GEMOS_BACKEND_CONFIGURED=${configured(env)};</script></head>`);
  return new Response(page, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff' } });
}
