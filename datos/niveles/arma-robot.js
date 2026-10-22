/* NIVELES DE ARMÁ EL ROBOT: cada nivel es una misión.
   goal  = lo que el robot tiene que alcanzar (emoji)
   steps = pasos en orden: [pieza que necesita, TEXTO DEL GLOBITO, texto que se lee en voz alta]
           piezas: bateria, luz, camara, ruedas, piernas, brazo, parlante, microfono, antena, helice, iman, termometro
   end   = lo que dice el robot al usar el parlante (si no hay, dice "🎉 ¡HOLA!")
   Opciones del escenario:
     on: 1 = el robot ya está prendido     hide: 1 = la meta está escondida atrás de un arbusto
     night: 1 = es de noche                dance: 1 = el robot baila al llegar
     small: 1 = meta chiquita              cold: 1 = nota de que hace frío (no cambia nada en pantalla)
     gb = altura de la meta (en %)         decor = adornos [emoji, x %, y %, tamaño] */
window.DATOS = window.DATOS || {};
DATOS.niveles = DATOS.niveles || {};

DATOS.niveles["arma-robot"] = [
  { goal: "🏁", on: 1, end: "🎉 ¡GANÉ!", steps: [
    ["ruedas", "➡️ NECESITO LLEGAR A LA META", "necesito llegar a la meta"],
    ["parlante", "💬 QUIERO GRITAR QUE GANÉ", "quiero gritar que gané"]
  ] },
  { goal: "🔑", on: 1, hide: 1, steps: [
    ["camara", "👀 PERDÍ MIS LLAVES, NECESITO VERLAS", "perdí mis llaves, necesito verlas"],
    ["ruedas", "➡️ NECESITO IR HASTA LAS LLAVES", "necesito ir hasta las llaves"],
    ["brazo", "✋ NECESITO AGARRAR LAS LLAVES", "necesito agarrar las llaves"]
  ] },
  { goal: "📻", dance: 1, steps: [
    ["bateria", "⚡ NO TENGO ENERGÍA", "no tengo energía"],
    ["microfono", "👂 NECESITO ESCUCHAR LA MÚSICA", "necesito escuchar la música"],
    ["ruedas", "💃 QUIERO IR A BAILAR", "quiero ir a bailar"]
  ] },
  { goal: "🏠", on: 1, night: 1, steps: [
    ["luz", "🌙 ESTÁ OSCURO, NECESITO LUZ", "está oscuro, necesito luz"],
    ["antena", "📩 NECESITO RECIBIR EL MENSAJE CON EL CAMINO", "necesito recibir el mensaje con el camino"],
    ["ruedas", "🏠 NECESITO VOLVER A CASA", "necesito volver a casa"]
  ] },
  { goal: "🧸", hide: 1, end: "🧸 ¡LO ENCONTRÉ!", steps: [
    ["bateria", "⚡ NECESITO ENERGÍA", "necesito energía"],
    ["camara", "👀 NECESITO ENCONTRAR EL OSITO", "necesito encontrar el osito"],
    ["ruedas", "➡️ NECESITO IR HASTA EL OSITO", "necesito ir hasta el osito"],
    ["brazo", "✋ NECESITO AGARRAR EL OSITO", "necesito agarrar el osito"],
    ["parlante", "💬 QUIERO AVISAR QUE LO ENCONTRÉ", "quiero avisar que lo encontré"]
  ] },
  { goal: "🍎", gb: 64, decor: [["🌳", 76, 20, 3.4]], steps: [
    ["bateria", "⚡ NO TENGO ENERGÍA", "no tengo energía"],
    ["ruedas", "➡️ NECESITO IR HASTA EL ÁRBOL", "necesito ir hasta el árbol"],
    ["helice", "🍎 LA MANZANA ESTÁ MUY ALTA, NECESITO VOLAR", "la manzana está muy alta, necesito volar"],
    ["brazo", "✋ NECESITO AGARRAR LA MANZANA", "necesito agarrar la manzana"]
  ] },
  { goal: "🔩🔩🔩", on: 1, hide: 1, small: 1, end: "🔩 ¡LOS JUNTÉ TODOS!", steps: [
    ["camara", "👀 SE ME CAYERON LOS TORNILLOS, NECESITO VERLOS", "se me cayeron los tornillos, necesito verlos"],
    ["ruedas", "➡️ NECESITO IR HASTA LOS TORNILLOS", "necesito ir hasta los tornillos"],
    ["iman", "🧲 SON MUY CHIQUITOS, NECESITO ATRAERLOS", "son muy chiquitos, necesito atraerlos"],
    ["parlante", "💬 QUIERO AVISAR QUE LOS JUNTÉ", "quiero avisar que los junté"]
  ] },
  { goal: "🏠", cold: 1, end: "🧥 ¡A ABRIGARSE!", steps: [
    ["bateria", "⚡ NECESITO ENERGÍA", "necesito energía"],
    ["termometro", "🌡️ NECESITO SABER SI HACE FRÍO", "necesito saber si hace frío"],
    ["piernas", "🪜 HAY ESCALONES HASTA LA CASA, NECESITO PIERNAS", "hay escalones hasta la casa, necesito piernas"],
    ["parlante", "💬 QUIERO AVISAR QUE HACE FRÍO", "quiero avisar que hace frío"]
  ] },
  { goal: "🎂", night: 1, hide: 1, end: "🎉 ¡FELIZ CUMPLE!", steps: [
    ["bateria", "⚡ NO TENGO ENERGÍA", "no tengo energía"],
    ["luz", "🌙 ESTÁ OSCURO, NECESITO LUZ", "está oscuro, necesito luz"],
    ["camara", "👀 NECESITO ENCONTRAR LA TORTA", "necesito encontrar la torta"],
    ["ruedas", "➡️ NECESITO IR HASTA LA TORTA", "necesito ir hasta la torta"],
    ["brazo", "✋ NECESITO LLEVAR LA TORTA", "necesito llevar la torta"],
    ["microfono", "👂 ¿YA EMPEZARON A CANTAR?", "ya empezaron a cantar?"],
    ["parlante", "💬 QUIERO CANTAR EL FELIZ CUMPLE", "quiero cantar el feliz cumple"]
  ] },
  { goal: "🐱", gb: 66, decor: [["🏠", 74, 20, 3.6]], end: "🐱 ¡LO RESCATÉ!", steps: [
    ["bateria", "⚡ NECESITO ENERGÍA", "necesito energía"],
    ["antena", "📩 NECESITO RECIBIR EL PEDIDO DE AYUDA", "necesito recibir el pedido de ayuda"],
    ["ruedas", "➡️ NECESITO IR HASTA LA CASA", "necesito ir hasta la casa"],
    ["helice", "🐱 EL GATITO ESTÁ EN EL TECHO, NECESITO VOLAR", "el gatito está en el techo, necesito volar"],
    ["brazo", "✋ NECESITO AGARRAR AL GATITO CON CUIDADO", "necesito agarrar al gatito con cuidado"],
    ["parlante", "💬 QUIERO AVISAR QUE LO RESCATÉ", "quiero avisar que lo rescaté"]
  ] }
];
