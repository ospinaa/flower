# Fotos

Estas son fotos de marcador de posición (gradientes con un texto) para que
puedas ver la experiencia funcionando de inmediato.

## Cómo poner tus fotos reales

1. Borra los archivos `01.jpg` a `08.jpg` de esta carpeta.
2. Copia aquí tus fotografías reales (`.jpg`, `.jpeg`, `.png` o `.webp`).
3. Nómbralas con un prefijo numérico (`01.jpg`, `02.jpg`, `03.jpg`...) para
   controlar el orden en que se asignan a cada composición. El orden es
   alfabético.
4. No necesitas tocar ningún archivo de código: `usePhotoPool.ts` las carga
   automáticamente.

## Recomendaciones para que se sienta premium y rápido en móvil

- Comprime cada foto a menos de ~300–400 KB (herramientas como Squoosh,
  TinyPNG o el propio Photoshop "Guardar para web" funcionan bien).
- Usa resoluciones razonables: 1200–1600 px en el lado más largo es más que
  suficiente para cómo se muestran aquí (nunca ocupan toda la pantalla).
- Mezcla fotos verticales y horizontales: la composición en
  `src/data/sections.ts` ya está pensada para ambas proporciones.

## Cómo se reparten las fotos en cada sección

Cada sección en `src/data/sections.ts` tiene un arreglo `photos`, y cada foto
tiene un `poolIndex` (0, 1, 2...). Ese número es la posición de la foto dentro
de esta carpeta (ordenada alfabéticamente), y se ajusta automáticamente si
agregas más o menos fotos de las que hay ahora.
