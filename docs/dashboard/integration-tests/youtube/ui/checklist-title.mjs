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
