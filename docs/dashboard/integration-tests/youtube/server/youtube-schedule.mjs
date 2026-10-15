import { api, access } from './youtube.mjs';
import { shortFormat, ukDay } from './weekly-shorts.mjs';
import { getTarget, saveTarget, savedConnection } from './sync-targets.mjs';

const shift = (day, n) => { const d = new Date(day + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const fail = (message, status = 502) => Object.assign(new Error(message), { status });
export function scheduleStart(now = new Date(Date.now())) {
  const today = ukDay(now), weekday = new Date(today + 'T12:00:00Z').getUTCDay();
  return shift(today, (8 - weekday) % 7);
}
export function videoKind(video) {
  if (video.snippet?.liveBroadcastContent && video.snippet.liveBroadcastContent !== 'none') return null;
  if (!/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/.test(video.contentDetails?.duration || '') || /^PT(?:0H)?(?:0M)?(?:0(?:\.0+)?S)?$/.test(video.contentDetails.duration)) return null;
  const format = shortFormat(video);
  return format === true ? 'short' : format === false ? 'main' : null;
}
export function scheduleCoverage(videos, now = new Date(Date.now()), horizon = 12) {
  const start = scheduleStart(now), end = shift(start, horizon * 7 - 1);
  const scheduled = videos.filter(v => v.status?.privacyStatus === 'private' && typeof v.status?.publishAt === 'string' && Number.isFinite(Date.parse(v.status.publishAt)) && Date.parse(v.status.publishAt) > +now)
    .map(v => ({ id: v.id, title: v.snippet?.title || 'Title unavailable', publishAt: v.status.publishAt, day: ukDay(new Date(v.status.publishAt)), kind: videoKind(v), processing: v.processingDetails?.processingStatus || 'unknown' }))
    .filter(v => v.day >= start && v.day <= end).sort((a, b) => Date.parse(a.publishAt) - Date.parse(b.publishAt) || a.id.localeCompare(b.id));
  const weeks = Array.from({ length: horizon }, (_, index) => {
    const monday = shift(start, index * 7);
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = shift(monday, i), kind = i === 0 ? 'main' : 'short';
      const uploads = scheduled.filter(v => v.day === date);
      const matching = uploads.filter(v => v.kind === kind && v.processing === 'succeeded');
      return { date, required: kind, complete: matching.length > 0, videos: uploads };
    });
    return { start: monday, end: shift(monday, 6), ready: days.filter(d => d.complete).length, complete: days.every(d => d.complete), days };
  });
  let coveredWeeks = 0; for (const week of weeks) { if (!week.complete) break; coveredWeeks++; }
  return { start, end, horizon, weeks, coveredWeeks, coveredThrough: coveredWeeks ? weeks[coveredWeeks - 1].end : null, firstGap: weeks[coveredWeeks]?.start || null, horizonComplete: coveredWeeks === horizon, uncertain: scheduled.filter(v => !v.kind || v.processing !== 'succeeded').length };
}
export async function readSchedule(env, owner, { channel } = {}) {
  const started = Date.now(), connection = await access(env, owner), channels = JSON.parse(connection.row.channels_json);
  channel ||= channels.length === 1 ? channels[0].id : null;
  if (!channels.some(c => c.id === channel)) throw fail('Choose your connected YouTube channel.', 400);
  const query = async (path, params) => { const url = new URL('https://www.googleapis.com/youtube/v3/' + path); url.search = new URLSearchParams(params); return api(env, owner, url); };
  const data = await query('channels', { part: 'contentDetails', id: channel });
  const playlist = data.items?.find(c => c.id === channel)?.contentDetails?.relatedPlaylists?.uploads;
  if (typeof playlist !== 'string' || !/^[\w-]+$/.test(playlist)) throw fail('YouTube did not return your uploads playlist.');
  const ids = new Set(), seenPages = new Set(); let token, complete = false;
  // Scheduled videos can have old upload dates. Never stop at an upload-date cutoff.
  for (let page = 0; page < 100; page++) {
    const list = await query('playlistItems', { part: 'contentDetails', playlistId: playlist, maxResults: '50', ...(token ? { pageToken: token } : {}) });
    if (!Array.isArray(list.items)) throw fail('YouTube uploads could not be read.');
    for (const item of list.items) { const id = item.contentDetails?.videoId; if (!/^[\w-]{11}$/.test(id || '')) throw fail('YouTube returned an invalid upload identifier.'); ids.add(id); }
    token = list.nextPageToken; if (!token) { complete = true; break; }
    if (typeof token !== 'string' || seenPages.has(token)) throw fail('YouTube returned an incomplete upload list.'); seenPages.add(token);
  }
  if (!complete) throw fail('The upload list exceeds the supported scan. Your previous schedule is retained; coverage could not be confirmed.');
  const videos = [], all = [...ids];
  for (let i = 0; i < all.length; i += 50) {
    const batch = all.slice(i, i + 50), result = await query('videos', { part: 'snippet,status,contentDetails,fileDetails,processingDetails', id: batch.join(',') });
    if (!Array.isArray(result.items) || result.items.some(v => !batch.includes(v.id) || v.snippet?.channelId !== channel) || new Set(result.items.map(v => v.id)).size !== result.items.length) throw fail('YouTube returned mismatched schedule metadata.');
    if (result.items.length !== batch.length) throw fail('Some uploads could not be checked. Your previous schedule is retained.');
    videos.push(...result.items);
  }
  const coverage = scheduleCoverage(videos);
  const row = await env.DB.prepare('SELECT revision FROM youtube_connections WHERE user_id=? AND client_id=?').bind(owner, env.GOOGLE_CLIENT_ID).first();
  if (row?.revision !== connection.row.revision) throw fail('Your Google connection changed. Sync the schedule again.', 401);
  const report = { ...coverage, channelId: channel, source: 'YouTube scheduled publication dates', timezone: 'Europe/London', fetchedAt: new Date().toISOString(), partial: coverage.uncertain > 0 };
  // Private titles stay in the owner report cache, outside telemetry. Raw file metadata is never saved.
  await saveTarget(env, owner, 'youtube-schedule-report', { report, revision: row.revision }, started);
  await saveTarget(env, owner, 'youtube-schedule-sync', { channel }, started);
  return report;
}
export async function scheduleHandler(request, env) {
  try {
    const owner = request.headers.get('oai-authenticated-user-id'); if (!owner) throw fail('Sign in first.', 401);
    if (request.method === 'GET') {
      const connection = await savedConnection(env, owner), target = await getTarget(env, owner, 'youtube-schedule-sync');
      const channel = connection.channels.some(c => c.id === target?.channel) ? target.channel : connection.channels.length === 1 ? connection.channels[0].id : null;
      const cache = await getTarget(env, owner, 'youtube-schedule-report');
      const row = connection.row ? await env.DB.prepare('SELECT revision FROM youtube_connections WHERE user_id=? AND client_id=?').bind(owner, env.GOOGLE_CLIENT_ID).first() : null;
      const report = row && cache?.revision === row.revision && cache?.report?.channelId === channel && cache.report.start === scheduleStart() ? cache.report : null;
      return Response.json({ channels: connection.channels.map(c => ({ id: c.id, title: c.title })), channel, report }, { headers: { 'Cache-Control': 'no-store' } });
    }
    if (request.method !== 'POST') throw fail('Method not allowed.', 405);
    if (request.headers.get('Origin') !== new URL(request.url).origin) throw fail('Request origin does not match this page.', 403);
    const text = await request.text(); if (text.length > 512) throw fail('Invalid schedule selection.', 400);
    let input; try { input = JSON.parse(text); } catch { throw fail('Invalid schedule selection.', 400); }
    if (!input || Array.isArray(input) || typeof input !== 'object' || Object.keys(input).some(k => k !== 'channel') || input.channel !== undefined && (typeof input.channel !== 'string' || input.channel.length > 100)) throw fail('Invalid schedule selection.', 400);
    return Response.json(await readSchedule(env, owner, input), { headers: { 'Cache-Control': 'no-store' } });
  } catch (e) { return Response.json({ error: e.status ? e.message : 'The YouTube schedule could not be refreshed. Your saved schedule is unchanged.' }, { status: e.status || 502, headers: { 'Cache-Control': 'no-store' } }); }
}
