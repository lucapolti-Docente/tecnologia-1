/* ÍCONOS: escuchar la consigna y tocar el ícono correcto en el celular.
   Niveles: datos/niveles/iconos.js · Íconos y consignas: datos/personajes.js → iconos */
const ICN=PERS.iconos.apps;
const ILV=NIVELES.iconos;
function icon(){
  const N=ILV[lvl],R=4;let round=0,target,busy=false,errores=0;
  const pool=shuffle([...ICN]);const TG=pool.slice(0,R);
  const tamIc=()=>{const a=area();return Math.max(54,Math.floor(Math.min(96,(a.h-190)/Math.ceil(N/3)/1.35,(a.w-90)/4.05)))};const ic=tamIc();
  stage.innerHTML=`<div class="col" style="justify-content:center;gap:14px"><div class="prog" id="pr"></div>
    <div class="phone" style="--ic:${ic}px"><div class="say"><button id="rep" aria-label="${TEXTOS.comun.escuchar}">${PERS.iconos.repetir}</button><span id="ins"></span></div><div class="apps" id="ap"></div></div></div>`;
  alCambiarTamano(()=>stage.querySelector(".phone").style.setProperty("--ic",tamIc()+"px"));
  const puntos=()=>{$("#pr").innerHTML=[...Array(R)].map((_,i)=>`<i style="${i<round?'background:'+FONDOS.juegos.iconos:''}"></i>`).join("")};
  const next=()=>{
    busy=false;errores=0;target=TG[round];const opts=shuffle([target,...shuffle(ICN.filter(x=>x!==target)).slice(0,N-1)]);
    puntos();
    $("#ins").textContent=target[1];sayQuiet(target[1]);
    $("#ap").innerHTML=opts.map(o=>`<button class="app" data-e="${o[0]}">${o[0]}</button>`).join("");
  };
  $("#rep").onclick=()=>sayQuiet(target[1]);
  $("#ap").onclick=e=>{const b=e.target.closest(".app");if(!b||busy||round>=R)return; /* busy: un toque doble no cuenta dos veces */
    if(b.dataset.e===target[0]){busy=true;good();b.classList.remove("pista");b.classList.add("pop","ok");round++;puntos();if(round>=R)later(win,700);else later(next,900)}
    else{shakeEl(b);if(++errores>=2){sayQuiet(target[1]);pista($(`#ap .app[data-e="${target[0]}"]`))}}};
  next();
}

registrar("iconos",{iniciar:icon,niveles:()=>ILV});
