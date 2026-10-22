/* VOZ: leer en voz alta (speechSynthesis) y avisos en pantalla */
let loco=false; /* modo loco: cada palabra con otra voz (lo usan escribir y premio) */
function toast(msg){const t=document.createElement("div");t.className="toast";t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),3500)}
function speak(txt){
  const V=TEXTOS.voz;
  if(!("speechSynthesis" in window)||typeof SpeechSynthesisUtterance==="undefined"){toast(V.noPuede);return}
  try{const sy=window.speechSynthesis;sy.cancel();const t=txt.trim().toLowerCase();if(!t){toast(V.primeroEscribi);return}
    const vs=sy.getVoices();const v=vs.find(v=>/es[-_]AR/i.test(v.lang))||vs.find(v=>/es[-_](US|MX|419)/i.test(v.lang))||vs.find(v=>/^es/i.test(v.lang));
    const parts=loco?t.split(/\s+/).filter(Boolean):[t];
    let started=false,warned=false;
    parts.forEach((w,i)=>{const u=new SpeechSynthesisUtterance(w);u.lang="es-AR";if(v)u.voice=v;
      if(loco){u.pitch=i%2?(.1+Math.random()*.6):(1.3+Math.random()*.7);u.rate=.7+Math.random()*.8}else{u.rate=.85;u.pitch=1.1}
      u.onstart=()=>{started=true};u.onerror=e=>{if(!warned&&e.error!=="interrupted"&&e.error!=="canceled"){warned=true;toast(V.noSePudo)}};
      sy.speak(u)});
    setTimeout(()=>{if(!started&&!sy.speaking&&!warned)toast(V.noPuede)},2500)}catch(e){toast(V.noPuede)}
}
try{window.speechSynthesis&&speechSynthesis.getVoices()}catch(e){}
/* lee una consigna sin avisos si no hay voz */
const sayQuiet=t=>{try{const sy=window.speechSynthesis;if(!sy)return;sy.cancel();const u=new SpeechSynthesisUtterance(t.toLowerCase());u.lang="es-AR";
  const v=sy.getVoices().find(v=>/^es/i.test(v.lang));if(v)u.voice=v;u.rate=.9;sy.speak(u)}catch(e){}};
