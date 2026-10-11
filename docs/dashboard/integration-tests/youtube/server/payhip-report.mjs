// Prospective receipts only. Never infer a licence from its advertised price.
export function itemKey(i){
 if(i.variantId)return JSON.stringify([i.productId,'id',i.variantId]);
 if(i.variantName)return JSON.stringify([i.productId,'name',i.variantName]);
 // Old receipts and variant-bearing products without an option cannot be mapped.
 if(i.hasVariant===false)return JSON.stringify([i.productId,'product']);
 return null;
}
const items=e=>JSON.parse(e.items_json);
export function observedOptions(events){
 const options=new Map();
 for(const e of events)for(const i of items(e)){const key=itemKey(i);if(key)options.set(key,{key,productId:i.productId,productName:i.productName||i.productId,variantId:i.variantId||null,variantName:i.variantName||null});}
 return [...options.values()].sort((a,b)=>a.key.localeCompare(b.key));
}
const period=(ms,y,m)=>{const p=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',year:'numeric',month:'numeric'}).formatToParts(new Date(ms));const get=k=>Number(p.find(v=>v.type===k).value);return get('year')===y&&(m===null||get('month')===m);};
const financial=e=>JSON.stringify([e.currency,e.price,e.occurred_at,items(e).map(i=>[i.productId,i.quantity]).sort()]);
export function salesReport(events,mappings,exclusions,year,month,settings){
 const map=new Map(mappings.map(m=>[m.option_key,m.tier])),excluded=new Set(exclusions.map(e=>e.transaction_id));
 const tiers=Object.fromEntries(['standard','premium','exclusive'].map(t=>[t,{revenue:0,quantity:0}]));
 const groups=new Map();for(const e of events){if(!groups.has(e.transaction_id))groups.set(e.transaction_id,[]);groups.get(e.transaction_id).push(e);}
 const result={verified:Boolean(settings.verifiedAt),year,month,timezone:'Europe/London',gross:0,unallocated:0,paidOrders:0,freeOrders:0,excludedOrders:0,refunds:0,refundOrders:0,refundAttention:0,attention:0,tiers,options:observedOptions(events).map(o=>({...o,tier:map.get(o.key)||null})),orders:[],firstReceived:events.length?Math.min(...events.map(e=>e.received_at)):null,latestReceived:events.length?Math.max(...events.map(e=>e.received_at)):null};
 for(const [id,es] of groups){
  const paid=es.filter(e=>e.type==='paid'), refunds=es.filter(e=>e.type==='refunded'), selected=es.filter(e=>period(e.occurred_at,year,month));if(!selected.length)continue;
  const p=paid.at(-1), inPaid=p&&period(p.occurred_at,year,month), excludedOrder=excluded.has(id);
  let state=excludedOrder?'Excluded test':'Needs attention',tier=null;
  const conflict=paid.length>0&&new Set(paid.map(financial)).size>1;
  const options=new Set(paid.flatMap(e=>items(e).map(itemKey)).filter(Boolean));
  if(inPaid){
   if(excludedOrder)result.excludedOrders++;
   else if(conflict||p.currency!=='GBP'){result.attention++;}
   else if(p.price===0){result.freeOrders++;state='Free checkout';}
   else{
    result.gross+=p.price;result.paidOrders++;
    // An order-level amount cannot safely be split over multiple licence options.
    const list=items(p),keys=list.map(itemKey);
    if(list.length===1&&keys[0]&&options.size===1&&map.has(keys[0])){tier=map.get(keys[0]);result.tiers[tier].revenue+=p.price;result.tiers[tier].quantity+=list[0].quantity;state='Paid';}
    else{result.unallocated+=p.price;result.attention++;}
   }
  }
  const inRefund=refunds.filter(e=>period(e.occurred_at,year,month));
  if(!inPaid&&!excludedOrder&&inRefund.length)state='Refund received';
  if(inRefund.length&&!excludedOrder){
   // Multiple distinct refunds may be incremental or cumulative; do not guess.
   if(refunds.length!==1||!p||conflict||p.currency!=='GBP'||refunds[0].currency!==p.currency||refunds[0].price!==p.price||refunds[0].occurred_at<p.occurred_at){result.refundAttention++;}
   else{result.refunds+=refunds[0].refunded;result.refundOrders++;}
  }
  result.orders.push({id,date:(inPaid?p:selected[0]).occurred_at,amount:p?.price??null,currency:p?.currency??selected[0].currency,state,tier,excluded:excludedOrder,refund:inRefund.length===1?inRefund[0].refunded:null,items:items(p||selected[0]).map(i=>({productName:i.productName||i.productId,variantName:i.variantName||null,variantId:i.variantId||null,quantity:i.quantity}))});
 }
 result.orders.sort((a,b)=>b.date-a.date);return result;
}
