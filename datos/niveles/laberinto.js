/* NIVELES DE LABERINTO
   n = tamaño del laberinto (n × n caminos). El laberinto se arma solo y es siempre el mismo para cada nivel.
   interruptor: true = aparece un interruptor en el camino que hay que prender */
window.DATOS = window.DATOS || {};
DATOS.niveles = DATOS.niveles || {};

DATOS.niveles.laberinto = [
  { n: 2 },
  { n: 3 },
  { n: 3 },
  { n: 4 },
  { n: 4 },
  { n: 5 },
  { n: 5 },
  { n: 6, interruptor: true },
  { n: 7, interruptor: true },
  { n: 8, interruptor: true }
];
