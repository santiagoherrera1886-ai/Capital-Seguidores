# Capital Social Intelligence — Benchmark 2026

Dashboard interactivo y pedagógico de benchmarking de redes sociales para **Constructora Capital**.

## Qué incluye

- Panorama e insights con filtros por **Bogotá / Medellín** e **Instagram / Facebook / TikTok**.
- Comparativo de frecuencia, interacciones por publicación y comunidades entre Capital y las constructoras incluidas en el archivo original.
- Ranking, matriz de desempeño y Q-Index, con advertencias sobre comparabilidad y alcance de los datos.
- **Galería comparativa de publicaciones reales** con tres vistas: **La competencia / Solo Capital / Todas las marcas**; selector de constructora y acceso a los cinco posts destacados de cada marca.
- Miniaturas **del HTML original**, recuperadas para Capital y sus competidores (112 de 115 posts tienen imagen en la fuente); enlace al post original, interacciones, fecha y extracto del contenido.
- Acceso desde la ficha de cada constructora en el plano de desempeño a sus publicaciones.
- Interpretaciones prácticas, recomendaciones de contenido y exportación CSV.
- Fuente y metodología visibles; sin confundir interacciones con ventas o leads.

**No incluye simulador de publicaciones**, retirado a solicitud del usuario.

## Fuente y cobertura

Importado del HTML adjuntado por el usuario (`dashboard_capital (1) 2.html`). La fuente indicada en el documento es Fanpage Karma, con periodo **1 de enero a 8 de octubre de 2026**.

- 23 registros de marca/red social; 6 combinaciones de ciudad/plataforma para la comparación.
- 115 publicaciones destacadas (cinco por registro) y **112 imágenes originales** disponibles.
- Tres publicaciones de Marval carecen de imagen en la fuente: se presenta una tarjeta informativa en vez de inventar una miniatura.
- Capital se compara tanto en Bogotá como Medellín sin duplicar o sumar sus cifras entre ciudades.
- Octubre está incompleto. El número de seguidores es una fotografía del momento de extracción.

## Estructura y funcionamiento

- `index.html`: diseño, menús, filtros, indicadores, gráficos, enlaces y exportación.
- `data.js`: métricas y publicaciones del benchmark; conserva las miniaturas de Capital.
- `gallery.js`: filtros y renderizado de la galería comparativa, además de carga diferida de fotos.
- `gallery.css`: diseño editorial responsive de la galería.
- `media/posts-facebook.json`, `media/posts-instagram.json`, `media/posts-tiktok.json`: imágenes recuperadas del HTML, distribuidas por plataforma para cargar solo las necesarias.

La aplicación es estática. No necesita Node, bases de datos ni variables de entorno. Los datos **no se actualizan automáticamente**: corresponden al corte indicado.

## Vercel

Conecta el repositorio `santiagoherrera1886-ai/Capital-Seguidores` al proyecto `capital-seguidores` en tu equipo de Vercel, con rama de producción `main`, preset **Other**, directorio raíz `./` y build command vacío. Si la integración de GitHub está activa, los commits nuevos en `main` generan despliegues automáticamente.

© 2026. Herramienta de análisis para planeación de marketing digital. Las interacciones no garantizan leads ni ventas.
