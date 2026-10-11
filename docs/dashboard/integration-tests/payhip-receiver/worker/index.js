const headers={'Cache-Control':'no-store','Content-Type':'text/plain; charset=utf-8','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'};
const reply=(message,status)=>new Response(message,{status,headers});
export default {
 async fetch(request,env){
  const match=new URL(request.url).pathname.match(/^\/webhook\/([a-f0-9]{64})$/);
  if(!match)return reply('Not found',404);
  if(request.method!=='POST')return reply('Method not allowed',405);
  if(!env.DASHBOARD_SERVICE_TOKEN||!env.PAYHIP_RELAY_SECRET||!env.DASHBOARD_ORIGIN)return reply('Unavailable',503);
  if(!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json'))return reply('Send JSON',415);
  if(Number(request.headers.get('Content-Length'))>32768)return reply('Request too large',413);
  try{
   const reader=request.body?.getReader();if(!reader)return reply('Missing body',400);
   let chunks=[],size=0;for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>32768){await reader.cancel();return reply('Request too large',413);}chunks.push(value);}
   const body=new Uint8Array(size);let offset=0;for(const value of chunks){body.set(value,offset);offset+=value.length;}
   const origin=new URL(env.DASHBOARD_ORIGIN);if(origin.protocol!=='https:')return reply('Unavailable',503);
   const result=await fetch(new URL('/api/payhip/ingest',origin),{method:'POST',redirect:'error',signal:AbortSignal.timeout(15000),headers:{'Content-Type':'application/json','OAI-Sites-Authorization':'Bearer '+env.DASHBOARD_SERVICE_TOKEN,'X-GemOS-Relay':env.PAYHIP_RELAY_SECRET,'X-GemOS-Connection':match[1]},body});
   return result.ok?reply('Accepted',200):reply('Not accepted',result.status>=500?503:result.status);
  }catch{return reply('Unavailable',503);}
 }
};
