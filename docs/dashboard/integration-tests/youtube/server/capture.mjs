import { access, configured } from './youtube.mjs';
export const WINDOW_START = 86400000, WINDOW_END = 87300000;
const HEADERS = { 'Cache-Control': 'no-store', 'Content-Type': 'application/json', 'X-Content-Type-Options': 'nosniff' };
const response = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: HEADERS });
class CaptureError extends Error { constructor(message, status = 400) { super(message); this.status = status; } }
const ownerOf = request => { const owner = request.headers.get('oai-authenticated-user-id'); if (!owner) throw new CaptureError('Sign in to the private page first.', 401); return owner; };
const sameOrigin = request => { if (request.headers.get('Origin') !== new URL(request.url).origin) throw new CaptureError('Request origin does not match.', 403); };
const selection = (env, owner, channel) => env.DB.prepare('SELECT * FROM youtube_release_selections WHERE user_id = ? AND channel_id = ?').bind(owner, channel).first();
const validPublished = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) && Number.isFinite(Date.parse(value)) ? value : null;
export function parseViews(value) { if (typeof value !== 'string' || !/^\d+$/.test(value)) return null; const n = Number(value); return Number.isSafeInteger(n) && n >= 0 ? n : null; }
export function qualifies(publishedAt, requestedAt, returnedAt) { const p = Date.parse(publishedAt); return Number.isFinite(p) && requestedAt >= p + WINDOW_START && requestedAt <= p + WINDOW_END && returnedAt >= requestedAt && returnedAt <= p + WINDOW_END; }
async function ownedChannels(env, owner) { const connection = await env.DB.prepare('SELECT channels_json FROM youtube_connections WHERE user_id = ? AND client_id = ?').bind(owner, env.GOOGLE_CLIENT_ID).first(); if (!connection) throw new CaptureError('Connect YouTube first.', 401); return JSON.parse(connection.channels_json); }
async function videoData(env, owner, ids, includeViews) {
  const session = await access(env, owner), url = new URL('https://www.googleapis.com/youtube/v3/videos'); url.search = new URLSearchParams({ part: includeViews ? 'snippet,status,statistics' : 'snippet,status', id: ids.join(',') });
  const requestedAt = Date.now();
  const r = await fetch(url, { headers: { Authorization: 'Bearer ' + session.token }, signal: AbortSignal.timeout(30000) }); const capturedAt = Date.now();
  if (!r.ok) throw new CaptureError(r.status === 401 ? 'Google access expired. Connect again.' : 'YouTube could not return the release. Try again.', r.status === 401 ? 401 : 502);
  const stillConnected = await env.DB.prepare('SELECT revision FROM youtube_connections WHERE user_id = ?').bind(owner).first(); if (!stillConnected || stillConnected.revision !== session.row.revision) throw new CaptureError('Connection changed. Capture cancelled.', 401);
  const data = await r.json(); if (!Array.isArray(data.items) || data.items.some(v => !ids.includes(v.id)) || new Set(data.items.map(v => v.id)).size !== data.items.length) throw new CaptureError('Unexpected YouTube video response.', 502);
  return { items: data.items, requestedAt, capturedAt };
}
function metadata(v) { return { id: v.id, title: typeof v.snippet?.title === 'string' ? v.snippet.title : 'Title unavailable', publishedAt: validPublished(v.snippet?.publishedAt), visibility: ['public','unlisted','private'].includes(v.status?.privacyStatus) ? v.status.privacyStatus : 'unavailable', snapshotViews: null, capturedAt: null }; }
async function viewReport(env, owner, row) {
  const videos = JSON.parse(row.metadata_json), stats = await env.DB.prepare('SELECT * FROM youtube_view_snapshots WHERE user_id = ? AND channel_id = ?').bind(owner, row.channel_id).all();
  for (const video of videos) {
    const saved = stats.results.find(s => s.video_id === video.id && s.published_at === video.publishedAt);
    if (saved && qualifies(saved.published_at, saved.requested_at, saved.captured_at)) { video.snapshotViews = saved.views; video.capturedAt = new Date(saved.captured_at).toISOString(); video.requestedAt = new Date(saved.requested_at).toISOString(); }
  }
  const last = await env.DB.prepare("SELECT finished_at FROM youtube_capture_runs WHERE outcome = 'scheduled' ORDER BY finished_at DESC LIMIT 1").first();
  return { source: 'YouTube Data API v3', scope: 'User-confirmed selected release Shorts; not channel-wide', channelId: row.channel_id, name: row.name, videos, fetchedAt: new Date(row.fetched_at).toISOString(), capture: last ? 'Automatic checker has run; only qualifying snapshots rank.' : 'Snapshot storage ready. Automatic schedule has not been verified.', automaticLastRun: last ? new Date(last.finished_at).toISOString() : null, timezone: 'Europe/London', saved: true };
}
export async function captureRelease(env, owner, channel, { refreshOnly = false } = {}) {
  const row = await selection(env, owner, channel); if (!row) return null;
  const ids = JSON.parse(row.video_ids_json), old = JSON.parse(row.metadata_json);
  const oldStats = await env.DB.prepare('SELECT video_id, published_at FROM youtube_view_snapshots WHERE user_id = ? AND channel_id = ?').bind(owner, channel).all();
  const now = Date.now();
  const pending = old.filter(v => !oldStats.results.some(s => s.video_id === v.id && s.published_at === v.publishedAt) && (v.visibility !== 'public' || !v.publishedAt || now <= Date.parse(v.publishedAt) + WINDOW_END));
  // Finished old selections need no recurring Google request; Sync can still refresh metadata.
  if (!pending.length && !refreshOnly) return viewReport(env, owner, row);
  const data = await videoData(env, owner, ids, true), entries = new Map(data.items.map(v => [v.id, v]));
  const videos = ids.map(id => { const v = entries.get(id); if (!v || v.snippet?.channelId !== channel) return { id, title: old.find(v => v.id === id)?.title || 'Title unavailable', publishedAt: null, visibility: 'unavailable', snapshotViews: null, capturedAt: null }; return metadata(v); });
  const statements = [];
  for (const v of videos) {
    const source = entries.get(v.id), views = parseViews(source?.statistics?.viewCount);
    if (v.visibility === 'public' && views !== null && qualifies(v.publishedAt, data.requestedAt, data.capturedAt)) statements.push(env.DB.prepare('INSERT OR IGNORE INTO youtube_view_snapshots (user_id, channel_id, video_id, published_at, views, requested_at, captured_at, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').bind(owner, channel, v.id, v.publishedAt, views, data.requestedAt, data.capturedAt, 'YouTube Data API v3 videos.statistics.viewCount'));
  }
  statements.push(env.DB.prepare('UPDATE youtube_release_selections SET metadata_json = ?, fetched_at = ? WHERE user_id = ? AND channel_id = ? AND video_ids_json = ?').bind(JSON.stringify(videos), data.capturedAt, owner, channel, row.video_ids_json));
  await env.DB.batch(statements);
  const current = await selection(env, owner, channel); return current ? viewReport(env, owner, current) : null;
}
async function saveRelease(request, env, owner) {
  const text = await request.text(); if (text.length > 4096) throw new CaptureError('Selection too large.'); let input; try { input = JSON.parse(text); } catch { throw new CaptureError('Invalid selection.'); }
  if (!Array.isArray(input.ids) || !input.ids.length || input.ids.length > 6 || input.ids.some(v => typeof v !== 'string' || !/^[\w-]{11}$/.test(v)) || new Set(input.ids).size !== input.ids.length || input.confirmed !== true || typeof input.name !== 'string' || input.name.length > 120 || !(await ownedChannels(env, owner)).some(c => c.id === input.channelId)) throw new CaptureError('Confirm 1–6 distinct Shorts owned by your selected channel and one release name.');
  const data = await videoData(env, owner, input.ids, false);
  if (data.items.length !== input.ids.length || data.items.some(v => v.snippet?.channelId !== input.channelId)) throw new CaptureError('Every release Short must be available and owned by this channel.');
  const videos = input.ids.map(id => metadata(data.items.find(v => v.id === id)));
  await env.DB.prepare('INSERT INTO youtube_release_selections (user_id, channel_id, name, video_ids_json, metadata_json, fetched_at) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(user_id,channel_id) DO UPDATE SET name=excluded.name, video_ids_json=excluded.video_ids_json, metadata_json=excluded.metadata_json, fetched_at=excluded.fetched_at').bind(owner, input.channelId, input.name.trim() || 'Selected release', JSON.stringify(input.ids), JSON.stringify(videos), data.capturedAt).run();
  // A manual import in the window can capture immediately; all other counts are ignored.
  const inWindow = videos.some(v => v.visibility === 'public' && qualifies(v.publishedAt, Date.now(), Date.now()));
  return inWindow ? captureRelease(env, owner, input.channelId) : viewReport(env, owner, await selection(env, owner, input.channelId));
}
async function secretMatches(given, expected) {
  if (!given || !expected) return false;
  const encode = new TextEncoder(), [a,b] = await Promise.all([crypto.subtle.digest('SHA-256', encode.encode(given)), crypto.subtle.digest('SHA-256', encode.encode(expected))]);
  const x = new Uint8Array(a), y = new Uint8Array(b); let difference = 0; for (let i=0;i<x.length;i++) difference |= x[i]^y[i]; return difference === 0;
}
export async function captureHandler(request, env, action) {
  try {
    if (!configured(env)) throw new CaptureError('YouTube connection setup is incomplete.', 503);
    if (action === 'run-captures' || action === 'capture-health') {
      if (!env.YOUTUBE_UPDATER_KEY || !await secretMatches(request.headers.get('Authorization'), 'Bearer ' + env.YOUTUBE_UPDATER_KEY)) throw new CaptureError('Unauthorised updater.', 401);
      if (action === 'capture-health') {
        if (request.method !== 'GET') throw new CaptureError('Method not allowed.', 405);
        const owners = await env.DB.prepare('SELECT user_id FROM youtube_connections LIMIT 2').all();
        const lastRun = await env.DB.prepare('SELECT finished_at, captured, outcome FROM youtube_capture_runs ORDER BY finished_at DESC LIMIT 1').first();
        return response({ ready: owners.results.length === 1, ownerId: owners.results.length === 1 ? owners.results[0].user_id : null, lastRun });
      }
      if (request.method !== 'POST') throw new CaptureError('Method not allowed.', 405);
      const started = Date.now(), rows = await env.DB.prepare('SELECT r.user_id, r.channel_id FROM youtube_release_selections r INNER JOIN youtube_connections c ON r.user_id = c.user_id LIMIT 50').all(); let captured = 0, failures = 0;
      for (const row of rows.results) {
        const before = await env.DB.prepare('SELECT COUNT(*) AS n FROM youtube_view_snapshots WHERE user_id = ? AND channel_id = ?').bind(row.user_id, row.channel_id).first();
        try { await captureRelease(env, row.user_id, row.channel_id); } catch { failures++; }
        const after = await env.DB.prepare('SELECT COUNT(*) AS n FROM youtube_view_snapshots WHERE user_id = ? AND channel_id = ?').bind(row.user_id, row.channel_id).first(); captured += after.n - before.n;
      }
      // Cloud Scheduler can send the short job ID or the full resource name.
      const jobName = request.headers.get('X-CloudScheduler-JobName');
      const scheduled = jobName === 'gemos-youtube-capture' || /^projects\/[^/]+\/locations\/[^/]+\/jobs\/gemos-youtube-capture$/.test(jobName || '');
      await env.DB.prepare('INSERT INTO youtube_capture_runs (id, started_at, finished_at, captured, outcome) VALUES (?, ?, ?, ?, ?)').bind(crypto.randomUUID(), started, Date.now(), captured, failures ? 'error' : scheduled ? 'scheduled' : 'manual-service-check').run();
      await env.DB.prepare('DELETE FROM youtube_capture_runs WHERE finished_at < ?').bind(Date.now() - 30*86400000).run();
      return response({ checked: rows.results.length, captured, failures }, failures ? 503 : 200);
    }
    const owner = ownerOf(request);
    if (action === 'scheduler-config' && request.method === 'GET') {
      if (!env.YOUTUBE_CAPTURE_OWNER_ID || env.YOUTUBE_CAPTURE_OWNER_ID !== owner || !env.SITES_SERVICE_TOKEN || !env.YOUTUBE_UPDATER_KEY) throw new CaptureError('Scheduler setup is not ready for this account.', 503);
      return response({ schedule: '*/5 * * * *', 'time-zone': 'Etc/UTC', uri: 'https://gemos-youtube-import-test.prodbycjbeatsss.chatgpt.site/api/youtube/run-captures', 'http-method': 'POST', headers: { 'OAI-Sites-Authorization': 'Bearer ' + env.SITES_SERVICE_TOKEN, Authorization: 'Bearer ' + env.YOUTUBE_UPDATER_KEY, 'Content-Type': 'application/json' }, 'message-body': '{}', 'attempt-deadline': '60s', 'max-retry-attempts': 0 });
    }
    if (action !== 'release') throw new CaptureError('Not found.', 404);
    if (request.method === 'POST') { sameOrigin(request); return response(await saveRelease(request, env, owner)); }
    if (request.method === 'GET') {
      const channel = new URL(request.url).searchParams.get('channel'); if (!(await ownedChannels(env, owner)).some(c => c.id === channel)) throw new CaptureError('Select an owned channel.');
      const row = await selection(env, owner, channel); return response({ release: row ? await viewReport(env, owner, row) : null });
    }
    throw new CaptureError('Method not allowed.', 405);
  } catch (error) { return response({ error: error instanceof CaptureError || error.status === 401 ? error.message : 'Release capture could not complete. Try again.' }, error.status || 500); }
}
