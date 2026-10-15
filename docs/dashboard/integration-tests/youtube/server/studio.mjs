const validISO=v=>typeof v==='string'&&/^20\d{2}-\d{2}-\d{2}$/.test(v)&&Number.isFinite(Date.parse(v+'T12:00:00Z'))&&new Date(v+'T12:00:00Z').toISOString().slice(0,10)===v;
export function validateStudio(v,today=new Date().toISOString().slice(0,10)){
 if(!v||typeof v!=='object'||Array.isArray(v)||Object.keys(v).some(k=>!['observedOn','balance','periodStart','periodEnd','windowStart','windowEnd','payments'].includes(k)))throw Error('Invalid Studio snapshot.');
 const money=x=>typeof x==='string'&&/^(?:0|[1-9]\d{0,7})\.\d{2}$/.test(x);
 if(!validISO(v.observedOn)||v.observedOn>today||!money(v.balance))throw Error('Check the screenshot date and GBP balance.');
 for(const k of ['periodStart','periodEnd','windowStart','windowEnd'])if(!validISO(v[k]))throw Error('Enter valid earnings-period and expected-payment dates.');
 if(v.periodStart>v.periodEnd||v.periodEnd>v.observedOn||v.windowStart>v.windowEnd)throw Error('Check the date ranges.');
 if(!Array.isArray(v.payments)||v.payments.length>100)throw Error('Use no more than 100 payment records.');
 const seen=new Set();const payments=v.payments.map(p=>{if(!p||Object.keys(p).some(k=>!['date','amount'].includes(k))||!validISO(p.date)||p.date>v.observedOn||!money(p.amount))throw Error('Check each payment date and GBP amount.');const key=p.date+'|'+p.amount;if(seen.has(key))throw Error('Remove duplicate payment rows.');seen.add(key);return {date:p.date,amount:p.amount};}).sort((a,b)=>b.date.localeCompare(a.date));
 return {...v,payments};
}
export function studioHistory(live=[],snapshot=null){
 const items=live.map(p=>({...p,source:'AdSense API'})),seen=new Set(items.filter(p=>p.date).map(p=>p.date+'|'+p.amount.replace(/\s+GBP$/,'').replaceAll(',','')));
 for(const p of snapshot?.payments||[]){const amount='£'+p.amount,key=p.date+'|'+amount;if(!seen.has(key)){items.push({id:'studio-'+key,date:p.date,amount,source:'Studio snapshot · '+snapshot.observedOn});seen.add(key);}}
 return items.sort((a,b)=>(b.date||'').localeCompare(a.date||''));
}
export async function readStudio(env,owner,account,channel){const row=await env.DB.prepare('SELECT snapshot_json,updated_at FROM studio_payment_snapshots WHERE user_id=? AND account_id=? AND channel_id=?').bind(owner,account,channel).first();const value=row?JSON.parse(row.snapshot_json):null;return value?{...value,savedAt:row.updated_at}:null;}
export async function saveStudio(env,owner,account,channel,value){const snapshot=validateStudio(value),now=Date.now();await env.DB.prepare('INSERT INTO studio_payment_snapshots (user_id,account_id,channel_id,snapshot_json,updated_at) VALUES (?,?,?,?,?) ON CONFLICT(user_id,account_id,channel_id) DO UPDATE SET snapshot_json=excluded.snapshot_json,updated_at=excluded.updated_at').bind(owner,account,channel,JSON.stringify(snapshot),now).run();return {...snapshot,savedAt:now};}
