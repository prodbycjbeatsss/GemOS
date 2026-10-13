import content from '../../ui/subscription-model.mjs?raw';
export function GET(){return new Response(content,{headers:{'Content-Type':'text/javascript; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});}
