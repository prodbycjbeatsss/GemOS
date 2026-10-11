import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {salesReport,itemKey} from './server/payhip-report.mjs';
import {payhipHandler} from './server/payhip.mjs';
const db=new DatabaseSync(':memory:');db.exec(readFileSync('drizzle/0002_cheerful_psynapse.sql','utf8').replaceAll('--> statement-breakpoint',''));
db.exec(readFileSync('drizzle/0003_adorable_network.sql','utf8').replaceAll('--> statement-breakpoint',''));
class Statement{constructor(sql){this.sql=sql;this.values=[];}bind(...values){this.values=values;return this;}async first(){return db.prepare(this.sql).get(...this.values)??null;}async all(){return {results:db.prepare(this.sql).all(...this.values)};}async run(){return db.prepare(this.sql).run(...this.values);}}
const env={DB:{prepare:sql=>new Statement(sql),batch:async statements=>{db.exec('BEGIN');try{const results=[];for(const s of statements)results.push(await s.run());db.exec('COMMIT');return results;}catch(e){db.exec('ROLLBACK');throw e;}}},PAYHIP_TOKEN_KEY:'a'.repeat(64),PAYHIP_RELAY_SECRET:'test-relay',PAYHIP_RECEIVER_URL:'https://receiver.example',PAYHIP_RECEIVER_ENABLED:'false'};
const apiKey='test-payhip-secret';const base='https://dashboard.example';
async function request(method='GET',value,owner='owner-a',origin=base,action='settings',extra={}){return payhipHandler(new Request(base+'/api/payhip/'+action,{method,headers:{...(owner?{'oai-authenticated-user-id':owner}:{}),Origin:origin,'Content-Type':'application/json',...extra},body:value===undefined?undefined:typeof value==='string'?value:JSON.stringify(value)}),env,action);}
assert.equal((await request('GET',undefined,null)).status,401);
assert.equal((await request('POST',{apiKey},'owner-a','https://evil.example')).status,403);
assert.equal((await request('POST',{apiKey:'short'})).status,400);
assert.equal((await request('POST','{')).status,400);
assert.equal((await request('POST','x'.repeat(32769))).status,413);
let response=await request('POST',{apiKey});assert.equal(response.status,200);let settings=await response.json();assert.equal(settings.keySaved,true);assert.equal(settings.verifiedAt,null);assert.equal(settings.receiverEnabled,false);assert.ok(settings.webhookUrl.startsWith('https://receiver.example/webhook/'));
assert.equal(JSON.stringify(settings).includes(apiKey),false);assert.equal(JSON.stringify(db.prepare('SELECT * FROM payhip_settings').get()).includes(apiKey),false);
assert.equal((await (await request('GET',undefined,'owner-b')).json()).keySaved,false);
assert.equal((await request('POST',{monthlyTarget:0})).status,400);
assert.equal((await request('POST',{monthlyTarget:120})).status,200);settings=await (await request()).json();assert.equal(settings.monthlyTarget,120);assert.equal(settings.keySaved,true);
const signature=Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(apiKey))).toString('hex');const date=Math.floor(Date.now()/1000)-60;
const payload={id:'tx1',type:'paid',currency:'GBP',price:2000,date,signature,items:[{product_id:'123',quantity:'1'}],email:'should-not-store@example.com',ip_address:'should-not-store'};
const relayHeaders={'X-GemOS-Relay':env.PAYHIP_RELAY_SECRET,'X-GemOS-Connection':settings.webhookUrl.split('/').at(-1)};
const ingest=(p,extras=relayHeaders)=>request('POST',p,null,base,'ingest',extras);
assert.equal((await ingest(payload,{})).status,401);assert.equal((await ingest({...payload,signature:'b'.repeat(64)})).status,401);assert.equal((await ingest({...payload,price:-1})).status,422);
assert.equal((await ingest(payload)).status,200);assert.equal((await ingest(payload)).status,200);assert.equal(db.prepare('SELECT count(*) AS n FROM payhip_events').get().n,1);
assert.ok((await (await request()).json()).verifiedAt);assert.equal((await (await request('GET',undefined,'owner-b')).json()).verifiedAt,null);
const refund={...payload,type:'refunded',amount_refunded:500,date_refunded:date+20,date_created:date};assert.equal((await ingest(refund)).status,200);assert.equal((await ingest(refund)).status,200);assert.equal(db.prepare('SELECT count(*) AS n FROM payhip_events').get().n,2);
assert.equal((await ingest({...refund,amount_refunded:3000})).status,422);
assert.equal(JSON.stringify(db.prepare('SELECT * FROM payhip_events').all()).includes('should-not-store'),false);

