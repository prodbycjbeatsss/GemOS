const metrics=['views','averageViewPercentage','likes','subscribersGained','shares'];
const shift=(date,days)=>{const d=new Date(date+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+days);return d.toISOString().slice(0,10);};
export async function getAnalyticsCache(env,owner,channels){
 const table=await env.DB.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='analytics_sync_cache'").first();if(!table)return null;
 const row=await env.DB.prepare('SELECT report_json FROM analytics_sync_cache WHERE user_id=?').bind(owner).first();if(!row)return null;const report=JSON.parse(row.report_json);return report.scopeType==='channel-shorts'&&channels.some(c=>c.id===report.channelId)?report:null;
}
export async function cacheAnalytics(env,owner,target,videos,current,previous,end,channelTitle){
 const warnings=[];
 const totals=(data,period)=>{const result={};for(const metric of metrics){const i=data.columnHeaders.findIndex(c=>c.name===metric),raw=data.rows?.[0]?.[i];const v=typeof raw==='number'?raw:typeof raw==='string'&&/^-?\d+(?:\.\d+)?$/.test(raw.trim())?Number(raw):null;const valid=v!==null&&Number.isFinite(v)&&(v>=0||metric==='likes')&&(metric==='averageViewPercentage'||Number.isSafeInteger(v));result[metric]=valid?v:null;if(!valid)warnings.push({period,metric,reason:'Unavailable source value'});}return result;};
 const start=shift(end,1-target.rangeDays),now=Date.now();
 const report={source:'YouTube Analytics API v2',scope:'User-confirmed selected Shorts sample; not channel-wide',channelId:target.channel,channelTitle, videos:videos.items.map(v=>({id:v.id,title:typeof v.snippet?.title==='string'?v.snippet.title.slice(0,500):'Title unavailable'})),requestedEnd:target.endDate,rangeDays:target.rangeDays,currentPeriod:{start,end},previousPeriod:{start:shift(start,-target.rangeDays),end:shift(start,-1)},reportingTimezone:'America/Los_Angeles',latestReturnedDay:end,fetchedAt:new Date(now).toISOString(),current:totals(current,'current'),previous:totals(previous,'previous'),warnings,coverage:'Saved result from an explicit Automation Sync. Missing values are unavailable, not zero. Refresh the source card to request new data.'};
 await env.DB.prepare('INSERT INTO analytics_sync_cache (user_id,report_json,updated_at) VALUES (?,?,?) ON CONFLICT(user_id) DO UPDATE SET report_json=excluded.report_json,updated_at=excluded.updated_at').bind(owner,JSON.stringify(report),now).run();return report;
}
