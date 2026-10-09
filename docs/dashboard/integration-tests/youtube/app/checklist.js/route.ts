import content from '../../ui/checklist.js?raw';
export const dynamic = 'force-dynamic';
export function GET(request: Request) {
 if (!request.headers.get('oai-authenticated-user-id')) return new Response('Sign in to this private page.', {status:401});
 return new Response(content, {headers:{'Content-Type':'text/javascript','Cache-Control':'no-store','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff'}});
}
