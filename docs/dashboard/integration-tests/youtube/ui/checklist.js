import { releaseTitle, displayTitle, releaseDetails } from '/checklist-title.js';
import { groupGeometry } from '/checklist-layout.js';
(() => {
  const $ = id => document.getElementById(id);
  let result = null, granted = false, busy = false, projects = [], selectedId = '', folders = {}, discoveredAt = null, moveGranted = false;
  const message = text => { $('scan-message').textContent = text; };
  function driveLink(id,kind,text,label){
    if(typeof id!=='string'||!/^[A-Za-z0-9_-]{6,200}$/.test(id))return null;
    const link=document.createElement('a');link.className='details-drive-link';link.href=kind==='folder'?'https://drive.google.com/drive/folders/'+encodeURIComponent(id):'https://drive.google.com/file/d/'+encodeURIComponent(id)+'/view';link.target='_blank';link.rel='noopener noreferrer';link.textContent=text;link.setAttribute('aria-label',label);return link;
  }
  function appendFileLink(host,file){
    const link=driveLink(file.id,'file','Open file ↗','Open '+file.name+' in Google Drive');if(link){link.className+=' drive-file-link';host.append(link);}
  }
  function controls() {
    $('drive-move-connect').disabled=busy;
    document.querySelectorAll('.prepare-form input,.prepare-form button,#file-dialog select,#file-dialog .details-confirm').forEach(el=>el.disabled=busy);
    if($('prepare-save'))$('prepare-save').disabled=busy || !result;
    if($('prepare-ready'))$('prepare-ready').disabled=busy || !result || result.ready!==8 || !$('prepare-ready').dataset.reviewedAt;
    $('release-selector').disabled=busy || !projects.length;
    $('release-picker').disabled=busy || !projects.length;
    $('release-picker-name').textContent=(projects.find(p=>p.id===selectedId)?.review?.metadata.title || projects.find(p=>p.id===selectedId)?.metadata.title) || 'Choose a release…';
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
      $('checklist-project-title').textContent=project?displayTitle(project.review?.metadata.title || project.metadata.title):'Choose a release';
      $('checklist-project-title').title=project?.name || '';
      $('checklist-project-title').setAttribute('aria-label',project?.name || 'Choose a release');
      $('checklist-subtitle').textContent='Not checked';$('drive-sync-status').textContent='Not checked';
      document.querySelectorAll('[data-asset-index]').forEach(row=>{row.dataset.state='Unchecked';const status=row.querySelector('.asset-status');status.textContent='-';status.setAttribute('aria-label','Not checked');status.title='Not checked';});
      requestAnimationFrame(reflow);return;
    }
    const title = projects.find(p=>p.id===selectedId)?.review?.metadata.title || releaseTitle(result);
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
    busy=true;controls();message('Checking Drive files…');$('drive-sync-status').textContent='Checking…';
    try { result=await api(action,body);selectedId=result.folderId;render();if($('asset-dialog').open)details();
      try{applyCatalogue(await api('drive-status'),false);if($('asset-dialog').open)details();}catch{ $('project-list-status').textContent='File check saved. Release list could not refresh; reload to restore the selection.';}
    }
    catch(e){message(e.message+(result?' Previous results remain visible and are stale.':''));$('drive-sync-status').textContent=result?'Refresh failed · stale':'Unable to check';}
    finally {busy=false;controls();}
  }
  const stageLabels={production:'In Production',queue:'Release Queue',released:'Released',manual:'Individual folders',unavailable:'Not in connected folders'};
  function applyCatalogue(data,restore=true){
    if(typeof data.moveGranted==='boolean')moveGranted=data.moveGranted;
    $('drive-move-status').textContent=moveGranted?'Folder moves enabled.':'File checks work with read-only access. Enable folder moves when ready.';
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
    if(busy||id===selectedId)return;const previous=selectedId;let loaded=false;
    if($('file-dialog').open)$('file-dialog').close();if($('asset-dialog').open)$('asset-dialog').close();busy=true;selectedId=id;result=null;render();controls();message('Loading saved checks…');
    try{applyCatalogue(await api('drive-select',{folder:id}));loaded=true;}
    catch(e){selectedId=previous;try{applyCatalogue(await api('drive-status'));}catch{selectedId='';result=null;render();}message(e.message);}
    finally{busy=false;controls();}
    if(loaded&&granted)await scan({folder:id});
  }
  $('scan-individual').addEventListener('click',()=>scan({folder:$('project-folder').value.trim()}));
  function associationControls(host,a){
    if(a.state!=='Needs confirmation'||!a.candidates?.length)return;
    const selects=[],total=a.role==='shorts'?6:1;
    for(let i=0;i<total;i++){
      const label=document.createElement('label');label.textContent=total===6?['Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][i]:'Correct file';
      const select=document.createElement('select');select.setAttribute('aria-label',a.label+' '+label.textContent);
      const empty=document.createElement('option');empty.value='';empty.textContent='Choose a file';select.append(empty);
      for(const file of a.candidates){const option=document.createElement('option');option.value=file.id;option.textContent=file.name;select.append(option);}label.append(select);selects.push(select);host.append(label);
    }
    const note=document.createElement('p');note.className='details-reason';note.setAttribute('role','status');
    const button=document.createElement('button');button.type='button';button.className='details-confirm';button.textContent='Confirm file';
    button.addEventListener('click',async()=>{
      const ids=selects.map(el=>el.value);if(ids.some(v=>!v)||new Set(ids).size!==total){note.textContent='Choose the required distinct files.';return;}
      await scan({folder:selectedId,role:a.role,ids},'drive-confirm');
      if($('file-dialog').open)fileDetails(fileTrigger);
    });host.append(note,button);
  }
  function details() {
    const host=$('asset-detail-content');host.replaceChildren();$('asset-dialog-title').textContent='Prepare release';
    const project=projects.find(p=>p.id===selectedId);
    if(!project&&!result){host.textContent='Choose a release first.';return;}
    const data=releaseDetails(result,project),saved=project?.review?.metadata;
    const heading=document.createElement('h3');heading.className='details-release-name';heading.textContent=[saved?.artist||data.artist,saved?.title||data.title].filter(Boolean).join(' - ');
    const description=document.createElement('p');description.className='details-beat-description';description.textContent=data.beatDescription || '';description.hidden=!data.beatDescription;
    const overview=document.createElement('div');overview.className='details-overview';const count=document.createElement('strong');count.textContent=result?`${result.ready}/${result.total} PASSED`:'Not checked';
    const note=document.createElement('p');note.textContent=!result?'Sync to check your files.':result.ready!==8?'Resolve outstanding files, then save your review.':'Review metadata and Shorts before confirming ready.';
    const checked=document.createElement('p');checked.textContent=result?'Last checked: '+new Date(result.checkedAt).toLocaleString('en-GB'):'Last checked: Not checked';overview.append(count,note,checked);host.append(heading,description,overview);
    const form=document.createElement('form');form.className='prepare-form';
    const metadata=document.createElement('section');metadata.className='details-asset project-metadata';const label=document.createElement('h3');label.textContent='Project metadata';metadata.append(label);
    const inputs={};
    for(const [key,title,value] of [['artist','Artist',saved?.artist??data.artist],['title','Track name',saved?.title??data.title],['bpm','BPM',saved?.bpm??data.bpm],['key','Key',saved?.key??data.key],['credits','Credits',saved?.credits??data.credits.join(' · ')]]){
      const row=document.createElement('label');row.textContent=title;const input=document.createElement('input');input.type=key==='bpm'?'number':'text';input.value=value??'';input.required=['artist','title'].includes(key);input.maxLength=key==='credits'?240:key==='key'?24:160;
      if(key==='bpm'){input.min='30';input.max='300';input.step='1';}input.setAttribute('aria-label',title);inputs[key]=input;row.append(input);metadata.append(row);
    }
    const link=driveLink(selectedId,'folder','Open folder ↗','Open this release folder in Google Drive');if(link)metadata.append(link);form.append(metadata);
    const outstanding=document.createElement('section');outstanding.className='details-asset';const labelFiles=document.createElement('h3');labelFiles.textContent='Outstanding files';outstanding.append(labelFiles);
    const missing=result?.assets.filter(a=>a.state!=='Pass') || [];
    if(!result||!missing.length){const text=document.createElement('p');text.className='details-reason';text.textContent=result?'All eight checks passed.':'Sync to check this release.';outstanding.append(text);}
    for(const a of missing){const button=document.createElement('button');button.type='button';button.className='prepare-file-action';button.textContent=a.label+' · '+stateLabel(a.state)+' →';button.addEventListener('click',()=>{$('asset-dialog').close();const tile=[...document.querySelectorAll('[data-asset-index]')].find(t=>t.dataset.role===a.role);fileTrigger=tile;fileDetails(tile);openDialog('file-dialog','file-dialog-title');});outstanding.append(button);}form.append(outstanding);
    const shorts=result?.assets.find(a=>a.role==='shorts');let shortsReview=null;
    if(shorts?.state==='Pass'){
      const section=document.createElement('section');section.className='details-asset';const title=document.createElement('h3');title.textContent='Shorts order';section.append(title);
      const list=document.createElement('ol');list.className='prepare-shorts';shorts.files.forEach((f,i)=>{const li=document.createElement('li');const day=document.createElement('strong');day.textContent=['Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][i];const name=document.createElement('span');name.textContent=f.name;li.append(day,name);appendFileLink(li,f);list.append(li);});section.append(list);
      const review=document.createElement('label');review.className='prepare-check';shortsReview=document.createElement('input');shortsReview.type='checkbox';shortsReview.required=true;shortsReview.checked=Boolean(project?.review);review.append(shortsReview,document.createTextNode('I have checked the Tuesday–Sunday order.'));section.append(review);form.append(section);
    }
    const status=document.createElement('p');status.id='prepare-message';status.setAttribute('role','status');status.className='details-reason';status.textContent=project?.preparation?.status==='completed'?'Previously confirmed ready. Save a new review if files or metadata have changed.':project?.review?'Review saved. Recheck any edits before confirming.':'Save your review to continue.';
    const save=document.createElement('button');save.type='submit';save.id='prepare-save';save.className='details-confirm';save.textContent='Save review';save.disabled=busy||!result;
    const ready=document.createElement('button');ready.id='prepare-ready';ready.type='button';ready.className='details-confirm prepare-primary';ready.textContent=project?.stage==='queue'?'Confirm ready':'Confirm ready & move to Queue';ready.dataset.reviewedAt=project?.review?.reviewedAt?String(project.review.reviewedAt):'';ready.disabled=busy||result?.ready!==8||!ready.dataset.reviewedAt;
    const boundary=document.createElement('p');boundary.className='details-reason';boundary.textContent=project?.stage==='queue'?'Already in Release Queue. Confirmation does not schedule or publish.':'Confirmation rechecks all files and moves this folder to Release Queue.';
    const invalidate=()=>{ready.dataset.reviewedAt='';ready.disabled=true;status.textContent='Unsaved edits. Save your review before confirming.';};Object.values(inputs).forEach(el=>el.addEventListener('input',invalidate));shortsReview?.addEventListener('change',invalidate);
    form.addEventListener('submit',async event=>{
      event.preventDefault();if(busy)return;busy=true;controls();status.textContent='Rechecking and saving review…';
      try{const response=await api('drive-review',{folder:selectedId,metadata:Object.fromEntries(Object.entries(inputs).map(([key,input])=>[key,input.value])),shortsReviewed:shortsReview?.checked===true});applyCatalogue(response);details();$('prepare-message').textContent=response.notice;}
      catch(e){status.textContent=e.message;ready.dataset.reviewedAt='';try{applyCatalogue(await api('drive-status'));}catch{}}finally{busy=false;controls();}
    });
    ready.addEventListener('click',async()=>{
      if(busy||ready.disabled)return;busy=true;controls();status.textContent='Rechecking release and confirming…';
      try{const response=await api('drive-ready',{folder:selectedId,reviewedAt:Number(ready.dataset.reviewedAt)});applyCatalogue(response);details();$('prepare-message').textContent=response.notice;}
      catch(e){status.textContent=e.message;ready.dataset.reviewedAt='';try{applyCatalogue(await api('drive-status'));}catch{}}finally{busy=false;controls();}
    });
    if(project?.stage==='production'&&!moveGranted){const enable=document.createElement('button');enable.type='button';enable.className='prepare-file-action';enable.textContent='Enable folder moves ↗';enable.addEventListener('click',()=>connectDrive('start-drive-move'));form.append(enable);}
    if(!['production','queue'].includes(project?.stage)){ready.dataset.reviewedAt='';ready.disabled=true;boundary.textContent='Place this project inside connected In Production or Release Queue to confirm ready.';}
    form.append(status,save,ready,boundary);host.append(form);
  }
  function openDialog(id,title){const dialog=$(id);dialog.showModal();dialog.scrollTop=0;$(title).focus({preventScroll:true});}
  $('asset-sync').addEventListener('click',()=>scan({folder:selectedId}));
  async function connectDrive(action){
    busy=true;controls();try{const data=await api(action,{});const u=new URL(data.url);if(u.origin!=='https://accounts.google.com'||u.pathname!=='/o/oauth2/v2/auth')throw new Error('Invalid Google connection link.');location.assign(u.href);}catch(e){message(e.message);busy=false;controls();}
  }
  $('drive-connect').addEventListener('click',()=>connectDrive('start-drive'));
  $('drive-move-connect').addEventListener('click',()=>connectDrive('start-drive-move'));
  function pickerDetails(){
    const host=$('release-picker-content');host.replaceChildren();
    for(const stage of ['production','queue','released','manual','unavailable']){
      const matches=projects.filter(p=>p.stage===stage).sort((a,b)=>a.name.localeCompare(b.name));if(!matches.length)continue;
      const section=document.createElement('section');section.className='picker-stage';const heading=document.createElement('h3');heading.textContent=stageLabels[stage];section.append(heading);
      for(const project of matches){
        const choice=document.createElement('button');choice.type='button';choice.className='picker-choice';choice.setAttribute('aria-pressed',String(project.id===selectedId));choice.title=project.name;
        const copy=document.createElement('span');copy.className='picker-choice-copy';const name=document.createElement('span');name.className='picker-choice-title';name.textContent=project.review?.metadata.title || project.metadata.title;copy.append(name);
        const subtitle=document.createElement('span');subtitle.className='picker-choice-artist';subtitle.textContent=[project.review?.metadata.artist || project.metadata.artist,matches.filter(p=>p.metadata.title===project.metadata.title&&p.metadata.artist===project.metadata.artist).length>1?project.id.slice(-4):null].filter(Boolean).join(' · ');if(subtitle.textContent)copy.append(subtitle);
        const tick=document.createElement('span');tick.setAttribute('aria-hidden','true');tick.textContent=project.id===selectedId?'✓':'';choice.append(copy,tick);
        choice.addEventListener('click',()=>{$('release-picker-dialog').close();if(project.id!==selectedId)selectProject(project.id);});section.append(choice);
      }host.append(section);
    }
  }
  $('release-picker').addEventListener('click',()=>{pickerDetails();openDialog('release-picker-dialog','release-picker-title');});
  $('release-picker-close').addEventListener('click',()=>$('release-picker-dialog').close());
  $('release-picker-dialog').addEventListener('close',()=>$('release-picker').focus());
  let fileTrigger=null;
  function fileDetails(tile){
    fileTrigger=tile;const asset=result?.assets.find(a=>a.role===tile.dataset.role),host=$('file-detail-content');host.replaceChildren();
    $('file-dialog-title').textContent=tile.querySelector('.asset-name').textContent+' · '+tile.querySelector('.asset-type').textContent;
    const badge=document.createElement('span');badge.className='details-badge';badge.textContent=asset?.state==='Pass'?'PASS':stateLabel(asset?.state);host.dataset.state=asset?.state || 'Unchecked';host.append(badge);
    if(asset?.files?.length){for(const file of asset.files){const name=document.createElement('p');name.className='file-connected-name';name.textContent=file.name;appendFileLink(name,file);host.append(name);}const icon=document.createElement('span');icon.className='empty-state-icon';icon.setAttribute('aria-hidden','true');icon.innerHTML=tile.querySelector('.asset-icon').innerHTML;host.append(icon);}
    else {const empty=document.createElement('p');empty.textContent='No file connected';host.append(empty);
      const icon=document.createElement('span');icon.className='empty-state-icon';icon.setAttribute('aria-hidden','true');icon.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 14l6 4m0-4-6 4"/></svg>';host.append(icon);
    }
    if(!result || asset?.state==='Unchecked' || asset?.state==='Needs confirmation'){
      const note=document.createElement('p');note.className='details-reason';note.textContent=asset?.state==='Needs confirmation'?'Choose and confirm the correct file below.':selectedId?'Press Sync to check this release.':'Choose a release first.';host.append(note);
    }
    if(asset)associationControls(host,asset);
  }
  document.querySelectorAll('[data-asset-index]').forEach(tile=>tile.addEventListener('click',()=>{fileDetails(tile);openDialog('file-dialog','file-dialog-title');}));
  $('file-close').addEventListener('click',()=>$('file-dialog').close());
  $('file-dialog').addEventListener('close',()=>fileTrigger?.focus());
  $('asset-details').addEventListener('click',()=>{details();openDialog('asset-dialog','asset-dialog-title');});
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
  function bufferDetails(){
    const host=$('buffer-detail-content');host.replaceChildren();
    const empty=document.createElement('div');empty.className='buffer-empty';
    const icon=document.createElement('span');icon.className='empty-state-icon';icon.setAttribute('aria-hidden','true');icon.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-12 5h6"/></svg>';
    const title=document.createElement('strong');title.textContent='No releases to show';
    const note=document.createElement('p');note.textContent='Your scheduled projects will appear here.';empty.append(icon,title,note);
    const status=document.createElement('p');status.className='buffer-source-status';status.textContent='Scheduling not connected';host.append(empty,status);
  }
  function openBufferPreview(trigger,name){bufferTrigger=trigger;$('buffer-preview-title').textContent='Release buffer';bufferDetails(name);openDialog('buffer-preview-dialog','buffer-preview-title');}
  $('buffer-preview-details').addEventListener('click',event=>openBufferPreview(event.currentTarget));
  $('buffer-preview-close').addEventListener('click',()=>$('buffer-preview-dialog').close());
  $('buffer-preview-dialog').addEventListener('close',()=>bufferTrigger?.focus());
  const layoutObserver=new ResizeObserver(reflow);cards.forEach(card=>card.querySelectorAll('.group-card-header,.recessed-dock>div,.group-card-footer').forEach(el=>layoutObserver.observe(el)));window.addEventListener('resize',reflow);document.fonts?.ready.then(reflow);reflow();
  (async()=>{try{const data=await api('drive-status');granted=data.driveGranted;$('drive-access').textContent=granted?'Saved read-only Drive permission found.':'YouTube access alone cannot scan Drive. Add read-only Drive access once.';
    applyCatalogue(data);$('release-connections').open=!data.folders?.production;
    if(data.folders?.production&&granted)await discover({},'drive-discover');
  }catch(e){$('drive-access').textContent=e.message;}finally{controls();}})();
})();
