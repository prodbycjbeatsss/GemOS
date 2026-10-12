import content from '../../ui/email.js?raw';
export function GET(){return new Response(content,{headers:{'Content-Type':'text/javascript; charset=utf-8','X-Content-Type-Options':'nosniff'}});}
