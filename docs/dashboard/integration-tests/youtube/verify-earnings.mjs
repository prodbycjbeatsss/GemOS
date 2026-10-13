import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {earningsHandler,periodRange,reportRows,summary} from './server/earnings.mjs';
import {seal,SCOPES,MONETARY_SCOPE,handle} from './server/youtube.mjs';
assert.deepEqual(periodRange('2024','2','2026-10-12'),{start:'2024-02-01',end:'2024-02-29'});
assert.deepEqual(periodRange('2026',null,'2026-10-12'),{start:'2026-01-01',end:'2026-10-12'});
assert.throws(()=>periodRange('2026','11','2026-10-12'));
assert.throws(()=>periodRange('2026','99','2026-10-12'));
assert.throws(()=>periodRange('2018','1','2026-10-12'));
const raw={columnHeaders:[{name:'estimatedRevenue'},{name:'creatorContentType'},{name:'day'}],rows:[[4,'VIDEO_ON_DEMAND','2026-09-01'],[1,'SHORTS','2026-09-01'],[2,'LIVE_STREAM','2026-09-02']]};
assert.deepEqual(summary(reportRows(raw,['day','creatorContentType','estimatedRevenue'])),{total:7,days:[{date:'2026-09-01',amount:5},{date:'2026-09-02',amount:2}],reportedThrough:'2026-09-02'});
assert.equal(summary([]).total,null);
assert.equal(summary(reportRows({...raw,rows:[[0,'SHORTS','2026-09-01']]},['day','creatorContentType','estimatedRevenue'])).total,0);
assert.throws(()=>reportRows({...raw,rows:[['NaN','SHORTS','2026-09-01']]},['estimatedRevenue']));
assert.deepEqual(reportRows({columnHeaders:raw.columnHeaders},['estimatedRevenue']),[]);
const sql=new DatabaseSync(':memory:');sql.exec(readFileSync('drizzle/0000_yummy_tusk.sql','utf8'));
const DB={prepare(q){let values=[];const x={bind(...v){values=v;return x;},async first(){return sql.prepare(q).get(...values)||null;},async run(){return {meta:{changes:Number(sql.prepare(q).run(...values).changes)}};}};return x;},async batch(ss){return Promise.all(ss.map(s=>s.run()));}};
const origin='https://gemos-youtube-import-test.prodbycjbeatsss.chatgpt.site',env={DB,GOOGLE_CLIENT_ID:'fake.apps.googleusercontent.com',GOOGLE_CLIENT_SECRET:'FAKE',GOOGLE_REDIRECT_URI:origin+'/api/youtube/callback',YOUTUBE_TOKEN_KEY:'ab'.repeat(32)};
const req=(path,owner='owner')=>new Request(origin+path,{headers:owner?{'oai-authenticated-user-id':owner}:{}});
assert.equal((await earningsHandler(req('/api/earnings/report?year=2026',null),env)).status,401);
const access=await seal('FAKE_ACCESS',env,'owner'),refresh=await seal('FAKE_REFRESH',env,'owner');
sql.prepare('INSERT INTO youtube_connections VALUES(?,?,?,?,?,?,?,?,?)').run('owner',env.GOOGLE_CLIENT_ID,refresh,access,Date.now()+3600000,SCOPES.join(' '),JSON.stringify([{id:'UC_TEST',title:'Test channel'}]),Date.now(),'rev');
assert.equal((await earningsHandler(req('/api/earnings/report?year=2026&channel=UC_TEST'),env)).status,403);
sql.prepare('UPDATE youtube_connections SET scopes=?').run([...SCOPES,MONETARY_SCOPE,'https://www.googleapis.com/auth/drive.metadata'].join(' '));
const replies=[],calls=[];globalThis.fetch=async(url)=>{calls.push(new URL(url));assert.ok(replies.length,'Unexpected Google call');const d=replies.shift();return Response.json(d.body,{status:d.status||200});};
assert.equal((await earningsHandler(req('/api/earnings/report?year=2026&channel=UC_OTHER'),env)).status,403);
assert.equal(calls.length,0);
replies.push({body:raw});const report=await earningsHandler(req('/api/earnings/report?year=2026&month=9&channel=UC_TEST'),env);assert.equal(report.status,200);assert.equal((await report.json()).total,7);assert.equal(calls[0].searchParams.get('currency'),'GBP');assert.equal(calls[0].searchParams.get('dimensions'),'day');assert.equal(report.headers.get('cache-control'),'no-store');
replies.push({body:{error:{message:'PRIVATE PROVIDER DETAIL'}},status:403});const denied=await earningsHandler(req('/api/earnings/report?year=2026&channel=UC_TEST'),env);assert.equal(denied.status,403);assert.ok(!(await denied.text()).includes('PRIVATE'));
replies.push({body:{columnHeaders:[{name:'video'},{name:'creatorContentType'},{name:'estimatedRevenue'},{name:'views'}],rows:[['abcdefghijk','SHORTS',2,1234]]}},{body:{items:[{id:'abcdefghijk',snippet:{title:'Actual upload'}}]}});const videos=await earningsHandler(req('/api/earnings/videos?year=2026&channel=UC_TEST'),env);assert.equal(videos.status,200);assert.equal((await videos.json()).videos[0].title,'Actual upload');assert.equal(calls.at(-2).searchParams.get('dimensions'),'video','Revenue ranking uses one video dimension');
const start=await handle(new Request(origin+'/api/youtube/start-earnings',{method:'POST',headers:{'oai-authenticated-user-id':'owner',Origin:origin}}),env,'start-earnings');assert.equal(start.status,200);const auth=new URL((await start.json()).url);assert.ok(auth.searchParams.get('scope').split(' ').includes(MONETARY_SCOPE));assert.ok(auth.searchParams.get('scope').includes('drive.metadata'));assert.ok(start.headers.getSetCookie().some(s=>s.startsWith('__Host-gemos-earnings-return=')));
const state=auth.searchParams.get('state'),cookies=start.headers.getSetCookie().map(s=>s.split(';')[0]).join('; ');
replies.push({body:{access_token:'FAKE_ACCESS',refresh_token:'FAKE_REFRESH',expires_in:3600,scope:auth.searchParams.get('scope')}},{body:{items:[{id:'UC_TEST',snippet:{title:'Test channel'}}]}});
const callback=await handle(new Request(origin+'/api/youtube/callback?code=FAKE_CODE&state='+state,{headers:{'oai-authenticated-user-id':'owner',Cookie:cookies}}),env,'callback');assert.equal(callback.status,303);assert.equal(callback.headers.get('location'),'/commerce?earnings=connected');
const again=await handle(new Request(origin+'/api/youtube/start',{method:'POST',headers:{'oai-authenticated-user-id':'owner',Origin:origin}}),env,'start');assert.ok(new URL((await again.json()).url).searchParams.get('scope').includes(MONETARY_SCOPE));
assert.equal(replies.length,0);
console.log('Earnings periods, truthful missing/zero, categories/reconciliation, private ownership, safe failures, video titles, revenue scope preservation and callback passed.');
// Controlled UI: real script, provider responses, period races and literal titles.
const {runInNewContext}=await import('node:vm');
class Element{constructor(){this.textContent='';this.value='';this.children=[];this.dataset={};this.style={};this.listeners={};this.hidden=false;this.disabled=false;this.classList={add(){},remove(){}};}querySelectorAll(){return this.children.filter(n=>n.tag==='button');}append(...n){this.children.push(...n);if(this.tag==='select'&&!this.value&&n[0])this.value=n[0].value;}replaceChildren(...n){this.children=n;}setAttribute(k,v){this[k]=v;}addEventListener(k,f){this.listeners[k]=f;}showModal(){this.open=true;}close(){this.open=false;this.listeners.close?.();}focus(){this.focused=true;}}
const html=readFileSync('ui/commerce.html','utf8'),elements=new Map([...html.matchAll(/id="(earnings-[^"]+)"/g)].map(m=>[m[1],new Element()]));elements.get('earnings-channel').tag='select';
const responses=[];
let resolveOld;
const sample={total:7,days:[{date:'2026-09-01',amount:7}],reportedThrough:'2026-09-01',coverage:'Estimated',refreshedAt:new Date().toISOString(),channelTitle:'Test'};
let count=0;
const browserFetch=async(url)=>{responses.push(String(url));if(url==='/api/youtube/status')return Response.json({connected:true,earningsGranted:true,channels:[{id:'UC_TEST',title:'Test'}]});if(String(url).includes('/videos?'))return Response.json({videos:[{id:'abcdefghijk',type:'SHORTS',title:'<img src=x onerror=bad>',amount:2,views:1234},{id:'secondvid01',title:'Second',amount:1,views:55},{id:'thirdvideo1',title:'Third',amount:0.5,views:22},{id:'fourthvid01',title:'Fourth',amount:0.25,views:11},{id:'zeroearn001',title:'No revenue',amount:0,views:999}],nextOffset:null});count++;if(count===2)return new Promise(resolve=>{resolveOld=()=>resolve(Response.json({...sample,total:999}));});return Response.json(sample);};
runInNewContext(readFileSync('ui/earnings.js','utf8'),{document:{getElementById:id=>elements.get(id),createElement:tag=>{const n=new Element();n.tag=tag;return n;}},fetch:browserFetch,AbortSignal,URL,URLSearchParams,Intl,Date,location:{assign(){}}});
const tick=()=>new Promise(r=>setTimeout(r,0));await tick();await tick();
assert.equal(elements.get('earnings-total').textContent,'£7.00');assert.equal(elements.get('earnings-top-videos').children[0].children[0].children[0].textContent,'1. <img src=x onerror=bad>');assert.equal(elements.get('earnings-breakdown').hidden,false);
elements.get('earnings-sync').listeners.click();await tick();assert.equal(elements.get('earnings-total').textContent,'—');elements.get('earnings-prev').listeners.click();await tick();await tick();assert.equal(elements.get('earnings-total').textContent,'£7.00');resolveOld();await tick();assert.equal(elements.get('earnings-total').textContent,'£7.00','Old period cannot overwrite current figures');
elements.get('earnings-details').listeners.click();assert.equal(elements.get('earnings-dialog').open,true);assert.equal(elements.get('earnings-dialog-title').focused,true);elements.get('earnings-close').listeners.click();assert.equal(elements.get('earnings-details').focused,true);
console.log('Earnings UI loads real fixtures, clears stale amounts, rejects old-period responses, renders titles literally and restores dialog focus.');

assert.ok(!html.includes('id="earnings-long"'),'Content classification rows removed');
assert.match(html,/--dashboard-card-compact:454px;--dashboard-card-large:920px/);assert.match(html,/row-gap:12px;column-gap:20px/);assert.match(html,/earnings-dock\{min-height:0;display:block\}/);

const eleven=Array.from({length:11},(_,i)=>['v'+String(i).padStart(10,'0'),11-i,100+i]);replies.push({body:{columnHeaders:[{name:'video'},{name:'estimatedRevenue'},{name:'views'}],rows:eleven}},{body:{items:eleven.slice(0,10).map(([id])=>({id,snippet:{title:id}}))}});
const paginated=await earningsHandler(req('/api/earnings/videos?year=2026&channel=UC_TEST&offset=0'),env);const ten=await paginated.json();assert.equal(ten.videos.length,10);assert.equal(ten.nextOffset,10);assert.equal(ten.page,1);assert.equal(calls.at(-2).searchParams.get('maxResults'),'11');assert.equal(replies.length,0);
console.log('Actual handler returns period views/revenue and paginates ten rows with one-row lookahead.');

assert.equal(ten.videos[0].views,100);assert.equal(calls.at(-2).searchParams.get('metrics'),'estimatedRevenue,views');
assert.equal(elements.get('earnings-top-videos').children[0].children[0].children[1].textContent,'1,234 views');
assert.throws(()=>reportRows({columnHeaders:[{name:'views'}],rows:[[-1]]},['views']));
assert.throws(()=>reportRows({columnHeaders:[{name:'views'}],rows:[['123']]},['views']));
console.log('Top list renders exact views and literal titles; negative/string views rejected.');

assert.equal(elements.get('earnings-top-videos').children.length,3,'Only three positive earners appear in the card');assert.equal(elements.get('earnings-top-videos').children[2].children[1].textContent,'£0.50');
