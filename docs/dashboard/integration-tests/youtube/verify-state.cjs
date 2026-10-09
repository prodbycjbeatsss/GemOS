// Controlled state checks without a browser; this does not verify rendered geometry.
const vm = require('node:vm'), fs = require('node:fs'), assert = require('node:assert/strict');
class Element {
  constructor(id=''){this.id=id;this.value='';this.children=[];this.attrs={};this.listeners={};this.disabled=false;this.checked=false;this.clientHeight=575;this.scrollHeight=0;this.classes=new Set();this.classList={toggle:(n,on)=>on?this.classes.add(n):this.classes.delete(n),add:n=>this.classes.add(n),remove:n=>this.classes.delete(n)};}
  addEventListener(n,fn){this.listeners[n]=fn;}
  setAttribute(n,v){this.attrs[n]=v;} getAttribute(n){return this.attrs[n];}
  replaceChildren(...items){this.children=items;if(this.id==='channel')this.value=items[0]?.value||'';}
  append(...items){this.children.push(...items);} focus(){} querySelector(){return this.label||(this.label=new Element());}
  get selectedOptions(){return this.children.filter(o=>o.value===this.value);}
  async fire(n,event={}){return this.listeners[n]?.(event);}
}
(async()=>{
 const ids=['client-id','channel','connect','disconnect','sync','videos','confirm-shorts','end-date','origin','connection','feedback','included-status','included-videos','headline-views','growth','period','freshness','metrics','target-label','target-value','target-state','target-bar','target-note','open-analytics','close-details','details','details-content','sync-heading','sync-message','last-import'];
 const elements=Object.fromEntries(ids.map(id=>[id,new Element(id)])), cardSync=new Element(), footer=new Element(), dock=new Element();
 const ranges=[7,28,90,365].map(n=>{const e=new Element();e.dataset={range:String(n)};e.attrs['aria-checked']=String(n===28);return e;});
 const stages=[];Object.defineProperty(elements['sync-message'],'textContent',{set:v=>stages.push(v),get:()=>stages.at(-1)});
 const document={getElementById:id=>elements[id],createElement:()=>new Element(),querySelector:s=>s==='[data-sync-card]'?cardSync:s==='.sync-status'?footer:s==='.dock'?dock:s==='[data-range][aria-checked=true]'?ranges.find(e=>e.attrs['aria-checked']==='true'):null,querySelectorAll:()=>ranges};
 const storage=new Map();const sessionStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)};
 const pending=[];const fetch=async(url)=>new Promise(resolve=>pending.push({url:new URL(url),resolve}));
 const google={accounts:{oauth2:{initTokenClient:config=>({requestAccessToken:()=>config.callback({access_token:'FAKE',expires_in:3600})}),hasGrantedAllScopes:()=>true,revoke:()=>{}}}};
 const window={google,addEventListener:()=>{}}; const ctx={document,window,google,sessionStorage,fetch,URL,URLSearchParams,Option:class{constructor(textContent,value){this.textContent=textContent;this.value=value;}},Date,Number,JSON,Set,Promise,AbortSignal,setTimeout,clearTimeout,requestAnimationFrame:fn=>fn(),location:{origin:'https://test.invalid'}};
 vm.runInNewContext(fs.readFileSync('dist/app.js','utf8'),ctx);
 const tick=()=>new Promise(r=>setImmediate(r));
 const reply=async(body,status=200)=>{assert.ok(pending.length);pending.shift().resolve({ok:status===200,status,json:async()=>body});await tick();};
 elements['client-id'].value='fake.apps.googleusercontent.com';elements.connect.fire('click');await reply({items:[{id:'UC_TEST',snippet:{title:'Fake channel'}}]});
 elements.videos.value='abcdefghijk';elements['confirm-shorts'].checked=true;elements['end-date'].value='2026-10-06';
 const names=['views','averageViewPercentage','likes','subscribersGained','shares'];const totals={columnHeaders:names.map(name=>({name})),rows:[[100,42.5,-1,0,1]]};
 const runImport=async()=>{await reply({items:[{id:'abcdefghijk',snippet:{channelId:'UC_TEST',title:'Example'}}]});assert.match(stages.at(-1),/latest available/);assert.equal(pending[0].url.searchParams.get('sort'),'-day');await reply({columnHeaders:[{name:'day'},...names.map(name=>({name}))],rows:[['2026-10-04',1,42.5,0,0,0]]});assert.match(stages.at(-1),/day totals/);await reply(totals);assert.match(stages.at(-1),/preceding period/);await reply(totals);};
 elements.sync.fire('click');assert.equal(cardSync.classes.has('is-syncing'),true);assert.equal(ranges.every(e=>e.disabled),true);assert.match(stages.at(-1),/belong to your channel/);await runImport();
 assert.equal(cardSync.classes.has('is-syncing'),false);assert.equal(cardSync.attrs['aria-busy'],'false');assert.equal(elements['sync-heading'].textContent,'Synced');assert.match(footer.textContent,/Synced/);assert.match(elements['last-import'].textContent,/Last import/);assert.equal(elements.metrics.children[0].children[1].textContent,'42.5%');
 for(const n of [7,90,365,28]){ranges.find(e=>e.dataset.range===String(n)).fire('click');assert.equal(elements['headline-views'].textContent,'— views');assert.equal(cardSync.classes.has('is-syncing'),true);await runImport();const end='2026-10-04';const start=new Date(end+'T12:00:00Z');start.setUTCDate(start.getUTCDate()+1-n);assert.equal(elements.period.textContent,start.toISOString().slice(0,10)+' – '+end);}
 elements.sync.fire('click');await reply({items:[{id:'abcdefghijk',snippet:{channelId:'UC_TEST',title:'Example'}}]});await reply({},403);assert.equal(elements['sync-heading'].textContent,'Sync failed');assert.equal(cardSync.classes.has('is-syncing'),false);assert.match(stages.at(-1),/previous import is still displayed/);
 ranges[2].fire('click');await reply({items:[{id:'abcdefghijk',snippet:{channelId:'UC_TEST',title:'Example'}}]});await reply({},403);assert.equal(elements['headline-views'].textContent,'— views');assert.equal(cardSync.classes.has('is-syncing'),false);
 elements.sync.fire('click');assert.equal(cardSync.classes.has('is-syncing'),true);await elements.disconnect.fire('click');await reply({items:[]});assert.equal(cardSync.classes.has('is-syncing'),false);assert.equal(elements['sync-heading'].textContent,'Not connected');
 const savedSelection=JSON.parse(storage.get('gemos-youtube-selection-v1')); assert.equal(savedSelection.videos,'abcdefghijk'); assert.equal(savedSelection.rangeDays,90); assert.equal(savedSelection.requestedEnd,'2026-10-06');
 elements.videos.value='';elements['confirm-shorts'].checked=false;elements['end-date'].value='';ranges.forEach(e=>e.attrs['aria-checked']=String(e.dataset.range==='28'));
 vm.runInNewContext(fs.readFileSync('dist/app.js','utf8'),ctx);await tick();
 assert.equal(elements.videos.value,'abcdefghijk');assert.equal(elements['confirm-shorts'].checked,true);assert.equal(elements['end-date'].value,'2026-10-06');assert.equal(ranges.find(e=>e.attrs['aria-checked']==='true').dataset.range,'90');assert.equal(pending.length,0,'restoring selection must not start consent/import');
 assert.equal(storage.has('gemos-youtube-session-v1'),false);assert.equal(elements['headline-views'].textContent,'— views');assert.equal(elements.metrics.children[0].children[0].textContent,'Average viewed');assert.equal(elements.metrics.children[0].children[0].attrs['aria-label'],'Average percentage viewed');
 const html=fs.readFileSync('dist/index.html','utf8');assert.ok(!html.includes('<select id="date-range"'));assert.match(html,/prefers-reduced-motion:reduce/);assert.match(html,/height:575px;min-height:0/);assert.match(html,/height:583px/);
 console.log(JSON.stringify({passed:true,checks:['four range pills','all query stages','spinner lifecycle','disabled ranges during sync','Google aggregate unchanged','completion timestamp','failure preserves same selection','failed changed range clears old values','disconnect cancels pending sync','reduced-motion rule present','canonical recess dimensions declared','tab selection restoration without OAuth or automatic requests','short metric label and full accessible definition'],renderedLayoutVerified:false}));
})().catch(e=>{console.error(e);process.exit(1)});
