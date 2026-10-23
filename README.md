# Tecnología en Primero

13 juegos para Jardín, 1.º y 2.º grado (Tecnologías, Diseño y Programación, DC CABA).

- Jugar: https://lucapolti-docente.github.io/tecnologia-1/ (o doble clic en `index.html`, funciona sin internet salvo las fuentes)
- Docentes: `docentes/index.html` y la guía `docentes/guia-docente.pdf`

## Cómo está armado

```
index.html          ← carga todo, en orden
comun/              ← núcleo compartido: menú, niveles, estrellas, victoria, sonido, voz
datos/              ← TODO lo que se puede cambiar sin programar
  textos.js         ← cada texto que se ve en pantalla
  personajes.js     ← dibujos (emojis), piezas y objetos con su nombre
  fondos.js         ← colores y escenarios
  niveles/<juego>.js
juegos/<juego>/     ← juego.js (cómo se juega) + estilos.css
docentes/           ← página para docentes y guía en PDF
```

**Regla de oro:** para cambiar una palabra, un nivel o un personaje, tocá **solo `datos/`**.
Después de guardar, recargá la página con **Ctrl + F5**.

Los archivos de `datos/` se pueden abrir con el Bloc de notas. Cuidá las comillas `"`, las comas `,`
y los corchetes `[ ]`: si falta uno, el juego no arranca (se arregla volviendo a ponerlo).

## Cambiar un texto

Todo está en `datos/textos.js`. Por ejemplo, para cambiar el título del inicio:

```js
titulo: "TECNOLOGÍA EN 1.º",      // antes
titulo: "TECNOLOGÍA EN 2.º A",    // después
```

Para cambiar el nombre de un juego, buscá `juegos:` en el mismo archivo.
Los nombres de piezas, objetos y personajes (PAPEL, BATERÍA, PINGÜINO…) están en `datos/personajes.js`.
Si un texto tiene `{n}` o `{x}`, dejalos: ahí va un número o una palabra.

## Sumar un nivel

Cada juego tiene su archivo en `datos/niveles/`, con una explicación arriba de qué significa cada dato.
El nivel se suma en el lugar de la lista donde quieras que aparezca. Ejemplos:

**Escribir** (`datos/niveles/escribir.js`): agregá una frase.
```js
  "EL ROBOT ES AZUL",
  "MI ESCUELA TIENE COMPUS",       // nivel nuevo
  "HOY APRENDO TECNOLOGÍA"
```

**Robot** (`datos/niveles/robot.js`): grilla de 4 filas × 5 columnas, robot arriba a la izquierda,
estrella abajo a la derecha y dos obstáculos 🧱 (fila y columna se cuentan desde 0):
```js
  { r: 4, c: 5, s: [0, 0], g: [3, 4], k: [[1, 1], [2, 3]] },
```

**¿Qué necesito?** (`datos/niveles/que-necesito.js`): sumá una situación a un nivel.
```js
  ["🎂", "AVISARLE A MI TÍA QUE HAY TORTA", "📞", "com"],
```

La barra de puntitos y el menú ☰ se actualizan solos con la cantidad de niveles.

## Sumar o cambiar un personaje u objeto

En `datos/personajes.js`. Por ejemplo, un residuo más para el contenedor de papel:
```js
pap: { n: "PAPEL", i: "📄", c: "#2F80ED", it: ["📰", "✉️", "📄", "📦"] },
```
Usá personajes inventados: nada de dibujitos, marcas ni memes.

## Sumar un juego nuevo

1. Copiá una carpeta parecida, por ejemplo `juegos/iconos/`, como `juegos/mi-juego/`.
2. En `juegos/mi-juego/juego.js` escribí la función que arma la pantalla en `stage` y llama a `win()` al ganar.
   Terminá el archivo con:
   ```js
   registrar("mi-juego", { iniciar: miJuego, niveles: () => NIVELES["mi-juego"], libre: false });
   ```
   (`libre: true` si tiene modo libre: dentro de la función, `lvl === "free"`.)
3. Creá `datos/niveles/mi-juego.js`:
   ```js
   window.DATOS = window.DATOS || {};
   DATOS.niveles = DATOS.niveles || {};
   DATOS.niveles["mi-juego"] = [ /* un elemento por nivel */ ];
   ```
4. Agregá el nombre en `datos/textos.js → juegos`, el ícono en `datos/personajes.js → iconosJuegos`
   y el color en `datos/fondos.js → juegos`.
5. En `index.html`, sumá tres líneas en el lugar que quieras que aparezca su ficha
   (el orden de los scripts es el orden en el inicio):
   ```html
   <link rel="stylesheet" href="juegos/mi-juego/estilos.css">
   <script src="datos/niveles/mi-juego.js"></script>
   <script src="juegos/mi-juego/juego.js"></script>
   ```

Herramientas del núcleo para usar en un juego: `area()` (espacio disponible), `shuffle()`, `later(fn, ms)`,
`good()` / `bad()` / `beep()` (sonidos), `shakeEl(el)` (error amable), `sayQuiet(texto)` (voz), `win()`,
`pista(el)` (hace titilar la respuesta tras dos errores) y `alCambiarTamano(fn)` (recalcula tamaños si se achica la ventana, sin reiniciar el juego).

### Juegos guardados sin activar: Luz y Ordenar

`juegos/luz/` (armar circuitos con cables) y `juegos/orden/` (primero, después, al final) existían en la versión
original pero no se podían abrir. Están arreglados y probados. Para activarlos, sumá en `index.html`:

```html
<link rel="stylesheet" href="juegos/luz/estilos.css">
<script src="datos/niveles/luz.js"></script>
<script src="juegos/luz/juego.js"></script>
<script src="datos/niveles/orden.js"></script>
<script src="juegos/orden/juego.js"></script>
```

Ojo: un juego activado cuenta para el premio 🎁 (hay que completarlo también).

## Reglas técnicas

- Solo archivos estáticos: sin compilar, sin npm, sin servidor. Funciona con doble clic y en GitHub Pages.
- Scripts clásicos `<script src>`; los datos son archivos `.js` que llenan `window.DATOS`.
- Pensado para Chrome viejo de las compus escolares.
- Las estrellas se guardan en el navegador (`localStorage`, clave `tec1-estrellas`). No se guardan datos de los chicos.

## Guía docente en PDF

La fuente es `docentes/guia-docente.html`. Para regenerar el PDF: abrila en Chrome → Imprimir →
Destino "Guardar como PDF", tamaño A4, márgenes predeterminados y "Gráficos de fondo" activado →
guardala como `docentes/guia-docente.pdf`.

`original/tecnologia-1.html` es la versión de un solo archivo de la que salió este proyecto (referencia).
