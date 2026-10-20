# Infraestructura — PastoralVocacionalWeb

Última actualización: 2026-10-20

## Estado actual

| Componente | Estado | Detalle |
|---|---|---|
| Repositorio | Activo | GitHub: `KevinAnchapaxi/PastoralVocacionalWeb` |
| Imágenes | Activo | Cloudinary, plan gratuito |
| Hosting del sitio | **Pendiente** | La planificación inicial menciona Azure Static Web Apps como opción |
| Dominio y DNS | **Pendiente** | — |
| CI/CD | **Pendiente** | Hoy lint, pruebas y build se ejecutan a mano |
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
3. Crear la carpeta raíz `pastoral-vocacional` en *Media Library* con
   subcarpetas por sección: `portada`, `conocenos`, `galeria`, `equipo`.
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
