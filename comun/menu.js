/* MENÚ ☰: juegos, niveles, modo libre, ajustes y enlace para docentes. Botón 🏠 flotante. */
function openMenu(){
  const M=TEXTOS.menu;
  const m=$("#menu");const free=lvl==="free";
  m.innerHTML=`<button class="close" data-a="close" aria-label="${M.cerrar}">✕</button>
  <button class="mbtn big" data-a="home">${M.inicio}</button>
  <h2>${M.juegos}</h2>
  ${Object.entries(GAMES).filter(([k,g])=>!g.hidden||allStars()||k===cur).map(([k,g])=>`<button class="mbtn big ${k===cur?'sel':''}" data-g="${k}">${g.ico} ${g.name}</button>`).join("")}
  ${cur?`${GAMES[cur].nolv?"":`<h2>${M.nivel}</h2>`}<div class="row">${[...Array(count(cur)).keys()].map(i=>`<button class="mbtn lvl ${i===lvl?'sel':''}" data-l="${i}">${i+1}</button>`).join("")}</div>
  ${GAMES[cur].free?`<button class="mbtn big ${free?'sel':''}" data-l="free">${M.modoLibre}</button>`:""}
  ${cur==="robot"&&free?`<h2>${M.tamano}</h2><div class="row">${[3,4,5,6,7,8].map(s=>`<button class="mbtn lvl ${s===freeSize?'sel':''}" data-s="${s}">${s}</button>`).join("")}</div>`:""}
  ${cur==="escribir"&&lvl==="free"?"":`<button class="mbtn big" data-a="again">${M.otraVez}</button>`}`:""}
  <h2>${M.ajustes}</h2>
  <button class="mbtn big" data-a="sound">${sound?M.sonidoSi:M.sonidoNo}</button>
  ${doneSet.size?`<button class="mbtn big mantener" id="borrarEst">${M.borrarEstrellas}<small>${M.mantener}</small></button>`:""}
  <button class="mbtn big" data-a="premio">${M.probarPremio}</button>
  <button class="mbtn big" data-a="full">${M.pantallaCompleta}</button>
  <button class="mbtn big" data-a="docentes">${M.docentes}</button>`;
  m.hidden=false;$("#scrim").hidden=false;
  /* borrar estrellas: hay que mantener apretado 2 segundos (así no lo borra un toque sin querer) */
  const be=$("#borrarEst");
  if(be){let t=null;const soltar=()=>{clearTimeout(t);be.classList.remove("llenando")};
    be.onpointerdown=e=>{e.preventDefault();be.classList.add("llenando");
      t=setTimeout(()=>{doneSet.clear();saveDone();beep(300,.3);closeMenu();if(!cur)home()},2000)};
    be.onpointerup=be.onpointerleave=be.onpointercancel=soltar}
}
function closeMenu(){$("#menu").hidden=true;$("#scrim").hidden=true}
$("#burger").onclick=openMenu;$("#scrim").onclick=closeMenu;
$("#burger").setAttribute("aria-label",TEXTOS.barra.menu);
$("#menu").onclick=e=>{
  const b=e.target.closest("button");if(!b)return;
  if(b.dataset.g){closeMenu();start(b.dataset.g,0)}
  else if(b.dataset.l){closeMenu();start(cur,b.dataset.l==="free"?"free":+b.dataset.l)}
  else if(b.dataset.s){freeSize=+b.dataset.s;closeMenu();start("robot","free")}
  else if(b.dataset.z){typeSize=+b.dataset.z;closeMenu();start("escribir",0)}
  else switch(b.dataset.a){
    case"close":closeMenu();break;
    case"home":closeMenu();home();break;
    case"again":closeMenu();start(cur,lvl);break;
    case"loco":loco=!loco;closeMenu();start("escribir",0);break;
    case"premio":closeMenu();start("premio",0);break;
    case"sound":sound=!sound;if(!sound)cortarSonidos();openMenu();break;
    case"full":try{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{})}catch(e){}closeMenu();break;
    case"docentes":location.href="docentes/index.html";break;
  }
};
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#menu").hidden)closeMenu()});
$("#fab").setAttribute("aria-label",TEXTOS.barra.inicio);
$("#fab").onclick=()=>{beep(660);home()};
