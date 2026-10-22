/* NIVELES DE RECICLAJE
   b = contenedores que aparecen (pap papel, pla plástico, org orgánico, vid vidrio, nor basura)
   n = cuántos residuos hay que separar
   Los contenedores y residuos se editan en datos/personajes.js */
window.DATOS = window.DATOS || {};
DATOS.niveles = DATOS.niveles || {};

DATOS.niveles.reciclaje = [
  { b: ["pap", "pla"], n: 4 },
  { b: ["pap", "pla", "org"], n: 6 },
  { b: ["pap", "pla", "org", "vid"], n: 6 },
  { b: ["pap", "pla", "org", "vid", "nor"], n: 8 },
  { b: ["pap", "pla", "org", "vid", "nor"], n: 10 }
];
