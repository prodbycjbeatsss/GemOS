export const SCOPES = ['https://www.googleapis.com/auth/yt-analytics.readonly', 'https://www.googleapis.com/auth/youtube.readonly'];
const COOKIE = '__Host-gemos-youtube-state';
const HEADERS = { 'Cache-Control': 'no-store', 'Content-Type': 'application/json', 'X-Content-Type-Options': 'nosniff' };
class SafeError extends Error { constructor(message, status = 400) { super(message); this.status = status; } }
const json = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), { status, headers: { ...HEADERS, ...headers } });
const user = request => { const id = request.headers.get('oai-authenticated-user-id'); if (!id) throw new SafeError('Sign in to this private page first.', 401); return id; };
const cookie = (value, age = 600) => `${COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${age}`;
const nonce = () => [...crypto.getRandomValues(new Uint8Array(32))].map(b => b.toString(16).padStart(2, '0')).join('');
const hash = async value => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)))].map(b => b.toString(16).padStart(2, '0')).join('');
export function configured(env) { return Boolean(env.DB && /^[A-Za-z0-9_-]+\.apps\.googleusercontent\.com$/.test(env.GOOGLE_CLIENT_ID || '') && env.GOOGLE_CLIENT_SECRET && /^[a-f0-9]{64}$/i.test(env.YOUTUBE_TOKEN_KEY || '') && env.GOOGLE_REDIRECT_URI === 'https://gemos-youtube-import-test.prodbycjbeatsss.chatgpt.site/api/youtube/callback'); }
async function encryptionKey(env) { const bytes = new Uint8Array(env.YOUTUBE_TOKEN_KEY.match(/../g).map(v => parseInt(v, 16))); return crypto.subtle.importKey('raw', bytes, 'AES-GCM', false, ['encrypt', 'decrypt']); }
export async function seal(value, env, owner) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv, additionalData: new TextEncoder().encode(owner + ':' + env.GOOGLE_CLIENT_ID) }, await encryptionKey(env), new TextEncoder().encode(value));
  return JSON.stringify({ iv: Array.from(iv), data: Array.from(new Uint8Array(cipher)) });
}
export async function unseal(value, env, owner) {
  const stored = JSON.parse(value);
  return new TextDecoder().decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(stored.iv), additionalData: new TextEncoder().encode(owner + ':' + env.GOOGLE_CLIENT_ID) }, await encryptionKey(env), new Uint8Array(stored.data)));
}
async function google(url, init = {}) {
  const response = await fetch(url, { ...init, signal: AbortSignal.timeout(30000) });
  let body; try { body = await response.json(); } catch { throw new SafeError('Google returned an unreadable response.', 502); }
  if (!response.ok) {
    if (body.error === 'invalid_grant' || response.status === 401) throw new SafeError('YouTube access expired or was revoked. Connect again.', 401);
    if (response.status === 403) throw new SafeError('Google denied access. Check APIs, permissions and channel ownership.', 403);
    throw new SafeError('Google could not complete the request. Try again later.', 502);
  }
  return body;
}
async function exchange(env, params) {
  return google('https://oauth2.googleapis.com/token', { method: 'POST', body: new URLSearchParams({ client_id: env.GOOGLE_CLIENT_ID, client_secret: env.GOOGLE_CLIENT_SECRET, ...params }) });
}
function lifetime(data) { const n = Number(data.expires_in); if (typeof data.access_token !== 'string' || !data.access_token || !Number.isFinite(n) || n <= 0 || n > 86400) throw new SafeError('Google returned an invalid connection.', 502); return Date.now() + n * 1000; }
const rowFor = (env, owner) => env.DB.prepare('SELECT * FROM youtube_connections WHERE user_id = ? AND client_id = ?').bind(owner, env.GOOGLE_CLIENT_ID).first();
export async function access(env, owner, force = false) {
  const row = await rowFor(env, owner); if (!row) throw new SafeError('Connect YouTube first.', 401);
  if (!force && row.expires_at > Date.now() + 60000) return { token: await unseal(row.access_ciphertext, env, owner), row };
  let data;
  try { data = await exchange(env, { grant_type: 'refresh_token', refresh_token: await unseal(row.refresh_ciphertext, env, owner) }); }
  catch (error) { if (error.status === 401) await env.DB.prepare('DELETE FROM youtube_connections WHERE user_id = ? AND revision = ?').bind(owner, row.revision).run(); throw error; }
  const expiry = lifetime(data);
  if (data.scope && !SCOPES.every(s => data.scope.split(' ').includes(s))) throw new SafeError('Both read permissions are required. Connect again.', 401);
  const result = await env.DB.prepare('UPDATE youtube_connections SET access_ciphertext = ?, expires_at = ?, updated_at = ? WHERE user_id = ? AND revision = ?').bind(await seal(data.access_token, env, owner), expiry, Date.now(), owner, row.revision).run();
  if (result.meta.changes !== 1) throw new SafeError('Connection changed. Try again.', 401);
  return { token: data.access_token, row };
}
async function api(env, owner, url) {
  let session = await access(env, owner);
  try { return await google(url, { headers: { Authorization: 'Bearer ' + session.token } }); }
  catch (error) { if (error.status !== 401) throw error; session = await access(env, owner, true); return google(url, { headers: { Authorization: 'Bearer ' + session.token } }); }
}
function sameOrigin(request) { if (request.headers.get('Origin') !== new URL(request.url).origin) throw new SafeError('Request origin does not match this page.', 403); }
async function payload(request) { const text = await request.text(); if (text.length > 8192) throw new SafeError('Request too large.', 413); try { return JSON.parse(text); } catch { throw new SafeError('Invalid request.'); } }
function allowedQuery(input, row) {
  if (!input || typeof input.base !== 'string' || !input.params || typeof input.params !== 'object' || Array.isArray(input.params)) throw new SafeError('Invalid report request.');
  const allowed = {
    'https://www.googleapis.com/youtube/v3/channels': ['part','mine','maxResults'],
    'https://www.googleapis.com/youtube/v3/videos': ['part','id'],
    'https://youtubeanalytics.googleapis.com/v2/reports': ['ids','startDate','endDate','metrics','filters','dimensions','sort','maxResults']
  };
  if (!Object.hasOwn(allowed, input.base) || Object.entries(input.params).some(([k,v]) => !allowed[input.base].includes(k) || typeof v !== 'string' || v.length > 256)) throw new SafeError('Unsupported report request.');
  const p = input.params;
  if (input.base.endsWith('/channels') && (p.part !== 'snippet' || p.mine !== 'true' || p.maxResults !== '50')) throw new SafeError('Unsupported channel query.');
  if (input.base.endsWith('/videos') && (!['snippet','snippet,status'].includes(p.part) || !/^[\w-]{11}(?:,[\w-]{11}){0,5}$/.test(p.id || ''))) throw new SafeError('Unsupported video query.');
  if (input.base.endsWith('/reports')) {
    const channels = JSON.parse(row.channels_json);
    if (!channels.some(c => p.ids === 'channel==' + c.id) || p.metrics !== 'views,averageViewPercentage,likes,subscribersGained,shares' || !/^video==[\w-]{11}(?:,[\w-]{11}){0,5}$/.test(p.filters || '') || !/^\d{4}-\d{2}-\d{2}$/.test(p.startDate || '') || !/^\d{4}-\d{2}-\d{2}$/.test(p.endDate || '') || p.startDate > p.endDate || (p.dimensions !== undefined && p.dimensions !== 'day') || (p.sort !== undefined && p.sort !== '-day') || (p.maxResults !== undefined && p.maxResults !== '1')) throw new SafeError('Unsupported Analytics query.');
  }
  const url = new URL(input.base); url.search = new URLSearchParams(p); return url;
}
async function callback(request, env, owner) {
  const url = new URL(request.url), state = url.searchParams.get('state') || '';
  const browserState = (request.headers.get('Cookie') || '').split(';').map(s => s.trim()).find(s => s.startsWith(COOKIE + '='))?.slice(COOKIE.length + 1);
  if (!/^[a-f0-9]{64}$/.test(state) || browserState !== state) throw new SafeError('Google connection could not be verified. Try Connect again.', 403);
  const consumed = await env.DB.prepare('DELETE FROM youtube_oauth_states WHERE state_hash = ? AND user_id = ? AND expires_at > ? RETURNING state_hash').bind(await hash(state), owner, Date.now()).first();
  if (!consumed) throw new SafeError('Connection request expired or was already used. Try again.', 403);
  if (url.searchParams.has('error')) return new Response(null, { status: 303, headers: { Location: '/?youtube=cancelled', 'Set-Cookie': cookie('', 0), 'Cache-Control': 'no-store' } });
  const code = url.searchParams.get('code'); if (!code || code.length > 4096) throw new SafeError('Google did not return an authorisation code.');
  const data = await exchange(env, { grant_type: 'authorization_code', code, redirect_uri: env.GOOGLE_REDIRECT_URI });
  const expiry = lifetime(data);
  if (!SCOPES.every(s => (data.scope || '').split(' ').includes(s)) || typeof data.refresh_token !== 'string' || !data.refresh_token) throw new SafeError('Offline access and both read permissions are required. Connect again.', 400);
  const owned = await google('https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true&maxResults=50', { headers: { Authorization: 'Bearer ' + data.access_token } });
  if (!Array.isArray(owned.items) || !owned.items.length || owned.items.some(c => typeof c.id !== 'string' || typeof c.snippet?.title !== 'string')) throw new SafeError('No owned YouTube channel returned.', 400);
  const channels = owned.items.map(c => ({ id: c.id, title: c.snippet.title }));
  await env.DB.prepare('INSERT INTO youtube_connections (user_id, client_id, refresh_ciphertext, access_ciphertext, expires_at, scopes, channels_json, updated_at, revision) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(user_id) DO UPDATE SET client_id=excluded.client_id, refresh_ciphertext=excluded.refresh_ciphertext, access_ciphertext=excluded.access_ciphertext, expires_at=excluded.expires_at, scopes=excluded.scopes, channels_json=excluded.channels_json, updated_at=excluded.updated_at, revision=excluded.revision').bind(owner, env.GOOGLE_CLIENT_ID, await seal(data.refresh_token, env, owner), await seal(data.access_token, env, owner), expiry, SCOPES.join(' '), JSON.stringify(channels), Date.now(), nonce()).run();
  return new Response(null, { status: 303, headers: { Location: '/?youtube=connected', 'Set-Cookie': cookie('', 0), 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' } });
}
export async function handle(request, env, action) {
  try {
    const owner = user(request);
    if (action === 'status' && request.method === 'GET') {
      if (!configured(env)) return json({ configured: false, connected: false });
      const row = await rowFor(env, owner);
      if (!row) return json({ configured: true, connected: false, clientId: env.GOOGLE_CLIENT_ID });
      await access(env, owner);
      return json({ configured: true, connected: true, clientId: env.GOOGLE_CLIENT_ID, channels: JSON.parse(row.channels_json) });
    }
    if (!configured(env)) throw new SafeError('Background connection setup is not finished. The existing browser connection still works.', 503);
    if (new URL(request.url).origin !== new URL(env.GOOGLE_REDIRECT_URI).origin) throw new SafeError('Unexpected site origin.', 403);
    if (action === 'callback' && request.method === 'GET') return await callback(request, env, owner);
    if (request.method !== 'POST') throw new SafeError('Method not allowed.', 405);
    sameOrigin(request);
    if (action === 'start') {
      const state = nonce(), now = Date.now();
      await env.DB.batch([env.DB.prepare('DELETE FROM youtube_oauth_states WHERE expires_at <= ? OR user_id = ?').bind(now, owner), env.DB.prepare('INSERT INTO youtube_oauth_states (state_hash, user_id, expires_at) VALUES (?, ?, ?)').bind(await hash(state), owner, now + 600000)]);
      const url = new URL('https://accounts.google.com/o/oauth2/v2/auth'); url.search = new URLSearchParams({ client_id: env.GOOGLE_CLIENT_ID, redirect_uri: env.GOOGLE_REDIRECT_URI, response_type: 'code', scope: SCOPES.join(' '), access_type: 'offline', prompt: 'consent', state, include_granted_scopes: 'false' });
      return json({ url: url.href }, 200, { 'Set-Cookie': cookie(state) });
    }
    if (action === 'disconnect') {
      const row = await rowFor(env, owner);
      await env.DB.batch([env.DB.prepare('DELETE FROM youtube_connections WHERE user_id = ?').bind(owner), env.DB.prepare('DELETE FROM youtube_oauth_states WHERE user_id = ?').bind(owner)]);
      let revoked = !row;
      if (row) { try { const r = await fetch('https://oauth2.googleapis.com/revoke', { method: 'POST', body: new URLSearchParams({ token: await unseal(row.refresh_ciphertext, env, owner) }), signal: AbortSignal.timeout(30000) }); revoked = r.ok; } catch {} }
      return json({ disconnected: true, revoked });
    }
    if (action === 'query') { const row = await rowFor(env, owner); if (!row) throw new SafeError('Connect YouTube first.', 401); return json(await api(env, owner, allowedQuery(await payload(request), row))); }
    throw new SafeError('Not found.', 404);
  } catch (error) {
    return json({ error: error instanceof SafeError ? error.message : 'The connection service could not complete this request. Try again.' }, error instanceof SafeError ? error.status : 500, action === 'callback' ? { 'Set-Cookie': cookie('', 0), 'Referrer-Policy': 'no-referrer' } : {});
  }
}
