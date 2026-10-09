import script from '../../ui/app.js?raw';
export const dynamic = 'force-dynamic';
export function GET(request: Request) {
  if (!request.headers.get('oai-authenticated-user-id')) return new Response('Unauthorised', { status: 401 });
  return new Response(script, { headers: { 'Content-Type': 'text/javascript', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
}
