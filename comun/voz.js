/* VOZ: leer en voz alta (speechSynthesis) y avisos en pantalla */
let loco=false; /* modo loco: cada palabra con otra voz (lo usan escribir y premio) */
function toast(msg){const v=document.querySelector(".toast");if(v)v.remove(); /* un aviso por vez */
  const t=document.createElement("div");t.className="toast";t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),3500)}
const vocesEs=()=>{try{return speechSynthesis.getVoices().filter(v=>/^es/i.test(v.lang))}catch(e){return[]}};
let hablaId=0;
function speak(txt){
  const V=TEXTOS.voz,id=++hablaId;
  if(!("speechSynthesis" in window)||typeof SpeechSynthesisUtterance==="undefined"){toast(V.noPuede);return}
  try{const sy=window.speechSynthesis;sy.cancel();const t=txt.trim().toLowerCase();if(!t){toast(V.primeroEscribi);return}
    const vs=sy.getVoices();const v=vs.find(v=>/es[-_]AR/i.test(v.lang))||vs.find(v=>/es[-_](US|MX|419)/i.test(v.lang))||vs.find(v=>/^es/i.test(v.lang));
    const parts=loco?t.split(/\s+/).filter(Boolean):[t];
    let started=false,warned=false;
    parts.forEach((w,i)=>{const u=new SpeechSynthesisUtterance(w);u.lang="es-AR";if(v)u.voice=v;
      if(loco){u.pitch=i%2?(.1+Math.random()*.6):(1.3+Math.random()*.7);u.rate=.7+Math.random()*.8}else{u.rate=.85;u.pitch=1.1}
      u.onstart=()=>{started=true};u.onerror=e=>{if(id===hablaId&&!warned&&e.error!=="interrupted"&&e.error!=="canceled"){warned=true;toast(V.noSePudo)}};
      sy.speak(u)});
    /* solo avisa la última lectura pedida (si se toca LEER muchas veces, las anteriores se cancelan a propósito) */
    setTimeout(()=>{if(id===hablaId&&!started&&!sy.speaking&&!warned)toast(V.noPuede)},2500)}catch(e){toast(V.noPuede)}
}
try{window.speechSynthesis&&speechSynthesis.getVoices()}catch(e){}
/* lee una consigna. Si la compu no tiene voz en castellano, avisa una sola vez para que lea un adulto */
let avisoSinVoz=false;
const sayQuiet=t=>{try{const sy=window.speechSynthesis;
  if(!avisoSinVoz)setTimeout(()=>{if(!avisoSinVoz&&!vocesEs().length){avisoSinVoz=true;toast(TEXTOS.voz.sinVoz)}},1500);
  if(!sy)return;sy.cancel();t=t.replace(/[^\p{L}\p{N}\s¡!¿?,.]/gu,"").trim(); /* sin emojis: solo las palabras */
  const u=new SpeechSynthesisUtterance(t.toLowerCase());u.lang="es-AR";
  const v=vocesEs()[0];if(v)u.voice=v;u.rate=.9;sy.speak(u)}catch(e){}};
