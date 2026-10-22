/* CLASIFICAR (motor común): aparece una cosa y hay que tocar su grupo.
   B = grupos {clave:{n,i,c,it}}, keys = grupos que se muestran, n = cuántas cosas, onWin = qué hacer al terminar */
function classify(B,keys,n,onWin){
  let q=[];const pools={};keys.forEach(k=>pools[k]=shuffle([...B[k].it]));
  for(let i=0;i<n;i++){const k=keys[i%keys.length];if(!pools[k].length)pools[k]=shuffle([...B[k].it]);q.push({k,e:pools[k].pop()})}
  q=shuffle(q);let done=0;
  stage.innerHTML=`<div class="reci"><div class="prog" id="pr"></div><div class="item" id="it"></div>
   <div class="bins">${keys.map(k=>`<button class="bin ${B[k].ama?'ama':''}" style="--c:${B[k].c}" data-k="${k}"><span class="bi">${B[k].i}</span>${B[k].n}</button>`).join("")}</div></div>`;
  const show=()=>{$("#pr").innerHTML=q.map((_,i)=>`<i class="${i<done?'on':''}"></i>`).join("");$("#it").textContent=q[done].e;$("#it").classList.remove("pop");void $("#it").offsetWidth;$("#it").classList.add("pop")};
  show();
  stage.querySelectorAll(".bin").forEach(b=>b.onclick=()=>{
    if(done>=q.length)return;
    if(b.dataset.k===q[done].k){good();b.classList.remove("pop");void b.offsetWidth;b.classList.add("pop");done++;
      if(done>=q.length){$("#pr").innerHTML=q.map(()=>`<i class="on"></i>`).join("");later(onWin||win,300)}else show()}
    else shakeEl($("#it"))});
}
