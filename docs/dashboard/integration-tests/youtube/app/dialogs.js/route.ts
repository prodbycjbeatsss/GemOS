import content from '../../ui/dialogs.js?raw';
export function GET(){return new Response(content,{headers:{'Content-Type':'text/javascript; charset=utf-8','X-Content-Type-Options':'nosniff','Cache-Control':'no-store'}});}
