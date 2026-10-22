/* NIVELES DE SOMBRAS
   n = cuántas sombras para elegir
   of: 1 = en vez de objetos, unir cada oficio con su herramienta
   Los objetos y oficios se editan en datos/personajes.js → sombras */
window.DATOS = window.DATOS || {};
DATOS.niveles = DATOS.niveles || {};

DATOS.niveles.sombras = [
  { n: 2 },
  { n: 3 },
  { n: 3 },
  { n: 4 },
  { n: 4 },
  { n: 5 },
  { n: 3, of: 1 },
  { n: 4, of: 1 },
  { n: 5, of: 1 }
];
