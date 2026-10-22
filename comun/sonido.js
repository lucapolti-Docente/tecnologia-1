/* SONIDO: pitidos del juego y sintetizador (todo se genera, no hay archivos de audio) */
let ac;
function beep(f=600,d=.12,type="sine"){ if(!sound)return; try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();
  const o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(.2,ac.currentTime);
  g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+d);o.connect(g).connect(ac.destination);o.start();o.stop(ac.currentTime+d);}catch(e){} }
const good=()=>beep(880,.15), bad=()=>beep(180,.25,"square");
function fanfare(){[523,659,784,1047].forEach((f,i)=>later(()=>beep(f,.2),i*130))}

/* sintetizador: lo usan instrumentos, secuencias libre y premio */
function AC(){ac=ac||new (window.AudioContext||window.webkitAudioContext)();if(ac.state==="suspended")ac.resume();return ac}
function tone(type,f,t0,dur,o={}){
  const{a=.01,vol=.25,vib=0,vibDelay=0,lp=0,lpEnv=null,bp=0,hold=false,slide=0}=o;const c=AC();const os=c.createOscillator(),g=c.createGain();os.type=type;
  if(slide){os.frequency.setValueAtTime(f*slide,t0);os.frequency.exponentialRampToValueAtTime(f,t0+.08)}else os.frequency.setValueAtTime(f,t0);
  let node=os;
  if(vib){const l=c.createOscillator(),lg=c.createGain();l.frequency.value=5.8;lg.gain.setValueAtTime(vibDelay?0:f*vib,t0);
    if(vibDelay)lg.gain.linearRampToValueAtTime(f*vib,t0+vibDelay);l.connect(lg).connect(os.frequency);l.start(t0);l.stop(t0+dur+.1)}
  if(lp||lpEnv||bp){const fl=c.createBiquadFilter();fl.type=bp?"bandpass":"lowpass";
    if(bp){fl.frequency.value=bp;fl.Q.value=1.2}
    else if(lpEnv){fl.frequency.setValueAtTime(lpEnv[0],t0);fl.frequency.linearRampToValueAtTime(lpEnv[1],t0+.05);fl.frequency.linearRampToValueAtTime(lpEnv[2],t0+dur)}
    else fl.frequency.value=lp;
    os.connect(fl);node=fl}
  g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(vol,t0+a);
  if(hold)g.gain.setValueAtTime(vol,t0+dur-.08);
  g.gain.exponentialRampToValueAtTime(.0001,t0+dur);
  node.connect(g).connect(c.destination);os.start(t0);os.stop(t0+dur+.05);
}
function pluck(f,t0,dur=1.4){const c=AC(),sr=c.sampleRate,N=Math.round(sr/f),len=Math.floor(sr*dur);const b=c.createBuffer(1,len,sr),d=b.getChannelData(0);
  const buf=new Float32Array(N).map(()=>Math.random()*2-1);for(let i=0;i<len;i++){const j=i%N,v=buf[j];d[i]=v*.45;buf[j]=.497*(v+buf[(j+1)%N])}
  const s=c.createBufferSource();s.buffer=b;s.connect(c.destination);s.start(t0)}
function noise(t0,dur,vol,hp,pow=3){const c=AC(),len=Math.floor(c.sampleRate*dur);const b=c.createBuffer(1,len,c.sampleRate),d=b.getChannelData(0);
  for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,pow);const s=c.createBufferSource();s.buffer=b;const f=c.createBiquadFilter();f.type="highpass";f.frequency.value=hp;
  const g=c.createGain();g.gain.value=vol;s.connect(f).connect(g).connect(c.destination);s.start(t0)}
function drum(t0,f1,f2,len,vol=1){const c=AC();const o=c.createOscillator(),g=c.createGain();o.frequency.setValueAtTime(f1,t0);o.frequency.exponentialRampToValueAtTime(f2,t0+len*.7);
  g.gain.setValueAtTime(vol,t0);g.gain.exponentialRampToValueAtTime(.001,t0+len);o.connect(g).connect(c.destination);o.start(t0);o.stop(t0+len+.05)}
