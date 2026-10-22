/* ORDENAR (desactivado; ver README para activarlo): qué pasa primero, después y al final.
   Niveles: datos/niveles/orden.js */
const ORD=NIVELES.orden;
function orden(){
  const L=ORD[lvl];let k=0,cards;
  do{cards=shuffle(L.map((_,i)=>i))}while(cards.every((v,i)=>v===i));
  const a=area();const e=Math.max(56,Math.floor(Math.min(130,a.h/4,(a.w-60-12*L.length)/(1.3*L.length))));
  const o=Math.max(56,Math.floor(Math.min(120,a.h/4.2,(a.w-40)/(L.length*1.7))));
  stage.innerHTML=`<div class="col" style="--e:${e}px;--o:${o}px"><div class="line" id="ln"></div><div class="opts" id="op"></div></div>`;
  const draw=()=>{
    $("#ln").innerHTML=L.map((x,i)=>i<k?`<span>${x}</span>`:`<span class="q">${i+1}</span>`).join("");
    $("#op").innerHTML=cards.filter(i=>i>=k).map(i=>`<button class="opt" data-i="${i}">${L[i]}</button>`).join("");
  };
  draw();
  $("#op").onclick=ev=>{const b=ev.target.closest(".opt");if(!b)return;
    if(+b.dataset.i===k){k++;good();draw();if(k>=L.length)later(win,500)}else shakeEl(b)};
}

registrar("orden",{iniciar:orden,niveles:()=>ORD});
