/* NIVELES DE SECUENCIAS
   t = patrón (A, B, C, D son figuras distintas: "AAB" = 🔴🔴🔵 🔴🔴🔵 ...)
   n = largo de la fila
   m = cuántas figuras faltan al final
   err: 1 = nivel de "¿cuál está mal?": hay una figura equivocada para encontrar
   Las figuras se editan en datos/personajes.js → secuencias */
window.DATOS = window.DATOS || {};
DATOS.niveles = DATOS.niveles || {};

DATOS.niveles.secuencias = [
  { t: "AB", n: 6, m: 1 },
  { t: "AAB", n: 6, m: 1 },
  { t: "ABC", n: 6, m: 1 },
  { t: "ABB", n: 6, m: 1 },
  { t: "AB", n: 8, m: 2 },
  { t: "AABB", n: 8, m: 2 },
  { t: "ABC", n: 9, m: 2 },
  { t: "ABCD", n: 8, m: 2 },
  { t: "AB", n: 8, err: 1 },
  { t: "ABC", n: 9, err: 1 },
  { t: "AABB", n: 8, err: 1 }
];
