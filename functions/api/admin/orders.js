function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json"}})}
function authorized(request,env){return !!env.ADMIN_TOKEN && request.headers.get("authorization")==="Bearer "+env.ADMIN_TOKEN}
export async function onRequestGet({request,env}){
 if(!authorized(request,env))return json({error:"Unauthorized"},401);
 const {results}=await env.DB.prepare("SELECT * FROM orders ORDER BY created_at DESC LIMIT 200").all();
 return json(results);
}
export async function onRequestPatch({request,env}){
 if(!authorized(request,env))return json({error:"Unauthorized"},401);
 const b=await request.json();
 const allowed=["PENDING","PAID","DELIVERED","REJECTED"];
 if(!b.id||!allowed.includes(b.status))return json({error:"Invalid update"},400);
 const r=await env.DB.prepare("UPDATE orders SET status=? WHERE id=?").bind(b.status,b.id).run();
 return json({success:!!r.meta.changes});
}