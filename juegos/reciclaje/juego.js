/* RECICLAJE: llevar cada residuo a su contenedor. Modo libre: limpiar la plaza arrastrando la basura.
   Niveles: datos/niveles/reciclaje.js · Contenedores y residuos: datos/personajes.js → reciclaje */
const BINS=PERS.reciclaje.contenedores;
const CYCLE=`<div class="cycle">${PERS.reciclaje.ciclo.map((e,i)=>`<span style="animation-delay:${.3+i*.4}s">${e}</span>`).join("<b>➜</b>")}</div>`;
const ELV=NIVELES.reciclaje;
function reci(){
  if(lvl==="free")return reciFree();
  const L=ELV[lvl];let q=[];
  const pools={};L.b.forEach(k=>pools[k]=shuffle([...BINS[k].it]));
  for(let i=0;i<L.n;i++){const k=L.b[i%L.b.length];if(!pools[k].length)pools[k]=shuffle([...BINS[k].it]);q.push({k,e:pools[k].pop()})}
  q.sort(()=>Math.random()-.5);let done=0;
  stage.innerHTML=`<div class="reci"><div class="prog" id="pr"></div><div class="item" id="it"></div>
   <div class="bins">${L.b.map(k=>`<button class="bin ${BINS[k].ama?'ama':''}" style="--c:${BINS[k].c}" data-k="${k}"><span class="bi">${BINS[k].i}</span>${BINS[k].n}</button>`).join("")}</div></div>`;
  const show=()=>{$("#pr").innerHTML=q.map((_,i)=>`<i class="${i<done?'on':''}"></i>`).join("");$("#it").textContent=q[done].e;$("#it").classList.remove("pop");void $("#it").offsetWidth;$("#it").classList.add("pop")};
  show();
  stage.querySelectorAll(".bin").forEach(b=>b.onclick=()=>{
    if(done>=q.length)return;
    if(b.dataset.k===q[done].k){good();b.classList.remove("pop");void b.offsetWidth;b.classList.add("pop");done++;
      if(done>=q.length){$("#pr").innerHTML=q.map(()=>`<i class="on"></i>`).join("");later(()=>win(null,lvl===ELV.length-1?{note:CYCLE}:{}),300)}else show()}
    else{bad();$("#it").classList.remove("shake");void $("#it").offsetWidth;$("#it").classList.add("shake")}
  });
}

/* PLAZA (modo libre): agregan cosas que aparecen sucias y las limpian */
const PLAZA=PERS.reciclaje.plaza;
function reciFree(){
  const KB=Object.keys(BINS);
  const a=area();const IT=Math.max(54,Math.floor(Math.min(110,(a.n?a.w:a.w-160)/8)));
  stage.innerHTML=`<div class="plaza"><div class="prow"><div class="scene" id="sn" style="--it:${IT}px"></div>
    <div class="side">${KB.map(k=>`<div class="minibin ${BINS[k].ama?'ama':''}" data-k="${k}" style="--c:${BINS[k].c}"><span class="bi">${BINS[k].i}</span>${BINS[k].n}</div>`).join("")}</div></div>
    <div class="addbar" id="ab">${PLAZA.map(e=>`<button data-e="${e}" aria-label="${TEXTOS.reciclaje.agregar}">${e}</button>`).join("")}</div></div>`;
  const sn=$("#sn");let id=0,drag=null;
  const add=e=>{
    if(sn.querySelectorAll(".it").length>=24){shakeEl(sn);return}
    const x=rnd(10,88),y=rnd(30,82),n=2+Math.floor(Math.random()*2),my=++id;
    const it=document.createElement("div");it.className="it dirty";it.textContent=e;it.style.left=x+"%";it.style.top=y+"%";it.dataset.id=my;it.dataset.left=n;sn.appendChild(it);
    for(let i=0;i<n;i++){const k=KB[Math.floor(Math.random()*KB.length)],its=BINS[k].it;
      const t=document.createElement("div");t.className="tr";t.textContent=its[Math.floor(Math.random()*its.length)];
      t.dataset.k=k;t.dataset.of=my;t.style.left=Math.min(95,Math.max(5,x+rnd(-11,11)))+"%";t.style.top=Math.min(95,Math.max(8,y+rnd(-4,14)))+"%";t.style.fontSize=Math.round(IT*.45)+"px";sn.appendChild(t)}
    beep(500,.08);
  };
  add(PLAZA[0]);
  $("#ab").onclick=e=>{const b=e.target.closest("button");if(b)add(b.dataset.e)};
  sn.addEventListener("pointerdown",e=>{const t=e.target.closest(".tr");if(!t)return;e.preventDefault();
    drag={t,left:t.style.left,top:t.style.top};document.body.appendChild(t);t.classList.add("drag");t.style.left=e.clientX+"px";t.style.top=e.clientY+"px"});
  window.onpointermove=e=>{if(!drag)return;drag.t.style.left=e.clientX+"px";drag.t.style.top=e.clientY+"px"};
  window.onpointerup=e=>{if(!drag)return;const{t}=drag;t.hidden=true;const el=document.elementFromPoint(e.clientX,e.clientY);t.hidden=false;
    const bin=el&&el.closest(".minibin");
    if(bin&&bin.dataset.k===t.dataset.k){t.remove();good();bin.classList.remove("pop");void bin.offsetWidth;bin.classList.add("pop");
      const it=sn.querySelector(`.it[data-id="${t.dataset.of}"]`);
      if(it){it.dataset.left=+it.dataset.left-1;if(+it.dataset.left<=0){it.classList.remove("dirty");it.classList.add("pop","clean");[660,880,1100].forEach((f,i)=>later(()=>beep(f,.12),i*90))}}}
    else{if(bin)shakeEl(bin);t.classList.remove("drag");t.style.left=drag.left;t.style.top=drag.top;sn.appendChild(t)}
    drag=null};
}

registrar("reciclaje",{iniciar:reci,niveles:()=>ELV,libre:true});
