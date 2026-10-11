(() => {
  const $ = id => document.getElementById(id);
  const now = new Date(); let date = new Date(now.getFullYear(), now.getMonth(), 1), mode = 'month', target = null;

  async function api(method='GET', value) {
    const response=await fetch('/api/payhip/settings',{method,credentials:'same-origin',headers:method==='POST'?{'Content-Type':'application/json'}:{},body:value===undefined?undefined:JSON.stringify(value)});
    let result;try{result=await response.json();}catch{throw Error('Could not load Payhip settings. Refresh and try again.');}
    if(!response.ok)throw Error(result.error||'Could not save Payhip settings.');return result;
  }
  function applySettings(value){
    target=value.monthlyTarget;
    $('payhip-status').textContent=value.keySaved?(value.verifiedAt?'Notification verified · '+new Date(value.verifiedAt).toLocaleString('en-GB',{timeZone:'Europe/London'}):'Key saved · awaiting a verified Payhip notification'):'No Payhip key saved yet';
    $('payhip-key').placeholder=value.keySaved?'Saved · enter a replacement only if needed':'Paste your Payhip API key';
    $('payhip-webhook').hidden=!value.webhookUrl;$('payhip-webhook-url').value=value.webhookUrl||'';
    $('payhip-copy').disabled=!value.receiverEnabled;
    $('payhip-webhook-help').textContent=value.receiverEnabled?'Paste this URL into Payhip Settings → Developer, then select paid and refunded.':'The separate receiver is prepared but not publicly enabled yet. Do not add this URL to Payhip until enabled.';
    $('commerce-context').textContent='Group 3 · Beat sales · '+(value.verifiedAt?'Notifications verified · licence mapping pending':value.keySaved?'Connection saved · verification pending':'Payhip data not connected');
    $('payhip-setup').open=!value.keySaved;render();
  }
  $('payhip-form').addEventListener('submit',async e=>{
    e.preventDefault();const input=$('payhip-key'),key=input.value.trim();
    if(!key){$('payhip-feedback').textContent='Enter a key to save or replace the connection.';return;}
    $('payhip-save').disabled=true;$('payhip-feedback').textContent='Saving connection…';
    try{applySettings(await api('POST',{apiKey:key}));input.value='';$('payhip-setup').open=true;$('payhip-feedback').textContent='Saved privately. Verification happens when a valid Payhip notification arrives.';}
    catch(error){$('payhip-feedback').textContent=error.message;}finally{$('payhip-save').disabled=false;}
  });
  $('payhip-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('payhip-webhook-url').value);$('payhip-feedback').textContent='Webhook URL copied.';}catch{$('payhip-feedback').textContent='Select the webhook URL and copy it manually.';}});
  const money = value => new Intl.NumberFormat('en-GB', {style:'currency', currency:'GBP', maximumFractionDigits:0}).format(value);
  function render() {
    const current = date.getFullYear() === now.getFullYear() && (mode === 'year' || date.getMonth() === now.getMonth());
    $('sales-period').textContent = mode === 'month' ? date.toLocaleDateString('en-GB', {month:'short', year:'numeric'}) : String(date.getFullYear());
    $('period-next').disabled = current;
    $('period-prev').setAttribute('aria-label', 'Previous ' + mode); $('period-next').setAttribute('aria-label', 'Next ' + mode);
    $('period-month').setAttribute('aria-pressed', String(mode === 'month')); $('period-year').setAttribute('aria-pressed', String(mode === 'year'));
    $('target-open').textContent = target ? money(target) + ' monthly target' : 'Set monthly target';
  }
  function move(step) { const next = new Date(date); if (mode === 'month') next.setMonth(next.getMonth()+step); else next.setFullYear(next.getFullYear()+step); if(next.getFullYear()>now.getFullYear() || (mode==='month' && next>new Date(now.getFullYear(),now.getMonth(),1))) return; date=next; render(); }
  $('period-prev').addEventListener('click',()=>move(-1)); $('period-next').addEventListener('click',()=>move(1));
  for (const m of ['month','year']) $('period-'+m).addEventListener('click',()=>{mode=m;if(mode==='month'&&date>new Date(now.getFullYear(),now.getMonth(),1))date=new Date(now.getFullYear(),now.getMonth(),1);render();});
  function dialog(id, heading, trigger) { const d=$(id); d.showModal(); d.scrollTop=0; $(heading).focus({preventScroll:true}); d.addEventListener('close',()=>trigger.focus(),{once:true}); }
  $('sales-open').addEventListener('click',e=>{$('sales-dialog-period').textContent=$('sales-period').textContent;dialog('sales-dialog','sales-dialog-title',e.currentTarget);});
  $('sales-close').addEventListener('click',()=>$('sales-dialog').close());
  $('target-open').addEventListener('click',e=>{$('target-amount').value=target || ''; $('target-feedback').textContent='';dialog('target-dialog','target-title',e.currentTarget);});
  $('target-close').addEventListener('click',()=>$('target-dialog').close());
  $('target-form').addEventListener('submit',async e=>{
    e.preventDefault();const value=Number($('target-amount').value);if(!Number.isInteger(value)||value<1||value>1000000)return;
    const submit=$('target-save');submit.disabled=true;$('target-feedback').textContent='Saving target…';
    try{applySettings(await api('POST',{monthlyTarget:value}));$('target-dialog').close();}
    catch(error){$('target-feedback').textContent=error.message;}finally{submit.disabled=false;}
  });
  render();
  api().then(applySettings).catch(error=>{$('payhip-status').textContent=error.message;$('payhip-setup').open=true;});
})();
