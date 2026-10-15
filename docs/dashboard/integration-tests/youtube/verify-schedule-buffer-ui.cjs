const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
class Element {
  constructor(tag = 'div') { this.tagName = tag; this.children = []; this.listeners = {}; this.value = ''; this.attributes = {}; this.hidden = false; this.open = false; }
  set textContent(v) { this.children = [String(v)]; } get textContent() { return this.children.map(c => typeof c === 'string' ? c : c.textContent).join(''); }
  append(...v) { this.children.push(...v); } replaceChildren(...v) { this.children = v; } setAttribute(k, v) { this.attributes[k] = v; }
  addEventListener(k, fn) { this.listeners[k] = fn; } focus() { this.focused = true; } showModal() { this.open = true; } close() { this.open = false; this.listeners.close?.(); }
}
(async () => {
  const ids = ['buffer-status','buffer-channel','buffer-channel-choice','buffer-sync','pipeline-projects-dock','buffer-metric-val','buffer-subtitle','buffer-preview-dialog','buffer-preview-title','buffer-detail-content','buffer-preview-details','buffer-preview-close'];
  const elements = Object.fromEntries(ids.map(id => [id, new Element()])), pending = [], sent = [], events = {};
  const context = { document: { hidden: false, getElementById: id => elements[id], createElement: tag => new Element(tag), addEventListener: (name, fn) => events[name] = fn }, window: { addEventListener: (name, fn) => events[name] = fn }, Date, String, AbortSignal, encodeURIComponent, fetch: (url, options) => { sent.push({url, options}); return new Promise(resolve => pending.push(resolve)); } };
  vm.runInNewContext(fs.readFileSync('ui/schedule-buffer.js', 'utf8'), context);
  const tick = async () => { for (let i = 0; i < 5; i++) await new Promise(resolve => setImmediate(resolve)); };
  const reply = async (data, status = 200) => { assert.ok(pending.length); pending.shift()({ ok: status < 400, json: async () => data }); await tick(); };
  const channels = [{ id: 'UC_TEST', title: 'Example' }];
  await reply({ channels, channel: 'UC_TEST', report: null }); assert.equal(elements['buffer-sync'].disabled, false); assert.equal(elements['buffer-metric-val'].textContent, 'No schedule checked');
  const click = elements['buffer-sync'].listeners.click(); assert.equal(elements['buffer-sync'].disabled, true); elements['buffer-sync'].listeners.click(); assert.equal(pending.length, 1, 'duplicate source click guarded'); assert.equal(JSON.parse(sent.at(-1).options.body).channel, 'UC_TEST');
  const report = { start:'2026-10-19',end:'2027-01-10',coveredWeeks:0,coveredThrough:null,firstGap:'2026-10-19',horizonComplete:false,partial:false,fetchedAt:'2026-10-15T14:00:00Z',channelId:'UC_TEST',weeks:[{start:'2026-10-19',end:'2026-10-25',ready:1,complete:false,days:Array.from({length:7},(_,i)=>({date:'2026-10-'+(19+i),required:i===0?'main':'short',complete:i===0,videos:i===0?[{id:'abcdefghijk',title:'<script>literal</script>',publishAt:'2026-10-19T17:00:00Z',kind:'main',processing:'succeeded'}]:[]}))}] };
  await reply(report); await click; assert.equal(elements['buffer-sync'].disabled, false); assert.equal(elements['buffer-metric-val'].textContent, 'No complete weeks'); assert.match(elements['pipeline-projects-dock'].textContent, /1\/7/);
  elements['buffer-preview-details'].listeners.click({currentTarget:elements['buffer-preview-details']}); assert.equal(elements['buffer-preview-dialog'].open, true); assert.equal(elements['buffer-preview-title'].focused, true); assert.match(elements['buffer-detail-content'].textContent, /<script>literal<\/script>/); assert.match(elements['buffer-detail-content'].textContent, /Not scheduled/); const section = elements['buffer-detail-content'].children.find(c=>c.tagName==='details'); assert.equal(section.open, true);
  const link = section.children.flatMap(c=>c.children||[]).find(c=>c.tagName==='a'); assert.equal(link.href,'https://www.youtube.com/watch?v=abcdefghijk'); assert.equal(link.rel,'noopener noreferrer');
  elements['buffer-preview-close'].listeners.click(); assert.equal(elements['buffer-preview-details'].focused, true);
  const retry=elements['buffer-sync'].listeners.click(); await reply({error:'Provider unavailable'},502); await retry; assert.match(elements['buffer-status'].textContent,/Saved schedule retained/); assert.match(elements['pipeline-projects-dock'].textContent,/1\/7/);
  events.focus(); await reply({channels:[],channel:null,report:null}); assert.equal(elements['buffer-sync'].disabled,true); assert.equal(elements['buffer-metric-val'].textContent,'Connect YouTube'); assert.ok(!elements['pipeline-projects-dock'].textContent.includes('1/7'),'disconnect clears cached screen');
  const html=fs.readFileSync('ui/checklist.html','utf8'); assert.match(html,/schedule-buffer.js/); assert.match(html,/id="buffer-sync"/); assert.equal(new Set([...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1])).size,[...html.matchAll(/id="([^"]+)"/g)].length,'no duplicate IDs');
  console.log('Release Buffer UI passed: saved/empty/unconnected states, duplicate-click guard, real channel request, seven-day gaps/details, literal titles, safe links, failure retention, disconnect clearing and dialog focus return. Rendered layout not verified.');
})().catch(e => { console.error(e); process.exitCode = 1; });
