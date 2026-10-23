/* INSTRUMENTOS: escuchar y elegir qué instrumento suena. Modo libre: tocar todos.
   Niveles: datos/niveles/instrumentos.js · Dibujos y nombres: datos/personajes.js → instrumentos */

/* cómo suena cada instrumento (sintetizado en comun/sonido.js) */
const SONIDOS_INS={
  tambor:t=>{drum(t,170,45,.45);drum(t+.3,240,140,.3,.8);noise(t+.3,.15,.35,2000);drum(t+.6,170,45,.45);drum(t+.75,170,45,.45);drum(t+.9,200,110,.35,.9)},
  guitarra:t=>[0,.7].forEach(d=>[164.8,207.7,246.9,329.6,415.3].forEach((f,k)=>pluck(f,t+d+k*.04))),
  violin:t=>[[659.3,0,1],[587.3,1,.9],[523.3,1.9,1.4]].forEach(([f,d,l])=>tone("sawtooth",f,t+d,l,{a:.3,vol:.22,vib:.022,vibDelay:.35,bp:1800,hold:true,slide:.97})),
  piano:t=>[261.6,329.6,392,523.3].forEach((f,k)=>{const s=t+k*.3;tone("sine",f,s,1.4,{a:.004,vol:.32});tone("sine",f*2,s,.8,{a:.004,vol:.12});tone("sine",f*3,s,.4,{a:.004,vol:.05})}),
  trompeta:t=>[[392,0,.16],[392,.2,.16],[392,.4,.16],[523.3,.6,.9]].forEach(([f,d,l])=>tone("sawtooth",f,t+d,l,{a:.02,vol:.3,lpEnv:[500,3800,2200],hold:true,slide:.94})),
  platillo:t=>{noise(t,2.2,.55,5500,2);noise(t+.02,.4,.3,9000);noise(t+1.2,2,.4,5500,2)},
  campana:t=>[784,659.3,523.3].forEach((f,k)=>{tone("sine",f,t+k*.6,2.4,{a:.003,vol:.3});tone("sine",f*2.76,t+k*.6,1.1,{a:.003,vol:.1});tone("sine",f*5.4,t+k*.6,.5,{a:.003,vol:.05})}),
  xilofono:t=>[523.3,587.3,659.3,784,1046.5].forEach((f,k)=>{tone("sine",f,t+k*.16,.35,{a:.002,vol:.35});tone("sine",f*3.93,t+k*.16,.08,{a:.002,vol:.12})}),
  saxo:t=>{noise(t,.15,.08,1200);[[196,0,.45],[233.1,.45,.45],[293.7,.9,1]].forEach(([f,d,l])=>tone("square",f,t+d,l,{a:.08,vol:.16,vib:.01,vibDelay:.2,lp:1100,hold:true,slide:.92}))}
};
/* INS = dibujo + nombre (de datos) + sonido */
const INS={};Object.keys(PERS.instrumentos).forEach(k=>{INS[k]={i:PERS.instrumentos[k].i,n:PERS.instrumentos[k].n,p:SONIDOS_INS[k]}});
/* cada sonido corta el anterior: tocar muchas veces no los apila */
const playIns=k=>{if(!sound)return;cortarSonidos();try{INS[k].p(AC().currentTime+.05)}catch(e){}};
const INSLV=NIVELES.instrumentos;
function inst(){
  if(lvl==="free"){
    const tamL=()=>{const a=area();return Math.max(56,Math.floor(Math.min(110,a.h/4.6,a.w/(a.n?5.2:7.5))))};
    stage.innerHTML=`<div class="freeinst" style="--o:${tamL()}px">${Object.entries(INS).map(([k,v])=>`<button class="opt ins" data-k="${k}">${v.i}<small>${v.n}</small></button>`).join("")}</div>`;
    stage.querySelector(".freeinst").onclick=e=>{const b=e.target.closest(".opt");if(!b)return;playIns(b.dataset.k);b.classList.remove("pop");void b.offsetWidth;b.classList.add("pop")};
    alCambiarTamano(()=>stage.querySelector(".freeinst").style.setProperty("--o",tamL()+"px"));
    return;
  }
  const SET=INSLV[lvl],N=SET.length,R=3;const TG=shuffle([...SET]).slice(0,R);let round=0,target,busy=false,errores=0;
  const tam=()=>{const a=area();return`--o:${Math.max(56,Math.floor(Math.min(100,a.h/4.8,(a.w-40)/(N*1.7))))}px;--p:${Math.max(110,Math.floor(Math.min(200,a.h/3.2)))}px`};
  stage.innerHTML=`<div class="inst" style="${tam()}"><div class="prog" id="pr"></div><button class="play" id="pl" aria-label="${TEXTOS.comun.escuchar}">🔊</button><div class="opts" id="op"></div></div>`;
  const ring=()=>{const pl=$("#pl");pl.classList.remove("ring");void pl.offsetWidth;pl.classList.add("ring");playIns(target)};
  alCambiarTamano(()=>stage.querySelector(".inst").setAttribute("style",tam()));
  const puntos=()=>{$("#pr").innerHTML=[...Array(R)].map((_,i)=>`<i style="${i<round?'background:'+FONDOS.juegos.instrumentos:''}"></i>`).join("")};
  const next=()=>{
    const opts=shuffle([...SET]);target=TG[round];busy=false;errores=0;
    puntos();
    $("#op").innerHTML=opts.map(k=>`<button class="opt ins" data-k="${k}">${INS[k].i}<small>${INS[k].n}</small></button>`).join("");
    later(ring,500);
  };
  $("#pl").onclick=ring;
  $("#op").onclick=e=>{const b=e.target.closest(".opt");if(!b||busy)return;
    if(b.dataset.k===target){busy=true;good();sayQuiet(INS[target].n);b.classList.add("pop");round++;puntos();if(round>=R)later(win,700);else later(next,1200)}
    else{shakeEl(b);if(++errores>=2){errores=0;later(ring,400)}}}; /* pista: después de 2 errores vuelve a sonar */
  next();
}

registrar("instrumentos",{iniciar:inst,niveles:()=>INSLV,libre:true});
