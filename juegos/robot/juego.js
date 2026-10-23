/* ROBOT: armar un programa con flechas para llevar al robot hasta la estrella.
   Niveles: datos/niveles/robot.js · Textos: datos/textos.js → robot */
const RLV=NIVELES.robot;
let freeSize=5;
const DIR={U:[-1,0,"↑"],D:[1,0,"↓"],L:[0,-1,"←"],R:[0,1,"→"]};
/* menor cantidad de bloques para llegar (cada cambio de dirección es un bloque nuevo) */
function minBlocks(L,rocks,st,goal){
  const D=Object.values(DIR);const best=new Map();const dq=[[st[0],st[1],-1,0]];best.set(st+",-1",0);
  while(dq.length){const[r,c,d,cost]=dq.shift();if(cost>(best.get(r+","+c+","+d)??99))continue;
    if(r===goal[0]&&c===goal[1])return cost;
    D.forEach(([dr,dc],nd)=>{const nr=r+dr,nc=c+dc;if(nr<0||nc<0||nr>=L.r||nc>=L.c||rocks.has(nr+","+nc))return;
      const ncost=cost+(nd===d?0:1),k=nr+","+nc+","+nd;if(ncost<(best.get(k)??99)){best.set(k,ncost);nd===d?dq.unshift([nr,nc,nd,ncost]):dq.push([nr,nc,nd,ncost])}})}
  return 99;
}
function robot(){
  const T=TEXTOS.robot,E=PERS.robot,C=TEXTOS.comun;
  const free=lvl==="free";
  const L=free?{r:freeSize,c:freeSize,s:[0,0],g:[freeSize-1,freeSize-1],k:[]}:RLV[lvl];
  let st=[...L.s],goal=[...L.g],rocks=new Set(L.k.map(k=>k.join(","))),pos=[...st],running=false,tool="k";
  let seq=L.bug?L.bug.map(([d,n])=>({d,n})):[];
  const medidas=()=>{const a=area();const btn=Math.max(64,Math.min(104,a.h/(free?6.2:5.4)));
    const side=btn*3+20+130+28;
    const cell=a.n?Math.floor(Math.min((a.w-24)/L.c-6,80)):Math.floor(Math.min((a.w-side-30)/L.c,(a.h-20)/L.r)-6);
    return`--cell:${Math.max(36,cell)}px;--btn:${btn}px`};
  stage.innerHTML=`<div class="robot" style="${medidas()}">
    <div class="grid ${free?'editing':''}" id="rg" style="grid-template-columns:repeat(${L.c},auto)"></div>
    <div class="ctrl">
      ${free?`<div class="tools" id="tools"><button data-t="r" aria-label="${T.robot}">${E.robot}</button><button data-t="g" aria-label="${T.meta}">${E.meta}</button><button data-t="k" aria-label="${T.obstaculo}">${E.obstaculo}</button></div>`:""}
      ${L.bug?`<div class="bugtag">${T.arreglar}</div>`:""}
      <div class="arrows"><span></span><button data-d="U">↑</button><span></span>
        <button data-d="L">←</button><button class="loop" id="lp" aria-label="${T.repetir}">🔁</button><button data-d="R">→</button>
        <span></span><button data-d="D">↓</button><span></span></div>
      <div class="seq" id="seq"></div>
      <div class="go"><button class="big-btn" id="del" aria-label="${C.borrarTodo}">🗑️</button><button class="big-btn run" id="run">${T.ir}</button></div>
    </div></div>`;
  const same=(p,r,c)=>p[0]===r&&p[1]===c;
  function draw(){
    let h="";for(let r=0;r<L.r;r++)for(let c=0;c<L.c;c++){
      const t=same(pos,r,c)?E.robot:same(goal,r,c)?E.meta:rocks.has(r+","+c)?E.obstaculo:"";
      h+=`<div class="cell" data-r="${r}" data-c="${c}">${t}</div>`}
    $("#rg").innerHTML=h;
  }
  function drawSeq(now=-1){$("#seq").innerHTML=seq.map((s,i)=>`<b class="${i===now?'now':''}" data-i="${i}">${DIR[s.d][2]}${s.n>1?`<sup>×${s.n}</sup>`:""}</b>`).join("")}
  const reset=()=>{pos=[...st];running=false;draw();drawSeq()};
  draw();drawSeq();
  if(free){
    const selT=()=>$("#tools").querySelectorAll("button").forEach(b=>b.classList.toggle("sel",b.dataset.t===tool));selT();
    $("#tools").onclick=e=>{const b=e.target.closest("button");if(!b)return;tool=b.dataset.t;beep(520,.06);selT()};
    $("#rg").onclick=e=>{
      const el=e.target.closest(".cell");if(!el||running)return;const r=+el.dataset.r,c=+el.dataset.c,k=r+","+c;
      if(tool==="r"){if(same(goal,r,c))return;rocks.delete(k);st=[r,c]}
      else if(tool==="g"){if(same(st,r,c))return;rocks.delete(k);goal=[r,c]}
      else{if(same(st,r,c)||same(goal,r,c))return;rocks.has(k)?rocks.delete(k):rocks.add(k)}
      beep(600,.05);pos=[...st];draw();
    };
  }
  stage.querySelectorAll("[data-d]").forEach(b=>b.onclick=()=>{if(running)return;if(seq.length>=16){shakeEl($("#seq"));return}seq.push({d:b.dataset.d,n:1});beep(500+seq.length*25,.08);drawSeq()});
  $("#lp").onclick=()=>{if(running)return;const s=seq[seq.length-1];if(!s||s.n>=9){shakeEl($("#seq"));return}s.n++;beep(600+s.n*40,.08);drawSeq(seq.length-1);later(()=>drawSeq(),250)};
  $("#seq").onclick=e=>{const b=e.target.closest("b");if(!b||running)return;seq.splice(+b.dataset.i,1);beep(300,.06);drawSeq()};
  $("#del").onclick=()=>{if(running)return;seq=[];reset()};
  if(L.bug)sayQuiet(T.arreglar);
  $("#run").onclick=()=>{
    if(running||!seq.length)return;running=true;pos=[...st];draw();
    const steps=[];seq.forEach((s,i)=>{for(let k=0;k<s.n;k++)steps.push([s.d,i])});
    let i=0;
    /* choque o programa que no termina en la estrella: 💥 donde falló, el bloque queda marcado un rato */
    const fail=(r,c)=>{bad();const el=$(`#rg .cell[data-r="${r}"][data-c="${c}"]`);if(el)el.classList.add("choque");
      $("#rg").classList.add("shake");later(()=>{$("#rg").classList.remove("shake");reset()},1300)};
    const step=()=>{
      drawSeq(steps[i][1]);const[dr,dc]=DIR[steps[i][0]];const n=[pos[0]+dr,pos[1]+dc];
      if(n[0]<0||n[1]<0||n[0]>=L.r||n[1]>=L.c||rocks.has(n.join(","))){
        const fuera=n[0]<0||n[1]<0||n[0]>=L.r||n[1]>=L.c;fail(fuera?pos[0]:n[0],fuera?pos[1]:n[1]);return}
      pos=n;draw();beep(700,.06);i++;
      if(i<steps.length){later(step,420);return}
      /* se gana solo si el programa TERMINA en la estrella (si pasa por encima y sigue, no vale) */
      if(!same(pos,goal[0],goal[1])){later(()=>fail(pos[0],pos[1]),300);return}
      if(free){later(()=>win(reset),300);return}
      const best=minBlocks(L,rocks,st,goal),perfect=seq.length<=best,nota=fmt(best>1?T.sePuede:T.sePuedeUno,{n:best});
      if(!perfect)later(()=>sayQuiet(nota),900);
      later(()=>win(null,perfect?{title:T.perfecto,star:T.estrellasPerfecto}:{star:T.estrellasBien,note:nota}),300);
    };
    later(step,250);
  };
  alCambiarTamano(()=>{stage.querySelector(".robot").setAttribute("style",medidas())});
}

registrar("robot",{iniciar:robot,niveles:()=>RLV,libre:true});
