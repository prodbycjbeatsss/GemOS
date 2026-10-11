(() => {
  const $ = id => document.getElementById(id);
  const now = new Date(); let date = new Date(now.getFullYear(), now.getMonth(), 1), mode = 'month', target = null;
  const key = 'gemos-payhip-monthly-target-v1';
  try { const value = Number(localStorage.getItem(key)); if (Number.isInteger(value) && value >= 1 && value <= 1000000) target = value; } catch {}
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
  $('target-form').addEventListener('submit',e=>{e.preventDefault();const value=Number($('target-amount').value);if(!Number.isInteger(value)||value<1||value>1000000)return;try{localStorage.setItem(key,String(value));target=value;render();$('target-dialog').close();}catch{$('target-feedback').textContent='Could not save the target on this browser. Try again.';}});
  render();
})();
