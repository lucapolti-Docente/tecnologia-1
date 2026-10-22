/* SOMBRAS: unir el objeto con su sombra (y cada oficio con su herramienta). Modo libre: linterna en una pieza oscura.
   Niveles: datos/niveles/sombras.js · Objetos y oficios: datos/personajes.js → sombras */
const SHL=NIVELES.sombras;
const SHI=PERS.sombras.objetos,SHNAME=PERS.sombras.nombres,OFI=PERS.sombras.oficios;
function somb(){
  if(lvl==="free")return sombFree();
  const L=SHL[lvl],N=L.n,R=3;let round=0;
  const a=area();const e=Math.max(80,Math.floor(Math.min(170,a.h/3.8)));
  const o=Math.max(56,Math.floor(Math.min(110,a.h/4.5,(a.w-40)/(N*1.7))));
  stage.innerHTML=`<div class="col" style="--e:${e}px;--o:${o}px"><div class="prog" id="pr"></div><div class="target" id="tg"></div><div class="opts" id="op"></div></div>`;
  let target;const people=L.of?shuffle([...OFI]).slice(0,R):null;const usedT=new Set();
  const next=()=>{
    let opts;
    if(L.of){const p=people[round];target=p[2];opts=shuffle([p[2],...shuffle(OFI.filter(o=>o!==p).map(o=>o[2]).filter(t=>t!==p[2])).slice(0,N-1)]);
      $("#tg").innerHTML=`${p[0]}<small class="who">${p[1]}</small>`;sayQuiet(p[1])}
    else{target=shuffle(SHI.filter(x=>!usedT.has(x)))[0];usedT.add(target);opts=shuffle([target,...shuffle(SHI.filter(x=>x!==target)).slice(0,N-1)]);$("#tg").textContent=target}
    $("#pr").innerHTML=[...Array(R)].map((_,i)=>`<i class="${i<round?'on':''}" style="background:${i<round?FONDOS.juegos.sombras:''}"></i>`).join("");
    $("#tg").classList.remove("pop");void $("#tg").offsetWidth;$("#tg").classList.add("pop");
    $("#op").innerHTML=opts.map(x=>`<button class="opt" data-x="${x}"><span class="${L.of?'':'dark'}">${x}</span></button>`).join("");
  };
  next();
  $("#op").onclick=ev=>{const b=ev.target.closest(".opt");if(!b||round>=R)return;
    if(b.dataset.x===target){good();b.querySelector("span").classList.remove("dark");b.classList.add("pop");round++;
      if(round>=R)later(win,700);else later(next,800)}
    else shakeEl(b)};
}

/* SOMBRAS LIBRE: linterna en una pieza oscura */
function sombFree(){
  const N=8;const objs=shuffle([...SHI]).slice(0,N);const slots=shuffle([...Array(12).keys()]).slice(0,N);
  const a=area();const sz=Math.max(46,Math.floor(Math.min(100,a.h/6.5,(a.n?a.w:a.w)/9)));
  stage.innerHTML=`<div class="room" id="rm" style="--sz:${sz}px">${objs.map((o,i)=>{const s=slots[i],c=s%4,r=Math.floor(s/4);
      return `<div class="hid" data-n="${SHNAME[o]||""}" style="left:${12+c*25+rnd(-6,6)}%;top:${18+r*32+rnd(-6,6)}%">${o}<small></small></div>`}).join("")}
    <div class="darkness" id="dk"></div><div class="found" id="fc"></div></div>`;
  const rm=$("#rm"),dk=$("#dk");let found=0;
  const fc=()=>{$("#fc").innerHTML=[...Array(N)].map((_,i)=>`<i class="${i<found?'on':''}"></i>`).join("")};fc();
  const light=e=>{const r=rm.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;dk.style.setProperty("--x",x+"px");dk.style.setProperty("--y",y+"px");
    rm.querySelectorAll(".hid:not(.lit)").forEach(h=>{const b=h.getBoundingClientRect(),cx=b.left+b.width/2-r.left,cy=b.top+b.height/2-r.top;
      if(Math.hypot(cx-x,cy-y)<sz*.75){h.classList.add("lit","pop");h.querySelector("small").textContent=h.dataset.n;found++;fc();[700,1000].forEach((f,i)=>later(()=>beep(f,.1),i*80));sayQuiet(h.dataset.n);
        if(found>=N)later(()=>win(sombFree),1500)}})};
  rm.addEventListener("pointermove",light);rm.addEventListener("pointerdown",light);
}

registrar("sombras",{iniciar:somb,niveles:()=>SHL,libre:true});
