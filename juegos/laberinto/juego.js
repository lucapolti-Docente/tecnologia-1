/* LABERINTO: dibujar el cable desde la pila hasta la lamparita. Modo libre: armar paredes y probar.
   Niveles: datos/niveles/laberinto.js · Dibujos: datos/personajes.js → laberinto */
const MZ=NIVELES.laberinto;
const swSvg=on=>`<svg viewBox="0 0 100 100" width="84%" height="84%" aria-hidden="true"><rect x="8" y="58" width="84" height="20" rx="10" fill="#9A97AE"/><circle cx="22" cy="68" r="10" fill="#23204A"/><line x1="22" y1="68" x2="${on?82:66}" y2="${on?68:18}" stroke="#23204A" stroke-width="11" stroke-linecap="round"/><circle cx="${on?82:66}" cy="${on?68:18}" r="11" fill="${on?'#22A866':'#E5484D'}"/></svg>`;
function labe(){
  if(lvl==="free")return labeFree();
  const E=PERS.laberinto;
  const n=MZ[lvl].n,S=2*n+1;let seed=lvl*7919+101;const R=()=>(seed=(seed*16807)%2147483647)/2147483647;
  const g=[...Array(S)].map(()=>Array(S).fill(1));
  const st=[[0,0]];const seen=new Set(["0,0"]);g[1][1]=0;
  while(st.length){const[r,c]=st[st.length-1];
    const nb=[[0,1],[1,0],[0,-1],[-1,0]].map(([a,b])=>[r+a,c+b]).filter(([a,b])=>a>=0&&b>=0&&a<n&&b<n&&!seen.has(a+","+b));
    if(!nb.length){st.pop();continue}
    const[a,b]=nb[Math.floor(R()*nb.length)];g[r+a+1][c+b+1]=0;g[2*a+1][2*b+1]=0;seen.add(a+","+b);st.push([a,b])}
  const goal=[S-2,S-2];let path=[[1,1]],done=false,sw=null,swOn=false;
  if(MZ[lvl].interruptor){const prev=new Map([["1,1",null]]),q=[[1,1]];
    while(q.length){const[r,c]=q.shift();if(r===goal[0]&&c===goal[1])break;
      [[0,1],[1,0],[0,-1],[-1,0]].forEach(([a,b])=>{const k=(r+a)+","+(c+b);if(!g[r+a][c+b]&&!prev.has(k)){prev.set(k,r+","+c);q.push([r+a,c+b])}})}
    const sol=[];let k=goal.join(",");while(k){sol.unshift(k);k=prev.get(k)}
    sw=sol[Math.floor(sol.length/2)].split(",").map(Number)}
  const a=area();const cell=Math.max(18,Math.floor(Math.min((a.h-20)/S,(a.w-10)/S,120)));
  stage.innerHTML=`<div class="maze" id="mz" style="--cell:${cell}px;width:${S*cell}px;height:${S*cell}px"></div>`;
  const mz=$("#mz");let h="";
  const isSw=(r,c)=>sw&&sw[0]===r&&sw[1]===c;
  for(let r=0;r<S;r++)for(let c=0;c<S;c++){const s=r===1&&c===1,e=r===goal[0]&&c===goal[1];
    h+=`<div class="${g[r][c]?'w':''}${e?' goal':''}${isSw(r,c)?' swc':''}" data-r="${r}" data-c="${c}" style="left:${c*cell}px;top:${r*cell}px">${s?E.pila:e?E.lamparita:isSw(r,c)?swSvg(false):""}</div>`}
  mz.innerHTML=h;
  const at=(r,c)=>mz.children[r*S+c];
  const paint=()=>{mz.querySelectorAll(".p").forEach(d=>d.classList.remove("p"));path.forEach(([r,c])=>at(r,c).classList.add("p"))};
  paint();
  const atGoal=()=>{const[r,c]=path[path.length-1];return r===goal[0]&&c===goal[1]};
  const check=()=>{if(!atGoal()||done)return;
    if(sw&&!swOn){const el=at(...sw);el.classList.remove("need");void el.offsetWidth;el.classList.add("need");beep(250,.15);return}
    done=true;mz.classList.add("lit");later(win,900)};
  const step=el=>{
    if(!el||done||el.dataset.r===undefined)return;const r=+el.dataset.r,c=+el.dataset.c;
    const[lr,lc]=path[path.length-1];
    if(path.length>1){const[pr,pc]=path[path.length-2];if(pr===r&&pc===c){path.pop();paint();return}}
    if(Math.abs(lr-r)+Math.abs(lc-c)!==1||g[r][c]||path.some(([x,y])=>x===r&&y===c))return;
    path.push([r,c]);paint();beep(500+path.length*12,.04);check();
  };
  let down=false;
  mz.addEventListener("pointerdown",e=>{const el=e.target.closest("#mz > div");try{mz.releasePointerCapture(e.pointerId)}catch(_){}
    if(el&&sw&&!done&&isSw(+el.dataset.r,+el.dataset.c)&&path.some(([x,y])=>isSw(x,y))){swOn=!swOn;el.innerHTML=swSvg(swOn);el.classList.remove("need");beep(swOn?800:400,.08);check();return}
    down=true;step(el)});
  mz.addEventListener("pointermove",e=>{if(!down)return;const el=document.elementFromPoint(e.clientX,e.clientY);step(el&&el.closest("#mz > div"))});
  window.onpointerup=()=>down=false;
}

