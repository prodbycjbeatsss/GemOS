(() => {
  const selectors = {
    '1.1': '#buffer-preview-details', '1.2': '#asset-sync',
    '2.1': '[data-sync-card="overview"]', '2.2': '#batch-sync', '2.3': '#email-refresh',
    '3.1': '#sales-refresh', '3.2': '#earnings-sync', '3.3': '#payouts-sync', '3.4': '#cost-manage'
  };
  const labels = new Map();
  for (const [id, selector] of Object.entries(selectors)) {
    const button = document.querySelector(selector);
    if (!button) continue;
    const stamp = document.createElement('span');
    stamp.className = 'card-sync-time'; stamp.dataset.syncTime = id;
    stamp.setAttribute('role', 'status'); stamp.setAttribute('aria-live', 'polite');
    stamp.textContent = 'Last synced: checking…';
    if (button.parentElement.matches('.sync-footer,.drive-sync-footer')) {
      button.parentElement.append(stamp); button.parentElement.classList.add('has-sync-ledger');
    } else {
      const footer = button.parentElement;
      footer.classList.add('card-sync-footer');
      const left = document.createElement('div'); left.className = 'card-sync-left';
      if (id === '1.1' || id === '3.4') footer.prepend(stamp);
      else { button.before(left); left.append(button, stamp); }
    }
    labels.set(id, stamp);
  }
  const nativeFetch = window.fetch.bind(window);
  let timer, epoch = 0;
  function draw(stamp, label, value, empty) {
    stamp.replaceChildren(document.createTextNode(label + ': '));
    if (!value || !Number.isFinite(new Date(value).getTime())) { stamp.append(document.createTextNode(empty)); return; }
    const time = document.createElement('time'); time.dateTime = new Date(value).toISOString();
    time.textContent = new Date(value).toLocaleString('en-GB', {timeZone:'Europe/London',day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit',second:'2-digit'});
    time.title = new Date(value).toLocaleString('en-GB', {timeZone:'Europe/London'}) + ' UK time';
    stamp.append(time);
  }
  async function refresh() {
    if (!labels.size) return;
    const current = ++epoch;
    try {
      const response = await nativeFetch('/api/automations', {credentials:'same-origin',cache:'no-store',signal:AbortSignal.timeout(15000)});
      if (!response.ok) throw Error('Status unavailable');
      const report = await response.json(); if (current !== epoch) return;
      for (const card of report.cards || []) {
        const stamp = labels.get(card.id); if (!stamp) continue;
        if (card.mode === 'unconnected') draw(stamp, 'Last synced', null, 'Not connected');
        else if (card.mode === 'manual') draw(stamp, 'Last saved', card.lastSaved, 'Not recorded');
        else draw(stamp, 'Last synced', card.lastSuccess, 'Not recorded');
      }
    } catch {
      if (current !== epoch) return;
      for (const stamp of labels.values()) if (stamp.textContent.includes('checking…')) stamp.textContent = 'Last synced: unavailable';
    }
  }
  function queue() { clearTimeout(timer); timer = setTimeout(refresh, 300); }
  // Read the same durable completion records as the Sync grid after source requests settle.
  // Preserve the original response/error; never treat a browser click as a successful sync.
  window.fetch = async (...args) => {
    const input = args[0]; const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url, location.href);
    const source = url.origin === location.origin && /^\/api\/(youtube|earnings|payouts|mailchimp|payhip|costs)(\/|$)/.test(url.pathname);
    try { return await nativeFetch(...args); } finally { if (source) queue(); }
  };
  window.addEventListener('focus', queue);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) queue(); });
  setInterval(() => { if (!document.hidden) queue(); }, 30000);
  queue();
})();
