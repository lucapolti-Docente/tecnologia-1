/* ESTRELLAS: qué juegos se completaron (se guarda en este navegador, sin datos personales) */
const CLAVE_ESTRELLAS="tec1-estrellas";
/* nombres viejos de los juegos (versión de un solo archivo) → nombres nuevos */
const NOMBRES_VIEJOS={reci:"reciclaje",dibu:"dibujo",labe:"laberinto",engr:"engranajes",secu:"secuencias",somb:"sombras",inst:"instrumentos",robo:"arma-robot",icon:"iconos",tycom:"que-necesito"};
let doneSet=new Set();try{doneSet=new Set(JSON.parse(localStorage.getItem(CLAVE_ESTRELLAS)||"[]").map(k=>NOMBRES_VIEJOS[k]||k))}catch(e){}
const saveDone=()=>{try{localStorage.setItem(CLAVE_ESTRELLAS,JSON.stringify([...doneSet]))}catch(e){}};
const totalGames=()=>Object.keys(GAMES).filter(k=>!GAMES[k].hidden);
const allStars=()=>totalGames().every(k=>doneSet.has(k));
