import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const audience=readFileSync('ui/index.html','utf8'),finance=readFileSync('ui/commerce.html','utf8');
for(const page of [audience,finance]){const ids=[...page.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,'No duplicate moved IDs');}
assert.ok(audience.includes('id="email-label"'));assert.ok(audience.includes('id="email-setup"'));assert.ok(audience.includes('id="email-dialog"'));assert.ok(audience.includes('/email.js?v=audience-1'));assert.ok(!finance.includes('id="email-label"'));assert.ok(!finance.includes('id="email-setup"'));assert.ok(!finance.includes('/email.js?'));
assert.ok(finance.includes('id="cost-card"'));assert.ok(finance.includes('id="cost-dialog"'));assert.ok(finance.includes('id="sub-service"'));assert.ok(finance.includes('/costs.js?v=4-finance'));assert.ok(!audience.includes('id="cost-card"'));assert.equal((finance.match(/<article\b/g)||[]).length,4);assert.equal((audience.match(/<article\b/g)||[]).length,3);
assert.ok(audience.includes('.email-card{background:var(--g2-surface);height:var(--g2-card-height)'));assert.ok(audience.includes('--g2-card-height:920px'));assert.ok(finance.includes('--cost-gradient:var(--g3-gradient)'));assert.ok(finance.includes('--compact-height:var(--dashboard-card-compact)'));assert.ok(finance.includes('--dashboard-card-compact:454px'));assert.ok(!finance.includes('#1e3a8a'));
for(const path of ['index','commerce','checklist','automations']){const s=readFileSync('ui/'+path+'.html','utf8');const nav=s.match(/<nav class="group-navigation"[\s\S]*?<\/nav>/)[0];assert.equal((nav.match(/<a /g)||[]).length,4);assert.ok(nav.includes('Audience &amp; Performance'));assert.ok(nav.includes('Finance'));assert.ok(!nav.includes('href="/costs"'));assert.equal((nav.match(/aria-current="page"/g)||[]).length,1);}
for(const id of [...readFileSync('ui/email.js','utf8').matchAll(/\$\('([^']+)'\)/g)].map(m=>m[1]))assert.ok(audience.includes('id="'+id+'"'),'Moved email script ID '+id);
for(const id of [...readFileSync('ui/costs.js','utf8').matchAll(/\$\('([^']+)'\)/g)].map(m=>m[1]))assert.ok(finance.includes('id="'+id+'"'),'Moved costs script ID '+id);
assert.ok(existsSync('archives/2026-10-13/costs-before-regrouping.html'));assert.ok(!existsSync('ui/costs.html'));
console.log('Group migration: three audience/four finance cards, unique IDs, setup/dialog/script ownership, destination colours/sizes, preserved picker and four-link navigation passed.');

assert.ok(readFileSync('ui/app.js','utf8').includes("querySelectorAll('#card-monthly-shortform .dock,#batch-card .dock')"),'Analytics reflow stays scoped to its original two cards');
