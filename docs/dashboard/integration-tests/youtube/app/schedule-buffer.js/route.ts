import content from '../../ui/schedule-buffer.js?raw';
export function GET(request: Request) {
  if (!request.headers.get('oai-authenticated-user-id')) return new Response('Sign in first.', {status:401});
  return new Response(content, {headers:{'Content-Type':'text/javascript; charset=utf-8','X-Content-Type-Options':'nosniff','Cache-Control':'no-store'}});
}
