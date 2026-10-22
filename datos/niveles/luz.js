/* NIVELES DE LUZ (juego desactivado: ver README para activarlo)
   b = lamparitas [x, y]   s = interruptores [x, y]   (el tablero mide 1000 × 600) */
window.DATOS = window.DATOS || {};
DATOS.niveles = DATOS.niveles || {};

DATOS.niveles.luz = [
  { b: [[700, 360]], s: [] },
  { b: [[640, 250]], s: [] },
  { b: [[760, 300]], s: [[480, 500]] },
  { b: [[560, 260], [820, 420]], s: [] },
  { b: [[540, 240], [830, 420]], s: [[460, 520]] },
  { b: [[480, 220], [740, 220], [650, 480]], s: [] }
];