/* LABERINTO LIBRE: armar paredes y probar el cable */
function labeFree(){
  const T=TEXTOS.laberinto,E=PERS.laberinto;
  const S=8;let walls=new Set(),st=[0,0],goal=[S-1,S-1],tool="w",path=[[0,0]],done=false;
  const a=area();const btn=a.n?64:Math.max(64,Math.min(90,a.h/7));
  const cell=Math.max(30,Math.floor(Math.min((a.h-btn-40)/S,(a.w-10)/S,100)));
  stage.innerHTML=`<div class="col" style="--btn:${btn}px;justify-content:center;gap:16px"><div class="tools" id="tl">
    <button data-t="w" aria-label="${T.pared}">${E.pared}</button><button data-t="s" aria-label="${T.pila}">${E.pila}</button><button data-t="g" aria-label="${T.lamparita}">${E.lamparita}</button><button data-t="c" aria-label="${T.cable}">${E.cable}</button></div>
    <div class="maze" id="mz" style="--cell:${cell}px;width:${S*cell}px;height:${S*cell}px"></div></div>`;
  const mz=$("#mz");
  const same=(p,r,c)=>p[0]===r&&p[1]===c;
  const render=()=>{let h="";for(let r=0;r<S;r++)for(let c=0;c<S;c++){
      const w=walls.has(r+","+c),p=path.some(q=>same(q,r,c));
      h+=`<div class="${w?'w':''}${p?' p':''}${same(goal,r,c)?' goal':''}" data-r="${r}" data-c="${c}" style="left:${c*cell}px;top:${r*cell}px">${same(st,r,c)?E.pila:same(goal,r,c)?E.lamparita:""}</div>`}
    mz.innerHTML=h;mz.classList.toggle("lit",done)};
  const selT=()=>$("#tl").querySelectorAll("button").forEach(b=>b.classList.toggle("sel",b.dataset.t===tool));
  const reset=()=>{path=[[...st]];done=false;render()};
  selT();render();
  $("#tl").onclick=e=>{const b=e.target.closest("button");if(!b)return;tool=b.dataset.t;beep(520,.06);selT()};
  const step=el=>{
    if(!el||done||el.dataset.r===undefined)return;const r=+el.dataset.r,c=+el.dataset.c,[lr,lc]=path[path.length-1];
    if(path.length>1){const[pr,pc]=path[path.length-2];if(pr===r&&pc===c){path.pop();render();return}}
    if(Math.abs(lr-r)+Math.abs(lc-c)!==1||walls.has(r+","+c)||path.some(q=>same(q,r,c)))return;
    path.push([r,c]);beep(500+path.length*12,.04);
    if(same(goal,r,c)){done=true;render();fanfare();later(()=>win(reset),900)}else render();
  };
  let down=false;
  mz.addEventListener("pointerdown",e=>{const el=e.target.closest("#mz > div");if(!el)return;try{mz.releasePointerCapture(e.pointerId)}catch(_){}
    if(tool==="c"){down=true;step(el);return}
    const r=+el.dataset.r,c=+el.dataset.c,k=r+","+c;
    if(tool==="w"){if(same(st,r,c)||same(goal,r,c))return;walls.has(k)?walls.delete(k):walls.add(k)}
    else if(tool==="s"){if(same(goal,r,c))return;walls.delete(k);st=[r,c]}
    else{if(same(st,r,c))return;walls.delete(k);goal=[r,c]}
    beep(600,.05);reset()});
  mz.addEventListener("pointermove",e=>{if(!down)return;const el=document.elementFromPoint(e.clientX,e.clientY);step(el&&el.closest("#mz > div"))});
  window.onpointerup=()=>down=false;
}

registrar("laberinto",{iniciar:labe,niveles:()=>MZ,libre:true});
