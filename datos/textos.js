/* TEXTOS: todo lo que se lee en pantalla (y lo que dice la voz).
   Para corregir o traducir, cambiá solo lo que está entre comillas. Escribí en MAYÚSCULAS.
   {n} y {x} se reemplazan por un número o una palabra: no los borres.
   Los textos marcados "voz" se leen en voz alta; los "etiqueta" no se ven, los usa el lector de pantalla. */
window.DATOS = window.DATOS || {};

DATOS.textos = {

  tituloPestana: "Tecnología en Primero",
  titulo: "TECNOLOGÍA EN 1.º",

  /* Nombre de cada juego (ficha del inicio, barra de arriba y menú) */
  juegos: {
    robot: "ROBOT",
    reciclaje: "RECICLAJE",
    dibujo: "DIBUJO",
    laberinto: "LABERINTO",
    engranajes: "ENGRANAJES",
    secuencias: "SECUENCIAS",
    sombras: "SOMBRAS",
    instrumentos: "INSTRUMENTOS",
    escribir: "ESCRIBIR",
    "arma-robot": "ARMÁ EL ROBOT",
    iconos: "ÍCONOS",
    "que-necesito": "¿QUÉ NECESITO?",
    torre: "TORRE",
    premio: "PREMIO",
    luz: "LUZ",
    orden: "ORDENAR"
  },

  /* Barra de arriba y botón flotante */
  barra: {
    menu: "MENÚ",              // etiqueta
    inicio: "INICIO",          // etiqueta del botón 🏠
    libre: "✏️ LIBRE",
    completado: "COMPLETADO"   // etiqueta de la ⭐ en la ficha
  },

  /* Menú ☰ */
  menu: {
    cerrar: "CERRAR",          // etiqueta
    inicio: "🏠 INICIO",
    juegos: "JUEGOS",
    nivel: "NIVEL",
    modoLibre: "✏️ MODO LIBRE",
    tamano: "TAMAÑO",
    otraVez: "↺ EMPEZAR DE NUEVO",
    ajustes: "AJUSTES",
    sonidoSi: "🔊 SONIDO SÍ",
    sonidoNo: "🔇 SONIDO NO",
    borrarEstrellas: "⭐ BORRAR ESTRELLAS",
    mantener: "MANTENÉ APRETADO",

    probarPremio: "🎁 PROBAR EL PREMIO",
    pantallaCompleta: "⛶ PANTALLA COMPLETA",
    docentes: "📄 PARA DOCENTES",
    letra: "LETRA",
    modoLoco: "🤪 MODO LOCO",
    si: "SÍ",
    no: "NO"
  },

  /* Pantalla de victoria */
  victoria: {
    muyBien: "¡MUY BIEN!",
    ganaste: "¡GANASTE!",
    otraVez: "↺",
    seguir: "✏️ SEGUIR",
    jugarLibre: "✏️ JUGAR LIBRE",
    siguiente: "SIGUIENTE ▶",
    inicio: "🏠 INICIO",
    premioDesbloqueado: "🎁 ¡DESBLOQUEASTE EL PREMIO! MIRÁ EL INICIO"
  },

  /* Avisos de la voz */
  voz: {
    noPuede: "🔇 ESTE NAVEGADOR NO PUEDE LEER EN VOZ ALTA",
    noSePudo: "🔇 NO SE PUDO LEER EN VOZ ALTA",
    primeroEscribi: "⌨️ PRIMERO ESCRIBÍ ALGO",
    sinVoz: "🔇 ESTA COMPU NO TIENE VOZ: QUE TE LEA LA SEÑO O EL SEÑO"
  },

  /* Etiquetas que se repiten en varios juegos */
  comun: {
    escuchar: "ESCUCHAR",
    borrar: "BORRAR",
    borrarTodo: "BORRAR TODO"
  },

  robot: {
    robot: "ROBOT", meta: "META", obstaculo: "OBSTÁCULO",   // etiquetas de las herramientas del modo libre
    arreglar: "🐞 ARREGLÁ EL PROGRAMA",
    repetir: "REPETIR",                                      // etiqueta del botón 🔁
    ir: "▶ IR",
    perfecto: "¡PERFECTO!",
    estrellasPerfecto: "⭐⭐⭐",
    estrellasBien: "⭐⭐",
    sePuede: "🔁 SE PUEDE CON {n} BLOQUES",
    sePuedeUno: "🔁 SE PUEDE CON {n} BLOQUE"
  },

  reciclaje: {
    consigna: "¿DÓNDE VA?",    // voz al empezar cada nivel
    agregar: "AGREGAR"         // etiqueta de los botones de la plaza
  },

  dibujo: {
    mirar: "👀",               // arriba del dibujo modelo
    consigna: "¡COPIÁ EL DIBUJO!",   // voz al empezar cada nivel
    color: "COLOR",            // etiquetas
    sello: "SELLO"
  },

  sombras: {
    consigna: "¿CUÁL ES SU SOMBRA?",                        // voz al empezar
    consignaOficio: "{x}: ¿QUÉ NECESITA PARA TRABAJAR?"      // voz en los niveles de oficios
  },

  laberinto: {
    interruptor: "¡PRENDÉ EL INTERRUPTOR!",   // voz en el primer nivel con interruptor
    pared: "PARED", pila: "PILA", lamparita: "LAMPARITA", cable: "CABLE"   // etiquetas del modo libre
  },

  engranajes: {
    rueda: "RUEDA",
    agregarRueda: "AGREGAR RUEDA",
    sacarRueda: "SACAR RUEDA",
    darCuerda: "DAR CUERDA",
    motor: "⚡ MOTOR",
    manivela: "🔄 MANIVELA",
    resorte: "🌀 RESORTE"
  },

  secuencias: {
    cualEstaMal: "🐞 ¿CUÁL ESTÁ MAL?",
    figuras: "FIGURAS", tocar: "TOCAR", sacar: "SACAR"     // etiquetas del modo libre
  },

  escribir: {
    tamano: "TAMAÑO",          // etiqueta
    loco: "🤪 LOCO",
    modoLoco: "MODO LOCO",     // etiqueta
    leer: "🔊 LEER",
    leerEtiqueta: "LEER",
    escribi: "ESCRIBÍ",        // etiqueta
    pista: "⌨️"                // se ve cuando el modo libre está vacío
  },

  "arma-robot": {
    listo: "⭐ ¡LISTO!",
    hola: "🎉 ¡HOLA!",
    holaVoz: "hola",
    muchoFrio: "❄️ ¡HACE MUCHO FRÍO!",
    recibi: "📩 ¡RECIBÍ EL MENSAJE!",
    /* modo libre */
    armame: "🤖 ¡ARMAME COMO QUIERAS!",
    dia: "☀️ DÍA",
    noche: "🌙 NOCHE",
    acciones: {
      camara: "👀 MIRAR", brazo: "✋ AGARRAR", iman: "🧲 ATRAER", helice: "🌀 VOLAR", luz: "💡 LUZ",
      parlante: "💬 HABLAR", microfono: "👂 ESCUCHAR", antena: "📡 MENSAJE", termometro: "🌡️ MEDIR"
    },
    soltar: "✋ SOLTAR",
    bajar: "🌀 BAJAR",
    necesitoEnergia: "⚡ NECESITO ENERGÍA",
    sinEnergia: "⚡ ¡ME QUEDÉ SIN ENERGÍA!",
    necesitoEnergiaVoz: "necesito energía",
    encontreAlgo: "👀 ¡ENCONTRÉ ALGO!",
    nadaEscondido: "👀 ACÁ NO HAY NADA ESCONDIDO",
    muyAlto: "🌀 ESTÁ MUY ALTO, NECESITO VOLAR",
    nadaCerca: "✋ NO HAY NADA CERCA",
    tengo: "✋ ¡TENGO {x}!",
    tengoDice: "¡TENGO {x}!",
    junte: "🧲 ¡JUNTÉ {n} TORNILLOS!",
    junteUno: "🧲 ¡JUNTÉ {n} TORNILLO!",
    sinMetal: "🧲 NO HAY METAL CERCA",
    luzPrendida: "💡 ¡LUZ PRENDIDA!",
    luzApagada: "💡 LUZ APAGADA",
    saludos: ["¡HOLA, CHICOS!", "¡SOY UN ROBOT!", "¡QUÉ LINDO DÍA!", "¡VAMOS A JUGAR!"],
    escuchoMusica: "💃 ¡ESCUCHO MÚSICA!",
    noEscucho: "🤫 NO ESCUCHO NADA",
    noEscuchoVoz: "no escucho nada",
    mensajes: ["📩 ¡BUSCÁ EL OSITO!", "📩 ¡HAY UNA MANZANA EN EL ÁRBOL!", "📩 ¡LA RADIO ESTÁ PRENDIDA!", "📩 ¡SE CAYERON TORNILLOS!"],
    frio: "❄️ ¡HACE FRÍO!",
    frioVoz: "hace frío",
    calor: "☀️ ¡HACE CALOR!",
    calorVoz: "hace calor"
  },

  "que-necesito": {
    pregunta: "¿QUÉ NECESITO PARA {x}?"
  },

  torre: {
    bloque: "BLOQUE"           // etiqueta
  },

  premio: {
    personaje: "PERSONAJE",
    hacer: "HACER",
    lugar: "LUGAR Y STICKERS",
    alAzar: "AL AZAR", hablar: "HABLAR", bailar: "BAILAR", fiesta: "FIESTA",   // etiquetas
    escribiQueDice: "ESCRIBÍ LO QUE DICE",
    borrarStickers: "BORRAR STICKERS",
    soy: "¡SOY {x}!",
    musica: "🎶",
    tocaDonde: "TOCÁ DONDE QUIERAS PONERLO",
    escribiAbajo: "✏️ ESCRIBÍ ABAJO LO QUE QUERÉS QUE DIGA"
  }
};
