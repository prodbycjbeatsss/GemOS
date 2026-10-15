(() => {
  const $ = id => document.getElementById(id);
  let report = null, channels = [], busy = false, generation = 0, opener = null;
  const date = value => new Date(value + 'T12:00:00Z').toLocaleDateString('en-GB', { timeZone: 'Europe/London', day: 'numeric', month: 'short' });
  const node = (tag, text, className) => { const e = document.createElement(tag); if (text !== undefined) e.textContent = text; if (className) e.className = className; return e; };
  const status = text => { $('buffer-status').textContent = text; };
  const controls = () => { $('buffer-sync').disabled = busy || !$('buffer-channel').value; $('buffer-channel').disabled = busy; $('buffer-sync').setAttribute('aria-busy', String(busy)); };
  async function api(body) {
    const response = await fetch('/api/youtube/schedule', { method: body ? 'POST' : 'GET', credentials: 'same-origin', cache: 'no-store', signal: AbortSignal.timeout(240000), ...(body ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {}) });
    const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Schedule unavailable.'); return data;
  }
  function empty(host, title, copy) { const e = node('div', undefined, 'buffer-empty'); const icon = node('span', '▦', 'schedule-empty-icon'); icon.setAttribute('aria-hidden', 'true'); e.append(icon, node('strong', title), node('p', copy)); host.append(e); }
  function openDetails(trigger) {
    opener = trigger; details(); $('buffer-preview-dialog').showModal(); $('buffer-preview-title').focus();
  }
  function render() {
    const host = $('pipeline-projects-dock'); host.replaceChildren();
    if (!report) {
      $('buffer-metric-val').textContent = channels.length ? 'No schedule checked' : 'Connect YouTube';
      $('buffer-subtitle').textContent = 'Monday video + six daily Shorts';
      empty(host, channels.length ? 'Check your schedule' : 'YouTube not connected', channels.length ? 'Sync to check the next 12 release weeks.' : 'Connect YouTube on Audience & Performance first.');
    } else {
      $('buffer-metric-val').textContent = report.coveredThrough ? 'Covered until ' + date(report.coveredThrough) : 'No complete weeks';
      $('buffer-subtitle').textContent = (report.horizonComplete ? 'At least ' : '') + report.coveredWeeks + ' complete week' + (report.coveredWeeks === 1 ? '' : 's') + ' · YouTube';
      host.append(node('p', 'From Monday ' + date(report.start), 'schedule-period'));
      const gapIndex = report.weeks.findIndex(w => !w.complete);
      const first = gapIndex > 1 ? gapIndex - 1 : 0;
      for (const week of report.weeks.slice(first, first + 3)) {
        const button = node('button', undefined, 'buffer-project-row'); button.type = 'button';
        const copy = node('span', undefined, 'buffer-project-copy');
        copy.append(node('strong', date(week.start) + '–' + date(week.end), 'buffer-project-name'), node('span', week.complete ? 'All seven videos scheduled' : week.days.filter(d => !d.complete).map(d => new Date(d.date + 'T12:00:00Z').toLocaleDateString('en-GB', { weekday: 'short', timeZone: 'Europe/London' })).join(', ') + ' missing or unverified', 'buffer-project-date'));
        button.append(copy, node('span', week.ready + '/7', 'buffer-project-badge' + (week.complete ? ' is-ready' : ''))); button.addEventListener('click', () => openDetails(button)); host.append(button);
      }
      if (report.partial) host.append(node('p', report.uncertain + ' scheduled upload(s) need format or processing verification.', 'schedule-period'));
    }
    controls(); if ($('buffer-preview-dialog').open) { details(); $('buffer-preview-title').focus(); }
  }
  function details() {
    const host = $('buffer-detail-content'); host.replaceChildren();
    host.append(node('p', 'YouTube only. A full week needs one main video on Monday and one Short on each day Tuesday–Sunday. Counts stop at the first incomplete week. Dates use UK time; ready files and planned dates do not count.', 'details-reason'));
    if (!report) { empty(host, 'No schedule checked', 'Sync Release Buffer to read your YouTube schedule.'); return; }
    host.append(node('p', 'Checked ' + new Date(report.fetchedAt).toLocaleString('en-GB', { timeZone: 'Europe/London' }) + ' UK time. Re-sync after changing YouTube Studio.', 'details-reason'));
    for (const week of report.weeks) {
      const section = node('details', undefined, 'schedule-week'); section.open = week.start === report.firstGap;
      section.append(node('summary', date(week.start) + '–' + date(week.end) + ' · ' + week.ready + '/7 scheduled'));
      for (const day of week.days) {
        const row = node('div', undefined, 'schedule-day');
        const label = new Date(day.date + 'T12:00:00Z').toLocaleDateString('en-GB', { timeZone: 'Europe/London', weekday: 'long', day: 'numeric', month: 'short' });
        row.append(node('strong', (day.complete ? '✓ ' : '— ') + label + ' · ' + (day.required === 'main' ? 'Main video' : 'Short')));
        if (!day.videos.length) row.append(node('p', 'Not scheduled', 'details-reason'));
        for (const video of day.videos) {
          const link = node('a', video.title, 'details-drive-link'); link.href = 'https://www.youtube.com/watch?v=' + encodeURIComponent(video.id); link.target = '_blank'; link.rel = 'noopener noreferrer';
          row.append(link, node('p', new Date(video.publishAt).toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' }) + ' UK · ' + (video.kind === null ? 'Format unverified' : video.kind === 'short' ? 'Short' : 'Main video') + (video.processing !== 'succeeded' ? ' · Processing not confirmed' : video.kind !== day.required ? ' · Does not fill this day’s slot' : ' · Scheduled'), 'details-reason'));
        }
        section.append(row);
      }
      host.append(section);
    }
  }
  async function load() {
    if (busy) return; const epoch = ++generation;
    try {
      const data = await api(); if (epoch !== generation) return; channels = data.channels;
      const select = $('buffer-channel'), previous = select.value; select.replaceChildren();
      if (channels.length !== 1) { const option = node('option', 'Choose a YouTube channel'); option.value = ''; select.append(option); }
      for (const channel of channels) { const option = node('option', channel.title || channel.id); option.value = channel.id; select.append(option); }
      select.value = channels.some(c => c.id === previous) ? previous : data.channel || '';
      $('buffer-channel-choice').hidden = channels.length <= 1; report = data.report;
      if (report && report.channelId !== select.value) report = null;
      status(report ? 'Saved schedule restored. Sync for changes.' : channels.length ? 'Ready to check YouTube Studio.' : 'Connect YouTube on Audience & Performance.'); render();
    } catch (e) { status((report ? 'Saved schedule retained. ' : '') + e.message); controls(); }
  }
  $('buffer-channel').addEventListener('change', () => { ++generation; report = null; status('Sync to check this channel.'); render(); });
  $('buffer-sync').addEventListener('click', async () => {
    if (busy || !$('buffer-channel').value) return; const epoch = ++generation; busy = true; controls(); status('Checking YouTube schedule…');
    try { const data = await api({ channel: $('buffer-channel').value }); if (epoch !== generation) return; report = data; render(); status(data.partial ? 'Checked with unverified uploads. Open Buffer details.' : 'Schedule checked.'); }
    catch (e) { if (epoch === generation) status((report ? 'Saved schedule retained. ' : '') + e.message); }
    finally { busy = false; controls(); }
  });
  $('buffer-preview-details').addEventListener('click', event => openDetails(event.currentTarget));
  $('buffer-preview-close').addEventListener('click', () => $('buffer-preview-dialog').close());
  $('buffer-preview-dialog').addEventListener('close', () => (opener && opener.isConnected !== false ? opener : $('buffer-preview-details')).focus());
  window.addEventListener('focus', load); document.addEventListener('visibilitychange', () => { if (!document.hidden) load(); });
  load();
})();
