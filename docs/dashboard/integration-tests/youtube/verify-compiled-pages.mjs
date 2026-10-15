import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
const dir=resolve('dist/server/_next/static');
const files=readdirSync(dir).filter(f=>f.startsWith('route-')&&f.endsWith('.js'));
for(const [name,marker] of [['checklist','file-detail-content'],['commerce','sales-label'],['automations','automation-label']]){
 const file=files.find(f=>{const source=readFileSync(resolve(dir,f),'utf8');return source.includes(marker)&&source.toLowerCase().includes('<!doctype html');});assert.ok(file,`${name} compiled route`);
 const text=readFileSync(resolve(dir,file),'utf8');assert.ok(!text.includes('createElement'),`${name} GET must not be wrapped as a React component`);
 const {GET}=await import(pathToFileURL(resolve(dir,file)).href);
 const response=GET(new Request('https://test/'+name,{headers:{'oai-authenticated-user-id':'test-owner'}}));
 assert.ok(response instanceof Response,`${name} compiled GET returns HTTP Response`);assert.equal(response.status,200);const html=await response.text();assert.ok(html.includes('<style id="dashboard-shell-styles">'));assert.ok(html.includes('--shell-bg:#0f172a'));assert.equal(GET(new Request('https://test/'+name)).status,401);
}
const root=files.find(f=>readFileSync(resolve(dir,f),'utf8').includes('<!doctype html>')&&readFileSync(resolve(dir,f),'utf8').includes('GEMOS_SERVER_AVAILABLE'));
assert.ok(root);assert.ok(!readFileSync(resolve(dir,root),'utf8').includes('createElement'),'root GET must not be wrapped as a React component');
console.log(JSON.stringify({passed:true,checks:['compiled checklist, commerce and automation handlers return real 200/401 Responses','built HTML contains shared dark shell styles','all four compiled page handlers lack CSS-triggered React wrapping']}));

const costs=files.find(f=>readFileSync(resolve(dir,f),'utf8').includes('Subscriptions are now in Finance.'));assert.ok(costs,'compiled Costs redirect');
const redirect=await import(pathToFileURL(resolve(dir,costs)).href);assert.equal(redirect.GET(new Request('https://test/costs')).status,401);const moved=redirect.GET(new Request('https://test/costs',{headers:{'oai-authenticated-user-id':'owner'}}));assert.equal(moved.status,303);assert.equal(moved.headers.get('location'),'/commerce');
console.log('Legacy Costs route redirects authenticated users to Finance.');

const scheduleScript=files.find(f=>{const s=readFileSync(resolve(dir,f),'utf8');return s.includes('Ready to check YouTube Studio.')&&!s.toLowerCase().includes('<!doctype html');});
assert.ok(scheduleScript,'compiled schedule UI script');
const scheduleUI=await import(pathToFileURL(resolve(dir,scheduleScript)).href);
assert.equal(scheduleUI.GET(new Request('https://test/schedule-buffer.js')).status,401);
const scheduleResponse=scheduleUI.GET(new Request('https://test/schedule-buffer.js',{headers:{'oai-authenticated-user-id':'owner'}}));
assert.equal(scheduleResponse.status,200);assert.ok((await scheduleResponse.text()).includes('/api/youtube/schedule'));
console.log('Compiled schedule script returns authenticated200/unauthenticated401 and uses fixed schedule API.');

const plannerPage=files.find(f=>readFileSync(resolve(dir,f),'utf8').includes('One release. Every platform. A clearer week.'));
assert.ok(plannerPage,'compiled Planner preview route');
const planner=await import(pathToFileURL(resolve(dir,plannerPage)).href);
assert.equal(planner.GET(new Request('https://test/planner')).status,401);
const plannerResponse=planner.GET(new Request('https://test/planner',{headers:{'oai-authenticated-user-id':'owner'}}));
assert.ok(plannerResponse instanceof Response);assert.equal(plannerResponse.status,200);
const plannerHTML=await plannerResponse.text();assert.ok(plannerHTML.includes('id="theme-toggle"'));assert.ok(plannerHTML.includes('Example content'));assert.ok(plannerHTML.includes('data-view="year"'));
console.log('Compiled standalone Planner returns authenticated200/unauthenticated401 with theme and calendar controls.');
