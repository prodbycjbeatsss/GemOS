// Controlled state checks without a browser; this does not verify rendered geometry.
const vm = require('node:vm'), fs = require('node:fs'), assert = require('node:assert/strict');
class Element {
  constructor(id=''){this.id=id;this.dataset={};this.value='';this.children=[];this.attrs={};this.listeners={};this.disabled=false;this.checked=false;this.clientHeight=575;this.scrollHeight=0;this.classes=new Set();this.classList={toggle:(n,on)=>on?this.classes.add(n):this.classes.delete(n),add:n=>this.classes.add(n),remove:n=>this.classes.delete(n)};}
  addEventListener(n,fn){this.listeners[n]=fn;}
  setAttribute(n,v){this.attrs[n]=v;} getAttribute(n){return this.attrs[n];}
  replaceChildren(...items){this.children=items;if(this.id==='channel')this.value=items[0]?.value||'';}
  append(...items){this.children.push(...items);} focus(){this.focused=true;} showModal(){this.open=true;} close(){this.open=false;this.listeners.close?.();} querySelector(){return this.label||(this.label=new Element());}
  get selectedOptions(){return this.children.filter(o=>o.value===this.value);}
  async fire(n,event={}){return this.listeners[n]?.(event);}
}
(async()=>{
 const ids=['client-id','channel','connect','disconnect','sync','videos','confirm-shorts','end-date','origin','connection','feedback','included-status','included-videos','headline-views','growth','period','freshness','metrics','target-label','target-value','target-state','target-bar','target-note','open-analytics','close-details','details','details-content','sync-heading','sync-message','last-import','batch-name-input','batch-videos','batch-confirm','batch-import','batch-feedback','batch-card','batch-dates','batch-name','batch-summary','batch-list','batch-status-title','batch-status-message','batch-sync','batch-sync-status','batch-details','batch-dialog','batch-dialog-title','batch-dialog-content','batch-dialog-close'];
 const elements=Object.fromEntries(ids.map(id=>[id,new Element(id)])), cardSync=new Element(), footer=new Element(), dock=new Element();
 const ranges=[7,28,90,365].map(n=>{const e=new Element();e.dataset={range:String(n)};e.attrs['aria-checked']=String(n===28);return e;});
 const stages=[];Object.defineProperty(elements['sync-message'],'textContent',{set:v=>stages.push(v),get:()=>stages.at(-1)});
 const document={getElementById:id=>elements[id],createElement:()=>new Element(),querySelector:s=>s==='[data-sync-card]'?cardSync:s==='.sync-status'?footer:s==='.dock'?dock:s==='[data-range][aria-checked=true]'?ranges.find(e=>e.attrs['aria-checked']==='true'):null,querySelectorAll:s=>s==='.dock'?[dock]:ranges};
 const storage=new Map();const sessionStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)};
 const pending=[],requests=[];const fetch=async(url)=>{requests.push(new URL(url));return new Promise(resolve=>pending.push({url:new URL(url),resolve}));};
 const google={accounts:{oauth2:{initTokenClient:config=>({requestAccessToken:()=>config.callback({access_token:'FAKE',expires_in:3600})}),hasGrantedAllScopes:()=>true,revoke:()=>{}}}};
 const window={google,addEventListener:()=>{}}; const ctx={document,window,google,sessionStorage,fetch,URL,URLSearchParams,Option:class{constructor(textContent,value){this.textContent=textContent;this.value=value;}},Date,Intl,Number,JSON,Set,Promise,AbortSignal,setTimeout,clearTimeout,requestAnimationFrame:fn=>fn(),location:{origin:'https://test.invalid'}};
 vm.runInNewContext(fs.readFileSync('dist/app.js','utf8'),ctx);
 const tick=()=>new Promise(r=>setImmediate(r));
 const reply=async(body,status=200)=>{assert.ok(pending.length);pending.shift().resolve({ok:status===200,status,json:async()=>body});await tick();};
 elements['client-id'].value='fake.apps.googleusercontent.com';elements.connect.fire('click');await reply({items:[{id:'UC_TEST',snippet:{title:'Fake channel'}}]});
 elements.videos.value='abcdefghijk';elements['confirm-shorts'].checked=true;elements['end-date'].value='2026-10-06';
 const names=['views','averageViewPercentage','likes','subscribersGained','shares'];const totals={columnHeaders:names.map(name=>({name})),rows:[[100,42.5,-1,0,1]]};
 const runImport=async()=>{if(pending[0].url.pathname.endsWith('/videos')) await reply({items:[{id:'abcdefghijk',snippet:{channelId:'UC_TEST',title:'Example'}}]});assert.match(stages.at(-1),/latest available/);assert.equal(pending[0].url.searchParams.get('sort'),'-day');await reply({columnHeaders:[{name:'day'},...names.map(name=>({name}))],rows:[['2026-10-04',1,42.5,0,0,0]]});assert.match(stages.at(-1),/day totals/);await reply(totals);assert.match(stages.at(-1),/preceding period/);await reply(totals);};
 elements.sync.fire('click');assert.equal(cardSync.classes.has('is-syncing'),true);assert.equal(ranges.every(e=>e.disabled),true);assert.match(stages.at(-1),/belong to your channel/);await runImport();
 assert.equal(cardSync.classes.has('is-syncing'),false);assert.equal(cardSync.attrs['aria-busy'],'false');assert.equal(elements['sync-heading'].textContent,'Synced');assert.match(footer.textContent,/Synced/);assert.match(elements['last-import'].textContent,/Last import/);assert.equal(elements.metrics.children[0].children[1].textContent,'42.5%');
 const titleNode=elements['included-videos'].children[0],tileNode=elements.metrics.children[0];
 for(const n of [7,90,365]){
   const before=requests.length, oldViews=elements['headline-views'].textContent, oldPeriod=elements.period.textContent;
   ranges.find(e=>e.dataset.range===String(n)).fire('click');
   assert.equal(elements['headline-views'].textContent,oldViews);assert.equal(elements.period.textContent,oldPeriod);assert.equal(elements['included-videos'].children[0],titleNode);assert.equal(elements.metrics.children[0],tileNode);assert.equal(cardSync.classes.has('is-syncing'),true);assert.equal(elements['sync-heading'].textContent,'Updating');assert.match(stages.at(-1),/Showing .* days until/);
   await runImport(); assert.equal(requests.length-before,3,'range changes fetch only Analytics');assert.equal(requests.slice(before).every(u=>u.hostname==='youtubeanalytics.googleapis.com'),true);
   const start=new Date('2026-10-04T12:00:00Z');start.setUTCDate(start.getUTCDate()+1-n);assert.equal(elements.period.textContent,start.toISOString().slice(0,10)+' – 2026-10-04');assert.equal(elements['included-videos'].children[0],titleNode);assert.equal(elements.metrics.children[0],tileNode);
 }
 let before=requests.length; ranges[1].fire('click');await tick(); assert.equal(requests.length,before,'cached range must not fetch');assert.equal(elements['sync-heading'].textContent,'Saved range');assert.match(footer.textContent,/Cached/);assert.equal(cardSync.classes.has('is-syncing'),false);
 before=requests.length; elements.sync.fire('click');await runImport();assert.equal(requests.length-before,4,'manual Sync refreshes ownership and Analytics');
 // Sync invalidates other cached ranges: the formerly cached 90d is now fetched.
 ranges[2].fire('click');assert.equal(pending[0].url.hostname,'youtubeanalytics.googleapis.com');await runImport();
 elements.sync.fire('click');await reply({items:[{id:'abcdefghijk',snippet:{channelId:'UC_TEST',title:'Example'}}]});await reply({},403);assert.equal(elements['sync-heading'].textContent,'Sync failed');assert.equal(cardSync.classes.has('is-syncing'),false);assert.match(stages.at(-1),/previous import is still displayed/);
 ranges[1].fire('click');assert.equal(elements['headline-views'].textContent,'100 views');await reply({},403);assert.equal(elements['headline-views'].textContent,'100 views');assert.equal(cardSync.classes.has('is-syncing'),false);assert.match(stages.at(-1),/Showing 90 days/);
 // Back to the displayed range still fetches if fresh cache was invalidated by failed Sync.
 ranges[2].fire('click');await runImport();
 // Any edited selection invalidates metadata/results and clears the display.
 elements['end-date'].value='2026-10-07';await elements['end-date'].fire('change');assert.equal(elements['headline-views'].textContent,'— views');ranges[1].fire('click');assert.equal(pending.length,0);elements.sync.fire('click');assert.equal(pending[0].url.pathname.endsWith('/videos'),true);await runImport();
 // Release metadata is independent of the overview and never substitutes lifetime counts.
 const overviewPeriod=elements.period.textContent,overviewViews=elements['headline-views'].textContent;
 const releaseIds=['abcdefghijk','bcdefghijkl','cdefghijklm'];
 elements['batch-name-input'].value='Example release';elements['batch-videos'].value=releaseIds.join('\n');elements['batch-confirm'].checked=true;
 const metadata=(id,age,visibility='public')=>({id,snippet:{channelId:'UC_TEST',title:id==='abcdefghijk'?'<script>example</script>':'Example '+id,publishedAt:new Date(Date.now()-age).toISOString()},status:{privacyStatus:visibility},statistics:{viewCount:'99999'}});
 before=requests.length;elements['batch-import'].fire('click');assert.equal(elements['batch-sync'].classes.has('is-syncing'),true);assert.equal(elements.sync.disabled,true);
 assert.equal(pending[0].url.searchParams.get('part'),'snippet,status');
 await reply({items:[metadata(releaseIds[0],3*86400000),metadata(releaseIds[1],12*3600000),metadata(releaseIds[2],3*86400000,'private')]});
 assert.equal(requests.length-before,1);assert.equal(elements['batch-sync'].classes.has('is-syncing'),false);assert.equal(elements['batch-list'].children.length,3);assert.match(elements['batch-summary'].textContent,/3 Shorts.*none ranked/);
 const rows=elements['batch-list'].children;
 assert.equal(rows[0].children[1].children[0].textContent,'<script>example</script>');assert.equal(rows[0].children[1].children[1].textContent,'24-hour snapshot unavailable');assert.equal(rows[1].children[1].children[1].textContent,'Waiting for 24h');assert.equal(rows[2].children[1].children[1].textContent,'Publication not confirmed');
 assert.equal(elements.period.textContent,overviewPeriod);assert.equal(elements['headline-views'].textContent,overviewViews);
 document.activeElement=rows[0];await rows[0].fire('click');assert.equal(elements['batch-dialog'].open,true);assert.ok(elements['batch-dialog-content'].children.some(p=>p.textContent==='24-hour views: unavailable'));assert.equal(elements['batch-dialog-content'].children.some(p=>p.textContent?.includes('99999')),false);await elements['batch-dialog-close'].fire('click');assert.equal(rows[0].focused,true);
 elements['batch-sync'].fire('click');await reply({items:[{...metadata(releaseIds[0],1),snippet:{channelId:'OTHER'}}]});assert.equal(elements['batch-status-title'].textContent,'Import failed');assert.equal(elements['batch-list'].children[0],rows[0]);
 const six=[...releaseIds,'defghijklmn','efghijklmno','fghijklmnop'];elements['batch-videos'].value=six.join('\n');await elements['batch-videos'].fire('change');elements['batch-import'].fire('click');await reply({items:six.map((id,i)=>{const v=metadata(id,86400000);if(i===0)delete v.snippet.publishedAt;if(i===1)v.snippet.publishedAt='invalid';if(i===2)v.snippet.publishedAt=new Date(Date.now()+86400000).toISOString();return v;})});assert.equal(elements['batch-list'].children.length,6);for(let i=0;i<3;i++)assert.equal(elements['batch-list'].children[i].children[1].children[1].textContent,'Publication time unavailable');
 before=requests.length;elements['batch-videos'].value=[...six,'ghijklmnopq'].join('\n');await elements['batch-import'].fire('click');assert.equal(requests.length,before);assert.equal(elements['batch-status-title'].textContent,'Check your selection');
 elements['batch-videos'].value=releaseIds.join('\n');elements['batch-confirm'].checked=false;await elements['batch-import'].fire('click');assert.equal(requests.length,before);elements['batch-confirm'].checked=true;await elements['batch-videos'].fire('change');
 // Disconnect while a different range request is pending cannot restore stale results.
 ranges[2].fire('click');assert.equal(cardSync.classes.has('is-syncing'),true);await elements.disconnect.fire('click');await reply({},403);assert.equal(cardSync.classes.has('is-syncing'),false);assert.equal(elements['sync-heading'].textContent,'Not connected');
 const savedSelection=JSON.parse(storage.get('gemos-youtube-selection-v1')); assert.equal(savedSelection.videos,'abcdefghijk'); assert.equal(savedSelection.rangeDays,90); assert.equal(savedSelection.requestedEnd,'2026-10-07');
 elements.videos.value='';elements['confirm-shorts'].checked=false;elements['end-date'].value='';ranges.forEach(e=>e.attrs['aria-checked']=String(e.dataset.range==='28'));
 vm.runInNewContext(fs.readFileSync('dist/app.js','utf8'),ctx);await tick();
 assert.equal(elements.videos.value,'abcdefghijk');assert.equal(elements['confirm-shorts'].checked,true);assert.equal(elements['end-date'].value,'2026-10-07');assert.equal(ranges.find(e=>e.attrs['aria-checked']==='true').dataset.range,'90');assert.equal(pending.length,0,'restoring selection must not start consent/import');
 assert.equal(storage.has('gemos-youtube-session-v1'),false);assert.equal(elements['headline-views'].textContent,'— views');assert.equal(elements.metrics.children[0].children[0].textContent,'Average viewed');assert.equal(elements.metrics.children[0].children[0].attrs['aria-label'],'Average percentage viewed');
 const html=fs.readFileSync('dist/index.html','utf8');assert.ok(!html.includes('<select id="date-range"'));assert.match(html,/prefers-reduced-motion:reduce/);assert.match(html,/height:575px;min-height:0/);assert.match(html,/height:583px/);
 console.log(JSON.stringify({passed:true,checks:['four range pills','all query stages','spinner lifecycle','disabled ranges during sync','Google aggregate unchanged','completion timestamp','failure preserves same selection','uncached range preserves figures/titles until atomic success','cached range performs zero requests','range fetch skips verified metadata','manual Sync bypasses and invalidates cache','failure retains exact old period','selection invalidates cache','stable title/tile DOM nodes','disconnect cancels pending sync','reduced-motion rule present','canonical recess dimensions declared','tab selection restoration without OAuth or automatic requests','short metric label and full accessible definition','three and six release Shorts','one metadata request with shared connection','overview independent of release import','old/young/private/missing/invalid/future publication states','no lifetime-count backfill','ownership failure retains prior release','seven-link and unconfirmed selections rejected','literal titles and dialog focus return'],renderedLayoutVerified:false}));
})().catch(e=>{console.error(e);process.exit(1)});
