/* FONDOS, ESCENARIOS Y COLORES
   Colores en formato "#RRGGBB". "var(--robot)" usa un color definido en comun/estilos.css. */
window.DATOS = window.DATOS || {};

DATOS.fondos = {

  /* Color de la ficha de cada juego en el inicio (y de sus puntitos de progreso) */
  juegos: {
    robot: "var(--robot)",
    reciclaje: "var(--reci)",
    dibujo: "var(--dibu)",
    laberinto: "#14A89A",
    engranajes: "#5B6B8C",
    secuencias: "#F0569A",
    sombras: "#3D3A6B",
    instrumentos: "#D97706",
    escribir: "#7C3AED",
    "arma-robot": "#DC2626",
    iconos: "#0891B2",
    "que-necesito": "#65A30D",
    torre: "#A16207",
    premio: "linear-gradient(135deg,#F0569A,#FFB800 50%,#22A866)",
    luz: "var(--luz)",
    orden: "#8E5BE8"
  },

  /* DIBUJO: cada letra es un color. "." es blanco (vacío). Se usan en datos/niveles/dibujo.js */
  dibujo: {
    colores: { R: "#E5484D", O: "#FF8A1F", A: "#FFC21A", V: "#22A866", L: "#9BD650", Z: "#2F80ED", C: "#5CC8F0", P: "#8E5BE8", K: "#FF8FC4", M: "#8B5E3C", G: "#9A97AE", N: "#23204A", ".": "#FFFFFF" },
    /* colores que aparecen en el modo libre */
    paletaLibre: ["R", "O", "A", "V", "L", "Z", "C", "P", "K", "M", "G", "N"],
    /* sellos del modo libre: botón + dibujo de 3×3 */
    sellos: [
      { i: "❤️", p: ["R.R", "RRR", ".R."] },
      { i: "🌳", p: [".V.", "VVV", ".M."] },
      { i: "🌼", p: [".A.", "ARA", ".A."] },
      { i: "⭐", p: [".A.", "AAA", "A.A"] }
    ]
  },

  /* ESCRIBIR: colores de las letras en el modo loco */
  escribir: { coloresLoco: ["#E5484D", "#FF8A1F", "#E0A800", "#22A866", "#2F80ED", "#8E5BE8", "#F0569A", "#14A89A"] },

  /* LUZ: colores de los cables */
  luz: { cables: ["#E5484D", "#2F80ED", "#22A866", "#FF8A1F", "#8E5BE8"] },

  /* TORRE: colores de los bloques, en orden */
  torre: { bloques: ["#E5484D", "#2F80ED", "#FFC21A", "#22A866", "#FF8A1F", "#8E5BE8", "#F0569A", "#14A89A"] },

  /* ARMÁ EL ROBOT, modo libre: árboles y casa del campo [emoji, x %, y %, tamaño] y arbustos que esconden cosas [x %, y %] */
  armaRobot: {
    arbusto: "🌳",
    campo: [["🌳", 48, 52, 3.2], ["🏠", 88, 56, 2.6]],
    arbustos: [[70, 42], [14, 44]]
  },

  /* PREMIO: lugares [botón, nombre del fondo en juegos/premio/estilos.css] */
  premio: {
    escenarios: [["☀️", "plaza"], ["🌌", "espacio"], ["🌊", "mar"], ["🌙", "noche"]]
  }
};
