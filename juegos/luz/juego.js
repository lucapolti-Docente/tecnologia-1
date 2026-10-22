/* LUZ (desactivado; ver README para activarlo): pila, lamparitas e interruptores; se conectan cables tocando dos puntos.
   Niveles: datos/niveles/luz.js · Colores de cables: datos/fondos.js → luz */
const LZ=NIVELES.luz;
const WCOL=FONDOS.luz.cables;
function luz(){
  const L=LZ[lvl];
  const pos={"B+":[160,150],"B-":[160,470]};
  L.b.forEach(([x,y],i)=>{pos["L"+i+"a"]=[x-34,y+58];pos["L"+i+"b"]=[x+34,y+58]});
  L.s.forEach(([x,y],i)=>{pos["S"+i+"a"]=[x-80,y];pos["S"+i+"b"]=[x+80,y]});
  let wires=[],sw=L.s.map(()=>false),sel=null,downT=null,done=false;
  const a=area();const w=Math.min(a.w,(a.h-10)*1000/600);
  stage.innerHTML=`<div class="luz"><svg id="lz" viewBox="0 0 1000 600" width="${Math.floor(w)}" height="${Math.floor(w*.6)}"></svg></div>`;
  const svg=$("#lz");
  function lit(){
    return L.b.map((_,i)=>{
      const p={};const f=x=>p[x]===undefined||p[x]===x?(p[x]=x):(p[x]=f(p[x]));const u=(x,y)=>{p[f(x)]=f(y)};
      wires.forEach(([x,y])=>u(x,y));
      L.b.forEach((_,j)=>{if(j!==i)u("L"+j+"a","L"+j+"b")});
      sw.forEach((on,j)=>{if(on)u("S"+j+"a","S"+j+"b")});
      const s=(x,y)=>f(x)===f(y),A="L"+i+"a",B="L"+i+"b";
      return (s("B+",A)&&s(B,"B-"))||(s("B+",B)&&s(A,"B-"));
    });
  }
  const cable=(p,q)=>`M${p[0]} ${p[1]} C${p[0]} ${p[1]+140} ${q[0]} ${q[1]+140} ${q[0]} ${q[1]}`;
  function draw(){
    const on=lit();
    let h=`<rect x="90" y="190" width="140" height="240" rx="22" fill="#23204A"/>
      <rect x="90" y="190" width="140" height="110" rx="22" fill="#E5484D"/><rect x="90" y="260" width="140" height="40" fill="#E5484D"/>
      <rect x="128" y="160" width="64" height="34" rx="8" fill="#9A97AE"/>
      <text x="160" y="268" text-anchor="middle" font-size="70" font-weight="800" fill="#fff" font-family="Baloo 2,sans-serif">+</text>
      <text x="160" y="395" text-anchor="middle" font-size="80" font-weight="800" fill="#fff" font-family="Baloo 2,sans-serif">−</text>`;
    L.s.forEach(([x,y],i)=>{
      const tip=sw[i]?[x+80,y]:[x+50,y-80];
      h+=`<g class="sw" data-sw="${i}"><rect x="${x-110}" y="${y-30}" width="220" height="60" rx="16" fill="#D9D1FF"/>
        <rect x="${x-110}" y="${y-110}" width="220" height="90" fill="transparent"/>
        <line x1="${x-80}" y1="${y}" x2="${tip[0]}" y2="${tip[1]}" stroke="#23204A" stroke-width="16" stroke-linecap="round"/>
        <circle cx="${tip[0]}" cy="${tip[1]}" r="14" fill="${sw[i]?'#22A866':'#E5484D'}"/></g>`;
    });
    L.b.forEach(([x,y],i)=>{
      h+=`${on[i]?`<circle cx="${x}" cy="${y-70}" r="105" fill="#FFB800" opacity=".28"/>
        ${[0,45,90,135,180,225,270,315].map(d=>{const r=d*Math.PI/180;return`<line x1="${x+Math.cos(r)*80}" y1="${y-70+Math.sin(r)*80}" x2="${x+Math.cos(r)*110}" y2="${y-70+Math.sin(r)*110}" stroke="#FFB800" stroke-width="10" stroke-linecap="round"/>`}).join("")}`:""}
        <circle cx="${x}" cy="${y-70}" r="62" fill="${on[i]?'#FFE066':'#F4F2FF'}" stroke="#23204A" stroke-width="7"/>
        <path d="M${x-18} ${y-40} L${x-10} ${y-80} L${x} ${y-62} L${x+10} ${y-80} L${x+18} ${y-40}" fill="none" stroke="${on[i]?'#FF8A1F':'#9A97AE'}" stroke-width="6" stroke-linejoin="round"/>
        <rect x="${x-38}" y="${y-14}" width="76" height="50" rx="10" fill="#9A97AE" stroke="#23204A" stroke-width="6"/>`;
    });
    wires.forEach(([p,q,c],i)=>{h+=`<path d="${cable(pos[p],pos[q])}" stroke="${c}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path class="wclick" data-w="${i}" d="${cable(pos[p],pos[q])}" stroke="transparent" stroke-width="40" fill="none"/>`});
    Object.entries(pos).forEach(([id,[x,y]])=>{h+=`<circle class="term" data-t="${id}" cx="${x}" cy="${y}" r="26" fill="${sel===id?'#FFB800':'#FFFFFF'}" stroke="#23204A" stroke-width="7"/>`});
    h+=`<path id="tmp" d="" stroke="#23204A" stroke-width="10" stroke-dasharray="4 18" stroke-linecap="round" fill="none" pointer-events="none"/>`;
    svg.innerHTML=h;
    if(!done&&on.length&&on.every(Boolean)&&sw.every(Boolean)){done=true;fanfare();later(win,1100)}
  }
  function connect(x,y){
    if(x===y||wires.some(([p,q])=>(p===x&&q===y)||(p===y&&q===x)))return;
    wires.push([x,y,WCOL[wires.length%WCOL.length]]);beep(660,.08);
  }
  const pt=e=>{const m=svg.getScreenCTM().inverse();const p=new DOMPoint(e.clientX,e.clientY).matrixTransform(m);return[p.x,p.y]};
  svg.addEventListener("pointerdown",e=>{
    if(done)return;
    const t=e.target.closest(".term"),s=e.target.closest(".sw"),wc=e.target.closest(".wclick");
    if(t){const id=t.dataset.t;
      if(sel&&sel!==id){connect(sel,id);sel=null;downT=null}
      else{sel=id;downT=id;beep(520,.05)}
      draw();return}
    if(wc){wires.splice(+wc.dataset.w,1);sel=null;beep(300,.08);draw();return}
    if(s){const i=+s.dataset.sw;sw[i]=!sw[i];beep(sw[i]?800:400,.08);draw();return}
    sel=null;draw();
  });
  svg.addEventListener("pointermove",e=>{if(!downT)return;const tmp=$("#tmp");if(!tmp)return;const p=pos[downT],q=pt(e);tmp.setAttribute("d",`M${p[0]} ${p[1]} L${q[0]} ${q[1]}`)});
  window.onpointerup=e=>{
    if(!downT)return;const from=downT;downT=null;
    const el=document.elementFromPoint(e.clientX,e.clientY);const t=el&&el.closest&&el.closest("#lz .term");
    if(t&&t.dataset.t!==from){connect(from,t.dataset.t);sel=null}
    draw();
  };
  draw();
}

registrar("luz",{iniciar:luz,niveles:()=>LZ});
