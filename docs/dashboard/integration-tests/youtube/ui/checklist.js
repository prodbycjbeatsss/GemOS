import { releaseTitle, displayTitle } from '/checklist-title.js';
import { groupGeometry } from '/checklist-layout.js';
(() => {
  const $ = id => document.getElementById(id);
  let result = null, granted = false, busy = false, projects = [], selectedId = '', folders = {}, discoveredAt = null;
  const message = text => { $('scan-message').textContent = text; };
  function controls() {
    $('release-selector').disabled=busy || !projects.length;
    $('release-picker').disabled=busy || !projects.length;
    $('release-picker-name').textContent=projects.find(p=>p.id===selectedId)?.metadata.title || 'Choose a release…';
    $('refresh-release-list').disabled=busy || !granted || !folders.production;
    $('save-release-folders').disabled=busy || !granted;
    $('scan-individual').disabled=busy || !granted;
    ['production-folder','queue-folder','released-folder'].forEach(id=>$(id).disabled=busy); $('asset-sync').disabled = busy || !granted || !selectedId; $('drive-connect').disabled = busy; $('project-folder').disabled = busy; document.querySelectorAll('.details-confirm').forEach(b=>b.disabled=busy); }
  async function api(action, body) {
    const r = await fetch('/api/youtube/' + action, { method: body ? 'POST' : 'GET', headers: body ? {'Content-Type':'application/json'} : {}, ...(body ? {body:JSON.stringify(body)} : {}), cache:'no-store',signal:AbortSignal.timeout(120000)});
    const data = await r.json();if(!r.ok)throw new Error(data.error || 'Unable to check files.');return data;
  }
  const stateLabel = state => ({Pass:'Ready',Missing:'Missing','Needs confirmation':'Needs attention'})[state] || 'Not checked';
  function render() {
    if(!result){
      const project=projects.find(p=>p.id===selectedId);
      $('checklist-project-title').textContent=project?displayTitle(project.metadata.title):'Choose a release';
      $('checklist-project-title').title=project?.name || '';
      $('checklist-project-title').setAttribute('aria-label',project?.name || 'Choose a release');
      $('checklist-subtitle').textContent='Not checked';$('drive-sync-status').textContent='Not checked';
      document.querySelectorAll('[data-asset-index]').forEach(row=>{row.dataset.state='Unchecked';const status=row.querySelector('.asset-status');status.textContent='-';status.setAttribute('aria-label','Not checked');status.title='Not checked';});
      requestAnimationFrame(reflow);return;
    }
    const title = releaseTitle(result);
    $('checklist-project-title').textContent=displayTitle(title);
    $('checklist-project-title').title=title;
    $('checklist-project-title').setAttribute('aria-label',title);
    $('checklist-subtitle').textContent=`${result.ready}/${result.total} ready`;
    $('drive-sync-status').textContent='Checked '+new Date(result.checkedAt).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
    document.querySelectorAll('[data-asset-index]').forEach(row=>{
      const a=result.assets.find(asset=>asset.role===row.dataset.role);row.dataset.state=a.state;
      const status=row.querySelector('.asset-status');
      status.textContent=a.state==='Pass'?'✓':a.state==='Missing'?'×':a.state==='Needs confirmation'?'!':'-';
      const description=stateLabel(a.state)+(a.role==='shorts'?' · '+a.count+'/6 clips':'');
      status.setAttribute('aria-label',description);status.title=description;
    });
    message(result.ready===result.total?'All required asset categories qualify. Publishing is not connected.':'Scan complete. Missing or unresolved assets prevent readiness; publishing is not connected.');
    requestAnimationFrame(reflow);
  }
  async function scan(body,action='drive-scan') {
    if(busy)return;
    busy=true;controls();message('Checking Drive files…');
    try { result=await api(action,body);selectedId=result.folderId;render();if($('asset-dialog').open)details();
      try{applyCatalogue(await api('drive-status'),false);if($('asset-dialog').open)details();}catch{ $('project-list-status').textContent='File check saved. Release list could not refresh; reload to restore the selection.';}
    }
    catch(e){message(e.message+(result?' Previous results remain visible and are stale.':''));$('drive-sync-status').textContent=result?'Refresh failed · stale':'Unable to check';}
    finally {busy=false;controls();}
  }
  const stageLabels={production:'In Production',queue:'Release Queue',released:'Released',manual:'Individual folders',unavailable:'Not in connected folders'};
  function applyCatalogue(data,restore=true){
    projects=data.projects || [];folders=data.folders || {};discoveredAt=data.discoveredAt;
    if(restore){selectedId=data.folderId || '';result=data.result || null;}
    const picker=$('release-selector');picker.replaceChildren();
    const placeholder=document.createElement('option');placeholder.value='';placeholder.textContent='Choose a release…';placeholder.disabled=true;picker.append(placeholder);
    for(const stage of ['production','queue','released','manual','unavailable']){
      const matches=projects.filter(p=>p.stage===stage).sort((a,b)=>a.name.localeCompare(b.name));if(!matches.length)continue;
      const group=document.createElement('optgroup');group.label=stageLabels[stage];
      for(const project of matches){const option=document.createElement('option');option.value=project.id;option.textContent=project.name+(matches.filter(p=>p.name===project.name).length>1?' · '+project.id.slice(-4):'');group.append(option);}picker.append(group);
    }
    picker.value=selectedId;
    for(const [stage,id] of Object.entries(folders))$(stage==='production'?'production-folder':stage==='queue'?'queue-folder':'released-folder').value=id?'https://drive.google.com/drive/folders/'+id:'';
    if(selectedId)$('project-folder').value='https://drive.google.com/drive/folders/'+selectedId;
    $('folder-message').textContent=folders.production?'Connected music-release stage folders.':'Connect In Production to start discovery. Queue and Released can be added later.';
    $('project-list-status').textContent=discoveredAt?'Saved release list · '+new Date(discoveredAt).toLocaleString('en-GB')+(projects.some(p=>p.stage==='unavailable')?' · some saved projects are outside the connected folders.':''):projects.length?'Your existing project is saved. Connect stage folders to discover more.':'Connect your music-release folders to discover projects.';
    if(restore){render();if(result){$('drive-sync-status').textContent=result.needsRescan?'Sync needed · Beat WAV unchecked':'Saved check · not refreshed';message('Saved results for this release. Press Sync to check current files.');}else message(selectedId?'Select Sync to check this release.':'Choose a release to check.');}
    controls();
  }
  async function discover(body,action){
    if(busy)return;busy=true;controls();$('project-list-status').textContent='Reading release folders…';$('folder-message').textContent='Checking folder connections…';
    try{const data=await api(action,body);applyCatalogue(data,false);$('project-list-status').textContent='Release list refreshed · '+projects.filter(p=>!['manual','unavailable'].includes(p.stage)).length+' projects found.';$('release-connections').open=false;}
    catch(e){$('project-list-status').textContent=e.message+' Last saved list retained.';$('folder-message').textContent=e.message;}
    finally{busy=false;controls();}
  }
  $('release-folder-form').addEventListener('submit',event=>{event.preventDefault();discover({production:$('production-folder').value.trim(),queue:$('queue-folder').value.trim(),released:$('released-folder').value.trim()},'drive-folders');});
  $('refresh-release-list').addEventListener('click',()=>discover({},'drive-discover'));
  $('release-selector').addEventListener('change',()=>selectProject($('release-selector').value));
  async function selectProject(id){
    if(busy)return;const previous=selectedId;
    if($('file-dialog').open)$('file-dialog').close();busy=true;selectedId=id;result=null;render();controls();message('Loading saved checks…');
    try{applyCatalogue(await api('drive-select',{folder:id}));if($('asset-dialog').open)details();}
    catch(e){selectedId=previous;try{applyCatalogue(await api('drive-status'));}catch{selectedId='';result=null;render();}message(e.message);}
    finally{busy=false;controls();}
  }
  $('scan-individual').addEventListener('click',()=>scan({folder:$('project-folder').value.trim()}));
  function details() {
    const host=$('asset-detail-content');host.replaceChildren();
    const project=projects.find(p=>p.id===selectedId);
    if(!result&&!project){host.textContent='Choose a release first.';return;}
    const heading=document.createElement('h3');heading.className='details-release-name';heading.textContent=result?releaseTitle(result):project.metadata.title;
    const overview=document.createElement('div');overview.className='details-overview';
    const count=document.createElement('strong');count.textContent=result?`${result.ready}/${result.total} ready`:'Not checked';
    const checked=document.createElement('p');checked.textContent=result?'Last checked '+new Date(result.checkedAt).toLocaleString('en-GB'):'No saved file check for this release.';overview.append(count,checked);
    const folder=document.createElement('details');folder.className='details-folder';const folderLabel=document.createElement('summary');folderLabel.textContent='Original project folder name';const folderName=document.createElement('p');folderName.textContent=result?.projectName || project.name;folder.append(folderLabel,folderName);
    host.append(heading,overview,folder);
    if(project){
      const metadata=document.createElement('section');metadata.className='details-asset';const label=document.createElement('h3');label.textContent='Suggested details · folder name';
      metadata.append(label);for(const [key,value] of [['Artist',project.metadata.artist],['Track',project.metadata.title],['BPM',project.metadata.bpm],['Key',project.metadata.key],['Credits',project.metadata.credits.join(' · ')],['Folder stage',stageLabels[project.stage]]])if(value){const p=document.createElement('p');p.className='details-reason';p.textContent=key+': '+value;metadata.append(p);}
      const note=document.createElement('p');note.className='details-reason';note.textContent='Suggestions only. Approval and publishing metadata are not connected.';metadata.append(note);host.append(metadata);
    }
    for(const a of result?.assets || []){
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
  $('asset-sync').addEventListener('click',()=>scan({folder:selectedId}));
  $('drive-connect').addEventListener('click',async()=>{
    busy=true;controls();try{const data=await api('start-drive',{});const u=new URL(data.url);if(u.origin!=='https://accounts.google.com'||u.pathname!=='/o/oauth2/v2/auth')throw new Error('Invalid Google connection link.');location.assign(u.href);}catch(e){message(e.message);busy=false;controls();}
  });
  function pickerDetails(){
    const host=$('release-picker-content');host.replaceChildren();
    for(const stage of ['production','queue','released','manual','unavailable']){
      const matches=projects.filter(p=>p.stage===stage).sort((a,b)=>a.name.localeCompare(b.name));if(!matches.length)continue;
      const section=document.createElement('section');section.className='picker-stage';const heading=document.createElement('h3');heading.textContent=stageLabels[stage];section.append(heading);
      for(const project of matches){
        const choice=document.createElement('button');choice.type='button';choice.className='picker-choice';choice.setAttribute('aria-pressed',String(project.id===selectedId));choice.title=project.name;
        const copy=document.createElement('span');copy.className='picker-choice-copy';const name=document.createElement('span');name.className='picker-choice-title';name.textContent=project.metadata.title;copy.append(name);
        const subtitle=document.createElement('span');subtitle.className='picker-choice-artist';subtitle.textContent=[project.metadata.artist,matches.filter(p=>p.metadata.title===project.metadata.title&&p.metadata.artist===project.metadata.artist).length>1?project.id.slice(-4):null].filter(Boolean).join(' · ');if(subtitle.textContent)copy.append(subtitle);
        const tick=document.createElement('span');tick.setAttribute('aria-hidden','true');tick.textContent=project.id===selectedId?'✓':'';choice.append(copy,tick);
        choice.addEventListener('click',()=>{$('release-picker-dialog').close();if(project.id!==selectedId)selectProject(project.id);});section.append(choice);
      }host.append(section);
    }
  }
  $('release-picker').addEventListener('click',()=>{pickerDetails();$('release-picker-dialog').showModal();});
  $('release-picker-close').addEventListener('click',()=>$('release-picker-dialog').close());
  $('release-picker-dialog').addEventListener('close',()=>$('release-picker').focus());
  let fileTrigger=null;
  document.querySelectorAll('[data-asset-index]').forEach(tile=>tile.addEventListener('click',()=>{
    fileTrigger=tile;const asset=result?.assets.find(a=>a.role===tile.dataset.role),host=$('file-detail-content');host.replaceChildren();
    $('file-dialog-title').textContent=tile.querySelector('.asset-name').textContent+' · '+tile.querySelector('.asset-type').textContent;
    const badge=document.createElement('span');badge.className='details-badge';badge.textContent=stateLabel(asset?.state);host.dataset.state=asset?.state || 'Unchecked';host.append(badge);
    if(asset?.files?.length){for(const file of asset.files){const name=document.createElement('p');name.className='file-connected-name';name.textContent=file.name;host.append(name);}}
    else {const empty=document.createElement('p');empty.textContent='No file connected';host.append(empty);}
    if(!result || asset?.state==='Unchecked' || asset?.state==='Needs confirmation'){
      const note=document.createElement('p');note.className='details-reason';note.textContent=asset?.state==='Needs confirmation'?'Choose the correct file in Release details.':selectedId?'Press Sync to check this release.':'Choose a release first.';host.append(note);
    }
    $('file-dialog').showModal();
  }));
  $('file-close').addEventListener('click',()=>$('file-dialog').close());
  $('file-dialog').addEventListener('close',()=>fileTrigger?.focus());
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
    const overview=document.createElement('div');overview.className='details-overview';const heading=document.createElement('strong');heading.textContent='Scheduling not connected';const note=document.createElement('p');note.textContent='No scheduled releases are shown. GemOS cannot calculate coverage until scheduling confirmations are connected.';overview.append(heading,note);host.append(overview);
    const section=(title,text)=>{const block=document.createElement('section');block.className='details-asset';const line=document.createElement('div');line.className='details-asset-heading';const h=document.createElement('h3');h.textContent=title;line.append(h);const p=document.createElement('p');p.className='details-reason';p.textContent=text;block.append(line,p);host.append(block);return block;};
    section('What counts as a covered week','19 confirmed scheduled uploads: one main YouTube video plus six Shorts on each of the three short-form platforms. Every required destination must qualify.');
    section('How the buffer is counted','Consecutive covered weeks in Europe/London, stopping at the first gap or unfinished week. Later bookings beyond a gap do not extend uninterrupted coverage.');
    section('What does not count','Planned dates, submitted requests without acceptance, reminder-only tasks and file readiness alone do not establish scheduling confirmation.');
    if(result)section('Current asset check · '+releaseTitle(result),`${result.ready}/${result.total} categories ready. This is a separate Drive file check, not confirmation that this release is scheduled.`);
    section('Next connection needed','Choose and connect the authoritative release records and platform or scheduler confirmation source. Then GemOS can show your real coverage date and next releases.');
  }
  function openBufferPreview(trigger,name){bufferTrigger=trigger;$('buffer-preview-title').textContent='Release Buffer details';bufferDetails(name);$('buffer-preview-dialog').showModal();}
  $('buffer-preview-details').addEventListener('click',event=>openBufferPreview(event.currentTarget));
  $('buffer-preview-close').addEventListener('click',()=>$('buffer-preview-dialog').close());
  $('buffer-preview-dialog').addEventListener('close',()=>bufferTrigger?.focus());
  const layoutObserver=new ResizeObserver(reflow);cards.forEach(card=>card.querySelectorAll('.group-card-header,.recessed-dock>div,.group-card-footer').forEach(el=>layoutObserver.observe(el)));window.addEventListener('resize',reflow);document.fonts?.ready.then(reflow);reflow();
  (async()=>{try{const data=await api('drive-status');granted=data.driveGranted;$('drive-access').textContent=granted?'Saved read-only Drive permission found.':'YouTube access alone cannot scan Drive. Add read-only Drive access once.';
    applyCatalogue(data);$('release-connections').open=!data.folders?.production;
    if(data.folders?.production&&granted)await discover({},'drive-discover');
  }catch(e){$('drive-access').textContent=e.message;}finally{controls();}})();
})();
