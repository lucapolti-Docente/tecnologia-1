/* NIVELES DE ¿QUÉ NECESITO?
   Hay dos tipos de nivel:
   1) Clasificar:  b = categorías (tra transporte, com comunicación, ene energía), n = cuántas cosas
   2) Situaciones: sit = cuántas opciones se muestran, situaciones = lista de
      [dibujo, "¿QUÉ NECESITO PARA ... ?", respuesta, categoría de la respuesta, opciones que NO ofrecer (opcional)]
      Lo último sirve cuando otra opción también sería correcta: por ejemplo, la compu también necesita enchufe.
      (la respuesta tiene que estar en datos/personajes.js → queNecesito.opciones) */
window.DATOS = window.DATOS || {};
DATOS.niveles = DATOS.niveles || {};

DATOS.niveles["que-necesito"] = [
  { b: ["tra", "com"], n: 6 },
  { b: ["tra", "com"], n: 8 },
  { b: ["tra", "com", "ene"], n: 9 },
  { sit: 3, situaciones: [
    ["🏠", "IR A MI CASA QUE ESTÁ LEJOS", "🚌", "tra"],
    ["👵", "HABLAR CON MI ABUELA QUE ESTÁ LEJOS", "📱", "com", ["🚌", "✈️", "🚢", "🚲"]],
    ["🔦", "PRENDER LA LINTERNA", "🔋", "ene"],
    ["🌳", "IR A LA PLAZA", "🚲", "tra"]
  ] },
  { sit: 4, situaciones: [
    ["🏝️", "CRUZAR EL MAR", "🚢", "tra"],
    ["📺", "VER LA TELE", "🔌", "ene", ["📶"]],
    ["🏫", "AVISAR QUE LLEGO TARDE", "📞", "com"],
    ["🚗", "QUE ANDE EL AUTO", "⛽", "ene"]
  ] },
  { sit: 4, situaciones: [
    ["🗺️", "VIAJAR A OTRO PAÍS", "✈️", "tra"],
    ["💻", "VER UN VIDEO EN LA COMPU", "📶", "com", ["🔌", "🔋", "💡"]],
    ["🌙", "LEER DE NOCHE", "💡", "ene", ["📱"]],
    ["🎙️", "ESCUCHAR LAS NOTICIAS", "📻", "com", ["🔌", "🔋"]]
  ] }
];
