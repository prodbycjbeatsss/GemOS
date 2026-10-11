import content from '../../ui/dashboard.css?raw';
export function GET() { return new Response(content, {headers:{'Content-Type':'text/css; charset=utf-8','X-Content-Type-Options':'nosniff'}}); }
