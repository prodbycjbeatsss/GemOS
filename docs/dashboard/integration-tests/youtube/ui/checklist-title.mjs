export const TITLE_LIMIT = 48;
export function releaseTitle(result) {
  const remix = result?.assets?.find(a => a.role === 'remix' && a.state === 'Pass')?.files?.[0]?.name;
  let name = String(remix || result?.projectName || '').replace(/\.(?:wav|mp3)$/i, '').replace(/^\s*\[remix\]\s*/i, '').replace(/(?:\s*\[[^\]]*\])+\s*$/g, '').replace(/\s+[-–—]\s+remix\s*$/i, '').trim();
  const divider = name.search(/\s+[-–—]\s+/);
  if (divider >= 0) name = name.slice(divider).replace(/^\s+[-–—]\s+/, '').trim();
  return name || 'Untitled release';
}
export function displayTitle(title) {
  const chars = typeof Intl.Segmenter === 'function' ? [...new Intl.Segmenter('en', {granularity:'grapheme'}).segment(title)].map(s=>s.segment) : Array.from(title);
  return chars.length > TITLE_LIMIT ? chars.slice(0,TITLE_LIMIT-1).join('').trimEnd() + '…' : title;
}

// Presentation only: preserve the stored folder metadata and associations.
export function releaseDetails(result, project) {
  const metadata=project?.metadata || {};
  const rawArtist=metadata.artist || (String(result?.projectName || '').replace(/\[[^\]]*\]/g,'').match(/^(.*?)\s+[-–—]\s+.+$/)?.[1]?.trim() || '');
  const beatDescription=/type beat/i.test(rawArtist)?rawArtist:null;
  const remix=result?.assets?.find(a=>a.role==='remix'&&a.state==='Pass')?.files?.[0]?.name;
  const clean=String(remix || '').replace(/^\s*\[remix\]\s*/i,'').replace(/\.(?:wav|mp3)$/i,'').replace(/\[[^\]]*\]/g,'').trim();
  const remixArtist=clean.match(/^(.*?)\s+[-–—]\s+.+$/)?.[1]?.trim();
  const artist=remixArtist || (beatDescription?(rawArtist.match(/^(.+?)\s+x\s+/i)?.[1]?.trim() || null):rawArtist || null);
  const title=result?releaseTitle(result):metadata.title || 'Untitled release';
  return {artist,title,beatDescription,bpm:metadata.bpm ?? null,key:metadata.key || null,credits:(metadata.credits || []).map(credit=>String(credit).replace(/^x\s+(?=@)/i,'').trim()).filter(Boolean)};
}
