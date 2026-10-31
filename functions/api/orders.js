function json(data, status=200){return new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json","access-control-allow-origin":"*"}})}
export async function onRequestPost({request,env}){
 try{
  const b=await request.json();
  // Server-side price list: never trust a price submitted by the browser.
  const prices={"100 Diamonds":1,"310 Diamonds":3,"520 Diamonds":5,"1,060 Diamonds":10,"2,180 Diamonds":20,"5,600 Diamonds":50};
  if(!b.game||!b.player||!b.contact||!Object.prototype.hasOwnProperty.call(prices,b.packageName)) return json({error:"ព័ត៌មានមិនត្រឹមត្រូវ"},400);
  const amount=prices[b.packageName];
  const id="LX"+Date.now().toString(36).toUpperCase();
  await env.DB.prepare("INSERT INTO orders (id,game,player,contact,package_name,amount,currency,status,created_at) VALUES (?,?,?,?,?,?,?,'PENDING',?)")
   .bind(id,String(b.game).slice(0,80),String(b.player).slice(0,100),String(b.contact).slice(0,100),String(b.packageName).slice(0,80),amount,"USD",new Date().toISOString()).run();
  return json({id,status:"PENDING"});
 }catch(e){return json({error:"Server error"},500)}
}