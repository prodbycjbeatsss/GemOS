import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
const dir=resolve('dist/server/_next/static');
const files=readdirSync(dir).filter(f=>f.startsWith('route-')&&f.endsWith('.js'));
for(const [name,marker] of [['checklist','file-detail-content'],['commerce','sales-label'],['costs','Subscription Costs']]){
 const file=files.find(f=>{const source=readFileSync(resolve(dir,f),'utf8');return source.includes(marker)&&source.toLowerCase().includes('<!doctype html');});assert.ok(file,`${name} compiled route`);
 const text=readFileSync(resolve(dir,file),'utf8');assert.ok(!text.includes('createElement'),`${name} GET must not be wrapped as a React component`);
 const {GET}=await import(pathToFileURL(resolve(dir,file)).href);
 const response=GET(new Request('https://test/'+name,{headers:{'oai-authenticated-user-id':'test-owner'}}));
 assert.ok(response instanceof Response,`${name} compiled GET returns HTTP Response`);assert.equal(response.status,200);const html=await response.text();assert.ok(html.includes('<style id="dashboard-shell-styles">'));assert.ok(html.includes('--shell-bg:#0f172a'));assert.equal(GET(new Request('https://test/'+name)).status,401);
}
const root=files.find(f=>readFileSync(resolve(dir,f),'utf8').includes('<!doctype html>')&&readFileSync(resolve(dir,f),'utf8').includes('GEMOS_SERVER_AVAILABLE'));
assert.ok(root);assert.ok(!readFileSync(resolve(dir,root),'utf8').includes('createElement'),'root GET must not be wrapped as a React component');
console.log(JSON.stringify({passed:true,checks:['compiled checklist and commerce handlers return real 200/401 Responses','built HTML contains shared dark shell styles','all three compiled page handlers lack CSS-triggered React wrapping']}));
