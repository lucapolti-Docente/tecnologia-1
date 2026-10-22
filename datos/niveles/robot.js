/* NIVELES DE ROBOT
   r, c = filas y columnas de la grilla
   s = dónde empieza el robot [fila, columna]   (se cuenta desde 0, arriba a la izquierda)
   g = dónde está la estrella [fila, columna]
   k = obstáculos 🧱 [[fila, columna], ...]
   bug = programa con un error para arreglar [["R",3]] = → repetido 3 veces (U ↑, D ↓, L ←, R →) */
window.DATOS = window.DATOS || {};
DATOS.niveles = DATOS.niveles || {};

DATOS.niveles.robot = [
  { r: 3, c: 5, s: [1, 0], g: [1, 3], k: [] },
  { r: 4, c: 4, s: [0, 0], g: [2, 2], k: [] },
  { r: 4, c: 5, s: [3, 0], g: [0, 4], k: [[2, 0], [3, 2], [1, 3]] },
  { r: 3, c: 5, s: [1, 0], g: [1, 4], k: [], bug: [["R", 3]] },
  { r: 5, c: 5, s: [0, 0], g: [4, 4], k: [[0, 2], [1, 2], [2, 2], [4, 1], [4, 3]] },
  { r: 5, c: 5, s: [2, 0], g: [2, 4], k: [[1, 2], [2, 2], [3, 2], [4, 2], [2, 1]] },
  { r: 4, c: 4, s: [0, 0], g: [3, 3], k: [[1, 1], [2, 1]], bug: [["R", 3], ["U", 3]] },
  { r: 5, c: 6, s: [4, 0], g: [0, 5], k: [[3, 0], [3, 1], [3, 2], [1, 2], [1, 3], [1, 4], [0, 1]] },
  { r: 6, c: 6, s: [0, 0], g: [5, 0], k: [[1, 0], [2, 0], [3, 0], [4, 0], [1, 2], [2, 2], [3, 2], [4, 2], [2, 4], [3, 4], [5, 3]] },
  { r: 6, c: 6, s: [5, 5], g: [0, 0], k: [[4, 5], [4, 4], [4, 3], [2, 1], [2, 2], [2, 3], [2, 4], [0, 2], [1, 2], [5, 0]] },
  { r: 5, c: 5, s: [4, 0], g: [0, 4], k: [[3, 0], [3, 1], [1, 3], [1, 4]], bug: [["U", 4], ["R", 4]] }
];
