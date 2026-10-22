/* PREMIO: aparece en el inicio al completar todos los juegos. Mezcla de todo con personajes inventados.
   Personajes y stickers: datos/personajes.js → premio · Lugares: datos/fondos.js → premio */
const PANI=PERS.premio.animales,POBJ=PERS.premio.objetos,PST=PERS.premio.stickers;
const PBG=FONDOS.premio.escenarios;
let prem={a:0,o:0,bg:0};
function premio(){
  const T=TEXTOS.premio;
  const a=area();const H=a.n?380:Math.max(280,a.h-270);const u=Math.max(40,Math.min(90,H/4.2));
  stage.innerHTML=`<div class="prem" style="--u:${u}px">
    <div class="pscene bg-${PBG[prem.bg][1]}" id="ps" style="height:${H}px"><div class="pbub" id="pb"></div><div class="pchar" id="pc"><span class="pa"></span><span class="po"></span></div><div class="big67" id="b67"></div></div>
    <div class="prow2">
      <div class="pbox"><b>${T.personaje}</b><div class="pick" id="pa">${PANI.map((x,i)=>`<button data-a="${i}">${x[0]}</button>`).join("")}</div><div class="pick" id="po">${POBJ.map((x,i)=>`<button data-o="${i}">${x[0]}</button>`).join("")}</div></div>
      <div class="pbox"><b>${T.hacer}</b><div class="pick acts" id="pac">
        <button data-x="67" class="b67">${T.boton67}</button><button data-x="dado" aria-label="${T.alAzar}">🎲</button><button data-x="hablar" aria-label="${T.hablar}">💬</button><button data-x="baile" aria-label="${T.bailar}">💃</button><button data-x="fiesta" aria-label="${T.fiesta}">🎉</button>
        ${PERS.premio.instrumentos.map(k=>`<button data-i="${k}" aria-label="${INS[k].n}">${INS[k].i}</button>`).join("")}</div>
        <div class="saywrap"><input id="pt" maxlength="40" autocomplete="off" aria-label="${T.escribiQueDice}"></div></div>
      <div class="pbox"><b>${T.lugar}</b><div class="pick" id="pbg">${PBG.map((x,i)=>`<button data-b="${i}">${x[0]}</button>`).join("")}<button data-x="limpiar" aria-label="${T.borrarStickers}">🧹</button></div><div class="pick" id="pst">${PST.map(e=>`<button data-s="${e}">${e}</button>`).join("")}</div></div>
    </div></div>`;
  const ps=$("#ps"),pc=$("#pc"),pb=$("#pb");let sticker=null,cx=50,cy=30;
  const name=()=>PANI[prem.a][1]+" "+POBJ[prem.o][1];
  const canTalk=()=>{try{return !!(window.speechSynthesis&&speechSynthesis.getVoices().length)}catch(_){return false}};
  const say=(t,voice)=>{pb.textContent=t;pb.classList.remove("pop");void pb.offsetWidth;pb.classList.add("pop");if(voice&&canTalk()){const p=loco;loco=true;speak(voice);loco=p}};
  const drawChar=()=>{pc.querySelector(".pa").textContent=PANI[prem.a][0];pc.querySelector(".po").textContent=POBJ[prem.o][0];
    $("#pa").querySelectorAll("button").forEach((b,i)=>b.classList.toggle("sel",i===prem.a));$("#po").querySelectorAll("button").forEach((b,i)=>b.classList.toggle("sel",i===prem.o));
    $("#pbg").querySelectorAll("[data-b]").forEach((b,i)=>b.classList.toggle("sel",i===prem.bg));
    $("#pst").querySelectorAll("button").forEach(b=>b.classList.toggle("sel",b.dataset.s===sticker))};
  const place=()=>{pc.style.left=cx+"%";pc.style.bottom=cy+"%"};
  const anim=c=>{pc.classList.remove("dance","jump","spin","bob");void pc.offsetWidth;pc.classList.add(c)};
  const intro=()=>{drawChar();anim("jump");say(fmt(T.soy,{x:name()}),name());beep(660,.1)};
  place();intro();
  $("#pa").onclick=e=>{const b=e.target.closest("button");if(!b)return;prem.a=+b.dataset.a;intro()};
  $("#po").onclick=e=>{const b=e.target.closest("button");if(!b)return;prem.o=+b.dataset.o;intro()};
  $("#pbg").onclick=e=>{const b=e.target.closest("button");if(!b)return;
    if(b.dataset.x==="limpiar"){ps.querySelectorAll(".pstk").forEach(s=>s.remove());beep(300,.15);return}
    prem.bg=+b.dataset.b;ps.className="pscene bg-"+PBG[prem.bg][1];beep(520,.06);drawChar()};
  $("#pst").onclick=e=>{const b=e.target.closest("button");if(!b)return;sticker=sticker===b.dataset.s?null:b.dataset.s;beep(600,.05);drawChar();
    if(sticker)say(T.tocaDonde)};
  ps.addEventListener("pointerdown",e=>{if(e.target.closest(".pchar"))return;const r=ps.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width*100,y=100-(e.clientY-r.top)/r.height*100;
    if(sticker){const s=document.createElement("span");s.className="pstk pop";s.textContent=sticker;s.style.left=x+"%";s.style.bottom=y+"%";ps.appendChild(s);beep(700+Math.random()*300,.06);return}
    cx=Math.max(6,Math.min(94,x));cy=Math.max(4,Math.min(70,y-8));place();anim("bob");beep(300,.06,"square")});
  const conf=n=>{for(let i=0;i<n;i++){const s=document.createElement("span");s.className="conf";s.textContent=["🎉","⭐","✨","🎊","💥"][i%5];s.style.left=Math.random()*100+"%";s.style.animationDelay=Math.random()*.4+"s";ps.appendChild(s);later(()=>s.remove(),2200)}};
  const six7=()=>{const b=$("#b67");b.textContent="6";b.className="big67 show";anim("bob");beep(440,.15,"square");
    later(()=>{b.textContent="7";b.classList.remove("show");void b.offsetWidth;b.classList.add("show");beep(587,.18,"square")},450);
    later(()=>{b.className="big67"},1300);
    try{const sy=window.speechSynthesis;if(sy){sy.cancel();const u2=new SpeechSynthesisUtterance(T.voz67);u2.lang="en-US";u2.pitch=1.6;u2.rate=.9;sy.speak(u2)}}catch(_){}};
  $("#pac").onclick=e=>{const b=e.target.closest("button");if(!b)return;
    if(b.dataset.i){playIns(b.dataset.i);anim("dance");say(T.musica);return}
    const x=b.dataset.x;
    if(x==="67")six7();
    else if(x==="dado"){prem.a=Math.floor(Math.random()*PANI.length);prem.o=Math.floor(Math.random()*POBJ.length);anim("spin");later(intro,500)}
    else if(x==="hablar"){const t=$("#pt").value.trim();if(!t){$("#pt").focus();say(T.escribiAbajo);return}say(t.toUpperCase(),t);anim("bob")}
    else if(x==="baile"){anim("dance");[523,659,784,659,523,659,784,1047].forEach((f,i)=>later(()=>beep(f,.14,"triangle"),i*180))}
    else if(x==="fiesta"){conf(24);anim("jump");fanfare()}
  };
  $("#pt").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();$("#pac").querySelector('[data-x="hablar"]').click()}});
  document.onkeydown=e=>{if(cur!=="premio"||!$("#menu").hidden||document.activeElement===$("#pt"))return;
    const d={ArrowLeft:[-6,0],ArrowRight:[6,0],ArrowUp:[0,6],ArrowDown:[0,-6]}[e.key];if(d){e.preventDefault();cx=Math.max(6,Math.min(94,cx+d[0]));cy=Math.max(4,Math.min(70,cy+d[1]));place();beep(300,.05,"square")}
    if(e.key==="6"||e.key==="7")six7()};
}

registrar("premio",{iniciar:premio,oculto:true,sinNiveles:true});
