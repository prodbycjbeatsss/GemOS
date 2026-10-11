const headers={'Cache-Control':'no-store','Content-Type':'text/plain; charset=utf-8','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'};
const reply=(message,status)=>new Response(message,{status,headers});
export default {
 async fetch(request,env){
  const match=new URL(request.url).pathname.match(/^\/webhook\/([a-f0-9]{64})$/);
  if(!match)return reply('Not found',404);
  if(request.method!=='POST')return reply('Method not allowed',405);
  if(!env.DASHBOARD_SERVICE_TOKEN||!env.PAYHIP_RELAY_SECRET||!env.DASHBOARD_ORIGIN){console.error('payhip_receiver_configuration',{service:Boolean(env.DASHBOARD_SERVICE_TOKEN),relay:Boolean(env.PAYHIP_RELAY_SECRET),origin:Boolean(env.DASHBOARD_ORIGIN)});return reply('Unavailable',503);}
  if(!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json'))return reply('Send JSON',415);
  if(Number(request.headers.get('Content-Length'))>32768)return reply('Request too large',413);
  let stage='read-body';
  try{
   const reader=request.body?.getReader();if(!reader)return reply('Missing body',400);
   let chunks=[],size=0;for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>32768){await reader.cancel();return reply('Request too large',413);}chunks.push(value);}
   const body=new Uint8Array(size);let offset=0;for(const value of chunks){body.set(value,offset);offset+=value.length;}
   const origin=new URL(env.DASHBOARD_ORIGIN);if(origin.protocol!=='https:')return reply('Unavailable',503);
   stage='forward';
   const result=await fetch(new URL('/api/payhip/ingest',origin),{method:'POST',redirect:'manual',signal:AbortSignal.timeout(15000),headers:{'User-Agent':'GemOSWebhookRelay/1.0','Content-Type':'application/json','OAI-Sites-Authorization':'Bearer '+env.DASHBOARD_SERVICE_TOKEN,'X-GemOS-Relay':env.PAYHIP_RELAY_SECRET,'X-GemOS-Connection':match[1]},body});
   return result.ok?reply('Accepted',200):reply('Not accepted',result.status>=500||(result.status>=300&&result.status<400)?503:result.status);
  }catch(error){console.error('payhip_receiver_failure',{stage,name:error?.name,message:String(error?.message||'').replace(/https?:\/\/\S+/g,'[destination]').slice(0,160)});return reply('Unavailable',503);}
 }
};
