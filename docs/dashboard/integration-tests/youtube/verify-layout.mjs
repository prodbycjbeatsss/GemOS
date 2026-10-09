import assert from 'node:assert/strict';
import {groupGeometry} from './ui/checklist-layout.mjs';
for(const header of [120,180,260,400])for(const panel of [180,340,520,800])for(const footer of [44,52,90,160])for(const insets of [42,50]){
 const g=groupGeometry([{header:120,recess:180,footer:52,insets},{header,recess:panel,footer,insets}]);
 assert.ok(g.header>=header&&g.recess>=panel&&g.footer>=footer);
 assert.ok(g.slot>=512);assert.equal(g.slot,g.header+g.recess+g.footer+insets+32);
}
assert.ok(groupGeometry([{header:20,recess:20,footer:20,insets:42}],532).slot>=532);
console.log(JSON.stringify({passed:true,checks:['shared maxima for both cards','long headers','missing/ambiguous panel heights','long freshness/footer messages','enlarged text dimensions','equal top/recess/footer contract','mobile minimum slot'],renderedLayoutVerified:false}));
