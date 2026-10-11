const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const dashboardStyles=fs.readFileSync('ui/dashboard.css','utf8');
for(const [route,file] of [['app/route.ts','ui/index.html'],['app/checklist/route.ts','ui/checklist.html'],['app/commerce/route.ts','ui/commerce.html']]){
 const html=fs.readFileSync(file,'utf8'); const source=fs.readFileSync(route,'utf8').replace(/^import .*;\n/gm,'').replace(/export const dynamic = 'force-dynamic';/g,'').replace(/export function GET\(request: Request\)/,'function GET(request)');
 const context={html,content:html,dashboardStyles,Response,env:{},configured:()=>true};vm.createContext(context);vm.runInContext(source,context);
 assert.equal(context.GET({headers:new Headers()}).status,401);
 const response=context.GET({headers:new Headers({'oai-authenticated-user-id':'test-owner'})});assert.equal(response.status,200);
 response.text().then(page=>{assert.ok(page.includes('<style id="dashboard-shell-styles">'+dashboardStyles+'</style>'));assert.ok(!page.includes('<link rel="stylesheet" href="/dashboard.css">'));assert.equal((page.match(/aria-current="page"/g)||[]).length,1);assert.ok(page.includes('background:var(--shell-bg)!important'));});
}
assert.match(dashboardStyles,/\.group-navigation a\[aria-current=page\]\{border-color:/);assert.match(dashboardStyles,/min-height:48px/);assert.match(dashboardStyles,/color-scheme:dark/);
setImmediate(()=>console.log(JSON.stringify({passed:true,checks:['all three authenticated HTML responses include complete shell CSS','no secondary CSS request required','common dark canvas','one current group per page','48px bordered selector','private routes remain protected'],renderedLayoutVerified:false})));
