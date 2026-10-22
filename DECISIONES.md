# Decisiones

fecha · tema · opciones · elegida · por qué

- 2026-10-22 · Luz y Ordenar · borrar / dejar como estaban / arreglar sin activar · arreglar sin activar · en el original no se podían abrir; así el inicio queda idéntico y no se pierde código.
- 2026-10-22 · Nombres de juegos · claves viejas (reci, robo, tycom…) / nombres legibles · legibles · se entienden al editar `datos/`; las estrellas guardadas con nombres viejos se migran solas (`comun/estrellas.js`).
- 2026-10-22 · Dónde viven los datos de cada juego · constantes en el código / `window.DATOS` · `DATOS` · regla de CLAUDE.md; cada juego lee `NIVELES.x`, `PERS.x`, `FONDOS.x`, `TEXTOS.x` al principio de su archivo.
- 2026-10-22 · Dibujos SVG en datos · código que los genera / texto SVG fijo · texto fijo en `personajes.dibujos`, referido como `"dibujo:nombre"` · el docente puede cambiarlos sin tocar lógica; se calculó una vez desde el código original.
- 2026-10-22 · CSS · un archivo / común + uno por juego · común + uno por juego · mismo orden de cascada; las capturas dieron idénticas al original.
- 2026-10-22 · Botón "6 7" del premio · sacar / dejar · dejar por ahora · se pidió no perder nada; es un meme y CLAUDE.md pide evitarlos: queda para decidir (texto en `textos.js → premio.boton67`).
- 2026-10-22 · Guía PDF · generador con npm / HTML que se imprime · HTML que se imprime · se regenera desde Chrome sin herramientas.
