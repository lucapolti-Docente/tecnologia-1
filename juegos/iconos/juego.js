/* ÍCONOS: escuchar la consigna y tocar el ícono correcto en el celular.
   Niveles: datos/niveles/iconos.js · Íconos y consignas: datos/personajes.js → iconos */
const ICN=PERS.iconos.apps;
const ILV=NIVELES.iconos;
function icon(){
  const N=ILV[lvl],R=4;let round=0,target;
  const pool=shuffle([...ICN]);const TG=pool.slice(0,R);
  const a=area();const ic=Math.max(54,Math.floor(Math.min(96,(a.h-190)/Math.ceil(N/3)/1.35)));
  stage.innerHTML=`<div class="col" style="justify-content:center;gap:14px"><div class="prog" id="pr"></div>
    <div class="phone" style="--ic:${ic}px"><div class="say"><button id="rep" aria-label="${TEXTOS.comun.escuchar}">🔊</button><span id="ins"></span></div><div class="apps" id="ap"></div></div></div>`;
  const next=()=>{
    target=TG[round];const opts=shuffle([target,...shuffle(ICN.filter(x=>x!==target)).slice(0,N-1)]);
    $("#pr").innerHTML=[...Array(R)].map((_,i)=>`<i style="${i<round?'background:'+FONDOS.juegos.iconos:''}"></i>`).join("");
    $("#ins").textContent=target[1];sayQuiet(target[1]);
    $("#ap").innerHTML=opts.map(o=>`<button class="app" data-e="${o[0]}">${o[0]}</button>`).join("");
  };
  $("#rep").onclick=()=>sayQuiet(target[1]);
  $("#ap").onclick=e=>{const b=e.target.closest(".app");if(!b||round>=R)return;
    if(b.dataset.e===target[0]){good();b.classList.add("pop","ok");round++;if(round>=R)later(win,700);else later(next,900)}else shakeEl(b)};
  next();
}

registrar("iconos",{iniciar:icon,niveles:()=>ILV});
