(() => {
  const $ = id => document.getElementById(id);
  let result = null, granted = false, busy = false;
  const message = text => { $('scan-message').textContent = text; };
  function controls() { $('asset-sync').disabled = busy || !granted; $('drive-connect').disabled = busy; $('project-folder').disabled = busy; }
  async function api(action, body) {
    const r = await fetch('/api/youtube/' + action, { method: body ? 'POST' : 'GET', headers: body ? {'Content-Type':'application/json'} : {}, ...(body ? {body:JSON.stringify(body)} : {}), cache:'no-store',signal:AbortSignal.timeout(120000)});
    const data = await r.json();if(!r.ok)throw new Error(data.error || 'Unable to check files.');return data;
  }
  function render() {
    if(!result)return;
    $('checklist-project-title').textContent=result.projectName;
    $('checklist-subtitle').textContent=`${result.ready}/7 Files Ready`;
    $('drive-sync-status').textContent='Checked '+new Date(result.checkedAt).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
    document.querySelectorAll('[data-asset-index]').forEach((row,i)=>{
      const a=result.assets[i];row.dataset.state=a.state;
      row.querySelector('.asset-icon').textContent=a.state==='Pass'?'✓':a.state==='Missing'?'!':'?';
      row.querySelector('.asset-status').textContent=a.role==='shorts'&&a.state!=='Needs confirmation'?`${a.count}/6 ${a.state==='Pass'?'Ready':'Missing'}`:a.state;
    });
    message(result.ready===7?'All required asset categories qualify. Publishing is not connected.':'Scan complete. Missing or unresolved assets prevent readiness; publishing is not connected.');
  }
  async function scan(body,action='drive-scan') {
    busy=true;controls();message('Checking Drive files…');
    try { result=await api(action,body);render();if($('asset-dialog').open)details(); }
    catch(e){message(e.message+(result?' Previous results remain visible and are stale.':''));$('drive-sync-status').textContent=result?'Refresh failed · stale':'Unable to check';}
    finally {busy=false;controls();}
  }
  function details() {
    const host=$('asset-detail-content');host.replaceChildren();
    if(!result){host.textContent='Scan a project folder first.';return;}
    const intro=document.createElement('p');intro.textContent=`${result.projectName} · last successful check ${new Date(result.checkedAt).toLocaleString('en-GB')}. File metadata establishes eligibility, not creative quality or archive contents.`;host.append(intro);
    for(const a of result.assets){
      const section=document.createElement('section'),title=document.createElement('h3'),note=document.createElement('p');title.textContent=a.label+' · '+a.state;note.textContent=a.reason;section.append(title,note);
      for(const f of a.files){const p=document.createElement('p');p.textContent=f.name;section.append(p);}
      if(a.state==='Needs confirmation'&&a.candidates.length){
        const selects=[];
        const total=a.role==='shorts'?6:1;
        for(let i=0;i<total;i++){
          const label=document.createElement('label');label.textContent=total===6?['Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][i]:'Correct file';
          const select=document.createElement('select');select.setAttribute('aria-label',a.label+' '+label.textContent);const empty=document.createElement('option');empty.value='';empty.textContent='Choose a file';select.append(empty);
          for(const f of a.candidates){const option=document.createElement('option');option.value=f.id;option.textContent=f.name;select.append(option);}label.append(select);selects.push(select);section.append(label);
        }
        const button=document.createElement('button');button.type='button';button.textContent='Confirm association';button.addEventListener('click',()=>{
          const ids=selects.map(s=>s.value);if(ids.some(v=>!v)||new Set(ids).size!==total){note.textContent='Choose the required distinct files.';return;}
          button.disabled=true;scan({folder:result.folderId,role:a.role,ids},'drive-confirm');
        });section.append(button);
      }
      host.append(section);
    }
  }
  $('asset-sync').addEventListener('click',()=>scan({folder:$('project-folder').value.trim()}));
  $('drive-connect').addEventListener('click',async()=>{
    busy=true;controls();try{const data=await api('start-drive',{});const u=new URL(data.url);if(u.origin!=='https://accounts.google.com'||u.pathname!=='/o/oauth2/v2/auth')throw new Error('Invalid Google connection link.');location.assign(u.href);}catch(e){message(e.message);busy=false;controls();}
  });
  $('asset-details').addEventListener('click',()=>{details();$('asset-dialog').showModal();});
  $('asset-close').addEventListener('click',()=>$('asset-dialog').close());
  $('asset-dialog').addEventListener('close',()=>$('asset-details').focus());
  function reflow(){const grid=document.querySelector('.section-one-grid'),card=$('card-prerelease-checklist');grid.classList.remove('text-reflow');if(card.querySelector('.dashboard-card-main').scrollHeight>card.querySelector('.dashboard-card-main').clientHeight+2)grid.classList.add('text-reflow');}
  new ResizeObserver(reflow).observe(document.documentElement);document.fonts?.ready.then(reflow);
  (async()=>{try{const data=await api('drive-status');granted=data.driveGranted;$('drive-access').textContent=granted?'Saved read-only Drive permission found.':'YouTube access alone cannot scan Drive. Add read-only Drive access once.';
    if(data.folderId)$('project-folder').value='https://drive.google.com/drive/folders/'+data.folderId;
    if(data.result){result=data.result;render();$('drive-sync-status').textContent='Saved check · not refreshed';message('Saved results restored. Press Sync to check current files.');}
  }catch(e){$('drive-access').textContent=e.message;}finally{controls();}})();
})();
