/* ARMÁ EL ROBOT: cada nivel es una misión; hay que darle al robot la pieza que necesita en cada paso.
   Modo libre: un campo para pasear con las piezas que elijan.
   Niveles: datos/niveles/arma-robot.js · Piezas: datos/personajes.js → armaRobot · Textos: datos/textos.js → arma-robot */
const RP=PERS.armaRobot.piezas;
const ROLV=NIVELES["arma-robot"];
/* el robot con todas las piezas (cada una se ve solo cuando el robot la tiene) */
const botHTML=()=>`<div class="att lamp">${RP.luz.e}</div><div class="att cam">${RP.camara.e}</div><div class="att ant2">${RP.antena.e}</div><div class="att heli">${RP.helice.e}</div>
  <div class="rhead"><div class="screen"><i></i><i></i></div><div class="att spk">${RP.parlante.e}</div><div class="att mic">${RP.microfono.e}</div></div>
  <div class="rbody"><div class="att bat">${RP.bateria.e}</div><div class="att arm">${RP.brazo.e}</div><div class="att mag">${RP.iman.e}</div><div class="att term">${RP.termometro.e}</div></div>
  <div class="legs"></div><div class="att whl">${RP.ruedas.e}</div><div class="att leg2">${RP.piernas.e}${RP.piernas.e}</div>`;
function robo(){
  if(lvl==="free")return roboFree();
  const T=TEXTOS["arma-robot"];
  const L=ROLV[lvl],G={x:L.gx||80,b:L.gb||22};
  const a=area();const H=a.n?330:Math.max(300,a.h-190);const u=Math.max(34,Math.min(80,H/4.6));
  stage.innerHTML=`<div class="rstory" style="--u:${u}px"><div class="scene2 ${L.night?'night':''}" id="sc2" style="height:${H}px">
      <div class="bubble" id="bb"></div>
      ${(L.decor||[]).map(([e,x,b,s])=>`<div class="decor" style="left:${x}%;bottom:${b}%;font-size:${u*s}px">${e}</div>`).join("")}
      <div class="rbot ${L.on?'on':''}" id="rb">${botHTML()}</div>
      <div class="goal ${L.hide?'hidden':''} ${L.small?'small':''}" id="gl" style="left:${G.x}%;bottom:${G.b}%">${L.goal}</div>${L.hide?`<div class="bush" id="bs">${FONDOS.armaRobot.arbusto}</div>`:""}
      <div class="beam" id="bm"></div></div>
    <div class="tray2 wide" id="tr"></div></div>`;
  const rb=$("#rb"),sc2=$("#sc2"),bb=$("#bb"),gl=$("#gl");let k=0,busy=false,rbB="22%";const got=new Set();const needs=L.steps.map(s=>s[0]);
  const say=(t,v)=>{bb.textContent=t;bb.classList.remove("pop");void bb.offsetWidth;bb.classList.add("pop");if(v)sayQuiet(v)};
  const ask=()=>{const[need,txt,v]=L.steps[k];say(txt,v);
    const others=shuffle(Object.keys(RP).filter(x=>!needs.includes(x)&&!got.has(x))).slice(0,lvl>=5?3:2);
    $("#tr").innerHTML=shuffle([need,...others]).map(x=>`<button class="opt ins" data-k="${x}">${RP[x].e}<small>${RP[x].n}</small></button>`).join("");busy=false};
  const fly=(e,cls)=>{const s=document.createElement("span");s.className=cls;s.textContent=e;sc2.appendChild(s);later(()=>s.remove(),2000)};
  const walk=()=>{rb.style.left=`calc(${G.x}% - ${u*3.4}px)`;$("#bm").classList.remove("scan")};
  const act=need=>{
    if(need==="bateria"){rb.classList.add("on");[392,523,659].forEach((f,i)=>later(()=>beep(f,.12,"triangle"),i*120));return 900}
    if(need==="luz"){sc2.classList.remove("night");sc2.classList.add("lit");beep(880,.2);return 900}
    if(need==="camara"){$("#bm").classList.add("scan");later(()=>{gl.classList.remove("hidden");gl.classList.add("pop");const bs=$("#bs");if(bs)bs.classList.add("aside");good()},900);return 1700}
    if(need==="ruedas"){walk();[0,1,2,3].forEach(i=>later(()=>beep(200+i*30,.1,"square"),i*300));
      if(L.dance){later(()=>{rb.classList.add("dance");[523,659,784,659,523,659].forEach((f,i)=>later(()=>beep(f,.15,"triangle"),i*200))},1800);return 3200}return 1900}
    if(need==="piernas"){walk();rb.classList.add("hop");[0,1,2,3,4].forEach(i=>later(()=>beep(300+i*60,.08,"square"),i*330));later(()=>rb.classList.remove("hop"),1800);return 2000}
    if(need==="helice"){rbB=`calc(${G.b}% - ${u*2.5}px)`;rb.style.bottom=rbB;rb.classList.add("flying");[0,1,2,3,4,5].forEach(i=>later(()=>beep(500+i*40,.06,"sawtooth"),i*180));return 1500}
    if(need==="brazo"){gl.style.left=`calc(${G.x}% - ${u*.9}px)`;gl.style.bottom=`calc(${rbB} + ${u*1.7}px)`;beep(700,.15);return 1300}
    if(need==="iman"){gl.style.left=`calc(${G.x}% - ${u*2.8}px)`;gl.style.bottom=`calc(${rbB} + ${u*1.1}px)`;[0,1,2].forEach(i=>later(()=>beep(900+i*120,.06),i*150));later(()=>{gl.style.opacity="0";good()},1100);return 1600}
    if(need==="termometro"){say(T.muchoFrio);[0,1,2,3,4,5].forEach(i=>later(()=>fly("❄️","snow"),i*220));beep(1200,.2);return 2000}
    if(need==="parlante"){say(L.end||T.hola,(L.end||T.holaVoz).replace(/[^\p{L} ¡!]/gu,"").toLowerCase());return 1700}
    if(need==="microfono"){[0,1,2,3].forEach(i=>later(()=>{fly(i%2?"🎶":"🎵","note");beep(523+i*90,.15,"triangle")},i*300));return 1700}
    if(need==="antena"){fly("✉️","mail");later(()=>{say(T.recibi);beep(880,.15)},1200);return 2200}
    return 600};
  $("#tr").onclick=e=>{const b=e.target.closest("button");if(!b||busy)return;const need=L.steps[k][0];
    if(b.dataset.k!==need){shakeEl(b);rb.classList.remove("no");void rb.offsetWidth;rb.classList.add("no");return}
    busy=true;got.add(need);rb.classList.add("has-"+RP[need].c);good();$("#tr").innerHTML="";const d=act(need);
    later(()=>{k++;if(k<L.steps.length)ask();else{if(!L.end)say(T.listo);rb.classList.add("happy");later(win,1300)}},d)};
  ask();
}

