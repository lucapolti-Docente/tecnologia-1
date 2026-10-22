/* VICTORIA: pantalla de "¡MUY BIEN!" al terminar un nivel.
   win()          → nivel ganado (opt: {title, star, note})
   win(seguir)    → en modo libre, con un botón para seguir jugando */
function win(onFree,opt={}){
  const T=TEXTOS.victoria;
  fanfare();
  const last=lvl===count(cur)-1;
  const wasAll=allStars();
  if(!onFree&&last){doneSet.add(cur);saveDone()}
  if(!wasAll&&allStars())opt={...opt,note:T.premioDesbloqueado};
  const w=document.createElement("div");w.className="win";
  w.innerHTML=onFree?`<div class="star">⭐</div><h2>${T.muyBien}</h2><div class="row"><button class="big-btn next" data-x="edit">${T.seguir}</button></div>`:
   `<div class="star ${opt.star&&opt.star.length>2?'multi':''}">${opt.star||(last?"🏆":"⭐")}</div><h2>${opt.title||(last?T.ganaste:T.muyBien)}</h2>${opt.note?`<div class="note">${opt.note}</div>`:""}
   <div class="row"><button class="big-btn" data-x="again">${T.otraVez}</button>
   ${last&&GAMES[cur].free?`<button class="big-btn" data-x="free">${T.jugarLibre}</button>`:""}
   <button class="big-btn next" data-x="next">${last?T.inicio:T.siguiente}</button></div>`;
  w.onclick=e=>{const b=e.target.closest("button");if(!b)return;
    if(b.dataset.x==="edit"){w.remove();onFree()}
    else if(b.dataset.x==="free")start(cur,"free");
    else if(b.dataset.x==="again")start(cur,lvl);else last?home():start(cur,lvl+1)};
  stage.appendChild(w);
}
