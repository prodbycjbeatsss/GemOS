import { releaseTitle, displayTitle } from '/checklist-title.js';
import { groupGeometry } from '/checklist-layout.js';
(() => {
  const $ = id => document.getElementById(id);
  let result = null, granted = false, busy = false;
  const message = text => { $('scan-message').textContent = text; };
  function controls() { $('asset-sync').disabled = busy || !granted; $('drive-connect').disabled = busy; $('project-folder').disabled = busy; document.querySelectorAll('.details-confirm').forEach(b=>b.disabled=busy); }
  async function api(action, body) {
    const r = await fetch('/api/youtube/' + action, { method: body ? 'POST' : 'GET', headers: body ? {'Content-Type':'application/json'} : {}, ...(body ? {body:JSON.stringify(body)} : {}), cache:'no-store',signal:AbortSignal.timeout(120000)});
    const data = await r.json();if(!r.ok)throw new Error(data.error || 'Unable to check files.');return data;
  }
  const stateLabel = state => ({Pass:'Ready',Missing:'Missing','Needs confirmation':'Needs attention'})[state] || 'Not checked';
  function render() {
    if(!result)return;
    const title = releaseTitle(result);
    $('checklist-project-title').textContent=displayTitle(title);
    $('checklist-project-title').title=title;
    $('checklist-project-title').setAttribute('aria-label',title);
    $('checklist-subtitle').textContent=`${result.ready}/7 ready`;
    $('drive-sync-status').textContent='Checked '+new Date(result.checkedAt).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
    document.querySelectorAll('[data-asset-index]').forEach((row,i)=>{
      const a=result.assets[i];row.dataset.state=a.state;
      const status=row.querySelector('.asset-status');
      status.dataset.symbol=a.state==='Pass'?'✓':a.state==='Missing'?'−':a.state==='Needs confirmation'?'!':'—';
      status.textContent=stateLabel(a.state)+(a.role==='shorts'&&a.state==='Missing'&&a.count>0?' · '+a.count+'/6':'');
    });
    message(result.ready===7?'All required asset categories qualify. Publishing is not connected.':'Scan complete. Missing or unresolved assets prevent readiness; publishing is not connected.');
    requestAnimationFrame(reflow);
  }
  async function scan(body,action='drive-scan') {
    if(busy)return;
    busy=true;controls();message('Checking Drive files…');
    try { result=await api(action,body);render();if($('asset-dialog').open)details(); }
    catch(e){message(e.message+(result?' Previous results remain visible and are stale.':''));$('drive-sync-status').textContent=result?'Refresh failed · stale':'Unable to check';}
    finally {busy=false;controls();}
  }
  function details() {
    const host=$('asset-detail-content');host.replaceChildren();
    if(!result){host.textContent='Scan a project folder first.';return;}
    const heading=document.createElement('h3');heading.className='details-release-name';heading.textContent=releaseTitle(result);
    const overview=document.createElement('div');overview.className='details-overview';
    const count=document.createElement('strong');count.textContent=`${result.ready}/7 ready`;
    const checked=document.createElement('p');checked.textContent='Last checked '+new Date(result.checkedAt).toLocaleString('en-GB');overview.append(count,checked);
    const folder=document.createElement('details');folder.className='details-folder';const folderLabel=document.createElement('summary');folderLabel.textContent='Original project folder name';const folderName=document.createElement('p');folderName.textContent=result.projectName;folder.append(folderLabel,folderName);
    host.append(heading,overview,folder);
    for(const a of result.assets){
      const section=document.createElement('section'),line=document.createElement('div'),title=document.createElement('h3'),badge=document.createElement('span'),note=document.createElement('p');section.className='details-asset';section.dataset.state=a.state;line.className='details-asset-heading';title.textContent=a.label;badge.className='details-badge';badge.textContent=a.role==='shorts'?`${a.count}/6 · ${stateLabel(a.state)}`:stateLabel(a.state);note.className='details-reason';note.textContent=a.reason;line.append(title,badge);section.append(line,note);
      if(a.files.length){const list=document.createElement('ul');list.className='details-file-list';for(const f of a.files){const li=document.createElement('li');li.textContent=f.name;list.append(li);}section.append(list);}
      if(a.state==='Needs confirmation'&&a.candidates.length){
        const selects=[];
        const total=a.role==='shorts'?6:1;
        for(let i=0;i<total;i++){
          const label=document.createElement('label');label.textContent=total===6?['Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][i]:'Correct file';
          const select=document.createElement('select');select.setAttribute('aria-label',a.label+' '+label.textContent);const empty=document.createElement('option');empty.value='';empty.textContent='Choose a file';select.append(empty);
          for(const f of a.candidates){const option=document.createElement('option');option.value=f.id;option.textContent=f.name;select.append(option);}label.append(select);selects.push(select);section.append(label);
        }
        const button=document.createElement('button');button.className='details-confirm';button.type='button';button.textContent='Confirm association';button.addEventListener('click',()=>{
          const ids=selects.map(s=>s.value);if(ids.some(v=>!v)||new Set(ids).size!==total){note.textContent='Choose the required distinct files.';return;}
          button.disabled=true;scan({folder:result.folderId,role:a.role,ids},'drive-confirm');
        });section.append(button);
      }
      host.append(section);
    }
    const boundary=document.createElement('p');boundary.className='details-boundary';boundary.textContent='Checks file metadata only. Audio quality and archive contents have not been inspected.';host.append(boundary);
  }
  $('asset-sync').addEventListener('click',()=>scan({folder:$('project-folder').value.trim()}));
  $('drive-connect').addEventListener('click',async()=>{
    busy=true;controls();try{const data=await api('start-drive',{});const u=new URL(data.url);if(u.origin!=='https://accounts.google.com'||u.pathname!=='/o/oauth2/v2/auth')throw new Error('Invalid Google connection link.');location.assign(u.href);}catch(e){message(e.message);busy=false;controls();}
  });
  $('asset-details').addEventListener('click',()=>{details();$('asset-dialog').showModal();});
  $('asset-close').addEventListener('click',()=>$('asset-dialog').close());
  $('asset-dialog').addEventListener('close',()=>$('asset-details').focus());
  let layoutQueued=false;
  const grid=document.querySelector('.section-one-grid');
  const cards=[...grid.querySelectorAll('.hero-spotlight-card')];
  cards.forEach(card=>card.querySelector('.dashboard-card-main').nextElementSibling.classList.add('group-card-footer'));
  function reflow(){
    if(layoutQueued)return;
    layoutQueued=true;
    requestAnimationFrame(()=>{
      grid.classList.remove('text-reflow');grid.style.removeProperty('--paired-card-height');
      grid.classList.add('g1-measuring');
      const measurements=cards.map(card=>{
        const style=getComputedStyle(card),rect=el=>el.getBoundingClientRect().height;
        return {header:rect(card.querySelector('.group-card-header')),recess:rect(card.querySelector('.recessed-dock')),footer:rect(card.querySelector('.group-card-footer')),insets:parseFloat(style.paddingTop)+parseFloat(style.paddingBottom)+parseFloat(style.borderTopWidth)+parseFloat(style.borderBottomWidth)};
      });
      const dimensions=groupGeometry(measurements,innerWidth<360?532:512);
      for(const [key,value] of Object.entries(dimensions))grid.style.setProperty('--g1-'+(key==='slot'?'slot':key)+'-height',value+'px');
      grid.classList.remove('g1-measuring');layoutQueued=false;
    });
  }
  let bufferTrigger=null;
  function bufferDetails(selectedName){
    const host=$('buffer-detail-content');host.replaceChildren();
    const overview=document.createElement('div');overview.className='details-overview';const heading=document.createElement('strong');heading.textContent='Scheduling not connected';const note=document.createElement('p');note.textContent='The three weeks and project statuses on the card are illustrative. Your real buffer is not calculated yet.';overview.append(heading,note);host.append(overview);
    const section=(title,text)=>{const block=document.createElement('section');block.className='details-asset';const line=document.createElement('div');line.className='details-asset-heading';const h=document.createElement('h3');h.textContent=title;line.append(h);const p=document.createElement('p');p.className='details-reason';p.textContent=text;block.append(line,p);host.append(block);return block;};
    const rows=[...document.querySelectorAll('[data-buffer-sample]')].filter(row=>!selectedName||row.dataset.bufferSample===selectedName);
    for(const row of rows){const block=section(row.dataset.bufferSample+' · example',row.querySelector('.buffer-project-date').textContent+' · '+row.querySelector('.buffer-project-badge').textContent+' (illustrative)');const p=document.createElement('p');p.className='details-reason';p.textContent='Required: Monday main YouTube release, then six Tuesday–Sunday clips on YouTube Shorts, TikTok and Instagram Reels.';block.append(p);}
    section('What counts as a covered week','19 confirmed scheduled uploads: one main YouTube video plus six Shorts on each of the three short-form platforms. Every required destination must qualify.');
    section('How the buffer is counted','Consecutive covered weeks in Europe/London, stopping at the first gap or unfinished week. Later bookings beyond a gap do not extend uninterrupted coverage.');
    section('What does not count','Planned dates, submitted requests without acceptance, reminder-only tasks and file readiness alone do not establish scheduling confirmation.');
    if(result)section('Current asset check · '+releaseTitle(result),`${result.ready}/7 categories ready. This is a separate Drive file check, not confirmation that this release is scheduled.`);
    section('Next connection needed','Choose and connect the authoritative release records and platform or scheduler confirmation source. Then GemOS can show your real coverage date and next releases.');
  }
  function openBufferPreview(trigger,name){bufferTrigger=trigger;$('buffer-preview-title').textContent=name?name+' · example':'Release Buffer details';bufferDetails(name);$('buffer-preview-dialog').showModal();}
  $('buffer-preview-details').addEventListener('click',event=>openBufferPreview(event.currentTarget));
  document.querySelectorAll('[data-buffer-sample]').forEach(button=>button.addEventListener('click',()=>openBufferPreview(button,button.dataset.bufferSample)));
  $('buffer-preview-close').addEventListener('click',()=>$('buffer-preview-dialog').close());
  $('buffer-preview-dialog').addEventListener('close',()=>bufferTrigger?.focus());
  const layoutObserver=new ResizeObserver(reflow);cards.forEach(card=>card.querySelectorAll('.group-card-header,.recessed-dock>div,.group-card-footer').forEach(el=>layoutObserver.observe(el)));window.addEventListener('resize',reflow);document.fonts?.ready.then(reflow);reflow();
  (async()=>{try{const data=await api('drive-status');granted=data.driveGranted;$('drive-access').textContent=granted?'Saved read-only Drive permission found.':'YouTube access alone cannot scan Drive. Add read-only Drive access once.';
    if(data.folderId)$('project-folder').value='https://drive.google.com/drive/folders/'+data.folderId;
    if(data.result){result=data.result;render();$('drive-sync-status').textContent='Saved check · not refreshed';message('Saved results restored. Press Sync to check current files.');}
  }catch(e){$('drive-access').textContent=e.message;}finally{controls();}})();
})();
