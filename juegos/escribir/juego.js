/* ESCRIBIR: copiar palabras con el teclado. Modo libre: escribir lo que quieran y escucharlo.
   Niveles: datos/niveles/escribir.js · Colores del modo loco: datos/fondos.js → escribir */
const ESC=NIVELES.escribir;
const LOCOCOL=FONDOS.escribir.coloresLoco;
let typeSize=1,typeVal="",typeAttrs=[];
const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]);
const norm=c=>c.toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
function escribir(){
  const T=TEXTOS.escribir;
  const free=lvl==="free",W=free?[]:[...ESC[lvl]];let val=free?typeVal:"",done=false;
  stage.innerHTML=`<div class="typewrap"><div class="tbar" id="tb">${[0,1,2].map(z=>`<button class="tbtn" data-z="${z}" aria-label="${T.tamano}" style="font-size:${[22,34,50][z]}px">A</button>`).join("")}${free?`<button class="tbtn wide" data-t="loco" aria-label="${T.modoLoco}">${T.loco}</button>`:""}<button class="tbtn" data-t="clear" aria-label="${TEXTOS.comun.borrarTodo}">🗑️</button><button class="tbtn wide say" data-t="say" aria-label="${T.leerEtiqueta}">${T.leer}</button></div><div class="typer"><div class="scroll" id="sc"><div class="txt" id="tx"></div></div>
    <textarea id="ti" autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false" aria-label="${T.escribi}"></textarea></div></div>`;
  const ti=$("#ti");ti.value=val;
  const ch=c=>c===" "?"&nbsp;":esc(c);
  const render=()=>{
    const arr=[...ti.value.toUpperCase()];
    if(free){
      while(typeAttrs.length<arr.length)typeAttrs.push({c:LOCOCOL[Math.floor(Math.random()*LOCOCOL.length)],s:(.6+Math.random()*1.1).toFixed(2),r:Math.round(Math.random()*24-12)});
      typeAttrs.length=arr.length;
      $("#tx").innerHTML=(arr.length?"":`<span class="hint">${T.pista}</span>`)+arr.map((c,i)=>c==="\n"?"<br>":`<span${loco?` style="color:${typeAttrs[i].c};font-size:${typeAttrs[i].s}em;transform:rotate(${typeAttrs[i].r}deg)"`:""}>${ch(c)}</span>`).join("")+`<i class="caret"></i>`;
    }else{
      let h="";
      W.forEach((t,i)=>{
        if(i===arr.length)h+=`<i class="caret"></i>`;
        if(i<arr.length){const ok=norm(arr[i])===norm(t);h+=`<span class="${ok?'ok':'bad'}">${!ok&&arr[i]===" "?"_":ch(arr[i])}</span>`}
        else h+=`<span class="ghost">${ch(t)}</span>`;
      });
      arr.slice(W.length).forEach(c=>{h+=`<span class="bad">${c===" "?"_":ch(c)}</span>`});
      if(arr.length>=W.length)h+=`<i class="caret"></i>`;
      $("#tx").innerHTML=h;
    }
    const sc=$("#sc");sc.scrollTop=sc.scrollHeight;
  };
  const tb=$("#tb");
  const marks=()=>{tb.querySelectorAll("[data-z]").forEach(b=>b.classList.toggle("sel",+b.dataset.z===typeSize));const lb=tb.querySelector('[data-t="loco"]');if(lb)lb.classList.toggle("sel",loco);
    $("#tx").className=`txt size${typeSize} ${free&&loco?'loco':''}`};
  tb.onclick=e=>{const b=e.target.closest("button");if(!b||done)return;
    if(b.dataset.z)typeSize=+b.dataset.z;
    else if(b.dataset.t==="loco")loco=!loco;
    else if(b.dataset.t==="clear"){val="";if(free){typeVal="";typeAttrs=[]}ti.value="";beep(300,.2)}
    else if(b.dataset.t==="say"){speak(free?typeVal:ESC[lvl]);try{ti.focus()}catch(_){}return}
    beep(560,.05);marks();render();try{ti.focus()}catch(_){}};
  marks();
  ti.addEventListener("input",()=>{
    if(done){ti.value=val;return}
    const grew=ti.value.length>val.length;val=ti.value;if(free)typeVal=val;render();
    if(free){if(grew)beep(loco?300+Math.random()*700:520,.04);return}
    const arr=[...val.toUpperCase()];
    if(grew){const i=arr.length-1;(i<W.length&&norm(arr[i])===norm(W[i]))?beep(620+i*25,.05):bad()}
    if(arr.length===W.length&&arr.every((c,i)=>norm(c)===norm(W[i]))){done=true;try{ti.blur()}catch(_){}later(win,500)}
  });
  render();
  setTimeout(()=>{try{ti.focus()}catch(e){}},50);
}
document.addEventListener("keydown",()=>{if(cur==="escribir"&&$("#menu").hidden){const ti=$("#ti");if(ti&&document.activeElement!==ti)ti.focus()}});

registrar("escribir",{iniciar:escribir,niveles:()=>ESC,libre:true});
