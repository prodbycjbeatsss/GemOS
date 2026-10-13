const frequencies=['weekly','monthly','quarterly','yearly'],categories=['AI','Music','Other'];
class InputError extends Error{}
export function validDate(s){if(typeof s!=='string'||!/^20\d{2}-\d{2}-\d{2}$/.test(s))return false;const d=new Date(s+'T12:00:00Z');return Number.isFinite(+d)&&d.toISOString().slice(0,10)===s;}
export function monthlyPence(price,frequency){return price*({weekly:52/12,monthly:1,quarterly:1/3,yearly:1/12}[frequency]);}
export function dueDate(anchor,frequency,reference){
 if(!validDate(anchor)||!validDate(reference)||!frequencies.includes(frequency))return null;
 if(anchor>=reference)return anchor;
 const a=new Date(anchor+'T12:00:00Z'),r=new Date(reference+'T12:00:00Z');
 if(frequency==='weekly'){const steps=Math.ceil((r-a)/(7*86400000));return new Date(+a+steps*7*86400000).toISOString().slice(0,10);}
 const stride={monthly:1,quarterly:3,yearly:12}[frequency];let steps=Math.max(0,Math.floor(((r.getUTCFullYear()-a.getUTCFullYear())*12+r.getUTCMonth()-a.getUTCMonth())/stride));
 for(let i=0;i<3;i++,steps++){const first=new Date(Date.UTC(a.getUTCFullYear(),a.getUTCMonth()+steps*stride,1,12));const last=new Date(Date.UTC(first.getUTCFullYear(),first.getUTCMonth()+1,0)).getUTCDate();first.setUTCDate(Math.min(a.getUTCDate(),last));const date=first.toISOString().slice(0,10);if(date>=reference)return date;}return null;
}
export function monthReport(state,month,category='All',today=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/London',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())){
 if(!/^20\d{2}-(0[1-9]|1[0-2])$/.test(month)||!['All',...categories].includes(category))throw new InputError('Choose a valid month and category.');
 const start=month+'-01',end=new Date(Date.UTC(+month.slice(0,4),+month.slice(5,7),0,12)).toISOString().slice(0,10);const reference=today.slice(0,7)===month?today:start;
 const rows=[];for(const s of state.subscriptions){if(s.archived)continue;let selected=null;
 for(let i=0;i<s.versions.length;i++){const v=s.versions[i],until=s.versions[i+1]?.effective||'2100-01-01';if(v.status==='active'&&v.effective<=end&&until>start)selected=v;}
 if(!selected||category!=='All'&&selected.category!==category)continue;
 const at=s.versions.filter(v=>v.effective<=reference).at(-1)||selected;
 let next=at.status==='active'?dueDate(at.anchor,at.frequency,reference>at.effective?reference:at.effective):null;
 if(next){const scheduled=s.versions.filter(v=>v.effective<=next).at(-1);if(scheduled?.status==='cancelled')next=null;else if(scheduled&&scheduled!==at)next=dueDate(scheduled.anchor,scheduled.frequency,next);}
 rows.push({id:s.id,name:selected.name,category:selected.category,monthlyPence:Math.round(monthlyPence(selected.pricePence,selected.frequency)),pricePence:selected.pricePence,frequency:selected.frequency,nextDate:next,plan:selected.plan});}
 rows.sort((a,b)=>a.name.localeCompare(b.name,'en-GB'));
 const topups=state.topups.filter(t=>!t.archived&&t.date.slice(0,7)===month).sort((a,b)=>b.date.localeCompare(a.date)||a.provider.localeCompare(b.provider));
 return {month,category,rows,totalPence:Math.round(rows.reduce((n,r)=>n+r.monthlyPence,0)),topups,topupPence:topups.reduce((n,r)=>n+r.amountPence,0)};
}
