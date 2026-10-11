import dashboardStyles from '../../ui/dashboard.css?raw';
import content from '../../ui/commerce.html?raw';
export const dynamic = 'force-dynamic';
export function GET(request: Request) {
 if (!request.headers.get('oai-authenticated-user-id')) return new Response('Sign in to this private page.', {status:401});
 return new Response(content.replace('<link rel="stylesheet" href="/dashboard.css">', `<style id="dashboard-shell-styles">${dashboardStyles}</style>`), {headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff'}});
}
