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
  const gap=free?2:6;
  /* tamaños según la pantalla (se recalculan al cambiar el tamaño de la ventana) */
  const medidas=()=>{const a=area();
    const btn=free?Math.max(44,Math.min(70,a.h/10.2)):Math.max(60,Math.min(96,a.h/(used.length+2)));
    const palW=free?btn*2+12:btn;
    const big=a.n?Math.floor((a.w-24)/n-gap):Math.floor(Math.min((a.h-24)/n,(a.w-palW-(free?80:260))/n)-gap);
    return{btn,big:Math.max(free?12:40,big),small:Math.max(18,Math.floor(Math.min(36,(a.h*.35)/n)))}};
  const m=medidas();
  stage.innerHTML=`<div class="dibu" style="--btn:${m.btn}px">
    ${free?"":`<div class="model">${T.mirar}<div class="grid" style="grid-template-columns:repeat(${n},auto);--cell:${m.small}px">${P.join("").split("").map(ch=>`<div class="cell" style="background:${COL[ch]}"></div>`).join("")}</div></div>`}
    <div class="grid paint ${free?'fine':''}" id="pg" style="grid-template-columns:repeat(${n},auto);--cell:${m.big}px"></div>
    <div class="pal ${free?'two':''}" id="pal">${used.map(ch=>`<button data-c="${ch}" style="background:${COL[ch]}" aria-label="${T.color}"></button>`).join("")}<button class="eraser" data-c="." aria-label="${C.borrar}">🧽</button>${free?`<button class="eraser" data-x="clear" aria-label="${C.borrarTodo}">🗑️</button>`+STAMPS.map((t,i)=>`<button class="eraser stamp" data-st="${i}" aria-label="${T.sello}">${t.i}</button>`).join(""):""}</div></div>`;
  const pg=$("#pg");
  pg.innerHTML=cur2.flat().map((_,i)=>`<div class="cell" data-i="${i}"></div>`).join("");
  const selPal=()=>$("#pal").querySelectorAll("button").forEach(b=>b.classList.toggle("sel",(b.dataset.st!==undefined?"st"+b.dataset.st:b.dataset.c)===pick));
  selPal();
  if(!free)sayQuiet(T.consigna);
  $("#pal").onclick=e=>{const b=e.target.closest("button");if(!b)return;
    if(b.dataset.x==="clear"){cur2.forEach(row=>row.fill("."));pg.querySelectorAll(".cell").forEach(c=>c.style.background="");beep(300,.2);pg.classList.remove("shake");void pg.offsetWidth;pg.classList.add("shake");return}
    if(b.dataset.st!==undefined){pick="st"+b.dataset.st;beep(620,.06);selPal();return}
    pick=b.dataset.c;beep(520,.06);selPal()};
  let down=false,finished=false,ultima=null;
  /* al terminar: ola de cuadraditos que saltan con notas, y después la victoria */
  const festejo=()=>{finished=true;const cs=[...pg.children];
    cs.forEach((el,i)=>{const r=Math.floor(i/n),c=i%n;later(()=>{el.classList.remove("ola");void el.offsetWidth;el.classList.add("ola")},(r+c)*60)});
    for(let k=0;k<2*n-1;k+=2)later(()=>beep(440+k*40,.08,"triangle"),k*60);
    later(win,(2*n-1)*60+500)};
  /* pista: si ya está todo lo del modelo pero sobran cuadraditos, esos laten */
  const revisar=()=>{let falta=false;const sobran=[];
    cur2.forEach((row,r)=>row.forEach((ch,c)=>{if(ch!==P[r][c]){if(P[r][c]!==".")falta=true;else sobran.push(r*n+c)}}));
    if(!falta&&sobran.length)sobran.forEach(i=>pista(pg.children[i]))};
  const paint=el=>{if(!el||finished||!el.dataset.i)return;const i=+el.dataset.i,r=Math.floor(i/n),c=i%n;
    if(cur2[r][c]===pick)return;cur2[r][c]=pick;el.style.background=COL[pick];el.classList.remove("pista");beep(400+Math.random()*300,.04);
    if(!free){if(cur2.every((row,ri)=>row.join("")===P[ri]))festejo();else revisar()}};
  /* arrastre rápido: pintar también las celdas del medio entre la anterior y la actual */
  const paintHasta=el=>{if(!el||!el.dataset.i)return;const i=+el.dataset.i;
    if(ultima!==null&&ultima!==i){const r0=Math.floor(ultima/n),c0=ultima%n,r1=Math.floor(i/n),c1=i%n,pasos=Math.max(Math.abs(r1-r0),Math.abs(c1-c0));
      for(let k=1;k<pasos;k++)paint(pg.children[Math.round(r0+(r1-r0)*k/pasos)*n+Math.round(c0+(c1-c0)*k/pasos)])}
    paint(el);ultima=i};
  const stamp=el=>{if(!el||!el.dataset.i)return;const i=+el.dataset.i,r0=Math.floor(i/n)-1,c0=i%n-1,S=STAMPS[+pick.slice(2)].p;
    S.forEach((row,dr)=>[...row].forEach((ch,dc)=>{const r=r0+dr,c=c0+dc;if(ch==="."||r<0||c<0||r>=n||c>=n)return;cur2[r][c]=ch;pg.children[r*n+c].style.background=COL[ch]}));beep(760,.08,"triangle")};
  pg.addEventListener("pointerdown",e=>{if(String(pick).startsWith("st")){stamp(e.target.closest(".cell"));return}down=true;ultima=null;paintHasta(e.target.closest(".cell"));try{pg.releasePointerCapture(e.pointerId)}catch(_){}});
  pg.addEventListener("pointermove",e=>{if(!down)return;const el=document.elementFromPoint(e.clientX,e.clientY);paintHasta(el&&el.closest("#pg .cell"))});
  window.onpointerup=()=>{down=false;ultima=null};
  alCambiarTamano(()=>{const m=medidas();stage.querySelector(".dibu").style.setProperty("--btn",m.btn+"px");pg.style.setProperty("--cell",m.big+"px");
    const mg=stage.querySelector(".model .grid");if(mg)mg.style.setProperty("--cell",m.small+"px")});
}

registrar("dibujo",{iniciar:dibu,niveles:()=>DLV,libre:true});
