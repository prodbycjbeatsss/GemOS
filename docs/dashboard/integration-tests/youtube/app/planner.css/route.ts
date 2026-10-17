import content from '../../ui/planner-styles.txt?raw';
export const dynamic='force-dynamic';
export function GET(request:Request){if(!request.headers.get('oai-authenticated-user-id'))return new Response('Sign in first.',{status:401});return new Response(content,{headers:{'Content-Type':'text/css; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});}