/* ROBOT LIBRE: un campo para pasear con las piezas que elijan */
function roboFree(){
  const T=TEXTOS["arma-robot"],F=FONDOS.armaRobot;
  const a=area();const H=a.n?400:Math.max(320,a.h-230);const u=Math.max(24,Math.min(46,H/8.5));
  const objs=PERS.armaRobot.campo.map(o=>Object.assign({},o)); /* copia: el juego mueve y esconde los objetos */
  const bushes=F.arbustos;
  let pos={x:10,y:10},parts=new Set(),flying=false,night=false,lamp=false,held=null,mags=0;
  stage.innerHTML=`<div class="rstory" style="--u:${u}px"><div class="scene2 field" id="sc2" style="height:${H}px">
      <div class="bubble" id="bb"></div>
      ${F.campo.map(([e,x,y,s])=>`<div class="decor" style="left:${x}%;bottom:${y}%;font-size:${u*s}px">${e}</div>`).join("")}
      ${objs.map((o,i)=>`<div class="fobj ${o.hid?'hidden':''}" id="fo${i}" style="left:${o.x}%;bottom:${o.y}%;font-size:${u*(o.metal?.7:1)}px">${o.e}</div>`).join("")}
      ${bushes.map(([x,y])=>`<div class="decor bushf" style="left:${x}%;bottom:${y-2}%;font-size:${u*1.9}px">${F.arbusto}</div>`).join("")}
      <div class="rbot fr" id="rb" style="--u:${Math.round(u*.62)}px">${botHTML()}</div></div>
    <div class="tray2 wide parts" id="tr">${Object.keys(RP).map(k=>`<button class="opt ins" data-k="${k}">${RP[k].e}<small>${RP[k].n}</small></button>`).join("")}</div>
    <div class="tbar" id="acts"></div></div>`;
  const rb=$("#rb"),sc2=$("#sc2"),bb=$("#bb");
  const has=k=>parts.has(k);
  const say=(t,v)=>{bb.textContent=t;bb.classList.remove("pop");void bb.offsetWidth;bb.classList.add("pop");if(v)sayQuiet(v)};
  const fly=(e,cls,x,y)=>{const s=document.createElement("span");s.className=cls;s.textContent=e;if(x!==undefined){s.style.left=x+"%";s.style.bottom=y+"%"}sc2.appendChild(s);later(()=>s.remove(),2000)};
  const dist=o=>Math.hypot(o.x-pos.x,(o.y-pos.y)*.8);
  const place=()=>{rb.style.left=pos.x+"%";rb.style.bottom=pos.y+"%";rb.classList.toggle("flying",flying);
    sc2.style.setProperty("--lx",pos.x+"%");sc2.style.setProperty("--ly",(100-pos.y-10)+"%");
    if(held!==null){const el=$("#fo"+held);el.style.left=`calc(${pos.x}% + ${u*1.2}px)`;el.style.bottom=`calc(${pos.y}% + ${u*1.6}px)`}};
  const scene=()=>{sc2.classList.toggle("night",night&&!(lamp&&has("luz")&&has("bateria")));sc2.classList.toggle("dark2",night);sc2.classList.toggle("lamp-on",night&&lamp&&has("luz")&&has("bateria"))};
  const ACTS=Object.keys(T.acciones);
  const drawActs=()=>{
    let h=`<button class="tbtn wide" data-a="night">${night?T.dia:T.noche}</button>`;
    if(has("ruedas")||has("piernas"))h+=`<button class="tbtn mv" data-m="L">←</button><button class="tbtn mv" data-m="U">↑</button><button class="tbtn mv" data-m="D">↓</button><button class="tbtn mv" data-m="R">→</button>`;
    ACTS.forEach(k=>{if(has(k))h+=`<button class="tbtn wide" data-a="${k}">${k==="brazo"&&held!==null?T.soltar:k==="helice"&&flying?T.bajar:T.acciones[k]}</button>`});
    $("#acts").innerHTML=h;
    $("#tr").querySelectorAll("button").forEach(b=>b.classList.toggle("sel",has(b.dataset.k)));
    rb.className="rbot fr"+(has("bateria")?" on":"")+[...parts].map(k=>" has-"+RP[k].c).join("")+(flying?" flying":"");
    place();scene()};
  $("#tr").onclick=e=>{const b=e.target.closest("button");if(!b)return;const k=b.dataset.k;
    if(has(k)){parts.delete(k);beep(300,.08);
      if(k==="brazo"&&held!==null){const el=$("#fo"+held);objs[held].x=pos.x+3;objs[held].y=pos.y;el.style.left=objs[held].x+"%";el.style.bottom=objs[held].y+"%";held=null}
      if(k==="helice"&&flying){flying=false;pos.y=Math.min(pos.y,52)}}
    else{parts.add(k);good()}
    drawActs()};
  const needPower=()=>{if(has("bateria"))return false;say(T.necesitoEnergia,T.necesitoEnergiaVoz);rb.classList.remove("no");void rb.offsetWidth;rb.classList.add("no");return true};
  const move=m=>{if(needPower())return;const st=7,maxY=flying?70:52;
    if(m==="L")pos.x=Math.max(4,pos.x-st);if(m==="R")pos.x=Math.min(94,pos.x+st);if(m==="U")pos.y=Math.min(maxY,pos.y+st);if(m==="D")pos.y=Math.max(4,pos.y-st);
    beep(has("piernas")&&!has("ruedas")?420:240,.06,"square");if(has("piernas")&&!has("ruedas")){rb.classList.remove("hop1");void rb.offsetWidth;rb.classList.add("hop1")}place()};
  $("#acts").onclick=e=>{const b=e.target.closest("button");if(!b)return;
    if(b.dataset.m)return move(b.dataset.m);
    const a=b.dataset.a;
    if(a==="night"){night=!night;beep(night?300:700,.12);drawActs();return}
    if(needPower())return;
    if(a==="camara"){let n=0;objs.forEach((o,i)=>{if(o.hid&&dist(o)<32){o.hid=0;n++;const el=$("#fo"+i);el.classList.remove("hidden");el.classList.add("pop")}});
      fly("📸","flash",pos.x,pos.y+12);if(n){good();say(T.encontreAlgo)}else say(T.nadaEscondido);return}
    if(a==="brazo"){if(held!==null){const o=objs[held];o.x=Math.min(96,pos.x+3);o.y=flying?Math.max(pos.y,4):pos.y;const el=$("#fo"+held);el.style.left=o.x+"%";el.style.bottom=o.y+"%";held=null;beep(400,.1);drawActs();return}
      let best=-1,bd=99;objs.forEach((o,i)=>{if(o.hid||o.gone||o.radio)return;if(o.high&&!flying)return;const d=dist(o);if(d<bd){bd=d;best=i}});
      if(best<0||bd>14){say(objs.some(o=>o.high&&!flying&&dist(o)<20)?T.muyAlto:T.nadaCerca);return}
      held=best;good();say(fmt(T.tengo,{x:objs[best].n}));drawActs();return}
    if(a==="iman"){let n=0;objs.forEach((o,i)=>{if(o.metal&&!o.gone&&dist(o)<30){o.gone=1;n++;const el=$("#fo"+i);el.style.left=pos.x+"%";el.style.bottom=(pos.y+6)+"%";later(()=>{el.style.opacity="0"},700)}});
      mags+=n;if(n){[0,1,2].forEach(i=>later(()=>beep(900+i*120,.06),i*150));say(fmt(mags>1?T.junte:T.junteUno,{n:mags}))}else say(T.sinMetal);return}
    if(a==="helice"){flying=!flying;if(!flying)pos.y=Math.min(pos.y,52);[0,1,2,3].forEach(i=>later(()=>beep(flying?500+i*60:700-i*60,.06,"sawtooth"),i*120));drawActs();return}
    if(a==="luz"){lamp=!lamp;beep(lamp?880:440,.12);scene();if(!night)say(lamp?T.luzPrendida:T.luzApagada);return}
    if(a==="parlante"){const t=held!==null?fmt(T.tengoDice,{x:objs[held].n}):T.saludos[Math.floor(Math.random()*T.saludos.length)];say("💬 "+t,t.toLowerCase());return}
    if(a==="microfono"){const r=objs.find(o=>o.radio);if(dist(r)<26){[0,1,2,3].forEach(i=>later(()=>{fly(i%2?"🎶":"🎵","note2",r.x,r.y+8);beep(523+i*90,.15,"triangle")},i*250));rb.classList.add("dance");later(()=>rb.classList.remove("dance"),2600);say(T.escuchoMusica)}
      else say(T.noEscucho,T.noEscuchoVoz);return}
    if(a==="antena"){fly("✉️","mail");const m=T.mensajes[Math.floor(Math.random()*T.mensajes.length)];later(()=>{say(m);beep(880,.15)},1100);return}
    if(a==="termometro"){const c=night;say(c?T.frio:T.calor,c?T.frioVoz:T.calorVoz);for(let i=0;i<5;i++)later(()=>fly(c?"❄️":"☀️","snow"),i*200);return}
  };
  document.onkeydown=e=>{if(cur!=="arma-robot"||lvl!=="free"||!$("#menu").hidden)return;const m={ArrowLeft:"L",ArrowRight:"R",ArrowUp:"U",ArrowDown:"D"}[e.key];if(m&&(has("ruedas")||has("piernas"))){e.preventDefault();move(m)}};
  say(T.armame);drawActs();
}

registrar("arma-robot",{iniciar:robo,niveles:()=>ROLV,libre:true});
