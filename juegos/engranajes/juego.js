/* ENGRANAJES: poner ruedas del tamaño justo para que gire la hélice. Modo libre: cadena de ruedas con motor, manivela o resorte.
   Niveles: datos/niveles/engranajes.js */
const GR=NIVELES.engranajes;
const GRAD={s:50,b:80};
function gearPath(x,y,r){const t=Math.max(8,Math.round(r/6.5)),ri=r-12,st=Math.PI*2/t;let d="";
  for(let i=0;i<t;i++){const a=i*st;[[ri,a],[r,a+st*.18],[r,a+st*.48],[ri,a+st*.66]].forEach(([rr,aa],k)=>{d+=(i===0&&k===0?"M":"L")+(x+rr*Math.cos(aa)).toFixed(1)+" "+(y+rr*Math.sin(aa)).toFixed(1)})}
  return d+"Z"}
function engr(){
  if(lvl==="free")return engrFree();
  const L=GR[lvl];let fill=L.map(()=>false),pick="s",done=false;
  const y=190,list=[{r:66,k:"m"},...L.map(s=>({r:GRAD[s],k:"slot",s})),{r:66,k:"f"}];
  let x=40;list.forEach((g,i)=>{x+=i===0?g.r:list[i-1].r+g.r-8;g.x=x});const W=x+66+40;
  const a=area();const w=Math.min(a.w,(a.h-170)*W/380,W*1.3);
  stage.innerHTML=`<div class="gears"><svg id="gs" viewBox="0 0 ${W} 380" width="${Math.floor(w)}" height="${Math.floor(w*380/W)}"></svg>
    <div class="tray" id="tray">${["s","b"].map(s=>`<button data-s="${s}" aria-label="${TEXTOS.engranajes.rueda}"><svg viewBox="-90 -90 180 180" width="${s==="s"?62:96}" height="${s==="s"?62:96}"><path d="${gearPath(0,0,GRAD[s])}" fill="#2F80ED"/><circle r="14" fill="#fff"/></svg></button>`).join("")}</div></div>`;
  const svg=$("#gs");
  function draw(){
    const all=fill.every(Boolean);let h="",dir=false;
    list.forEach((g,i)=>{
      const sp=all?`class="spin ${dir?'rev':''}" style="transform-origin:${g.x}px ${y}px;--d:${(g.r/28).toFixed(2)}s"`:"";dir=!dir;
      if(g.k==="slot"&&!fill[i-1]){h+=`<g class="slot" data-i="${i-1}"><circle cx="${g.x}" cy="${y}" r="${g.r-4}" fill="#EDE8FF" stroke="#B9B2D8" stroke-width="6" stroke-dasharray="14 10"/><circle cx="${g.x}" cy="${y}" r="8" fill="#B9B2D8"/></g>`;return}
      const col=g.k==="m"?"#FF6B4A":g.k==="f"?"#FFB800":(i%2?"#2F80ED":"#22A866");
      h+=`<g ${sp}><path d="${gearPath(g.x,y,g.r)}" fill="${col}"/><circle cx="${g.x}" cy="${y}" r="13" fill="#fff"/>
        ${g.k==="m"?`<rect x="${g.x-6}" y="${y-g.r+16}" width="12" height="${g.r-16}" rx="6" fill="#23204A"/><circle cx="${g.x}" cy="${y-g.r+18}" r="14" fill="#23204A"/>`:""}
        ${g.k==="f"?[0,120,240].map(d=>`<ellipse cx="${g.x}" cy="${y-48}" rx="18" ry="48" fill="#F0569A" transform="rotate(${d} ${g.x} ${y})"/>`).join("")+`<circle cx="${g.x}" cy="${y}" r="16" fill="#23204A"/>`:""}</g>`;
    });
    svg.innerHTML=h;
  }
  const selT=()=>$("#tray").querySelectorAll("button").forEach(b=>b.classList.toggle("sel",b.dataset.s===pick));
  selT();draw();
  $("#tray").onclick=e=>{const b=e.target.closest("button");if(!b)return;pick=b.dataset.s;beep(520,.06);selT()};
  svg.addEventListener("click",e=>{
    const s=e.target.closest(".slot");if(!s||done)return;const i=+s.dataset.i;
    if(L[i]!==pick){shakeEl(svg);return}
    fill[i]=true;good();draw();
    if(fill.every(Boolean)){done=true;[392,440,523].forEach((f,k)=>later(()=>beep(f,.15,"triangle"),k*150));later(win,2400)}
  });
}

