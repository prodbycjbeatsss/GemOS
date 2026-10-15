const months=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
function iso(day,month,year){const m=months.indexOf(month.slice(0,3).toLowerCase());if(m<0)return '';const d=new Date(Date.UTC(Number(year),m,Number(day)));return d.getUTCMonth()===m&&d.getUTCDate()===Number(day)?d.toISOString().slice(0,10):'';}
function namedDate(v,year){let m=v.trim().match(/^(\d{1,2})\s*([A-Za-z]+)\s*(20\d{2})?$/);if(m)return iso(m[1],m[2],m[3]||year);m=v.trim().match(/^([A-Za-z]+)\s*(\d{1,2})\s*(20\d{2})?$/);return m?iso(m[2],m[1],m[3]||year):'';}
export function parseStudioText(text,observedOn){
 const s=String(text||'').replace(/\u00a0/g,' ').replace(/[–—]/g,'-'),year=observedOn.slice(0,4),amounts=[...s.matchAll(/£\s*(\d+(?:,\d{3})*\.\d{2})/g)];
 const period=s.match(/Earnings\s+period\s*:\s*([^\n]+)/i),window=s.match(/(?:Expect(?:ed)?\s+(?:a\s+)?payment|Expected\s+payout)\s*:\s*([^\n]+)/i);
 const range=v=>{if(!v)return ['',''];const p=v.replace(/\s+/g,' ').split(/\s*-\s*/);return p.length===2?p.map(x=>namedDate(x,year)):['',''];};
 const [periodStart,periodEnd]=range(period?.[1]),[windowStart,windowEnd]=range(window?.[1]);
 const beforePeriod=period?s.slice(0,period.index):s;const balance=[...beforePeriod.matchAll(/£\s*(\d+(?:,\d{3})*\.\d{2})/g)].at(-1)?.[1]?.replaceAll(',','')||'';
 const payments=[];for(const m of s.matchAll(/(\d{1,2})\s*([A-Za-z]+)\s*(20\d{2})\s*£\s*(\d+(?:,\d{3})*\.\d{2})/g)){const date=iso(m[1],m[2],m[3]);if(date)payments.push({date,amount:m[4].replaceAll(',','')});}
 return {observedOn,balance,periodStart,periodEnd,windowStart,windowEnd,payments};
}
