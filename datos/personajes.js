/* PERSONAJES, PIEZAS Y OBJETOS
   Cada cosa que aparece dibujada en los juegos: emoji, nombre y color.
   Para cambiar un dibujo, cambiá el emoji entre comillas. Los nombres van en MAYÚSCULAS. */
window.DATOS = window.DATOS || {};

DATOS.personajes = {

  /* Dibujos hechos a mano (SVG) que no existen como emoji */
  dibujos: {
    reciclaje: '<svg class="recy" viewBox="-54 -63 108 108" width="1em" height="1em" aria-hidden="true"><line x1="5.0" y1="-35.4" x2="23.6" y2="-3.1" stroke="currentColor" stroke-width="15" stroke-linecap="round"/><polygon points="34.3,15.4 7.2,6.4 40.1,-12.6" fill="currentColor" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/><line x1="28.2" y1="22.0" x2="-9.1" y2="22.0" stroke="currentColor" stroke-width="15" stroke-linecap="round"/><polygon points="-30.5,22.0 -9.1,3.0 -9.1,41.0" fill="currentColor" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/><line x1="-33.1" y1="13.4" x2="-14.5" y2="-18.9" stroke="currentColor" stroke-width="15" stroke-linecap="round"/><polygon points="-3.8,-37.4 2.0,-9.4 -30.9,-28.4" fill="currentColor" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/></svg>',
    ruedas: '<svg viewBox="0 0 100 50" width="1.4em" height=".75em" aria-hidden="true"><circle cx="24" cy="25" r="22" fill="#23204A"/><circle cx="24" cy="25" r="8" fill="#9A97AE"/><circle cx="76" cy="25" r="22" fill="#23204A"/><circle cx="76" cy="25" r="8" fill="#9A97AE"/></svg>',
    platillo: '<svg viewBox="0 0 100 100" width="1em" height="1em" aria-hidden="true"><line x1="50" y1="40" x2="50" y2="94" stroke="#6B6880" stroke-width="6"/><line x1="28" y1="95" x2="72" y2="95" stroke="#6B6880" stroke-width="6" stroke-linecap="round"/><ellipse cx="50" cy="38" rx="46" ry="13" fill="#F2B705" stroke="#B88400" stroke-width="3"/><ellipse cx="50" cy="34" rx="9" ry="5" fill="#B88400"/></svg>',
    xilofono: '<svg viewBox="0 0 100 100" width="1em" height="1em" aria-hidden="true"><rect x="8" y="22" width="11" height="62" rx="3" fill="#E5484D"/><rect x="22.5" y="27" width="11" height="52" rx="3" fill="#FF8A1F"/><rect x="37" y="32" width="11" height="42" rx="3" fill="#FFC21A"/><rect x="51.5" y="37" width="11" height="32" rx="3" fill="#22A866"/><rect x="66" y="42" width="11" height="22" rx="3" fill="#2F80ED"/><rect x="80.5" y="47" width="11" height="12" rx="3" fill="#8E5BE8"/><line x1="20" y1="8" x2="48" y2="40" stroke="#8B5E3C" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="42" r="6" fill="#23204A"/></svg>'
  },

  /* ROBOT */
  robot: { robot: "🤖", meta: "⭐", obstaculo: "🧱" },

  /* RECICLAJE: contenedores y lo que va en cada uno (ama:1 = letra oscura sobre color claro) */
  reciclaje: {
    contenedores: {
      pap: { n: "PAPEL",    i: "📄", c: "#2F80ED", it: ["📰", "✉️", "📄"] },
      pla: { n: "PLÁSTICO", i: "🧴", c: "#FFC21A", it: ["🧴", "🥤", "🛍️"], ama: 1 },
      org: { n: "ORGÁNICO", i: "🍎", c: "#8B5E3C", it: ["🍌", "🍎", "🥕", "🥚"] },
      vid: { n: "VIDRIO",   i: "🍾", c: "#22A866", it: ["🍾", "🫙", "🍷"] },
      nor: { n: "BASURA",   i: "🗑️", c: "#6B6880", it: ["🩹", "🧻", "🧽", "🍬"] }
    },
    /* el ciclo que se ve al ganar el último nivel */
    ciclo: ["🧴", "🗑️", "🏭", "🧴"],
    /* lo que se puede agregar a la plaza (modo libre) */
    plaza: ["🌳", "⛲", "🌷", "🌻", "🌲", "🦋", "🐦", "🎈"]
  },

  /* LABERINTO */
  laberinto: { pila: "🔋", lamparita: "💡", pared: "🧱", cable: "✏️" },

  /* SECUENCIAS: grupos de 4 figuras */
  secuencias: {
    figuras: [["🔴", "🔵", "🟡", "🟢"], ["🍎", "🍌", "🍇", "🍊"], ["🐱", "🐶", "🐸", "🐰"], ["⭐", "❤️", "🔷", "🌙"]]
  },

  /* SOMBRAS: objetos y oficios [persona, OFICIO, herramienta]
     Oficios sin estereotipos (ESI): mitad mujeres y mitad varones, y no en los roles "de siempre". */
  sombras: {
    objetos: ["🔨", "🔧", "✂️", "💡", "🔋", "📱", "🎧", "📷", "🔌", "🧲", "🔦", "⏰", "🚲", "✏️", "🔑", "🖱️", "🎸", "🚗"],
    nombres: { "🔨": "MARTILLO", "🔧": "LLAVE INGLESA", "✂️": "TIJERA", "💡": "LAMPARITA", "🔋": "PILA", "📱": "CELULAR", "🎧": "AURICULARES", "📷": "CÁMARA", "🔌": "ENCHUFE", "🧲": "IMÁN", "🔦": "LINTERNA", "⏰": "RELOJ", "🚲": "BICICLETA", "✏️": "LÁPIZ", "🔑": "LLAVE", "🖱️": "MOUSE", "🎸": "GUITARRA", "🚗": "AUTO" },
    oficios: [
      ["👩‍🔧", "MECÁNICA", "🔧"],
      ["👩‍🚒", "BOMBERA", "🧯"],
      ["👷‍♀️", "CONSTRUCTORA", "🔨"],
      ["👩‍🚀", "ASTRONAUTA", "🚀"],
      ["👩‍🌾", "GRANJERA", "🚜"],
      ["👨‍🍳", "COCINERO", "🍳"],
      ["💇‍♂️", "PELUQUERO", "✂️"],
      ["👨‍🏫", "MAESTRO", "📚"],
      ["👨‍⚕️", "ENFERMERO", "🩺"],
      ["👨‍🎨", "PINTOR", "🖌️"]
    ]
  },

  /* INSTRUMENTOS: dibujo y nombre (el sonido se arma en juegos/instrumentos/juego.js) */
  instrumentos: {
    tambor:   { i: "🥁", n: "TAMBOR" },
    guitarra: { i: "🎸", n: "GUITARRA" },
    violin:   { i: "🎻", n: "VIOLÍN" },
    piano:    { i: "🎹", n: "PIANO" },
    trompeta: { i: "🎺", n: "TROMPETA" },
    platillo: { i: "dibujo:platillo", n: "PLATILLO" },
    campana:  { i: "🔔", n: "CAMPANA" },
    xilofono: { i: "dibujo:xilofono", n: "XILOFÓN" },
    saxo:     { i: "🎷", n: "SAXO" }
  },

  /* ARMÁ EL ROBOT: piezas (c = nombre interno de la pieza en el dibujo del robot, no cambiar) */
  armaRobot: {
    piezas: {
      bateria:    { e: "🔋", n: "BATERÍA", c: "bat" },
      luz:        { e: "💡", n: "LUZ", c: "lamp" },
      camara:     { e: "📷", n: "CÁMARA", c: "cam" },
      ruedas:     { e: "dibujo:ruedas", n: "RUEDAS", c: "whl" },
      piernas:    { e: "🦿", n: "PIERNAS", c: "leg2" },
      brazo:      { e: "🦾", n: "BRAZO", c: "arm" },
      parlante:   { e: "🔊", n: "PARLANTE", c: "spk" },
      microfono:  { e: "🎤", n: "MICRÓFONO", c: "mic" },
      antena:     { e: "📡", n: "ANTENA", c: "ant2" },
      helice:     { e: "🌀", n: "HÉLICE", c: "heli" },
      iman:       { e: "🧲", n: "IMÁN", c: "mag" },
      termometro: { e: "🌡️", n: "TERMÓMETRO", c: "term" }
    },
    /* objetos del campo en el modo libre (x, y en %; hid = escondido, high = alto, metal = lo atrae el imán) */
    campo: [
      { e: "⚽", n: "LA PELOTA", x: 32, y: 18 },
      { e: "🔑", n: "LAS LLAVES", x: 70, y: 44, hid: 1 },
      { e: "🧸", n: "EL OSITO", x: 14, y: 46, hid: 1 },
      { e: "📻", n: "LA RADIO", x: 86, y: 8, radio: 1 },
      { e: "🍎", n: "LA MANZANA", x: 48, y: 70, high: 1 },
      { e: "🔩", n: "UN TORNILLO", x: 60, y: 24, metal: 1 },
      { e: "🔩", n: "UN TORNILLO", x: 64, y: 32, metal: 1 },
      { e: "🎂", n: "LA TORTA", x: 92, y: 40 }
    ]
  },

  /* ÍCONOS: [ícono, CONSIGNA] */
  iconos: {
    apps: [["📷", "SACÁ UNA FOTO"], ["📞", "LLAMÁ POR TELÉFONO"], ["✉️", "MANDÁ UN MENSAJE"], ["🎵", "PONÉ MÚSICA"], ["🔍", "BUSCÁ ALGO"], ["🗑️", "BORRÁ ALGO"], ["▶️", "DALE PLAY AL VIDEO"], ["⏸️", "PAUSÁ EL VIDEO"], ["🏠", "VOLVÉ AL INICIO"], ["⚙️", "ABRÍ LOS AJUSTES"], ["🔋", "MIRÁ LA BATERÍA"], ["🔊", "SUBÍ EL VOLUMEN"], ["🔇", "SACÁ EL SONIDO"], ["📶", "PRENDÉ EL WIFI"], ["⏰", "PONÉ UNA ALARMA"], ["🗺️", "ABRÍ EL MAPA"]]
  },

  /* ¿QUÉ NECESITO? */
  queNecesito: {
    /* categorías para clasificar (niveles 1 a 3) */
    categorias: {
      tra: { n: "TRANSPORTE",   i: "🚌", c: "#2F80ED", it: ["🚌", "🚗", "🚲", "✈️", "🚂", "🚢", "🛴", "🚕"] },
      com: { n: "COMUNICACIÓN", i: "💬", c: "#F0569A", it: ["📱", "📞", "✉️", "📻", "📺", "💻", "📰"] },
      ene: { n: "ENERGÍA",      i: "⚡", c: "#FFC21A", ama: 1, it: ["🔋", "🔌", "⛽", "☀️"] }
    },
    /* respuestas posibles para las situaciones, por categoría */
    opciones: { tra: ["🚌", "🚢", "✈️", "🚲"], com: ["📱", "📞", "📶", "📻", "✉️"], ene: ["🔋", "🔌", "⛽", "💡"] },
    nombres: { "🚌": "COLECTIVO", "🚢": "BARCO", "✈️": "AVIÓN", "🚲": "BICI", "📱": "CELULAR", "📞": "TELÉFONO", "📶": "WIFI", "📻": "RADIO", "✉️": "CARTA", "🔋": "PILA", "🔌": "ENCHUFE", "⛽": "NAFTA", "💡": "LUZ", "☀️": "SOL" }
  },

  /* PREMIO: personajes inventados (animal + objeto) y stickers */
  premio: {
    animales: [["🐧", "PINGÜINO"], ["🐸", "RANITA"], ["🐙", "PULPO"], ["🐢", "TORTUGA"], ["🐔", "GALLINA"], ["🦖", "DINO"], ["🐱", "GATITO"], ["🐝", "ABEJA"], ["🦉", "BÚHO"], ["🐌", "CARACOL"], ["🐷", "CHANCHITO"], ["🦒", "JIRAFA"]],
    objetos: [["🍞", "TOSTADINI"], ["🚁", "HELICOPTERINO"], ["🎸", "GUITARRONI"], ["🚀", "COHETINI"], ["🛹", "PATINETTI"], ["🍕", "PIZZETTI"], ["🎈", "GLOBINI"], ["⚽", "PELOTONI"], ["🧲", "IMANINI"], ["💡", "LUCECITTA"], ["🥁", "TAMBORINI"], ["☂️", "PARAGUINI"], ["🤖", "ROBOTTINI"], ["🧁", "CUPCAKINI"]],
    stickers: ["🌳", "🌻", "⛲", "♻️", "🍎", "⚙️", "🎸", "🥁", "⭐", "🧱", "💡", "🎈", "🏠", "🚌", "❤️", "🎂"],
    /* instrumentos que puede tocar (nombres de la lista de instrumentos) */
    instrumentos: ["piano", "tambor", "guitarra", "trompeta", "platillo", "xilofono"]
  },

  /* ÍCONO DE CADA JUEGO en el inicio y el menú */
  iconosJuegos: {
    robot: "🤖",
    reciclaje: "dibujo:reciclaje",
    dibujo: "🎨",
    laberinto: "🔌",
    engranajes: "⚙️",
    secuencias: "🔁",
    sombras: "🔦",
    instrumentos: "🎻",
    escribir: "⌨️",
    "arma-robot": "🦾",
    iconos: "📱",
    "que-necesito": "🚌",
    torre: "🧱",
    premio: "🎁",
    luz: "💡",
    orden: "🔢"
  }
};
