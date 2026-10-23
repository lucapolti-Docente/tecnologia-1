/* SECUENCIAS: completar el patrón o encontrar el que está mal. Modo libre: armar un patrón que suena.
   Niveles: datos/niveles/secuencias.js · Figuras: datos/personajes.js → secuencias */
const SQ=NIVELES.secuencias;
const SETS=PERS.secuencias.figuras;
function secu(){
  if(lvl==="free")return secuFree();
  const L=SQ[lvl];const set=shuffle([...SETS[Math.floor(Math.random()*SETS.length)]]);
  const seq=[...Array(L.n)].map((_,i)=>set[L.t.charCodeAt(i%L.t.length)-65]);
  const uniq=new Set(L.t).size;const opts=L.err?[]:shuffle(set.slice(0,Math.max(3,uniq)));
  const tamE=()=>{const a=area();return Math.max(30,Math.floor(Math.min(100,(Math.min(a.w,1400)-60-12*L.n)/(1.3*L.n))))};
  const tamO=()=>{const a=area();return Math.max(56,Math.floor(Math.min(100,a.h/4.5,(a.w-40)/(opts.length*1.7))))};
  const e=tamE();let errores=0;
  /* al completar: las figuras saltan una por una, cada una con su nota, y después la victoria */
  const festejo=()=>{const sp=[...$("#ln").children];sp.forEach((s,i)=>later(()=>{s.classList.remove("salta");void s.offsetWidth;s.classList.add("salta");
      try{tone("triangle",SNOTE[set.indexOf(seq[i])%4],AC().currentTime+.01,.25,{a:.005,vol:.25})}catch(_){}},i*150));
    later(win,sp.length*150+450)};
  alCambiarTamano(()=>{const c=stage.querySelector(".col");c.style.setProperty("--e",tamE()+"px");if(opts.length)c.style.setProperty("--o",tamO()+"px")});
  if(L.err){
    const bi=2+Math.floor(Math.random()*(L.n-2)),right=seq[bi];const shown=[...seq];shown[bi]=shuffle(set.filter(x=>x!==right))[0];let fixed=false;
    stage.innerHTML=`<div class="col" style="--e:${e}px;justify-content:center;gap:40px"><button class="bugtag big" id="bt">${TEXTOS.secuencias.cualEstaMal}</button><div class="line" id="ln">${shown.map((x,i)=>`<span class="tap" data-i="${i}">${x}</span>`).join("")}</div></div>`;
    sayQuiet(TEXTOS.secuencias.cualEstaMal);$("#bt").onclick=()=>sayQuiet(TEXTOS.secuencias.cualEstaMal); /* el cartel repite la consigna */
    $("#ln").onclick=ev=>{const s=ev.target.closest(".tap");if(!s||fixed)return;
      if(+s.dataset.i===bi){fixed=true;good();s.textContent=right;s.classList.remove("pista");s.classList.add("pop","fixed");later(festejo,500)}
      else{shakeEl(s);if(++errores>=2)pista($("#ln").children[bi])}};
    return;
  }
  let k=L.n-L.m;
  stage.innerHTML=`<div class="col" style="--e:${e}px;--o:${tamO()}px"><div class="line" id="ln"></div><div class="opts" id="op">${opts.map(x=>`<button class="opt" data-x="${x}">${x}</button>`).join("")}</div></div>`;
  const draw=()=>{$("#ln").innerHTML=seq.map((x,i)=>i<k?`<span>${x}</span>`:`<span class="q">?</span>`).join("")};
  draw();
  $("#op").onclick=ev=>{const b=ev.target.closest(".opt");if(!b||k>=L.n)return;
    if(b.dataset.x===seq[k]){k++;errores=0;good();draw();if(k>=L.n)later(festejo,300)}
    else{shakeEl(b);if(++errores>=2)pista($(`#op .opt[data-x="${seq[k]}"]`))}};
}

/* SECUENCIAS LIBRE: armar un patrón que se repite y suena */
const SNOTE=[261.6,329.6,392,523.3],SWAVE=["triangle","sine","square","sine"];
function secuFree(){
  const T=TEXTOS.secuencias;
  let set=0,unit=[],playing=false,pos=-1,tk=0;
  const tam=()=>{const a=area();return{o:Math.max(56,Math.floor(Math.min(96,a.h/6,(a.w-40)/7))),e:Math.max(28,Math.floor(Math.min(70,(Math.min(a.w,1300)-80)/(1.3*18+3))))}};
  const{o,e}=tam();
  alCambiarTamano(()=>{const t=tam(),c=stage.querySelector(".col");c.style.setProperty("--o",t.o+"px");c.style.setProperty("--e",t.e+"px");$("#strip").style.setProperty("--e",Math.round(t.e*.8)+"px")});
  stage.innerHTML=`<div class="col" style="--o:${o}px;--e:${e}px;justify-content:center;gap:22px">
    <div class="tbar" id="sets">${SETS.map((s,i)=>`<button class="tbtn" data-set="${i}" aria-label="${T.figuras}" style="font-size:34px">${s[0]}</button>`).join("")}</div>
    <div class="opts" id="pal"></div>
    <div class="line" id="un"></div>
    <div class="line" id="strip" style="--e:${Math.round(e*.8)}px"></div>
    <div class="tbar controles"><button class="tbtn wide say" id="pp" aria-label="${T.tocar}">▶</button><button class="tbtn" id="bk" aria-label="${T.sacar}">⌫</button><button class="tbtn" id="cl" aria-label="${TEXTOS.comun.borrarTodo}">🗑️</button></div></div>`;
  const snd=i=>{try{tone(SWAVE[set],SNOTE[i],AC().currentTime+.02,.35,{a:.005,vol:set===2?.12:.3})}catch(_){}};
  const draw=()=>{
    $("#sets").querySelectorAll("button").forEach(b=>b.classList.toggle("sel",+b.dataset.set===set));
    $("#pal").innerHTML=SETS[set].map((x,i)=>`<button class="opt" data-i="${i}">${x}</button>`).join("");
    $("#un").innerHTML=unit.map(i=>`<span>${SETS[set][i]}</span>`).join("")+(unit.length<6?`<span class="q">+</span>`:"");
    const rep=[...unit,...unit,...unit];
    $("#strip").innerHTML=rep.length?rep.map((i,k)=>`<span class="${k===pos?'now':''}">${SETS[set][i]}</span>`).join(""):`<span class="q">🔁</span>`;
    $("#pp").textContent=playing?"■":"▶";
  };
  const tick=my=>{if(!playing||my!==tk||!unit.length)return;const n=unit.length*3;pos=(pos+1)%n;snd(unit[pos%unit.length]);draw();later(()=>tick(my),420)};
  const stop=()=>{playing=false;pos=-1;draw()};
  draw();
  $("#sets").onclick=ev=>{const b=ev.target.closest("button");if(!b)return;set=+b.dataset.set;beep(520,.05);draw()};
  $("#pal").onclick=ev=>{const b=ev.target.closest(".opt");if(!b)return;const i=+b.dataset.i;snd(i);if(unit.length>=6){shakeEl($("#un"));return}unit.push(i);draw()};
  $("#pp").onclick=()=>{if(playing){stop();return}if(!unit.length){shakeEl($("#un"));return}playing=true;pos=-1;tick(++tk)};
  $("#bk").onclick=()=>{unit.pop();if(!unit.length)stop();else{pos=-1;draw()}};
  $("#cl").onclick=()=>{unit=[];stop()};
}

registrar("secuencias",{iniciar:secu,niveles:()=>SQ,libre:true});
