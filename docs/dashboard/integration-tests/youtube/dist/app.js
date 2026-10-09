'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const scopes = ['https://www.googleapis.com/auth/yt-analytics.readonly', 'https://www.googleapis.com/auth/youtube.readonly'];
  const metrics = ['views', 'averageViewPercentage', 'likes', 'subscribersGained', 'shares'];
  let token = null, expiresAt = 0, expiryTimer, connectTimer, generation = 0, busy = false, report = null, opener;
  const sessionKey = 'gemos-youtube-session-v1';
  const configKey = 'gemos-youtube-client-v1';
  function removeSession() { try { sessionStorage.removeItem(sessionKey); } catch {} }
  function rememberSession() {
    try {
      sessionStorage.setItem(configKey, $('client-id').value.trim());
      sessionStorage.setItem(sessionKey, JSON.stringify({ clientId: $('client-id').value.trim(), token, expiresAt, channel: $('channel').value }));
      return true;
    } catch { return false; }
  }
  async function restoreSession() {
    controls();
    let saved;
    try { $('client-id').value = sessionStorage.getItem(configKey) || ''; saved = JSON.parse(sessionStorage.getItem(sessionKey) || 'null'); } catch { removeSession(); return; }
    if (!saved) return;
    if (typeof saved.token !== 'string' || !saved.token || !Number.isFinite(saved.expiresAt) || saved.expiresAt <= Date.now() || saved.expiresAt > Date.now() + 86400000 || saved.clientId !== $('client-id').value) { removeSession(); status('Saved session expired. Connect again.'); return; }
    token = saved.token; expiresAt = saved.expiresAt; busy = true; status('Restoring your connection…'); controls();
    clearTimeout(expiryTimer); expiryTimer = setTimeout(expire, expiresAt - Date.now());
    const session = generation;
    try {
      const data = await api('https://www.googleapis.com/youtube/v3/channels', { part: 'snippet', mine: 'true', maxResults: '50' }, session);
      if (!data.items?.length) throw new Error('No owned channel returned. Connect again.');
      $('channel').replaceChildren(...data.items.map(item => new Option(item.snippet.title, item.id)));
      if (data.items.some(item => item.id === saved.channel)) $('channel').value = saved.channel;
      status('Connected · read-only. Session restored after refresh.');
    } catch (error) { if (session === generation) clearConnection(error.message); }
    finally { if (session === generation) { busy = false; controls(); } }
  }
  const status = message => { $('connection').textContent = message; };
  const feedback = message => { $('feedback').textContent = message; };
  const date = value => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('Choose a valid report date.');
    const d = new Date(value + 'T12:00:00Z');
    if (!Number.isFinite(+d) || d.toISOString().slice(0, 10) !== value) throw new Error('Choose a valid report date.');
    return value;
  };
  const shift = (value, days) => {
    const d = new Date(date(value) + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + days); return d.toISOString().slice(0, 10);
  };
  function idsFromText(value) {
    const parts = value.trim().split(/[\s,]+/).filter(Boolean);
    const ids = parts.map(part => {
      if (/^[\w-]{11}$/.test(part)) return part;
      let url; try { url = new URL(part); } catch { throw new Error('Enter valid YouTube links or 11-character video IDs.'); }
      const host = url.hostname.toLowerCase();
      if (!['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'].includes(host) || url.protocol !== 'https:') throw new Error('Use HTTPS YouTube links.');
      const id = host === 'youtu.be' ? url.pathname.split('/')[1] : url.searchParams.get('v') || (/^\/(shorts|embed)\//.test(url.pathname) ? url.pathname.split('/')[2] : '');
      if (!/^[\w-]{11}$/.test(id || '')) throw new Error('A video ID is missing from a link.');
      return id;
    });
    const unique = [...new Set(ids)];
    if (!unique.length || unique.length > 5) throw new Error('Select 1–5 distinct Shorts.');
    return unique;
  }
  function controls() {
    const connected = Boolean(token && Date.now() < expiresAt);
    $('connect').disabled = busy;
    $('disconnect').disabled = !connected && !busy;
    $('channel').disabled = !connected || busy;
    $('sync').disabled = !connected || busy || !$('channel').value;
    document.querySelector('[data-sync-card]').disabled = $('sync').disabled;
    for (const id of ['client-id', 'videos', 'confirm-shorts', 'end-date']) $(id).disabled = busy;
  }
  function clearConnection(message = 'Disconnected. Imported data cleared.') {
    generation++; token = null; expiresAt = 0; busy = false;
    removeSession();
    clearTimeout(expiryTimer); clearTimeout(connectTimer);
    $('channel').replaceChildren(new Option('Connect to select your channel', ''));
    report = null; status(message); feedback('Nothing imported yet.'); render(); controls();
  }
  function expire() {
    generation++; token = null; expiresAt = 0; busy = false;
    removeSession();
    status('Session expired. Connect again to Sync.');
    feedback(report ? 'Previous import retained. It has not been refreshed.' : 'Connect again to import.'); controls();
  }
  async function api(base, params, session) {
    if (!token || Date.now() >= expiresAt) { expire(); throw new Error('Session expired. Connect again.'); }
    const url = new URL(base); url.search = new URLSearchParams(params);
    const response = await fetch(url, { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store', signal: AbortSignal.timeout(30000) });
    if (session !== generation) throw new Error('Connection changed. Import cancelled.');
    const body = await response.json();
    if (!response.ok) {
      if (response.status === 401) { expire(); throw new Error('Session expired or revoked. Connect again.'); }
      // Do not echo external errors, request URLs or credentials into the page.
      if (response.status === 403) throw new Error('Access denied. Check both APIs are enabled, both read permissions are granted, and this account owns the channel.');
      if (response.status === 429) throw new Error('Google rate limit reached. Try again later.');
      throw new Error('Google could not return this report (HTTP ' + response.status + '). Check the selected videos and report date.');
    }
    return body;
  }
  async function connect() {
    const clientId = $('client-id').value.trim();
    if (!/^[A-Za-z0-9_-]+\.apps\.googleusercontent\.com$/.test(clientId)) return status('Enter your public Web application OAuth client ID.');
    if (!window.google?.accounts?.oauth2) return status('Google sign-in has not loaded. Check your connection and try again.');
    clearConnection('Opening Google consent…'); busy = true; controls();
    const session = generation;
    connectTimer = setTimeout(() => { if (session === generation) clearConnection('Connection timed out. Try again.'); }, 90000);
    const client = google.accounts.oauth2.initTokenClient({ client_id: clientId, scope: scopes.join(' '), include_granted_scopes: false,
      error_callback: () => { if (session === generation) clearConnection('Google consent closed or blocked. Try Connect again.'); },
      callback: async response => {
        if (session !== generation) return;
        clearTimeout(connectTimer);
        if (response.error || !response.access_token) return clearConnection('Google did not grant access. Try again and grant both read permissions.');
        if (!google.accounts.oauth2.hasGrantedAllScopes(response, ...scopes)) return clearConnection('Both read permissions are required. Connect again.');
        const lifetime = Number(response.expires_in);
        if (!Number.isFinite(lifetime) || lifetime <= 0) return clearConnection('Google returned an invalid session. Try again.');
        token = response.access_token; expiresAt = Date.now() + lifetime * 1000;
        expiryTimer = setTimeout(expire, Math.min(lifetime * 1000, 2147483647));
        try {
          const data = await api('https://www.googleapis.com/youtube/v3/channels', { part: 'snippet', mine: 'true', maxResults: '50' }, session);
          if (!data.items?.length) throw new Error('No owned YouTube channel was returned for this account.');
          $('channel').replaceChildren(...data.items.map(item => new Option(item.snippet.title, item.id)));
          status(rememberSession() ? 'Connected · read-only. Kept across refreshes in this tab until expiry.' : 'Connected · read-only. Browser storage is blocked; refresh will require reconnecting.');
        } catch (error) { if (session === generation) clearConnection(error.message); }
        finally { if (session === generation) { busy = false; controls(); } }
      }
    });
    try { client.requestAccessToken({ prompt: '' }); } catch { clearConnection('Google consent could not open. Try Connect again.'); }
  }
  function mappedRows(data, required) {
    if (!Array.isArray(data.columnHeaders)) throw new Error('Google returned a report without column definitions.');
    const columns = data.columnHeaders.map(header => header.name);
    if (required.some(key => !columns.includes(key))) throw new Error('A required metric was unavailable. No substitute has been used.');
    return (data.rows || []).map(row => Object.fromEntries(columns.map((key, index) => [key, row[index]])));
  }
  function aggregate(data, period, warnings) {
    const rows = mappedRows(data, []);
    if (!rows.length) return Object.fromEntries(metrics.map(key => [key, null]));
    if (rows.length !== 1) throw new Error('Expected one aggregate row. Import stopped.');
    const result = {};
    for (const key of metrics) {
      const raw = rows[0][key];
      const value = typeof raw === 'number' ? raw : typeof raw === 'string' && /^-?\d+(?:\.\d+)?$/.test(raw.trim()) ? Number(raw) : null;
      // Studio export confirms signed Likes. Preserve Google's value without inferring its cause.
      if (value === null || !Number.isFinite(value) || (value < 0 && key !== 'likes') || (key !== 'averageViewPercentage' && !Number.isSafeInteger(value))) {
        result[key] = null;
        warnings.push({ period, metric: key, reason: raw == null ? 'Not provided by Google' : typeof raw === 'number' && raw < 0 ? 'Negative source value; not displayed as a count' : 'Unexpected source value or type', sourceValue: typeof raw === 'number' && Number.isFinite(raw) ? raw : typeof raw === 'string' && /^-?\d+(?:\.\d+)?$/.test(raw.trim()) ? raw.slice(0, 80) : null, sourceType: typeof raw });
        continue;
      }
      result[key] = value;
    }
    return result;
  }
  async function sync() {
    if (busy) return;
    let ids, requested;
    try {
      ids = idsFromText($('videos').value); requested = date($('end-date').value);
      if (requested >= new Date().toISOString().slice(0, 10)) throw new Error('Choose a day before today. Recent data may still be unavailable.');
      if (!$('confirm-shorts').checked) throw new Error('Check the selected videos are Shorts in Studio, then tick the confirmation.');
      if (!$('channel').value) throw new Error('Connect and choose your channel.');
    } catch (error) { feedback(error.message); return; }
    const session = generation, channel = $('channel').value;
    busy = true; controls(); feedback('Checking videos and importing reports…');
    try {
      const videos = await api('https://www.googleapis.com/youtube/v3/videos', { part: 'snippet', id: ids.join(',') }, session);
      if (videos.items?.length !== ids.length || videos.items.some(item => item.snippet.channelId !== channel)) throw new Error('Every selected video must be available and owned by the selected channel.');
      const base = { ids: 'channel==' + channel, metrics: metrics.join(','), filters: 'video==' + ids.join(',') };
      const query = params => api('https://youtubeanalytics.googleapis.com/v2/reports', { ...base, ...params }, session);
      const daily = mappedRows(await query({ startDate: shift(requested, -83), endDate: requested, dimensions: 'day', sort: 'day', maxResults: '200' }), ['day']);
      const days = daily.map(row => date(row.day));
      if (!days.length) throw new Error('No daily data returned. Missing data has not been treated as zero. Try older Shorts or a different date.');
      if (days.some(day => day > requested || day < shift(requested, -83))) throw new Error('Unexpected report dates. Import stopped.');
      const end = days.sort().at(-1), start = shift(end, -27), previousEnd = shift(start, -1), previousStart = shift(start, -28);
      const warnings = [];
      const current = aggregate(await query({ startDate: start, endDate: end }), 'current', warnings);
      const previous = aggregate(await query({ startDate: previousStart, endDate: previousEnd }), 'previous', warnings);
      if (session !== generation) return;
      report = { source: 'YouTube Analytics API v2', scope: 'User-confirmed selected Shorts sample; not channel-wide', channelId: channel, channelTitle: $('channel').selectedOptions[0].textContent,
        videos: videos.items.map(item => ({ id: item.id, title: item.snippet.title })), requestedEnd: requested, currentPeriod: { start, end }, previousPeriod: { start: previousStart, end: previousEnd },
        reportingTimezone: 'America/Los_Angeles', latestReturnedDay: end, fetchedAt: new Date().toISOString(), current, previous, warnings,
        coverage: 'Latest observed daily row; missing days are not proof of zero activity. Comparison and target withheld until coverage is verified.' };
      render(); feedback(warnings.length ? 'Imported with unavailable metrics: ' + [...new Set(warnings.map(item => item.period + ' ' + item.metric))].join(', ') + '. See Analytics details.' : 'Imported selected Shorts. Compare these exact videos and dates with Studio.');
    } catch (error) { if (session === generation) feedback((error.name === 'TimeoutError' ? 'Google timed out. Try Sync again.' : error.message) + (report ? ' Previous successful import retained.' : '')); }
    finally { if (session === generation) { busy = false; controls(); } }
  }
  function render() {
    $('included-status').textContent = report ? report.videos.length + (report.videos.length === 1 ? ' video included in these analytics.' : ' videos included in these analytics.') : 'Sync to see which videos are included.';
    $('included-videos').replaceChildren(...(report?.videos || []).map(video => {
      const item = document.createElement('li');
      const title = document.createElement('span'); title.textContent = video.title || 'Title unavailable';
      const id = document.createElement('span'); id.className = 'video-id'; id.textContent = 'Video ID · ' + video.id;
      item.append(title, id); return item;
    }));
    const values = report?.current;
    const number = value => value == null ? 'Unavailable' : value.toLocaleString('en-GB');
    $('headline-views').textContent = values?.views == null ? '— views' : number(values.views) + ' views';
    $('growth').hidden = true;
    $('period').textContent = report ? report.currentPeriod.start + ' – ' + report.currentPeriod.end : 'Not imported';
    $('freshness').textContent = report ? 'Latest returned day · ' + report.latestReturnedDay : 'No live data loaded';
    const tiles = [['Average percentage viewed', 'averageViewPercentage'], ['Likes', 'likes'], ['Subscribers gained', 'subscribersGained'], ['Shares', 'shares']];
    $('metrics').replaceChildren(...tiles.map(([label, key]) => {
      const tile = document.createElement('div'); tile.className = 'tile';
      const heading = document.createElement('p'); heading.className = 'tile-label'; heading.textContent = label;
      const value = document.createElement('strong'); value.className = 'tile-value'; value.textContent = values?.[key] == null ? report ? 'Unavailable' : '—' : key === 'averageViewPercentage' ? number(values[key]) + '%' : number(values[key]);
      const note = document.createElement('p'); note.className = 'tile-note'; note.textContent = report ? key === 'likes' ? 'Source-reported period value' : 'Selected-period activity' : 'Not imported';
      tile.append(heading, value, note); return tile;
    }));
    $('target-label').textContent = 'Selected Shorts only'; $('target-value').textContent = report ? report.videos.length + ' videos' : 'No sample imported';
    $('target-state').textContent = 'Test'; $('target-bar').hidden = true;
    $('target-note').textContent = 'Comparison and target hidden until report coverage is verified. TikTok and Reels are not connected.';
    document.querySelector('.sync-status').textContent = report ? 'Imported · ' + new Date(report.fetchedAt).toLocaleTimeString('en-GB') : 'Not synced';
  }
  function details() {
    opener = document.activeElement;
    const area = $('details-content'); area.replaceChildren();
    const p = document.createElement('p'); p.textContent = 'Values are period activity for your selected videos. Likes preserves Google’s signed value; Studio can report a negative value. Its cause is not inferred. Average percentage viewed is Google’s aggregate, not an average of daily percentages. Subscribers gained are attributed to the selected content. This is not a frozen 24-hour snapshot.';
    const pre = document.createElement('pre'); pre.textContent = report ? JSON.stringify(report, null, 2) : 'No report imported.';
    area.append(p, pre); $('details').showModal();
  }
  $('connect').addEventListener('click', connect);
  $('disconnect').addEventListener('click', () => {
    const revokeToken = token; clearConnection();
    if (revokeToken && window.google?.accounts?.oauth2) google.accounts.oauth2.revoke(revokeToken, () => {});
  });
  $('sync').addEventListener('click', sync); document.querySelector('[data-sync-card]').addEventListener('click', sync);
  $('open-analytics').addEventListener('click', details);
  $('close-details').addEventListener('click', () => $('details').close());
  $('details').addEventListener('close', () => opener?.focus());
  $('details').addEventListener('click', event => { if (event.target === $('details')) { const b = $('details').getBoundingClientRect(); if (event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom) $('details').close(); } });
  for (const id of ['videos', 'confirm-shorts', 'end-date', 'channel', 'client-id']) $(id).addEventListener('change', () => {
    if (id === 'client-id') { clearConnection(); return; }
    if (id === 'channel' && token) rememberSession();
    report = null; render(); feedback('Selection changed. Sync to import this sample.');
  });
  $('end-date').value = shift(new Date().toISOString().slice(0, 10), -3);
  $('origin').textContent = location.origin;
  // Tab-session storage retains only short-lived auth/config, never a refresh token.
  window.addEventListener('pagehide', () => { generation++; token = null; expiresAt = 0; report = null; });
  window.addEventListener('pageshow', event => { if (event.persisted) { report = null; render(); restoreSession(); } });
  render(); controls();
  restoreSession();
  if (document.modelContext?.registerTool) {
    try { Promise.resolve(document.modelContext.registerTool({ name: 'read_import_status', description: 'Read the visible import status and sample scope. Does not connect, sync or disclose credentials.', inputSchema: { type: 'object', properties: {}, additionalProperties: false }, annotations: { readOnlyHint: true, untrustedContentHint: true }, execute(input) { if (!input || typeof input !== 'object' || Object.keys(input).length) throw new Error('No arguments accepted.'); return { connected: Boolean(token && Date.now() < expiresAt), status: $('feedback').textContent, imported: Boolean(report), scope: report?.scope || null, period: report?.currentPeriod || null }; } })).catch(() => {}); } catch {}
  }
})();
