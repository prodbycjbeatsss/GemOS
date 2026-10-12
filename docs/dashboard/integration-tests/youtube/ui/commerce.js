(() => {
  const $ = id => document.getElementById(id);
  const uk=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',year:'numeric',month:'numeric'}).formatToParts(new Date());
  const now = new Date(Number(uk.find(p=>p.type==='year').value),Number(uk.find(p=>p.type==='month').value)-1,1); let date = new Date(now.getFullYear(), now.getMonth(), 1), mode = 'month', target = null;

  async function api(method='GET', value, action='settings') {
    const response=await fetch('/api/payhip/'+action,{method,credentials:'same-origin',headers:method==='POST'?{'Content-Type':'application/json'}:{},body:value===undefined?undefined:JSON.stringify(value)});
    let result;try{result=await response.json();}catch{throw Error('Could not load Payhip settings. Refresh and try again.');}
    if(!response.ok)throw Error(result.error||'Could not save Payhip settings.');return result;
  }
  function applySettings(value){
    target=value.monthlyTarget;
    if($('payhip-badge')){$('payhip-badge').textContent=value.verifiedAt?'Feed verified':value.keySaved?'Saved · awaiting notification':'Not connected';$('payhip-badge').dataset.state=value.verifiedAt?'saved':'none';}
    $('payhip-status').textContent=value.keySaved?(value.verifiedAt?'Feed verified · last notification '+new Date(value.verifiedAt).toLocaleString('en-GB',{timeZone:'Europe/London'}):'Key saved · awaiting a verified Payhip notification'):'No Payhip key saved yet';
    $('payhip-key').placeholder=value.keySaved?'Saved · enter a replacement only if needed':'Paste your Payhip API key';
    $('payhip-webhook').hidden=!value.webhookUrl;$('payhip-webhook-url').value=value.webhookUrl||'';
    $('payhip-copy').disabled=!value.receiverEnabled;
    $('payhip-webhook-help').textContent=value.receiverEnabled?'Paste this URL into Payhip Settings → Developer, then select paid and refunded.':'The separate receiver is prepared but not publicly enabled yet. Do not add this URL to Payhip until enabled.';
    $('commerce-context').textContent='Group 3 · Beat sales · '+(value.verifiedAt?'Notifications verified · received orders only':value.keySaved?'Connection saved · verification pending':'Payhip data not connected');
    $('payhip-setup').open=!value.keySaved;render();loadReport();
  }
  $('payhip-form').addEventListener('submit',async e=>{
    e.preventDefault();const input=$('payhip-key'),key=input.value.trim();
    if(!key){$('payhip-feedback').textContent='Enter a key to save or replace the connection.';return;}
    $('payhip-save').disabled=true;$('payhip-feedback').textContent='Saving connection…';
    try{applySettings(await api('POST',{apiKey:key}));input.value='';$('payhip-setup').open=true;$('payhip-feedback').textContent='Saved privately. Verification happens when a valid Payhip notification arrives.';}
    catch(error){$('payhip-feedback').textContent=error.message;}finally{$('payhip-save').disabled=false;}
  });
  $('payhip-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('payhip-webhook-url').value);$('payhip-feedback').textContent='Webhook URL copied.';}catch{$('payhip-feedback').textContent='Select the webhook URL and copy it manually.';}});
  const money = value => new Intl.NumberFormat('en-GB', {style:'currency', currency:'GBP', minimumFractionDigits:0, maximumFractionDigits:2}).format(value);
  function render() {
    const current = date.getFullYear() === now.getFullYear() && (mode === 'year' || date.getMonth() === now.getMonth());
    $('sales-period').textContent = mode === 'month' ? date.toLocaleDateString('en-GB', {month:'short', year:'numeric'}) : String(date.getFullYear());
    $('period-next').disabled = current;
    $('period-prev').setAttribute('aria-label', 'Previous ' + mode); $('period-next').setAttribute('aria-label', 'Next ' + mode);
    $('period-month').setAttribute('aria-pressed', String(mode === 'month')); $('period-year').setAttribute('aria-pressed', String(mode === 'year'));
    $('target-open').textContent = target ? money(target) + ' monthly target' : 'Set monthly target';
  }
  function move(step) { const next = new Date(date); if (mode === 'month') next.setMonth(next.getMonth()+step); else next.setFullYear(next.getFullYear()+step); if(next.getFullYear()>now.getFullYear() || (mode==='month' && next>new Date(now.getFullYear(),now.getMonth(),1))) return; date=next; render();loadReport(); }
  $('period-prev').addEventListener('click',()=>move(-1)); $('period-next').addEventListener('click',()=>move(1));
  for (const m of ['month','year']) $('period-'+m).addEventListener('click',()=>{mode=m;if(mode==='month'&&date>new Date(now.getFullYear(),now.getMonth(),1))date=new Date(now.getFullYear(),now.getMonth(),1);render();loadReport();});
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

  let generation=0;
  const node=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
  const formatDate=ms=>new Date(ms).toLocaleString('en-GB',{timeZone:'Europe/London'});
  function unavailable(message){
    $('sales-total').textContent='—';$('sales-total').setAttribute('aria-label','Sales revenue unavailable');
    $('sales-comparison').textContent=message;$('sales-state-title').textContent='Sales unavailable';$('sales-state-copy').textContent=message;
    for(const t of ['standard','premium','exclusive']){$(t+'-revenue').textContent='—';$(t+'-quantity').textContent='Sales unavailable';}
    $('sales-summary').textContent=message;$('sales-coverage').textContent='';$('sales-orders').replaceChildren();
  }
  function drawMappings(options){
    const container=$('licence-mappings');container.replaceChildren();
    if(!options.length){container.append(node('p','No licence option received yet. Repeat the coupon checkout to capture it.'));return;}
    options.forEach((option,index)=>{
      const wrap=node('div');wrap.className='mapping-option';const label=node('label',option.productName+' · '+(option.variantName||option.variantId||'Single-option product'));
      const select=node('select');select.id='licence-option-'+index;label.htmlFor=select.id;
      for(const [v,text] of [['','Choose licence…'],['standard','Standard'],['premium','Premium'],['exclusive','Exclusive']]){const o=node('option',text);o.value=v;select.append(o);}
      select.value=option.tier||'';
      select.addEventListener('change',async()=>{const chosen=select.value;select.disabled=true;$('mapping-feedback').textContent='Saving licence mapping…';
        try{await api('POST',{optionKey:option.key,tier:chosen||null},'mapping');$('mapping-feedback').textContent='Licence mapping saved.';await loadReport();}
        catch(e){select.value=option.tier||'';$('mapping-feedback').textContent=e.message;}finally{select.disabled=false;}
      });wrap.append(label,select);container.append(wrap);
    });
  }
  function drawReport(r){
    if(!r.verified){unavailable('Awaiting a verified notification');drawMappings(r.options);return;}
    $('sales-total').textContent=money(r.gross/100);$('sales-total').setAttribute('aria-label','Received GBP sales '+money(r.gross/100));
    $('sales-comparison').textContent=r.paidOrders+' paid orders · before fees & refunds';
    $('sales-state-title').textContent=r.attention||r.refundAttention?'Orders need attention':r.paidOrders?'Received sales':'No paid sales yet';
    $('sales-state-copy').textContent=r.unallocated?money(r.unallocated/100)+' awaiting licence mapping':r.attention||r.refundAttention?'Open View sales to review unresolved orders.':r.freeOrders?r.freeOrders+' free checkouts · excluded from paid sales':'Only notifications received by GemOS are included.';
    for(const t of ['standard','premium','exclusive']){const v=r.tiers[t];$(t+'-revenue').textContent=money(v.revenue/100);$(t+'-revenue').setAttribute('aria-label',t+' received revenue '+money(v.revenue/100));$(t+'-quantity').textContent=v.quantity+' sold';$(t+'-quantity').setAttribute('aria-label',t+' quantity '+v.quantity);}
    $('sales-dialog-period').textContent=$('sales-period').textContent;
    $('sales-summary').textContent=money(r.gross/100)+' received · '+r.paidOrders+' paid orders. '+money(r.unallocated/100)+' unallocated. '+money(r.refunds/100)+' confirmed refunds, shown separately. '+r.freeOrders+' free checkouts · '+r.excludedOrders+' excluded tests · '+r.attention+' orders and '+r.refundAttention+' refunds need attention.';
    $('sales-coverage').textContent='GBP amounts as reported by Payhip, before fees; no tax adjustment is made. Europe/London periods. No historical import.'+(r.firstReceived?' First notification: '+formatDate(r.firstReceived)+'.':'');
    const list=$('sales-orders');list.replaceChildren();
    if(!r.orders.length)list.append(node('p','No notifications for this period.'));
    for(const order of r.orders){const entry=node('div');entry.className='order-entry';entry.append(node('strong',order.state+(order.tier?' · '+order.tier:'')),node('p',formatDate(order.date)+' · '+order.currency+' '+(order.amount===null?'Amount unavailable':(order.amount/100).toFixed(2))));
      for(const i of order.items)entry.append(node('p',i.productName+' · '+(i.variantName||i.variantId||'Licence option unavailable')+' × '+i.quantity));
      if(order.refund!==null)entry.append(node('p','Reported refund: '+order.currency+' '+(order.refund/100).toFixed(2)));
      const button=node('button',order.excluded?'Include order':'Exclude test order');button.type='button';
      button.addEventListener('click',async()=>{button.disabled=true;try{await api('POST',{transactionId:order.id,excluded:!order.excluded},'exclude');await loadReport();}catch(e){$('sales-summary').textContent=e.message;}finally{button.disabled=false;}});entry.append(button);list.append(entry);
    }
    drawMappings(r.options);
  }
  async function loadReport(){
    const id=++generation;unavailable('Loading received sales…');$('sales-refresh').disabled=true;
    try{const value=await api('GET',undefined,'report?year='+date.getFullYear()+(mode==='month'?'&month='+(date.getMonth()+1):''));if(id!==generation)return;drawReport(value);$('commerce-context').textContent='Group 3 · Beat sales · Received notifications only';}
    catch(e){if(id===generation)unavailable(e.message);}finally{if(id===generation)$('sales-refresh').disabled=false;}
  }
  $('sales-refresh').addEventListener('click',loadReport);
  render();
  api().then(applySettings).catch(error=>{$('payhip-status').textContent=error.message;$('payhip-setup').open=true;});
})();
