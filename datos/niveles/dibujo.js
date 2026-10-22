/* NIVELES DE DIBUJO
   Cada nivel es un dibujo cuadrado: una fila de letras por renglón, todas del mismo largo.
   Cada letra es un color (ver datos/fondos.js → dibujo.colores). "." es blanco. */
window.DATOS = window.DATOS || {};
DATOS.niveles = DATOS.niveles || {};

DATOS.niveles.dibujo = [
  [".R.",
   "RRR",
   ".R."],

  ["Z..Z",
   ".ZZ.",
   ".ZZ.",
   "Z..Z"],

  [".R.R.",
   "RRRRR",
   "RRRRR",
   ".RRR.",
   "..R.."],

  ["..R..",
   ".RRR.",
   "RRRRR",
   ".AZA.",
   ".AZA."],

  ["..VV..",
   ".VVVV.",
   "VVVVVV",
   ".VVVV.",
   "..MM..",
   "..MM.."],

  [".ZZZZ.",
   "ZNZZNZ",
   "ZZZZZZ",
   "ZRRRRZ",
   "ZZZZZZ",
   ".V..V."],

  ["..RRR..",
   ".RRARR.",
   ".RAAAR.",
   "..RRR..",
   "...V...",
   "..VV...",
   "...V..."],

  ["...RR...",
   "..RRRR..",
   "..ZZZZ..",
   "..ZAAZ..",
   "..ZZZZ..",
   ".ZZZZZZ.",
   "ZZ.ZZ.ZZ",
   "..O..O.."]
];
