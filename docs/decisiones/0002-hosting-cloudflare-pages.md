# 0002 — Publicar el sitio en Cloudflare Pages como exportación estática

- Estado: Aceptada
- Fecha: 2026-10-20

## Contexto

La landing no tiene partes de servidor: todas sus rutas se prerenderizan. Se
necesita un hosting gratuito, apto para una organización (no solo uso personal),
con HTTPS, vistas previas por rama y margen de tráfico para videos propios.

## Opciones evaluadas

| Opción | A favor | En contra |
|---|---|---|
| **Cloudflare Pages** | Gratis sin vencimiento; tráfico ilimitado; uso por organizaciones permitido; vistas previas por rama | Requiere exportación estática (sin optimizador de imágenes de Next.js) |
| Vercel (Hobby) | Soporte nativo de Next.js sin cambios | Plan gratuito limitado a uso personal no comercial; cupos de tráfico e imágenes |
| Azure Static Web Apps (Free) | Prevista en la planificación inicial | Configuración más compleja; mismo requisito de exportación estática |
| Netlify (Free) | Fácil de usar | Plan por créditos; el sitio se pausa si se agotan |
| GitHub Pages | Mismo lugar que el repositorio | Sin vistas previas por rama; despliegue más manual |

Los cupos de cada plan cambian; se verificaron de forma general a la fecha.

## Decisión

Exportar el sitio como HTML estático (`output: "export"`) y publicarlo en
Cloudflare Pages desde GitHub: `main` como producción y las demás ramas como
vistas previas.

## Consecuencias

- Las fotos deben ir en Cloudinary; las de `/public` se servirían sin optimizar.
- Los logos se publican como WebP ya reducidos (`public/brand/*.webp`).
- Funciones que requieran servidor (formulario de contacto con envío propio,
  Instagram API con token) necesitarán un servicio externo o Cloudflare Workers.
- `next start` deja de usarse; la exportación se revisa con un servidor estático.
- El sitio no depende de Cloudflare: `out/` puede publicarse en cualquier
  hosting estático.
