/* NÚCLEO: estado del juego, utilidades, registro de juegos, inicio y barra de arriba.
   Los juegos se suman con registrar(id, {...}) al final de cada juegos/<id>/juego.js */
const TEXTOS = DATOS.textos, PERS = DATOS.personajes, FONDOS = DATOS.fondos, NIVELES = DATOS.niveles;

/* "dibujo:ruedas" en los datos = el SVG de personajes.dibujos.ruedas */
(function usarDibujos(o){
  Object.keys(o).forEach(k=>{const v=o[k];
    if(typeof v==="string"&&v.indexOf("dibujo:")===0)o[k]=PERS.dibujos[v.slice(7)];
    else if(v&&typeof v==="object"&&k!=="dibujos")usarDibujos(v)});
})(PERS);

const GAMES={};
let cur=null, lvl=0, sound=true, timers=[];
const $=s=>document.querySelector(s);
const stage=$("#stage");
const clearTimers=()=>{timers.forEach(clearTimeout);timers=[]};
const later=(f,ms)=>timers.push(setTimeout(f,ms));
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const shakeEl=el=>{el.classList.remove("shake");void el.offsetWidth;el.classList.add("shake");bad()};
const rnd=(a,b)=>a+Math.random()*(b-a);
/* completa {n} y {x} en un texto de datos/textos.js */
const fmt=(s,v)=>s.replace(/\{(\w+)\}/g,(m,k)=>v[k]);

/* registrar("robot", { iniciar: robot, niveles: () => RLV, libre: true })
   libre: tiene modo libre · oculto: no aparece en el inicio hasta ganar todo · sinNiveles: no muestra niveles */
function registrar(id,o){
  GAMES[id]={name:TEXTOS.juegos[id],ico:PERS.iconosJuegos[id],c:FONDOS.juegos[id],
    free:!!o.libre,hidden:!!o.oculto,nolv:!!o.sinNiveles,iniciar:o.iniciar,niveles:o.niveles||(()=>[])};
}
const count=g=>GAMES[g].niveles().length;

function setBar(){
  $("#title").innerHTML=cur?GAMES[cur].ico+" "+GAMES[cur].name:TEXTOS.titulo;
  $("#dots").innerHTML=!cur||GAMES[cur].nolv?"":lvl==="free"?`<span class="chip">${TEXTOS.barra.libre}</span>`:
    [...Array(count(cur)).keys()].map(i=>`<i class="${i<=lvl?'on':''}" style="--c:${GAMES[cur].c}"></i>`).join("");
}
function home(){
  clearTimers();cur=null;setBar();$("#fab").hidden=true;window.onpointerup=null;window.onpointermove=null;
  stage.innerHTML=`<div class="home">${Object.entries(GAMES).filter(([k,g])=>!g.hidden||allStars()).map(([k,g])=>
    `<button class="tile g-${k}" style="--c:${g.c}" data-g="${k}">${doneSet.has(k)?`<span class="badge" aria-label="${TEXTOS.barra.completado}">⭐</span>`:""}<span class="ico">${g.ico}</span>${g.name}</button>`).join("")}</div>`;
  const pt=stage.querySelector(".tile.g-premio");if(pt)pt.classList.add("pop","shine");
  stage.querySelectorAll(".tile").forEach(t=>t.onclick=()=>{beep(660);start(t.dataset.g,0)});
}
function start(g,l){clearTimers();cur=g;lvl=l;setBar();$("#fab").hidden=false;window.onpointerup=null;window.onpointermove=null;GAMES[g].iniciar()}

const narrow=()=>innerWidth<=700||innerHeight<=500;
function area(){const r=stage.getBoundingClientRect();if(narrow())return{w:r.width,h:Math.max(360,r.width*1.1),n:1};return{w:r.width,h:r.height-16}}
