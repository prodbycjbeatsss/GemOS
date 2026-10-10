import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {releaseTitle,displayTitle} from './ui/checklist-title.mjs';
import {groupGeometry} from './ui/checklist-layout.mjs';
class Element {
 constructor(){this.children=[];this.listeners={};this.dataset={};this.value='';this.textContent='';this.classList={add(){},remove(){}};this.style={setProperty(){},removeProperty(){}};this.attributes={};this.disabled=false;}
 addEventListener(type,fn){this.listeners[type]=fn;}
 setAttribute(k,v){this.attributes[k]=v;}
 append(...items){this.children.push(...items);}
 replaceChildren(...items){this.children=items;}
 focus(){this.focused=true;}
 showModal(){this.open=true;}
 close(){this.open=false;this.listeners.close?.();}
 querySelector(){return this.child;}
 querySelectorAll(){return [];}
 getBoundingClientRect(){return {height:100};}
}
const html=readFileSync('ui/checklist.html','utf8');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,'IDs stay unique');
const elements=Object.fromEntries(ids.map(id=>[id,new Element()]));
const roles=['project','stems','beatwav','mp3','remix','thumbnail','video','shorts'];
const rows=roles.map(role=>{const e=new Element();e.dataset.role=role;e.child=new Element();e.name=new Element();e.name.textContent=role;e.type=new Element();e.type.textContent='TYPE';e.querySelector=selector=>selector==='.asset-name'?e.name:selector==='.asset-type'?e.type:e.child;return e;});
const cards=[new Element(),new Element()];cards.forEach(card=>{card.child=new Element();card.child.nextElementSibling=new Element();});
const grid=new Element();grid.querySelectorAll=()=>cards;
const A='release_a_0001',B='release_b_0001';
const result=(id,title,ready)=>({folderId:id,projectName:'Artist - '+title,checkedAt:123,total:8,ready,assets:roles.map(role=>({role,state:ready===8?'Pass':'Missing',files:ready===8?[{name:role+' - '+title+(role==='remix'?'.wav':'.zip')},...(role==='shorts'?[{name:'Short 02.mp4'}]:[])]:[],count:ready===8?6:0}))});
const saved=new Map([[A,result(A,'Track A',8)]]);let selected=A,gate=null,failSelect=false;
const projects=[{id:A,name:'Artist - Track A',stage:'manual',metadata:{title:'Track A',credits:[]}},{id:B,name:'Artist - Track B',stage:'manual',metadata:{title:'Track B',credits:[]}}];
const status=()=>({driveGranted:true,projects,folders:{production:'',queue:'',released:''},folderId:selected,result:saved.get(selected)||null});
const apiCalls=[];
const fetch=async(url,options={})=>{
 const action=url.split('/').at(-1),body=options.body?JSON.parse(options.body):null;apiCalls.push(action);
 if(action==='drive-status')return Response.json(status());
 if(action==='drive-select'){
  if(gate)await gate;
  if(failSelect)return Response.json({error:'Selection failed'},{status:404});
  selected=body.folder;return Response.json(status());
 }
 if(action==='drive-scan'){selected=body.folder;const value=result(selected,'Track B',0);saved.set(selected,value);return Response.json(value);}
 throw Error('Unexpected action '+action);
};
const context={document:{getElementById:id=>elements[id],createElement:()=>new Element(),querySelector:()=>grid,querySelectorAll:selector=>selector==='[data-asset-index]'?rows:[],fonts:{ready:Promise.resolve()}},window:{addEventListener(){}},innerWidth:390,fetch,AbortSignal,URL,Response,Date,releaseTitle,displayTitle,groupGeometry,getComputedStyle:()=>({paddingTop:'20',paddingBottom:'20',borderTopWidth:'1',borderBottomWidth:'1'}),requestAnimationFrame:fn=>fn(),ResizeObserver:class{observe(){}},location:{assign(){}}};
vm.runInNewContext(readFileSync('ui/checklist.js','utf8').replace(/^import .*\n/gm,''),context);
const flush=()=>new Promise(resolve=>setImmediate(resolve));await flush();await flush();
assert.equal(elements['checklist-subtitle'].textContent,'8/8 ready');
assert.equal(elements['release-picker-name'].textContent,'Track A');
await elements['release-picker'].listeners.click();assert.equal(elements['release-picker-dialog'].open,true);
const choices=elements['release-picker-content'].children[0].children.slice(1);assert.equal(choices.length,2);assert.equal(choices[0].attributes['aria-pressed'],'true');
assert.equal(choices[0].children[0].children[0].textContent,'Track A');
await elements['release-picker-close'].listeners.click();assert.equal(elements['release-picker-dialog'].open,false);assert.equal(elements['release-picker'].focused,true);
await rows[0].listeners.click();assert.equal(elements['file-dialog'].open,true);assert.equal(elements['file-detail-content'].children[1].textContent,'project - Track A.zip');
await elements['file-close'].listeners.click();assert.equal(rows[0].focused,true);
await rows[7].listeners.click();assert.equal(elements['file-detail-content'].children.length,3,'Shorts shows all connected filenames');
let unblock;gate=new Promise(resolve=>unblock=resolve);elements['release-selector'].value=B;
const pending=elements['release-selector'].listeners.change();
assert.equal(elements['checklist-subtitle'].textContent,'Not checked');assert.equal(elements['file-dialog'].open,false);assert.equal(elements['release-picker'].disabled,true);assert.equal(elements['release-selector'].disabled,true);assert.ok(rows.every(row=>row.child.textContent==='-'));
unblock();await pending;gate=null;
assert.equal(elements['checklist-project-title'].textContent,'Track B');assert.equal(elements['checklist-subtitle'].textContent,'Not checked');assert.equal(elements['asset-sync'].disabled,false);
await rows[0].listeners.click();assert.equal(elements['file-detail-content'].children[1].textContent,'No file connected');assert.equal(elements['file-detail-content'].children[2].textContent,'Press Sync to check this release.');await elements['file-close'].listeners.click();
await elements['asset-details'].listeners.click();assert.equal(elements['asset-detail-content'].children[0].textContent,'Track B');assert.equal(elements['asset-detail-content'].children[1].children[0].textContent,'Not checked');elements['asset-dialog'].open=false;
await elements['asset-sync'].listeners.click();assert.equal(elements['checklist-subtitle'].textContent,'0/8 ready');
await rows[0].listeners.click();assert.equal(elements['file-detail-content'].children[0].textContent,'Missing');assert.equal(elements['file-detail-content'].children[1].textContent,'No file connected');await elements['file-close'].listeners.click();
const attention=saved.get(B).assets[0];attention.state='Needs confirmation';attention.candidates=[{name:'Ambiguous.zip'}];
elements['release-selector'].value=A;await elements['release-selector'].listeners.change();elements['release-selector'].value=B;await elements['release-selector'].listeners.change();
await rows[0].listeners.click();assert.equal(elements['file-detail-content'].children[0].textContent,'Needs attention');assert.equal(elements['file-detail-content'].children[1].textContent,'No file connected');assert.equal(elements['file-detail-content'].children[2].textContent,'Choose the correct file in Release details.');await elements['file-close'].listeners.click();
elements['release-selector'].value=A;await elements['release-selector'].listeners.change();assert.equal(elements['checklist-subtitle'].textContent,'8/8 ready');assert.equal(elements['drive-sync-status'].textContent,'Saved check · not refreshed');
failSelect=true;elements['release-selector'].value=B;await elements['release-selector'].listeners.change();assert.equal(elements['release-selector'].value,A);assert.equal(elements['checklist-subtitle'].textContent,'8/8 ready');assert.equal(elements['scan-message'].textContent,'Selection failed');
await elements['release-picker'].listeners.click();const lastChoice=elements['release-picker-content'].children[0].children[2];failSelect=false;await lastChoice.listeners.click();await flush();await flush();assert.equal(elements['release-picker-name'].textContent,'Track B');assert.equal(elements['release-picker-dialog'].open,false);
assert.ok(!html.includes('data-buffer-sample'));assert.ok(html.includes('No releases to show'));assert.ok(html.includes('Scheduling not connected'));assert.ok(!html.includes('Example: 3 Weeks Ahead'));
assert.equal((html.match(/class="asset-tile" aria-haspopup="dialog"/g)||[]).length,8,'all tiles are buttons');
assert.ok(!apiCalls.includes('release'),'checklist selection does not change leaderboard selection');
assert.ok(html.includes('.section-one-grid>#card-release-buffer{grid-column:1;grid-row:2}'));
assert.ok(html.includes('.section-one-grid>#card-prerelease-checklist{grid-column:2;grid-row:2}'));
console.log(JSON.stringify({passed:true,checks:['app picker selects and restores focus','tile connected filenames, multiple Shorts, missing, unchecked and attention','project switch closes old file popup','empty buffer without invented coverage','unique UI IDs','loading clears previous project readiness','serialized controls','new release is unchecked','independent cached scan restoration','failed selection restores prior project','no leaderboard requests','shared desktop card row retained'],renderedLayoutVerified:false}));
