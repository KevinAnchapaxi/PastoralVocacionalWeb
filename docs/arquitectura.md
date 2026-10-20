# Arquitectura — PastoralVocacionalWeb

Última actualización: 2026-10-20

## Resumen

Sitio público de una sola página (landing) para la Pastoral Vocacional de la
Arquidiócesis de Quito. Es un **monolito modular en Next.js** que se compila a
**HTML estático**: no tiene base de datos, API propia, autenticación ni CMS.
Las fotos de contenido se alojan en **Cloudinary**; los logos oficiales viajan
con el código en `public/brand/`.

```text
                     ┌─────────────────────────────┐
  Visitante ───────▶ │ Hosting del sitio (pendiente)│  HTML/CSS/JS estático
      │              └─────────────────────────────┘  generado por `next build`
      │
      └────────────▶ ┌─────────────────────────────┐
                     │ Cloudinary (CDN de imágenes) │  fotos redimensionadas,
                     └─────────────────────────────┘  en WebP/AVIF
                                    ▲
  Equipo de la pastoral ── sube fotos por la consola web de Cloudinary
```

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, CSS Modules, variables CSS (`src/styles/tokens.css`), Tailwind CSS 4 |
| Lenguaje | TypeScript en modo estricto, alias `@/*` → `src/*` |
| Fuentes | `next/font/google` (Poppins, Cormorant Garamond), autoalojadas en la compilación |
| Imágenes | `next/image` + loader de Cloudinary para fotos; optimizador de Next.js para `/public` |
| Calidad | ESLint (`eslint-config-next`), Vitest + Testing Library (jsdom) |
| Runtime | Node.js 24 LTS, npm 11 |

## Estructura del código

```text
src/
├── app/
│   ├── layout.tsx            fuentes, metadatos, <html lang="es">
│   ├── page.tsx              compone las secciones de la landing
│   └── globals.css           estilos base e import de tokens
├── components/
│   ├── landing/              una sección por archivo (ver «Secciones»)
│   │   ├── ui.tsx            Button, SectionHeading, Photo, Video, Wave
│   │   ├── ContentImage.tsx  next/image con selección automática de loader
│   │   ├── InstagramEmbeds.tsx  embeds oficiales con carga diferida del script
│   │   ├── Icon.tsx          iconos de línea
│   │   └── landing.module.css
│   └── layout/               cabecera y pie genéricos
├── data/
│   ├── landing.ts            textos generales, portada, ¿Qué es?, ¿Para qué?, equipo, contacto
│   ├── testimonios.ts        video y testimonios escritos
│   ├── instagram.ts          cuenta y publicaciones a mostrar
│   └── areas-pastorales.ts   otras áreas de la Arquidiócesis
├── lib/cloudinary.ts         detección de fotos de Cloudinary y construcción de URLs
├── styles/tokens.css         colores, espaciado y radios del Manual de Marca
└── test/                     pruebas de Vitest
```

`pv-next-landing/` es el paquete original generado desde el sistema de diseño;
ya está integrado en `src/` y se conserva solo como referencia.

## Secciones

En orden de aparición (`src/app/page.tsx`):

| Sección | Componente | Datos | Ancla |
|---|---|---|---|
| Portada | `Hero` | `hero` en `landing.ts` | `#inicio` |
| ¿Qué es la Pastoral Vocacional? | `QueEs` | `queEs` en `landing.ts` | `#que-es` |
| ¿Para qué existe? | `ParaQue` | `paraQue` en `landing.ts` | `#para-que` |
| Testimonios | `Testimonios` | `testimonios.ts` | `#testimonios` |
| Instagram | `Instagram` | `instagram.ts` | `#instagram` |
| Otras áreas pastorales | `AreasPastorales` | `areas-pastorales.ts` | `#areas` |
| Equipo | `Equipo` | `equipo` en `landing.ts` | `#equipo` |
| Contacto | `Contacto` | `contacto` y `site` en `landing.ts` | `#contacto` |

`¿Para qué?` y `Otras áreas` comparten la rejilla de tarjetas `.cards3` con ícono
redondo. `Otras áreas` usa tarjetas y no un acordeón porque son 6 elementos:
caben en una rejilla de 3 × 2 y quedan todos a la vista.

## Principios

- **Contenido separado del diseño.** Los componentes no tienen texto fijo: todo
  sale de `src/data/`. Cambiar contenido no requiere tocar componentes.
- **Estático por defecto.** Todas las rutas se prerenderizan (`○ Static` en
  `next build`). Solo se añadirán capacidades de servidor cuando un caso de uso
  lo exija (formulario de contacto, integración con Instagram).
