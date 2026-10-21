# Infraestructura — PastoralVocacionalWeb

Última actualización: 2026-10-20

## Estado actual

| Componente | Estado | Detalle |
|---|---|---|
| Repositorio | Activo | GitHub: `KevinAnchapaxi/CloudinaryPastoralVocacionalWeb` |
| Imágenes | Activo | Cloudinary, plan gratuito, cloud name `lywalzfq`, carpetas dinámicas |
| Hosting del sitio | **En configuración** | Cloudflare Workers con recursos estáticos, plan gratuito (ver «Hosting») |
| Dominio y DNS | **Pendiente** | Mientras tanto, subdominio gratuito `*.workers.dev` |
| CI/CD | **Parcial** | Cloudflare compila y publica en cada push; lint y pruebas se ejecutan a mano |
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
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `.env.production` (versionado) para las compilaciones; `.env.local` para valores propios en local | Cloud name de la cuenta (`lywalzfq`) |

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

## Hosting: Cloudflare Workers (sitio estático)

Decisión documentada en
[decisiones/0002-hosting-cloudflare.md](decisiones/0002-hosting-cloudflare.md).
Se usa Workers con recursos estáticos (*static assets*), que es el flujo que
Cloudflare ofrece para proyectos nuevos. Las solicitudes a archivos estáticos son
gratuitas y no consumen el cupo de solicitudes del plan gratuito.

### Cómo está preparado el proyecto

- `next.config.ts` usa `output: "export"`: `npm run build` genera el sitio
  completo en `out/` (HTML, CSS, JS e imágenes), sin servidor.
- Sin servidor no existe el optimizador de imágenes de Next.js:
  - las fotos se sirven desde Cloudinary con su loader (`src/lib/cloudinary.ts`);
  - los logos usan versiones WebP ya reducidas en `public/brand/*.webp`
    (los PNG originales se conservan como fuente);
  - una foto en `/public` se publicaría tal cual, sin redimensionar: por eso
    las fotos van en Cloudinary.
- `public/_headers` define cabeceras de seguridad y la caché de un año para
  `/_next/static/*` (archivos con hash en el nombre).
- `wrangler.jsonc` hace que Wrangler ejecute `npm run build` (`build.command`)
  antes de publicar la carpeta `out/`, y que las rutas inexistentes muestren
  `404.html`. Así funcionan los comandos por defecto de Cloudflare sin configurar
  nada en el panel. Su campo `name` debe coincidir con el nombre del Worker
  (hoy `pastoralvocacionalweb`).
- `.env.production` (versionado) fija `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`; es un
  dato público, no un secreto.
- La versión de Node se toma de `.nvmrc`.

### Crear el proyecto (una sola vez)

1. **Llevar el código a `main`.** Si `main` no tiene el código, Cloudflare clona
   una rama sin `package.json`, no compila nada y Wrangler falla con «Could not
   detect a directory containing static files». Abrir en GitHub un pull request
   `DEV_KA → main` y fusionarlo.
2. Crear una cuenta gratuita en <https://dash.cloudflare.com>, idealmente con el
   correo institucional de la pastoral.
3. **Workers & Pages → Create → Import a repository**, autorizar GitHub y
   elegir `KevinAnchapaxi/PastoralVocacionalWeb`.
4. Dejar la configuración de compilación por defecto
   (**Settings → Build → Build configuration**): la compilación la ejecuta
   Wrangler.

   | Campo | Valor |
   |---|---|
   | Build command | vacío (si se pone `npm run build`, compila dos veces; funciona igual) |
   | Deploy command | `npx wrangler deploy` |
   | Non-production branch deploy command | `npx wrangler versions upload` |
   | Root directory | `/` (vacío) |

5. **Settings → Build → Branch control**: rama de producción `main` y, para
   tener vistas previas de `DEV_KA`, activar las compilaciones de otras ramas.
6. Solo si la compilación falla por la versión de Node: en
   **Settings → Build → Variables and secrets**, `NODE_VERSION` = `24.21.0`.
7. Lanzar la compilación (**Deployments → Retry/Deploy**, o con un push). La web
   queda en `https://pastoralvocacionalweb.<subdominio>.workers.dev`.

### Ramas y vistas previas

| Rama | Resultado |
|---|---|
| `main` | Producción (`npx wrangler deploy`) |
| `DEV_KA` y demás ramas | Versión de vista previa (`npx wrangler versions upload`); su enlace aparece en el registro de la compilación |

Las vistas previas requieren **Settings → Domains & Routes → Preview URLs**
activado. Son públicas para quien tenga el enlace.

### Dominio propio (opcional)

**Settings → Domains & Routes → Add → Custom domain**. Para Workers, el dominio
debe estar gestionado en la misma cuenta de Cloudflare (sus DNS apuntando a
Cloudflare). El certificado HTTPS es gratuito y automático.

### Errores frecuentes

| Mensaje en el registro | Causa | Solución |
|---|---|---|
| `Could not detect a directory containing static files` | Se clonó una rama sin código (sin `package.json` ni `wrangler.jsonc`) | Fusionar el código en `main` |
| La compilación falla en 0 s sin registro | Configuración del Worker en el panel (p. ej. compilaciones de otras ramas desactivadas) | Revisar el registro en **Deployments**; activar las compilaciones de otras ramas |
| El nombre del Worker no coincide con la configuración | `name` de `wrangler.jsonc` distinto al del panel | Igualar `name` al nombre del Worker |
| Versión de Node incompatible | La imagen de compilación no tomó `.nvmrc` | Variable `NODE_VERSION` = `24.21.0` |

### Revisar la exportación en local

```powershell
npm run build
npx serve out     # http://localhost:3000, igual que en Cloudflare
```

`next start` no se usa: no funciona con `output: "export"`.
