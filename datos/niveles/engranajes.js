/* NIVELES DE ENGRANAJES
   Lista de huecos entre el motor y la hélice, en orden: "s" = rueda chica, "b" = rueda grande */
window.DATOS = window.DATOS || {};
DATOS.niveles = DATOS.niveles || {};

DATOS.niveles.engranajes = [
  ["s"],
  ["b"],
  ["s", "b"],
  ["b", "s"],
  ["s", "s", "b"],
  ["b", "s", "b"],
  ["s", "b", "s", "b"],
  ["b", "s", "s", "b", "s"]
];