- **Server Components por defecto.** Solo son Client Components `Navbar` (menú
  móvil), `ContentImage` (el `loader` de `next/image` es una función y no puede
  pasarse desde un Server Component) e `InstagramEmbeds` (carga diferida del
  script de Instagram).
- **Sin abstracciones especulativas.** Las carpetas por funcionalidad
  (`features/...`) se crearán cuando existan módulos reales.

## Flujo de imágenes

`Photo`, `Hero` y las fotos de testimonios usan `ContentImage`, que decide según el valor de `src`:

| Valor en `landing.ts` | Ejemplo | Quién optimiza |
|---|---|---|
| Vacío | `""` | Nadie: se muestra un marcador con el isotipo |
| Ruta local | `/brand/isotipo.png` | Optimizador de Next.js |
| URL de Cloudinary | `https://res.cloudinary.com/<cuenta>/image/upload/v1/pastoral/retiro.jpg` | Cloudinary |
| ID público | `pastoral/retiro` (requiere `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`) | Cloudinary |

Para fotos de Cloudinary, `cloudinaryLoader` (`src/lib/cloudinary.ts`) inserta
`f_auto,c_limit,w_<ancho>,q_auto` después de `/image/upload/`. El navegador
elige del `srcset` el ancho adecuado y Cloudinary entrega WebP o AVIF según lo
que soporte. Next.js no vuelve a procesar estas imágenes, así que:

- no se duplica el trabajo de optimización ni el tráfico;
- el sitio sigue siendo compatible con una exportación 100 % estática
  (`output: "export"`), donde el optimizador de Next.js no está disponible.

Los logos de `public/brand/` y los marcadores siguen usando `next/image` sin
loader personalizado.

Decisión documentada en
[decisiones/0001-imagenes-en-cloudinary.md](decisiones/0001-imagenes-en-cloudinary.md).

## Videos

El componente `Video` (`ui.tsx`) recibe `src`, `poster` y `title` desde los datos:

| `src` | Resultado |
|---|---|
| Vacío | Marcador 16:9 con botón de reproducción y etiqueta `[VIDEO: …]` |
| URL de YouTube (`watch`, `youtu.be`, `shorts`, `embed`) | `iframe` de `youtube-nocookie.com` con carga diferida |
| Ruta propia, p. ej. `/video/que-es.mp4` | `<video controls preload="none">` con `poster` opcional |

Hoy hay dos videos pendientes: `queEs.video` (`landing.ts`) y
`testimonios.video` (`testimonios.ts`). Los videos con voz deben llevar
subtítulos (YouTube los gestiona; para archivos propios, añadir una pista
`<track>` en `Video`).

## Instagram

Se usan los **embeds oficiales** de Instagram por publicación
(`blockquote.instagram-media` + `https://www.instagram.com/embed.js`):

- No requieren token ni cuenta de desarrollador; basta con que la cuenta y las
  publicaciones sean públicas.
- `InstagramEmbeds` descarga el script de Meta solo cuando la sección está a
  400 px de entrar en pantalla. Sin JavaScript, cada recuadro es un enlace a la
  publicación.
- Limitaciones: el script es pesado y Meta puede colocar cookies; el diseño de
  cada recuadro lo decide Instagram; las URLs se mantienen a mano en
  `instagram.ts`; una publicación borrada muestra un recuadro de error.
- Con `publicaciones` vacío se muestran tres marcadores y no se carga nada de Meta.

## Configuración

| Variable | Obligatoria | Uso |
|---|---|---|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Solo si se usan IDs públicos | Nombre de la cuenta de Cloudinary. Es pública (va en las URLs de las imágenes). |

Plantilla en `.env.example`. Si falta la variable y una foto usa un ID público,
la compilación falla con un mensaje que indica cómo corregirlo.

## Pruebas

- `src/test/page.test.tsx`: estructura semántica, orden de las secciones,
  marcadores de video accesibles, etiqueta de testimonios provisionales y enlaces
  de las otras áreas (pestaña nueva, sin la Vocacional).
- `src/test/cloudinary.test.tsx`: detección de origen, construcción de URLs,
  error por configuración faltante y renderizado de `Photo` con Cloudinary.

## Evolución prevista

| Necesidad | Dirección propuesta |
|---|---|
| Editar textos y fotos sin tocar código | CMS headless (p. ej. Sanity o Decap CMS) que alimente `src/data/` |
| Instagram sin mantener URLs a mano | Instagram API con inicio de sesión de Instagram (cuenta profesional), consulta en servidor con revalidación periódica y token en variable de entorno |
| Formulario de contacto | Fase separada con minimización de datos, consentimiento y revisión de protección de datos |
| Mucho tráfico de imágenes | Migrar el almacenamiento a Cloudflare R2; basta cambiar el loader |
