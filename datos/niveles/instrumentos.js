/* NIVELES DE INSTRUMENTOS
   Cada nivel es la lista de instrumentos que aparecen para elegir.
   Nombres posibles: tambor, guitarra, violin, piano, trompeta, platillo, campana, xilofono, saxo */
window.DATOS = window.DATOS || {};
DATOS.niveles = DATOS.niveles || {};

DATOS.niveles.instrumentos = [
  ["tambor", "guitarra", "violin"],
  ["platillo", "piano", "trompeta", "guitarra"],
  ["tambor", "platillo", "campana", "violin", "saxo"],
  ["guitarra", "piano", "xilofono", "trompeta", "saxo", "campana"],
  ["tambor", "violin", "piano", "xilofono", "platillo", "trompeta", "saxo"],
  ["tambor", "guitarra", "violin", "piano", "trompeta", "platillo", "campana", "xilofono", "saxo"]
];