/* ENGRANAJES LIBRE: armar una cadena de ruedas que siempre gira */
function engrFree(){
  const T=TEXTOS.engranajes;
  let chain=[],power="m",theta=0,energy=0,dragA=null,last=performance.now(),gs=[],L=[];
  const a=area();
  stage.innerHTML=`<div class="gears"><div class="tbar" id="pw"><button class="tbtn wide" data-p="m">${T.motor}</button><button class="tbtn wide" data-p="c">${T.manivela}</button><button class="tbtn wide" data-p="r">${T.resorte}</button></div>
    <svg id="gs" style="touch-action:none"></svg>
    <div class="tray" id="tray">${["s","b"].map(s=>`<button data-s="${s}" aria-label="${T.agregarRueda}"><svg viewBox="-90 -90 180 180" width="${s==="s"?62:96}" height="${s==="s"?62:96}"><path d="${gearPath(0,0,GRAD[s])}" fill="#2F80ED"/><circle r="14" fill="#fff"/></svg></button>`).join("")}<button data-s="del" aria-label="${T.sacarRueda}" style="font-size:52px">⌫</button><button data-s="wind" id="wind" aria-label="${T.darCuerda}" style="font-size:48px">🌀</button></div></div>`;
  const svg=$("#gs");
  function draw(){
    L=[{r:66,k:"m"},...chain.map(s=>({r:GRAD[s],k:s}))];
    L.forEach((g,i)=>{if(!i){g.x=0;g.y=0;return}const p=L[i-1],d=p.r+g.r-8,an=i%2?.55:-.55;g.x=p.x+d*Math.cos(an);g.y=p.y+d*Math.sin(an)});
    const minX=Math.min(...L.map(g=>g.x-g.r))-30,maxX=Math.max(...L.map(g=>g.x+g.r))+30,minY=Math.min(...L.map(g=>g.y-g.r))-40,maxY=Math.max(...L.map(g=>g.y+g.r))+40;
    const W=Math.max(500,maxX-minX),H=Math.max(300,maxY-minY);
    const ox=minX-(W-(maxX-minX))/2,oy=minY-(H-(maxY-minY))/2;
    L.forEach(g=>{g.x-=ox;g.y-=oy});svg.setAttribute("viewBox",`0 0 ${W} ${H}`);
    const sc=Math.min((a.w-10)/W,(a.h-250)/H,1.6);svg.setAttribute("width",Math.floor(W*sc));svg.setAttribute("height",Math.floor(H*sc));
    let h="";
    L.forEach((g,i)=>{const lastG=i===L.length-1;
      const col=g.k==="m"?"#FF6B4A":lastG?"#FFB800":(i%2?"#2F80ED":"#22A866");
      let extra="";
      if(g.k==="m"){
        if(power==="c")extra=`<rect x="${g.x-7}" y="${g.y-g.r-34}" width="14" height="${g.r+34}" rx="7" fill="#23204A"/><circle cx="${g.x}" cy="${g.y-g.r-34}" r="20" fill="#23204A"/>`;
        else if(power==="r")extra=`<path d="M${g.x} ${g.y} m-6 0 a6 6 0 1 1 12 0 a12 12 0 1 1 -24 0 a18 18 0 1 1 36 0 a24 24 0 1 1 -48 0" fill="none" stroke="#23204A" stroke-width="6"/>`;
        else extra=`<text x="${g.x}" y="${g.y+14}" text-anchor="middle" font-size="44" font-family="sans-serif">⚡</text>`;
      }
      h+=`<g class="gr"><path d="${gearPath(g.x,g.y,g.r)}" fill="${col}"/>${g.k==="m"?"":`<circle cx="${g.x}" cy="${g.y}" r="13" fill="#fff"/>`}${extra}
        ${lastG&&i>0?[0,120,240].map(d=>`<ellipse cx="${g.x}" cy="${g.y-g.r*.6}" rx="${g.r*.22}" ry="${g.r*.6}" fill="#F0569A" transform="rotate(${d} ${g.x} ${g.y})"/>`).join("")+`<circle cx="${g.x}" cy="${g.y}" r="16" fill="#23204A"/>`:""}</g>`});
    svg.innerHTML=h;gs=[...svg.querySelectorAll("g.gr")];
    $("#pw").querySelectorAll("button").forEach(b=>b.classList.toggle("sel",b.dataset.p===power));
    $("#wind").hidden=power!=="r";
    apply();
  }
  const apply=()=>gs.forEach((g,i)=>g.setAttribute("transform",`rotate(${(theta*(L[0].r/L[i].r)*(i%2?-1:1)).toFixed(2)} ${L[i].x.toFixed(1)} ${L[i].y.toFixed(1)})`));
  const frame=t=>{if(!document.body.contains(svg))return;const dt=Math.min(.05,(t-last)/1000);last=t;
    if(power==="m")theta+=110*dt;else if(power==="r"){theta+=energy*80*dt;energy=Math.max(0,energy-dt*.45)}
    apply();requestAnimationFrame(frame)};
  requestAnimationFrame(frame);
  draw();
  const ang=e=>{const b=gs[0].getBoundingClientRect();return Math.atan2(e.clientY-(b.top+b.height/2),e.clientX-(b.left+b.width/2))*180/Math.PI};
  svg.addEventListener("pointerdown",e=>{if(power!=="c")return;dragA=ang(e);try{svg.setPointerCapture(e.pointerId)}catch(_){}});
  svg.addEventListener("pointermove",e=>{if(dragA===null)return;const a2=ang(e);let d=a2-dragA;if(d>180)d-=360;if(d<-180)d+=360;theta+=d;dragA=a2});
  svg.addEventListener("pointerup",()=>{dragA=null});
  $("#pw").onclick=e=>{const b=e.target.closest("button");if(!b)return;power=b.dataset.p;energy=0;beep(560,.06);draw()};
  $("#tray").onclick=e=>{const b=e.target.closest("button");if(!b)return;
    if(b.dataset.s==="wind"){energy=Math.min(6,energy+1.2);beep(300+energy*90,.08,"triangle");return}
    if(b.dataset.s==="del"){if(!chain.length){shakeEl(svg);return}chain.pop();beep(300,.08)}
    else{if(chain.length>=10){shakeEl(svg);return}chain.push(b.dataset.s);beep(b.dataset.s==="s"?700:450,.1,"triangle")}
    draw()};
}

registrar("engranajes",{iniciar:engr,niveles:()=>GR,libre:true});
