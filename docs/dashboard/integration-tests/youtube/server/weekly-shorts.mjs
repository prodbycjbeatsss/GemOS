import { api, access } from './youtube.mjs';
import { qualifies, parseViews } from './capture.mjs';
import { saveTarget,getTarget,savedConnection } from './sync-targets.mjs';
const shift=(s,n)=>{const d=new Date(s+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)};
export const ukDay=(date=new Date(Date.now()))=>new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/London',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
export function weekRange(offset=0,now=new Date(Date.now())){
 if(!Number.isInteger(offset)||offset>0||offset< -52)throw failure('Choose the current week or one of the previous 52 weeks.',400);
 const day=ukDay(now),weekday=new Date(day+'T12:00:00Z').getUTCDay();const start=shift(day,-((weekday+6)%7)+offset*7);return{start,end:shift(start,6),offset};
}
function failure(message,status=502){return Object.assign(new Error(message),{status})}
function seconds(raw){const m=typeof raw==='string'&&raw.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/);return m?Number(m[1]||0)*3600+Number(m[2]||0)*60+Number(m[3]||0):null}
export function shortFormat(v){
 const duration=seconds(v.contentDetails?.duration);if(duration===null)return null;if(duration<=0||duration>180||v.snippet?.liveBroadcastContent&&v.snippet.liveBroadcastContent!=='none')return false;
 const stream=v.fileDetails?.videoStreams?.[0];if(!stream)return null;
 let width=stream.widthPixels,height=stream.heightPixels;if(['clockwise','counterclockwise'].includes(stream.rotation))[width,height]=[height,width];
 if(!(width>0&&height>0))return null;return height>=width;
}
export async function weeklyShorts(env,owner,{channel,weekOffset=0,remember=true}={}){
 const started=Date.now(),week=weekRange(weekOffset),connection=await access(env,owner),channels=JSON.parse(connection.row.channels_json);
 channel=channel||(channels.length===1?channels[0].id:null);if(!channels.some(c=>c.id===channel))throw failure('Choose your connected YouTube channel.',400);
 const query=async(path,params)=>{const u=new URL('https://www.googleapis.com/youtube/v3/'+path);u.search=new URLSearchParams(params);return api(env,owner,u)};
 const channelData=await query('channels',{part:'contentDetails',id:channel});const owned=channelData.items?.find(c=>c.id===channel),playlist=owned?.contentDetails?.relatedPlaylists?.uploads;
 if(typeof playlist!=='string'||! /^[\w-]+$/.test(playlist))throw failure('YouTube did not return this channel’s uploads playlist.');
 const cutoff=shift(week.start,-2),ids=new Set();let pageToken,complete=false;
 for(let page=0;page<10;page++){
  const d=await query('playlistItems',{part:'contentDetails',playlistId:playlist,maxResults:'50',...(pageToken?{pageToken}:{})});if(!Array.isArray(d.items))throw failure('YouTube uploads could not be read.');
  let allOlder=d.items.length>0;for(const item of d.items){const id=item.contentDetails?.videoId,published=item.contentDetails?.videoPublishedAt;if(! /^[\w-]{11}$/.test(id||''))throw failure('Unexpected upload identifier.');if(!published||!Number.isFinite(Date.parse(published))||ukDay(new Date(published))>=cutoff){ids.add(id);allOlder=false;}}
  pageToken=d.nextPageToken;if(!pageToken||allOlder){complete=true;break;}
 }
 if(!complete)throw failure('Too many uploads in this week. No incomplete batch was saved.');
 const videos=[];for(let i=0;i<[...ids].length;i+=50){const requestedAt=Date.now();const d=await query('videos',{part:'snippet,status,contentDetails,fileDetails,statistics',id:[...ids].slice(i,i+50).join(',')});const capturedAt=Date.now();if(!Array.isArray(d.items)||d.items.some(v=>!ids.has(v.id)||v.snippet?.channelId!==channel)||new Set(d.items.map(v=>v.id)).size!==d.items.length)throw failure('YouTube returned mismatched upload metadata.');
  for(const v of d.items){const p=v.snippet?.publishedAt;if(v.status?.privacyStatus!=='public'||!p||!Number.isFinite(Date.parse(p))||Date.parse(p)>Date.now())continue;const day=ukDay(new Date(p));if(day<cutoff||day>week.end)continue;const format=shortFormat(v);if(format===false)continue;videos.push({id:v.id,title:v.snippet.title||'Title unavailable',publishedAt:p,visibility:'public',classification:format===true?'short-format':'pending',snapshotViews:null,capturedAt:null,currentViews:parseViews(v.statistics?.viewCount),_views:parseViews(v.statistics?.viewCount),_requested:requestedAt,_returned:capturedAt});}
 }
 // Owner-only file dimensions allow early discovery; Analytics supplies authoritative classification when available.
 let classificationUnavailable=false;
 if(videos.length){try{const u=new URL('https://youtubeanalytics.googleapis.com/v2/reports');u.search=new URLSearchParams({ids:'channel=='+channel,startDate:shift(cutoff,-1),endDate:shift(week.end,1),dimensions:'video,creatorContentType',filters:'video=='+videos.map(v=>v.id).join(','),metrics:'views',maxResults:'200'});const d=await api(env,owner,u);const names=d.columnHeaders?.map(c=>c.name);if(!names?.includes('video')||!names.includes('creatorContentType')||d.rows?.length>=200)throw failure('Classification report unavailable.');for(const row of d.rows||[]){const id=row[names.indexOf('video')],type=String(row[names.indexOf('creatorContentType')]).toUpperCase(),v=videos.find(v=>v.id===id);if(!v)throw failure('Unexpected classification identifier.');v.classification=type==='SHORTS'?'shorts':'other';}}catch(e){if([401,403].includes(e.status))throw e;classificationUnavailable=true;}}
 const still=await env.DB.prepare('SELECT revision FROM youtube_connections WHERE user_id=? AND client_id=?').bind(owner,env.GOOGLE_CLIENT_ID).first();if(still?.revision!==connection.row.revision)throw failure('Google connection changed. Sync again.',401);
 const statements=[];for(const v of videos){if(v.classification!=='other'&&v._views!==null&&qualifies(v.publishedAt,v._requested,v._returned))statements.push(env.DB.prepare('INSERT OR IGNORE INTO youtube_view_snapshots (user_id, channel_id, video_id, published_at, views, requested_at, captured_at, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').bind(owner,channel,v.id,v.publishedAt,v._views,v._requested,v._returned,'YouTube Data API v3 videos.statistics.viewCount'));}
 if(statements.length)await env.DB.batch(statements);
 const snapshots=await env.DB.prepare('SELECT * FROM youtube_view_snapshots WHERE user_id=? AND channel_id=?').bind(owner,channel).all();
 const visible=videos.filter(v=>v.classification!=='other'&&ukDay(new Date(v.publishedAt))>=week.start);
 for(const v of visible){const snapshot=snapshots.results.find(s=>s.video_id===v.id&&s.published_at===v.publishedAt);if(v.classification!=='pending'&&snapshot&&qualifies(snapshot.published_at,snapshot.requested_at,snapshot.captured_at)){v.snapshotViews=snapshot.views;v.requestedAt=new Date(snapshot.requested_at).toISOString();v.capturedAt=new Date(snapshot.captured_at).toISOString();}delete v._views;delete v._requested;delete v._returned;}
 const confirmed=visible.filter(v=>v.classification!=='pending');let totalViews=confirmed.length?0:visible.length?null:0;for(const v of confirmed){if(v.currentViews===null||totalViews===null||!Number.isSafeInteger(totalViews+v.currentViews)){totalViews=null;break;}totalViews+=v.currentViews;}
 const report={viewsMode:'current',totalViews,scopeType:'weekly-shorts',source:'YouTube uploads and Analytics',scope:'Channel uploads by UK publication week',channelId:channel,name:'Weekly Shorts',week,videos:visible.sort((a,b)=>Date.parse(a.publishedAt)-Date.parse(b.publishedAt)),fetchedAt:new Date().toISOString(),capture:'Only qualifying 24-hour snapshots rank.',classificationUnavailable,timezone:'Europe/London',saved:true};
 // Retain existing selected-release history; weekly discovery has its own saved target and never depends on it.
 await saveTarget(env,owner,'weekly-shorts-report:'+channel+':'+weekOffset,report,started);
 if(remember)await saveTarget(env,owner,'weekly-shorts-sync',{channel,weekOffset},started);
 return report;
}
export async function weeklyHandler(request,env){try{const owner=request.headers.get('oai-authenticated-user-id');if(!owner)return Response.json({error:'Sign in first.'},{status:401});if(request.method==='GET'){const params=new URL(request.url).searchParams,channel=params.get('channel'),offset=Number(params.get('weekOffset')||0),week=weekRange(offset),connection=await savedConnection(env,owner);if(!connection.channels.some(c=>c.id===channel))throw failure('Choose your connected channel.',400);const cached=await getTarget(env,owner,'weekly-shorts-report:'+channel+':'+offset);return Response.json({report:cached?.week?.start===week.start&&cached?.viewsMode==='current'?cached:null},{headers:{'Cache-Control':'no-store'}});}
 if(request.method!=='POST')return Response.json({error:'Method not allowed.'},{status:405});if(request.headers.get('Origin')!==new URL(request.url).origin)return Response.json({error:'Origin mismatch.'},{status:403});const text=await request.text();if(text.length>500)throw failure('Invalid weekly selection.',400);let input;try{input=JSON.parse(text)}catch{throw failure('Invalid weekly selection.',400)}if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!['channel','weekOffset'].includes(k)))throw failure('Invalid weekly selection.',400);return Response.json(await weeklyShorts(env,owner,input));}catch(e){return Response.json({error:e.status?e.message:'Weekly Shorts could not be refreshed.'},{status:e.status||500});}}
