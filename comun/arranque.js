/* ARRANQUE: va último en index.html, cuando ya están registrados todos los juegos */
document.title=TEXTOS.tituloPestana;
/* al cambiar el tamaño de la ventana (o girar el celular) la pantalla se reacomoda sin perder lo hecho */
let rz,lastW=innerWidth,lastH=innerHeight;window.addEventListener("resize",()=>{clearTimeout(rz);rz=setTimeout(()=>{
  if(Math.abs(innerWidth-lastW)<40&&Math.abs(innerHeight-lastH)<40)return;lastW=innerWidth;lastH=innerHeight;
  if(reacomodo)reacomodo()},250)});
home();
