# Capital Social Intelligence — Benchmark 2026

Dashboard interactivo de benchmarking de redes sociales para **Constructora Capital**.

## Sitio
Aplicación estática: abre `index.html` o despliega el directorio raíz en Vercel. No necesita Node, variables de entorno ni base de datos.

## Contenido
- Panorama de resultados con filtros por Bogotá / Medellín e Instagram / Facebook / TikTok.
- Comparativo de frecuencia e interacciones por publicación frente a constructoras.
- Ranking por interacciones, frecuencia, seguidores y Q-Index.
- Q-Index con presencia, profundidad y cobertura, incluyendo advertencias de comparabilidad.
- Galería de cinco publicaciones destacadas de Capital por red, con miniaturas originales y enlaces.
- Interpretaciones e hipótesis accionables para un lector sin experiencia técnica.
- Simulador aritmético de publicaciones mensuales, explícitamente no predictivo.
- Datos y exportación CSV.

## Fuente
Importado del HTML de benchmarking adjuntado por el usuario (`dashboard_capital (1) 2.html`). Fuentes indicadas en el original: Fanpage Karma; periodo **1 de enero a 8 de octubre de 2026**. Se conservan los 23 registros, 6 grupos, reglas originales del Q-Index, los posts destacados y las imágenes de Capital. Para mantener el peso del sitio razonable se omiten únicamente las miniaturas embebidas de *otras constructoras*. Todas las métricas y enlaces de publicaciones del archivo original siguen en `data.js`.

El archivo original repite las cifras de Capital en Bogotá y Medellín; la aplicación **no las suma**. Seguidores son una fotografía del momento de extracción; octubre es parcial. Los ingresos, leads y ventas no están en esta base.

## Diseño
Inspirado en una experiencia editorial con navegación lateral, tarjetas pedagógicas, visualizaciones interactivas y fotografía de proyectos de Constructora Capital. No es una copia de la web corporativa ni del sitio EAN.

## Despliegue Vercel
1. Conecta `santiagoherrera1886-ai/Capital-Seguidores` a `capital-seguidores` en la cuenta/equipo de Vercel correspondiente.
2. Framework preset: **Other**; root directory: `./`; build command: vacío.
3. El directorio raíz contiene `index.html` y `data.js`. Despliega la rama `main`.
4. Las futuras actualizaciones a `main` publicarán automáticamente cuando la integración de GitHub ↔ Vercel esté activa.

## Estructura
- `index.html`: diseño, navegación, filtros, indicadores, gráficos y exportación.
- `data.js`: datos observados extraídos del HTML. No son datos en tiempo real.

© 2026. Herramienta analítica ilustrativa para trabajo estratégico.
