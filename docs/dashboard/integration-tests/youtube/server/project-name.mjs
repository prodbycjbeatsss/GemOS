// Suggestions only: folder names are not authority for publishing credits.
export function projectMetadata(name) {
  const original=String(name || ''), tags=[...original.matchAll(/\[([^\]]+)\]/g)].map(m=>m[1].trim());
  const bpms=tags.map(t=>t.match(/^(\d{2,3}(?:\.\d+)?)\s*bpm$/i)).filter(Boolean).map(m=>Number(m[1])).filter(n=>n>=30&&n<=300);
  const keys=tags.filter(t=>/^[A-G](?:#|b)?(?:m|maj|min| major| minor)?$/i.test(t));
  const credits=tags.filter(t=>/^(?:x\s+@|prod(?:uced)?\s*(?:by|\.)\s*)/i.test(t));
  const clean=original.replace(/\[[^\]]*\]/g,'').replace(/\s+/g,' ').trim();
  const split=clean.match(/^(.*?)\s+[-–—]\s+(.+)$/);
  return {artist:split?.[1]?.trim() || null,title:split?.[2]?.trim() || clean || 'Untitled release',bpm:bpms.length===1?bpms[0]:null,key:keys.length===1?keys[0]:null,credits,original,suggested:true};
}