// Real SQL endpoints: owner isolation, observed-option-only mappings and exclusions.
const variant={...payload,id:'variant-order',items:[{product_id:'123',quantity:'1',has_variant:true,variant_id:'standard-id',variant_name:'Standard Lease',product_name:'Gelato 41'}]};
assert.equal((await ingest(variant)).status,200);
const optionKey=itemKey({productId:'123',variantId:'standard-id'});
assert.equal((await request('POST',{optionKey,tier:'standard'},'owner-b',base,'mapping')).status,422);
assert.equal((await request('POST',{optionKey,tier:'standard'},'owner-a','https://evil.example','mapping')).status,403);
assert.equal((await request('POST',{optionKey,tier:'made-up'},'owner-a',base,'mapping')).status,400);
assert.equal((await request('POST',{optionKey,tier:'standard'},'owner-a',base,'mapping')).status,200);
const ukParts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',year:'numeric',month:'numeric'}).formatToParts(new Date());
const year=Number(ukParts.find(p=>p.type==='year').value),month=Number(ukParts.find(p=>p.type==='month').value);
const getReport=async(owner='owner-a')=>{const action='report';const req=new Request(base+'/api/payhip/report?year='+year+'&month='+month,{headers:{'oai-authenticated-user-id':owner}});return payhipHandler(req,env,action);};
let report=await (await getReport()).json();assert.equal(report.gross,4000);assert.equal(report.unallocated,2000);assert.equal(report.tiers.standard.revenue,2000);assert.equal(report.refunds,500);assert.equal(report.options[0].variantId,'standard-id');
assert.equal((await (await getReport('owner-b')).json()).gross,0);
assert.equal((await request('POST',{transactionId:'variant-order',excluded:true},'owner-b',base,'exclude')).status,400);
assert.equal((await request('POST',{transactionId:'variant-order',excluded:true},'owner-a',base,'exclude')).status,200);
report=await (await getReport()).json();assert.equal(report.gross,2000);assert.equal(report.excludedOrders,1);
await request('POST',{transactionId:'variant-order',excluded:false},'owner-a',base,'exclude');
// Accounting cases: UK DST boundary, free orders, mixed carts, retry enrichment,
// conflicting receipts, unmatched/multiple refunds and reported pence precision.
const receipt=(id,price,at,its,type='paid',refunded=0,currency='GBP')=>({transaction_id:id,type,price,currency,refunded,occurred_at:Date.parse(at),received_at:Date.parse(at)+1000,items_json:JSON.stringify(its)});
const item={productId:'123',quantity:1,hasVariant:true,variantId:'standard-id',variantName:'Standard Lease'};
const at='2026-09-30T23:30:00Z'; // October in Europe/London.
const events=[receipt('a',1999,at,[item]),receipt('free',0,at,[item]),receipt('mixed',5000,at,[item,{...item,variantId:'premium-id'}]),receipt('outside',2000,'2026-09-30T22:30:00Z',[item]),receipt('foreign',2000,at,[item],'paid',0,'USD'),receipt('bad',2000,at,[item]),receipt('bad',2500,at,[item]),receipt('refund-only',2000,at,[item],'refunded',1000),receipt('a',1999,at,[item],'refunded',500),receipt('partials',2000,at,[item]),receipt('partials',2000,at,[item],'refunded',500),receipt('partials',2000,'2026-10-02T10:00:00Z',[item],'refunded',1000)];
report=salesReport(events,[{option_key:optionKey,tier:'standard'}],[],2026,10,{verifiedAt:1});
assert.equal(report.gross,8999);assert.equal(report.tiers.standard.revenue,3999);assert.equal(report.unallocated,5000);assert.equal(report.freeOrders,1);assert.equal(report.refunds,500);assert.equal(report.refundAttention,2);assert.equal(report.attention,3);
assert.equal(report.gross,Object.values(report.tiers).reduce((n,t)=>n+t.revenue,0)+report.unallocated);
const safeItems=JSON.parse(db.prepare("SELECT items_json FROM payhip_events WHERE transaction_id='variant-order'").get().items_json);assert.equal(safeItems[0].variantName,'Standard Lease');
assert.equal(itemKey({productId:'123',hasVariant:true}),null);assert.equal(itemKey({productId:'123'}),null);
await request('POST',{apiKey:'replacement-secret'});assert.equal((await (await request()).json()).verifiedAt,null);assert.equal((await ingest(payload)).status,401);assert.equal((await (await request()).json()).monthlyTarget,120);
console.log(JSON.stringify({passed:true,checks:['real SQL persistence and owner isolation','no key/signature disclosure','same-origin and bounded JSON validation','saved is distinct from verified','signature and relay checks','duplicate paid/refund retries','minimal stored order fields','key replacement resets verification and retains target','observed variation mapping and owner isolation','test exclusions and pence reconciliation','UK DST periods, currencies, cart/conflict/refund boundaries'],livePayhipEventVerified:false}));
