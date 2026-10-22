/* TORRE: la grúa se mueve y hay que tocar para soltar el bloque. Si queda torcida, se cae.
   Niveles: datos/niveles/torre.js · Colores de bloques: datos/fondos.js → torre */
const TOW=NIVELES.torre;
let towerDrop=null;
function torre(){
  const N=TOW[lvl],BW={b:260,m:180,s:110},BH=64,GY=780,HY=70,COLS=FONDOS.torre.bloques;
  const speed=240+lvl*70;
  let stack=[],size="m",hx=500,dir=1,busy=false,done=false,fall=null,last=performance.now();
  const a=area();const VH=GY+20;const sc=Math.min((a.w-10)/1000,(a.h-130)/VH);
  stage.innerHTML=`<div class="col" style="justify-content:center;gap:12px"><div class="prog" id="pr"></div>
    <svg id="tw" viewBox="0 0 1000 ${VH}" width="${Math.floor(1000*sc)}" height="${Math.floor(VH*sc)}" style="touch-action:none;background:linear-gradient(#DDF1FF,#F4F2FF);border-radius:30px;box-shadow:0 8px 0 var(--soft);cursor:pointer;max-width:100%;height:auto"></svg>
    <div class="tray" id="sz">${["b","m","s"].map(k=>`<button data-s="${k}" aria-label="${TEXTOS.torre.bloque}"><svg viewBox="0 0 270 80" width="${Math.round(BW[k]/2.6)+20}" height="40"><rect x="${(270-BW[k])/2}" y="8" width="${BW[k]}" height="64" rx="12" fill="#8E5BE8"/></svg></button>`).join("")}</div></div>`;
  const svg=$("#tw");svg.innerHTML=`<g id="tm"></g><g id="tfx"></g>`;const tm=$("#tm"),tfx=$("#tfx");
  const topY=()=>GY-stack.length*BH;
  const rect=(x,y,w,c)=>`<rect x="${(x-w/2).toFixed(1)}" y="${y.toFixed(1)}" width="${w}" height="${BH-4}" rx="12" fill="${c}" stroke="rgba(35,32,74,.25)" stroke-width="4"/>`;
  const prog=()=>{$("#pr").innerHTML=[...Array(N)].map((_,i)=>`<i style="${i<stack.length?'background:'+FONDOS.juegos.torre:''}"></i>`).join("");
    $("#sz").querySelectorAll("button").forEach(b=>b.classList.toggle("sel",b.dataset.s===size))};
  function draw(){
    let h=`<rect x="0" y="${GY}" width="1000" height="20" fill="#8BD46E"/><rect x="20" y="16" width="960" height="12" rx="6" fill="#5B6B8C"/>`;
    stack.forEach((b,i)=>{h+=rect(b.x,GY-(i+1)*BH,b.w,b.c)});
    if(fall)h+=rect(fall.x,fall.y,fall.w,fall.c);
    else if(!done&&!busy){h+=`<rect x="${hx-22}" y="10" width="44" height="24" rx="6" fill="#23204A"/><line x1="${hx}" y1="30" x2="${hx}" y2="${HY}" stroke="#23204A" stroke-width="5"/>`+rect(hx,HY,BW[size],COLS[stack.length%COLS.length])}
    tm.innerHTML=h;
  }
  const frame=t=>{if(!document.body.contains(svg))return;const dt=Math.min(.05,(t-last)/1000);last=t;
    if(!busy&&!done){const w=BW[size]/2;hx+=dir*speed*dt;if(hx>990-w){hx=990-w;dir=-1}if(hx<10+w){hx=10+w;dir=1}}
    if(fall){fall.vy+=2600*dt;fall.y+=fall.vy*dt;if(fall.y>=fall.to){fall.y=fall.to;land()}}
    draw();requestAnimationFrame(frame)};
  const drop=()=>{if(busy||done)return;busy=true;const t=stack[stack.length-1],w=BW[size];
    const miss=t&&Math.abs(hx-t.x)>(w+t.w)/2-8;
    fall={x:hx,y:HY,vy:0,w,c:COLS[stack.length%COLS.length],miss,to:miss?GY-BH:topY()-BH};beep(500,.05)};
  towerDrop=drop;
  function crash(blocks,dx,rot){const g=document.createElementNS("http://www.w3.org/2000/svg","g");g.setAttribute("class","fall");g.style.setProperty("--dx",dx+"px");g.style.setProperty("--rot",rot+"deg");
    g.innerHTML=blocks;tfx.appendChild(g);later(()=>g.remove(),950)}
  function land(){
    const nb=fall;fall=null;
    if(nb.miss){bad();crash(rect(nb.x,GY-BH,nb.w,nb.c),nb.x>500?120:-120,30);later(()=>{busy=false},700);return}
    stack.push({x:nb.x,w:nb.w,c:nb.c});beep(260+stack.length*60,.1,"triangle");
    let f=-1;
    for(let k=0;k<stack.length-1&&f<0;k++){const up=stack.slice(k+1),m=up.reduce((s,b)=>s+b.w,0),cx=up.reduce((s,b)=>s+b.w*b.x,0)/m;
      if(cx<stack[k].x-stack[k].w/2||cx>stack[k].x+stack[k].w/2)f=k}
    if(f>=0){const falling=stack.splice(f+1),d=falling.reduce((s,b)=>s+b.x,0)/falling.length>stack[f].x?1:-1;bad();
      crash(falling.map((b,i)=>rect(b.x,GY-(f+2+i)*BH,b.w,b.c)).join(""),d*220,d*50);prog();later(()=>{busy=false},900);return}
    prog();
    if(stack.length>=N){done=true;later(win,700);return}
    busy=false;
  }
  svg.addEventListener("pointerdown",e=>{e.preventDefault();drop()});
  $("#sz").onclick=e=>{const b=e.target.closest("button");if(!b)return;size=b.dataset.s;beep(520,.05);prog()};
  prog();requestAnimationFrame(frame);
}
document.addEventListener("keydown",e=>{if(cur==="torre"&&(e.code==="Space"||e.key===" ")&&towerDrop&&$("#menu").hidden){e.preventDefault();towerDrop()}});

registrar("torre",{iniciar:torre,niveles:()=>TOW});
