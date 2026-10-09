const { chromium } = require('playwright');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const assert = require('node:assert/strict');
(async () => {
  const root = path.join(__dirname, 'dist');
  const server = http.createServer((req, res) => { const file = path.join(root, req.url === '/' ? 'index.html' : req.url.slice(1)); if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); } res.setHeader('Content-Type', file.endsWith('.js') ? 'text/javascript' : 'text/html'); res.end(fs.readFileSync(file)); });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch({ ...(process.env.GEMOS_CHROMIUM_PATH ? { executablePath: process.env.GEMOS_CHROMIUM_PATH } : {}), args: ['--no-sandbox', '--no-zygote', '--disable-dev-shm-usage'] });
  const page = await browser.newPage(); const errors = []; page.on('pageerror', error => errors.push(error.message));
  let mode = 'ok'; const queries = [];
  await page.addInitScript(() => { window.testTools = {}; Object.defineProperty(document, 'modelContext', { value: { registerTool(tool) { window.testTools[tool.name] = tool; } } }); });
  await page.route('https://accounts.google.com/gsi/client', route => route.fulfill({ contentType: 'text/javascript', body: `window.google={accounts:{oauth2:{initTokenClient(config){return {requestAccessToken(){window.testAuth=config;config.callback({access_token:'FAKE_TEST_TOKEN',expires_in:3600,scope:config.scope})}}},hasGrantedAllScopes(){return true},revoke(token,cb){cb()}}}};` }));
  await page.route('https://fonts.googleapis.com/**', route => route.abort());
  await page.route('https://www.googleapis.com/youtube/v3/**', route => {
    const u = new URL(route.request().url());
    const items = u.pathname.endsWith('channels') ? [{ id: 'UC_TEST', snippet: { title: 'Test channel' } }] : u.searchParams.get('id').split(',').map((id, i) => ({ id, snippet: { channelId: mode === 'owner' ? 'OTHER' : 'UC_TEST', title: i === 0 ? '<img src=x onerror=alert(1)> test title' : 'Long example Short title '.repeat(12) } }));
    return route.fulfill({ json: { items } });
  });
  await page.route('https://youtubeanalytics.googleapis.com/**', route => {
    const u = new URL(route.request().url()); queries.push(Object.fromEntries(u.searchParams));
    if (mode === '403' || mode === '401') return route.fulfill({ status: Number(mode), json: { error: { message: 'external error' } } });
    const names = ['views', 'averageViewPercentage', 'likes', 'subscribersGained', 'shares'];
    const daily = u.searchParams.get('dimensions') === 'day';
    let values = [1250, 64.3, 80, 7, 14];
    if (mode === 'nullable') values = [1250, null, -1, 7, 14];
    if (mode === 'strings') values = ['1250', '64.3', '80', '7', '14'];
    if (mode === 'fractional') values = [1250, 64.3, 0.5, 7, 14];
    if (mode === 'signed') values = [1250, 64.3, '-2', 7, 14];
    let rows = [values];
    if (daily) {
      const last = mode === 'leap' ? '2024-03-01' : '2026-10-04';
      // Model Google's sorting and row limit across a fully populated long window.
      rows = [];
      for (let d = new Date(u.searchParams.get('startDate') + 'T12:00:00Z'); d.toISOString().slice(0,10) <= last; d.setUTCDate(d.getUTCDate()+1)) rows.push([d.toISOString().slice(0,10),10,64.3,2,1,1]);
      if (u.searchParams.get('sort') === '-day') rows.reverse();
      rows = rows.slice(0, Number(u.searchParams.get('maxResults')));
    }
    return route.fulfill({ json: { columnHeaders: [...(daily ? ['day'] : []), ...names].map(name => ({ name })), rows: mode === 'empty' ? [] : rows } });
  });
  const url = `http://127.0.0.1:${server.address().port}`;
  await page.goto(url);
  assert.equal(await page.locator('#headline-views').textContent(), '— views');
  await page.locator('#connect').click(); assert.match(await page.locator('#connection').textContent(), /public/);
  await page.locator('#client-id').fill('123-test.apps.googleusercontent.com');
  await page.locator('#connect').click(); await page.waitForFunction(() => document.querySelector('#channel').value === 'UC_TEST');
  await page.locator('#sync').click(); assert.match(await page.locator('#feedback').textContent(), /1–5/);
  await page.locator('#videos').fill('https://www.youtube.com/shorts/abcdefghijk');
  await page.locator('#end-date').fill('2026-10-06');
  await page.locator('#sync').click(); assert.match(await page.locator('#feedback').textContent(), /tick/);
  await page.locator('#confirm-shorts').check(); await page.locator('#sync').click();
  await page.waitForFunction(() => document.querySelector('#feedback').textContent.startsWith('Imported'));
  assert.equal(await page.locator('#headline-views').textContent(), '1,250 views');
  assert.equal(await page.locator('#included-videos li').count(), 1); assert.match(await page.locator('#included-videos').textContent(), /<img src=x/); assert.equal(await page.locator('#included-videos img').count(), 0);
  assert.equal(await page.locator('.tile-value').allTextContents().then(v => v.join(',')), '64.3%,80,7,14');
  assert.equal(queries[1].startDate, '2026-09-07'); assert.equal(queries[1].endDate, '2026-10-04'); assert.equal(queries[2].startDate, '2026-08-10'); assert.equal(queries[2].endDate, '2026-09-06'); assert.equal(queries[1].filters, 'video==abcdefghijk');
  assert.equal(await page.locator('#growth').isVisible(), false); assert.equal(await page.locator('#target-bar').isVisible(), false);
  await page.setViewportSize({ width: 390, height: 1000 }); await page.screenshot({ path: path.join(__dirname, 'mobile-test.png'), fullPage: true });
  assert.equal(await page.locator('[data-range][aria-checked=true]').getAttribute('data-range'), '28');
  const shiftDay = (day, n) => { const d = new Date(day+'T12:00:00Z'); d.setUTCDate(d.getUTCDate()+n); return d.toISOString().slice(0,10); };
  for (const n of [7,90,365,28]) {
    const before = queries.length;
    await page.locator('[data-range="'+n+'"]').click();
    await page.waitForFunction(() => document.querySelector('#feedback').textContent.startsWith('Imported selected'));
    const q = queries.slice(before); assert.equal(q.length,3);
    assert.equal(q[0].sort,'-day'); assert.equal(q[0].maxResults,'1');
    assert.equal(q[0].startDate,shiftDay('2026-10-06',-Math.max(83,n-1)));
    assert.equal(q[1].startDate,shiftDay('2026-10-04',1-n)); assert.equal(q[1].endDate,'2026-10-04');
    assert.equal(q[2].startDate,shiftDay('2026-10-04',1-2*n)); assert.equal(q[2].endDate,shiftDay('2026-10-04',-n));
    assert.equal(await page.locator('#period').textContent(), q[1].startDate+' – '+q[1].endDate);
    assert.equal(await page.locator('.tile-value').first().textContent(),'64.3%');
    await page.locator('#open-analytics').click(); const report = await page.locator('#details-content pre').textContent(); assert.equal(JSON.parse(report).rangeDays,n); await page.keyboard.press('Escape');
  }
  mode = 'leap'; await page.locator('#end-date').fill('2024-03-02'); await page.locator('#end-date').blur(); await page.locator('[data-range="365"]').click();
  await page.locator('#sync').click(); await page.waitForFunction(() => document.querySelector('#feedback').textContent.startsWith('Imported selected'));
  assert.equal(await page.locator('#period').textContent(),'2023-03-03 – 2024-03-01');
  assert.equal(queries.at(-1).startDate,'2022-03-03'); assert.equal(queries.at(-1).endDate,'2023-03-02');
  mode = '403'; await page.locator('[data-range="90"]').click(); await page.waitForFunction(() => document.querySelector('#feedback').textContent.includes('Access denied'));
  assert.equal(await page.locator('#headline-views').textContent(),'— views'); assert.equal(await page.locator('#included-videos li').count(),0); assert.equal(await page.locator('#period').textContent(),'Not imported');
  mode = 'ok'; await page.locator('[data-range="28"]').click(); await page.locator('#end-date').fill('2026-10-06'); await page.locator('#sync').click(); await page.waitForFunction(() => document.querySelector('#feedback').textContent.startsWith('Imported selected'));
  for (const width of [320,390,840,1280]) {
    await page.setViewportSize({width,height:1000});
    const pills = await page.locator('.platforms').boundingBox(), range = await page.locator('.range-control').boundingBox(), tiles = await page.locator('#metrics').boundingBox();
    assert.ok(range.y >= pills.y+pills.height, 'range below platforms'); assert.ok(tiles.y >= range.y+range.height+3, 'tiles below range');
    const control = await page.locator('[data-range="28"]').boundingBox(); assert.ok(control.height >=44);
    const dock = await page.locator('.dock').boundingBox(); assert.equal(dock.height,width>=640?583:575,'matched recess height');
    const cardHeight = (await page.locator('.card').boundingBox()).height;
    await page.locator('[data-range="365"]').click(); await page.waitForFunction(() => document.querySelector('#feedback').textContent.startsWith('Imported selected'));
    assert.equal((await page.locator('.card').boundingBox()).height,cardHeight,'stable card size');
    await page.locator('[data-range="28"]').click(); await page.waitForFunction(() => document.querySelector('#feedback').textContent.startsWith('Imported selected'));
  }
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.locator('#open-analytics').click(); assert.equal(await page.locator('#details-content img').count(), 0); assert.match(await page.locator('#details-content').textContent(), /America\/Los_Angeles/); await page.keyboard.press('Escape'); assert.equal(await page.evaluate(() => document.activeElement.id), 'open-analytics');
  const state = await page.evaluate(() => window.testTools.read_import_status.execute({})); assert.equal(state.imported, true);
  const invalid = await page.evaluate(async () => { try { await window.testTools.read_import_status.execute({ token: true }); return false; } catch { return true; } }); assert.equal(invalid, true);
  for (const width of [320, 390, 840, 1280]) { await page.setViewportSize({ width, height: 1000 }); assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'overflow at ' + width); }
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.addStyleTag({ content: 'html{font-size:32px} .setup p,.setup label,.setup button,.setup input,.setup select,.setup textarea{font-size:32px}.tile-label,.tile-value,.tile-note,.target-note,.scope,.freshness{font-size:24px!important}' }); assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'enlarged overflow');
  mode = 'nullable'; await page.locator('#sync').click(); await page.waitForFunction(() => document.querySelector('#feedback').textContent.includes('unavailable metrics')); assert.equal(await page.locator('#headline-views').textContent(), '1,250 views'); assert.equal(await page.locator('.tile-value').allTextContents().then(v => v.join(',')), 'Unavailable,-1,7,14');
  await page.locator('#open-analytics').click(); assert.match(await page.locator('#details-content').textContent(), /Not provided by Google/); await page.keyboard.press('Escape');
  mode = 'signed'; await page.locator('#sync').click(); await page.waitForFunction(() => document.querySelector('#feedback').textContent.startsWith('Imported selected')); assert.equal(await page.locator('.tile-value').nth(1).textContent(), '-2');
  await page.locator('#open-analytics').click(); assert.match(await page.locator('#details-content').textContent(), /"likes": -2/); assert.match(await page.locator('#details-content').textContent(), /"warnings": \[\]/); await page.keyboard.press('Escape');
  mode = 'strings'; await page.locator('#sync').click(); await page.waitForFunction(() => document.querySelector('#feedback').textContent.startsWith('Imported selected')); assert.equal(await page.locator('.tile-value').allTextContents().then(v => v.join(',')), '64.3%,80,7,14');
  mode = 'fractional'; await page.locator('#sync').click(); await page.waitForFunction(() => document.querySelector('#feedback').textContent.includes('unavailable metrics')); assert.equal(await page.locator('.tile-value').nth(1).textContent(), 'Unavailable');
  mode = '403'; await page.locator('#sync').click(); await page.waitForFunction(() => document.querySelector('#feedback').textContent.includes('Access denied')); assert.equal(await page.locator('#headline-views').textContent(), '1,250 views'); assert.equal(await page.locator('#included-videos li').count(), 1);
  mode = 'owner'; await page.locator('#sync').click(); await page.waitForFunction(() => document.querySelector('#feedback').textContent.includes('owned')); assert.equal(await page.locator('#headline-views').textContent(), '1,250 views');
  mode = 'empty'; await page.locator('#sync').click(); await page.waitForFunction(() => document.querySelector('#feedback').textContent.includes('No daily')); assert.equal(await page.locator('#headline-views').textContent(), '1,250 views');
  mode = '401'; await page.locator('#sync').click(); await page.waitForFunction(() => document.querySelector('#connection').textContent.includes('expired')); assert.equal(await page.locator('#sync').isDisabled(), true);
  mode = 'ok'; await page.locator('#connect').click(); await page.waitForFunction(() => document.querySelector('#channel').value === 'UC_TEST');
  assert.equal(await page.evaluate(() => Boolean(sessionStorage.getItem('gemos-youtube-session-v1'))), true);
  await page.reload(); await page.waitForFunction(() => document.querySelector('#connection').textContent.includes('restored')); assert.equal(await page.locator('#channel').inputValue(), 'UC_TEST'); assert.equal(await page.evaluate(() => Boolean(window.testAuth)), false); assert.equal(await page.locator('#sync').isDisabled(), false);
  assert.equal(await page.locator('#included-videos li').count(), 0);
  await page.locator('#videos').fill('abcdefghijk bcdefghijkl cdefghijklm defghijklmn efghijklmno'); await page.locator('#confirm-shorts').check(); await page.locator('#end-date').fill('2026-10-06'); await page.locator('#sync').click(); await page.waitForFunction(() => document.querySelector('#included-videos').children.length === 5); assert.match(await page.locator('#included-status').textContent(), /5 videos/);
  for (const width of [320,390,840,1280]) { await page.setViewportSize({width,height:1000}); assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'five long titles overflow '+width); }
  await page.locator('#videos').fill('abcdefghijk'); await page.locator('#videos').blur(); assert.equal(await page.locator('#included-videos li').count(), 0);
  await page.locator('#disconnect').click(); assert.equal(await page.locator('#headline-views').textContent(), '— views');
  assert.equal(await page.evaluate(() => localStorage.length), 0); assert.equal(await page.evaluate(() => sessionStorage.getItem('gemos-youtube-session-v1')), null);
  await page.reload(); assert.equal(await page.locator('#sync').isDisabled(), true); assert.equal(await page.locator('#client-id').inputValue(), '123-test.apps.googleusercontent.com');
  await page.evaluate(() => sessionStorage.setItem('gemos-youtube-session-v1', JSON.stringify({ clientId:'123-test.apps.googleusercontent.com',token:'EXPIRED_FAKE',expiresAt:Date.now()-1000,channel:'UC_TEST' }))); await page.reload(); assert.match(await page.locator('#connection').textContent(), /expired/); assert.equal(await page.evaluate(() => sessionStorage.getItem('gemos-youtube-session-v1')), null); assert.deepEqual(errors, []);
  console.log(JSON.stringify({ passed: true, widths: [320,390,840,1280], checks: ['empty and validation','mock OAuth','metric mapping','7/28/90/365-day adjacent windows','newest-day lookup beyond 200 rows','leap-day arithmetic','range-change auto import and failure clears mismatched data','range pills below platforms with 44px targets','matched 575/583px recess','stable card heights','daily cutoff','sample filter','hidden comparison','dialog Escape and focus','safe external titles','WebMCP read and invalid input','responsive and enlarged text','403 preservation','ownership rejection','empty daily preservation','401 expiry','disconnect','Included Shorts titles and IDs','five long titles without overflow','safe title rendering','matching lists after failure and selection changes','nullable metrics and signed Likes','signed numeric Likes strings','numeric strings','fractional count rejection','same-tab refresh restoration without consent','expired saved session cleared','no localStorage tokens','no script errors'], liveOAuth: false }));
  await browser.close(); await new Promise(resolve => server.close(resolve));
})().catch(error => { console.error(error); process.exit(1); });
