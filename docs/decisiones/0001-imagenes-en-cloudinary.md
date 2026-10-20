# 0001 — Alojar las fotos de contenido en Cloudinary

- Estado: Aceptada
- Fecha: 2026-10-20

## Contexto

Las fotos de la landing (portada, galería, equipo) cambian con frecuencia. Si
se guardan en `public/`, cada cambio exige un commit y una nueva publicación, el
repositorio crece con archivos binarios y la optimización depende del hosting.
El tráfico esperado es bajo (cientos a pocos miles de visitas al mes) y el
presupuesto es mínimo.

## Opciones evaluadas

| Opción | A favor | En contra |
|---|---|---|
| `public/` en el repositorio | Sin servicios externos | Publicar por cada foto; repositorio pesado |
| **Cloudinary** | Consola web para personas no técnicas; redimensiona y convierte a WebP/AVIF; CDN; plan gratuito suficiente | Plan pagado caro si el tráfico crece mucho |
| Cloudflare R2 | Sin costo de salida; 10 GB gratis | Sin consola amigable ni transformaciones incluidas |
| Vercel Blob | Integración directa con Vercel | Ata el proyecto a Vercel; cupo gratuito pequeño |

## Decisión

Usar Cloudinary para las fotos de contenido mediante un loader de `next/image`
(`src/lib/cloudinary.ts`) aplicado por `ContentImage`. Los logos oficiales
permanecen en `public/brand/`.

Se aceptan URLs copiadas desde la consola de Cloudinary, para que el equipo de
la pastoral no tenga que conocer IDs públicos ni configuración, y también IDs
públicos para uso técnico.

## Consecuencias

- Cambiar una foto requiere editar una URL en `src/data/landing.ts`, no subir
  archivos al repositorio. Con un CMS futuro, ni siquiera eso.
- Cloudinary optimiza; Next.js no reprocesa esas imágenes. El sitio sigue
  siendo compatible con exportación estática.
- Dependencia de un proveedor externo, acotada a un archivo: migrar a otro
  servicio implica reescribir `cloudinaryLoader` y las URLs.
- Hay que vigilar el consumo mensual (alertas de Cloudinary).
