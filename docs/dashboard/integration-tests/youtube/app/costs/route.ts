export const dynamic='force-dynamic';
export function GET(request:Request){if(!request.headers.get('oai-authenticated-user-id'))return new Response('Sign in to this private page.',{status:401});return new Response('Subscriptions are now in Finance.',{status:303,headers:{Location:'/commerce','Cache-Control':'no-store'}});}
