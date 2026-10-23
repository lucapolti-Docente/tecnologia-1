/* CLASIFICAR (motor común): aparece una cosa y hay que tocar su grupo.
   B = grupos {clave:{n,i,c,it}}, keys = grupos que se muestran, n = cuántas cosas,
   onWin = qué hacer al terminar, consigna = texto que se lee en voz alta al empezar */
function classify(B,keys,n,onWin,consigna){
  let q=[];const pools={};keys.forEach(k=>pools[k]=shuffle([...B[k].it]));
  for(let i=0;i<n;i++){const k=keys[i%keys.length];if(!pools[k].length)pools[k]=shuffle([...B[k].it]);q.push({k,e:pools[k].pop()})}
  q=shuffle(q);let done=0,busy=false,errores=0;
  stage.innerHTML=`<div class="reci"><div class="prog" id="pr"></div><div class="item" id="it"></div>
   <div class="bins">${keys.map(k=>`<button class="bin ${B[k].ama?'ama':''}" style="--c:${B[k].c}" data-k="${k}"><span class="bi">${B[k].i}</span>${B[k].n}</button>`).join("")}</div></div>`;
  const show=()=>{busy=false;errores=0;$("#pr").innerHTML=q.map((_,i)=>`<i class="${i<done?'on':''}"></i>`).join("");$("#it").textContent=q[done].e;$("#it").classList.remove("pop");void $("#it").offsetWidth;$("#it").classList.add("pop")};
  show();if(consigna)sayQuiet(consigna);
  stage.querySelectorAll(".bin").forEach(b=>b.onclick=()=>{
    if(busy||done>=q.length)return;
    if(b.dataset.k===q[done].k){busy=true;good();sayQuiet(B[b.dataset.k].n);b.classList.remove("pop","pista");void b.offsetWidth;b.classList.add("pop");done++;
      $("#pr").innerHTML=q.map((_,i)=>`<i class="${i<done?'on':''}"></i>`).join("");
      if(done>=q.length)later(onWin||win,300);else later(show,350)} /* una pausa: un doble toque no cuenta la cosa siguiente */
    else{shakeEl($("#it"));if(++errores>=2)pista(stage.querySelector(`.bin[data-k="${q[done].k}"]`))}});
}
