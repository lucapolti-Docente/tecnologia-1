/* DIBUJO: copiar un dibujo pintando cuadraditos. Modo libre: hoja grande con sellos.
   Niveles: datos/niveles/dibujo.js · Colores y sellos: datos/fondos.js → dibujo */
const COL=FONDOS.dibujo.colores,STAMPS=FONDOS.dibujo.sellos,FREECOL=FONDOS.dibujo.paletaLibre;
const DLV=NIVELES.dibujo;
function dibu(){
  const T=TEXTOS.dibujo,C=TEXTOS.comun;
  const free=lvl==="free";
  const P=free?[...Array(20)].map(()=>".".repeat(20)):DLV[lvl],n=P.length;
  const used=free?FREECOL:[...new Set(P.join("").replace(/\./g,""))];
  let pick=used[0],cur2=P.map(r=>[...r].map(()=>"."));
  const a=area();
  const btn=free?Math.max(44,Math.min(70,a.h/10.2)):Math.max(60,Math.min(96,a.h/(used.length+2)));
  const palW=free?btn*2+12:btn;
  const gap=free?2:6;
  const big=a.n?Math.floor((a.w-24)/n-gap):Math.floor(Math.min((a.h-24)/n,(a.w-palW-(free?80:260))/n)-gap);
  const small=Math.max(18,Math.floor(Math.min(36,(a.h*.35)/n)));
  stage.innerHTML=`<div class="dibu" style="--btn:${btn}px">
    ${free?"":`<div class="model">${T.mirar}<div class="grid" style="grid-template-columns:repeat(${n},auto);--cell:${small}px">${P.join("").split("").map(ch=>`<div class="cell" style="background:${COL[ch]}"></div>`).join("")}</div></div>`}
    <div class="grid paint ${free?'fine':''}" id="pg" style="grid-template-columns:repeat(${n},auto);--cell:${Math.max(free?12:40,big)}px"></div>
    <div class="pal ${free?'two':''}" id="pal">${used.map(ch=>`<button data-c="${ch}" style="background:${COL[ch]}" aria-label="${T.color}"></button>`).join("")}<button class="eraser" data-c="." aria-label="${C.borrar}">🧽</button>${free?`<button class="eraser" data-x="clear" aria-label="${C.borrarTodo}">🗑️</button>`+STAMPS.map((t,i)=>`<button class="eraser stamp" data-st="${i}" aria-label="${T.sello}">${t.i}</button>`).join(""):""}</div></div>`;
  const pg=$("#pg");
  pg.innerHTML=cur2.flat().map((_,i)=>`<div class="cell" data-i="${i}"></div>`).join("");
  const selPal=()=>$("#pal").querySelectorAll("button").forEach(b=>b.classList.toggle("sel",(b.dataset.st!==undefined?"st"+b.dataset.st:b.dataset.c)===pick));
  selPal();
  $("#pal").onclick=e=>{const b=e.target.closest("button");if(!b)return;
    if(b.dataset.x==="clear"){cur2.forEach(row=>row.fill("."));pg.querySelectorAll(".cell").forEach(c=>c.style.background="");beep(300,.2);pg.classList.remove("shake");void pg.offsetWidth;pg.classList.add("shake");return}
    if(b.dataset.st!==undefined){pick="st"+b.dataset.st;beep(620,.06);selPal();return}
    pick=b.dataset.c;beep(520,.06);selPal()};
  let down=false,finished=false;
  const paint=el=>{if(!el||finished||!el.dataset.i)return;const i=+el.dataset.i,r=Math.floor(i/n),c=i%n;
    if(cur2[r][c]===pick)return;cur2[r][c]=pick;el.style.background=COL[pick];beep(400+Math.random()*300,.04);
    if(!free&&cur2.every((row,ri)=>row.join("")===P[ri])){finished=true;later(win,350)}};
  const stamp=el=>{if(!el||!el.dataset.i)return;const i=+el.dataset.i,r0=Math.floor(i/n)-1,c0=i%n-1,S=STAMPS[+pick.slice(2)].p;
    S.forEach((row,dr)=>[...row].forEach((ch,dc)=>{const r=r0+dr,c=c0+dc;if(ch==="."||r<0||c<0||r>=n||c>=n)return;cur2[r][c]=ch;pg.children[r*n+c].style.background=COL[ch]}));beep(760,.08,"triangle")};
  pg.addEventListener("pointerdown",e=>{if(String(pick).startsWith("st")){stamp(e.target.closest(".cell"));return}down=true;paint(e.target.closest(".cell"));try{pg.releasePointerCapture(e.pointerId)}catch(_){}});
  pg.addEventListener("pointermove",e=>{if(!down)return;const el=document.elementFromPoint(e.clientX,e.clientY);paint(el&&el.closest("#pg .cell"))});
  window.onpointerup=()=>down=false;
}

registrar("dibujo",{iniciar:dibu,niveles:()=>DLV,libre:true});
