/* ARRANQUE: va último en index.html, cuando ya están registrados todos los juegos */
document.title=TEXTOS.tituloPestana;
let rz,lastW=innerWidth;window.addEventListener("resize",()=>{clearTimeout(rz);rz=setTimeout(()=>{
  if(Math.abs(innerWidth-lastW)<40)return;lastW=innerWidth;
  if(cur&&lvl!=="free"&&!stage.querySelector(".win"))start(cur,lvl)},250)});
home();
