/* ¿QUÉ NECESITO?: clasificar transporte, comunicación y energía; después, elegir qué hace falta en cada situación.
   Niveles y situaciones: datos/niveles/que-necesito.js · Categorías: datos/personajes.js → queNecesito */
const TCB=PERS.queNecesito.categorias,ITN=PERS.queNecesito.nombres,ITC=PERS.queNecesito.opciones;
const TLV=NIVELES["que-necesito"];
function tycom(){const L=TLV[lvl];if(L.sit)return needs(L.sit,L.situaciones);classify(TCB,L.b,L.n)}
function needs(N,SIT){
  const preg=TEXTOS["que-necesito"].pregunta;
  const list=shuffle([...SIT]),R=list.length;let round=0,cur3;
  const a=area();const e=Math.max(80,Math.floor(Math.min(150,a.h/4.2)));const o=Math.max(56,Math.floor(Math.min(96,a.h/5.5,(a.w-40)/(N*1.8))));
  stage.innerHTML=`<div class="col" style="--e:${e}px;--o:${o}px;justify-content:center;gap:22px"><div class="prog" id="pr"></div>
    <div class="sitcard" id="sc"><div class="sitpic"><span id="sp"></span><span class="plus">+</span><span class="ans" id="sa">❓</span></div>
      <div class="sittxt"><button id="rep" aria-label="${TEXTOS.comun.escuchar}">🔊</button><span id="st"></span></div></div>
    <div class="opts" id="op"></div></div>`;
  const next=()=>{cur3=list[round];const[pic,txt,ans,cat]=cur3;
    const others=shuffle(Object.entries(ITC).filter(([k])=>k!==cat).flatMap(([,v])=>v).filter(x=>x!==ans)).slice(0,N-1);
    const opts=shuffle([ans,...others]);
    $("#pr").innerHTML=[...Array(R)].map((_,i)=>`<i style="${i<round?'background:'+FONDOS.juegos["que-necesito"]:''}"></i>`).join("");
    $("#sp").textContent=pic;$("#sa").textContent="❓";$("#sa").classList.remove("got");$("#st").textContent=fmt(preg,{x:txt});
    $("#sc").classList.remove("pop");void $("#sc").offsetWidth;$("#sc").classList.add("pop");sayQuiet(fmt(preg,{x:txt}));
    $("#op").innerHTML=opts.map(x=>`<button class="opt ins" data-x="${x}">${x}<small>${ITN[x]||""}</small></button>`).join("")};
  $("#rep").onclick=()=>sayQuiet(fmt(preg,{x:cur3[1]}));
  $("#op").onclick=ev=>{const b=ev.target.closest(".opt");if(!b||round>=R)return;
    if(b.dataset.x===cur3[2]){good();$("#sa").textContent=cur3[2];$("#sa").classList.add("got");b.classList.add("pop");round++;
      if(round>=R)later(win,900);else later(next,1300)}else shakeEl(b)};
  next();
}

registrar("que-necesito",{iniciar:tycom,niveles:()=>TLV});
