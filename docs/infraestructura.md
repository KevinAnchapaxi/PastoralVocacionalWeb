# Infraestructura — PastoralVocacionalWeb

Última actualización: 2026-10-20

## Estado actual

| Componente | Estado | Detalle |
|---|---|---|
| Repositorio | Activo | GitHub: `KevinAnchapaxi/CloudinaryPastoralVocacionalWeb` |
| Imágenes | Activo | Cloudinary, plan gratuito, cloud name `lywalzfq`, carpetas dinámicas |
| Hosting del sitio | **Pendiente** | La planificación inicial menciona Azure Static Web Apps como opción |
| Dominio y DNS | **Pendiente** | — |
| CI/CD | **Pendiente** | Hoy lint, pruebas y build se ejecutan a mano |
| Instagram | Preparado | Embeds oficiales; falta la cuenta y las publicaciones (`src/data/instagram.ts`) |
| Videos | Pendiente | YouTube o archivos en `public/video/` (ver guía de usuario) |
| Base de datos, correo, analítica | No aplica | Fuera de alcance en esta fase |

## Repositorio y ramas

| Rama | Uso |
|---|---|
| `main` | Versión estable. No se trabaja directamente sobre ella. |
| `DEV_KA` | Rama de desarrollo. Los cambios llegan a `main` mediante pull request. |

Antes de abrir un pull request deben pasar:

```powershell
npm run lint
npm test
npm run build
```

## Entorno local

- Node.js 24 LTS (versión exacta en `.nvmrc`), seleccionada con NVM para Windows.
- npm 11 o posterior.
- Dependencias instaladas con `npm ci` para respetar `package-lock.json`.
- Variables en `.env.local` (no se versiona), a partir de `.env.example`.

## Cloudinary

### Para qué se usa

Almacenar y entregar por CDN las fotos de contenido (portada, galería, equipo,
secciones). Cloudinary redimensiona y convierte cada foto (WebP/AVIF) en el
momento de la primera solicitud y la guarda en caché.

### Cuenta

1. Crear la cuenta en <https://cloudinary.com> con un correo institucional de la
   pastoral (no personal), para que la cuenta no dependa de una persona.
2. Anotar el **Cloud name** que aparece en el panel principal (Dashboard).
   La cuenta actual es `lywalzfq`. No es un secreto: aparece en todas las URLs
   de las imágenes.
3. Crear la carpeta raíz `pastoral-vocacional` en *Media Library* con
   subcarpetas por sección: `portada`, `testimonios`, `equipo`.

   La cuenta usa **carpetas dinámicas**: la carpeta donde se guarda una foto
   solo organiza la Media Library y puede no formar parte de su ID público ni
   de su URL. Por eso en `src/data/landing.ts` se pega siempre la **URL
   completa** copiada desde Cloudinary, que funciona sin depender de la
   carpeta. Mover una foto de carpeta no rompe su URL; renombrarla o borrarla,
   sí.
4. Invitar como usuarios a quienes subirán fotos (*Settings → Users*), con rol
   de solo medios cuando sea posible.
5. Configurar alertas de consumo en *Settings → Account* para recibir aviso
   antes de agotar el cupo mensual.

No se necesitan la **API Key** ni el **API Secret**: el sitio solo lee
imágenes públicas. **Nunca** deben guardarse en el repositorio ni en variables
`NEXT_PUBLIC_*`.

### Cupo del plan gratuito

A la fecha de este documento, el plan gratuito ofrece **25 créditos al mes**,
donde 1 crédito equivale a 1 GB de almacenamiento, 1 GB de tráfico o 1000
transformaciones. Verificar los valores vigentes en la página de precios de
Cloudinary.

Estimación para esta landing (10–12 fotos por visita, ~1,5 MB optimizados):

| Concepto | Supuesto | Créditos/mes |
|---|---|---|
| Almacenamiento | 300 fotos × ~500 KB | ~0,2 |
| Transformaciones | Pocas variantes por foto, generadas una sola vez | ~1 |
| Tráfico | ~1,5 MB por visita sin caché | ~23 disponibles → **~15 000 visitas/mes** |

Las visitas repetidas usan la caché del navegador, por lo que la capacidad real
es mayor. Si el tráfico supera el cupo de forma sostenida, la alternativa es
Cloudflare R2 (sin costo de salida); el cambio se limita a
`src/lib/cloudinary.ts`.

### Variables de entorno

| Variable | Dónde configurarla | Valor |
|---|---|---|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `.env.local` en local; configuración del hosting en producción | Cloud name de la cuenta |

Al ser `NEXT_PUBLIC_*`, se incrusta en la compilación: si cambia, hay que volver
a compilar y publicar.

## Servicios de terceros en la página

| Servicio | Cuándo se carga | Qué implica |
|---|---|---|
| Instagram (`www.instagram.com/embed.js`) | Solo si hay publicaciones configuradas y el visitante llega cerca de la sección | Meta puede colocar cookies y registrar la visita |
| YouTube (`youtube-nocookie.com`) | Solo si un video usa un enlace de YouTube | Modo de privacidad mejorada: sin cookies hasta que se reproduce |

Antes de publicar con Instagram o YouTube activos, revisar con la Arquidiócesis
si hace falta un aviso de privacidad o de cookies conforme a la Ley Orgánica de
Protección de Datos Personales del Ecuador.

## Videos

- Para videos con voz (testimonios), preferir **YouTube**: aporta subtítulos y no
  consume tráfico propio.
- Si se usan archivos propios en `public/video/`: MP4 H.264, 16:9, menos de
  10 MB. Cada reproducción cuenta como tráfico del hosting.
- No subir videos a Cloudinary con el plan gratuito: un video consume el cupo
  mensual mucho más rápido que las fotos (ver «Cupo del plan gratuito»).

## Requisitos para el hosting (cuando se defina)

- Servir los archivos generados por `next build`. Todas las rutas son estáticas.
- Definir `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` en el entorno de compilación si se
  usan IDs públicos.
- Si se elige un hosting solo estático (p. ej. Azure Static Web Apps en modo
  estático), activar `output: "export"` en `next.config.ts`. Las fotos de
  Cloudinary no se ven afectadas; los logos de `/public` necesitarían
  `images.unoptimized: true` o un loader propio, porque la exportación estática
  no incluye el optimizador de Next.js.
- Publicar automáticamente desde `main` y generar entornos de vista previa desde
  `DEV_KA` o desde cada pull request.
