# PastoralVocacionalWeb

Sitio público de la Pastoral Vocacional de la Arquidiócesis de Quito: una landing
en español sobre Next.js, compilada como sitio estático. Las fotos de contenido se
alojan en Cloudinary. Todavía no incluye CMS, formularios, autenticación ni
infraestructura de despliegue.

## Requisitos

- Node.js 24 LTS (la versión de trabajo está indicada en `.nvmrc`).
- npm 11 o posterior.
- NVM para Windows, recomendado para seleccionar el runtime.

## Ejecución local

Selecciona Node.js 24 e instala exactamente las dependencias del lockfile:

```powershell
nvm use 24.21.0
npm ci
Copy-Item .env.example .env.local   # opcional: solo si usas IDs públicos de Cloudinary
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Comandos

```powershell
npm run dev        # servidor local de desarrollo
npm run lint       # análisis estático
npm test           # pruebas en modo no interactivo
npm run test:watch # pruebas durante el desarrollo
npm run build      # compilación optimizada de producción
npm run start      # ejecución de la compilación de producción
```

## Contenido y fotos

- Todo el texto, los enlaces y las fotos están en `src/data/landing.ts`.
- Las fotos se suben a Cloudinary y se pegan como URL en ese archivo. Un campo
  vacío muestra un marcador con el logo.
- Paso a paso para el equipo de la pastoral:
  [docs/guia-de-usuario.md](docs/guia-de-usuario.md).

## Variables de entorno

| Variable | Obligatoria | Descripción |
|---|---|---|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Solo con IDs públicos | Cloud name de la cuenta de Cloudinary |

Ver `.env.example`. No hay secretos en el proyecto: la API Key y el API Secret de
Cloudinary no se necesitan y no deben versionarse.

## Flujo de trabajo

- `main`: versión estable. `DEV_KA`: rama de desarrollo.
- Los cambios se hacen en `DEV_KA` y llegan a `main` mediante pull request, con
  `npm run lint`, `npm test` y `npm run build` en verde.

## Base técnica

- Next.js 16 con App Router, React 19 y TypeScript estricto.
- Renderizado estático por defecto.
- CSS Modules, Tailwind CSS y variables CSS del Manual de Marca.
- `next/image` con loader de Cloudinary para fotos de contenido.
- Vitest y Testing Library para pruebas de componentes.
- Código de aplicación dentro de `src/` con el alias `@/*`.

## Documentación

| Documento | Para quién |
|---|---|
| [Arquitectura](docs/arquitectura.md) | Desarrolladores |
| [Infraestructura](docs/infraestructura.md) | Desarrolladores y responsables técnicos |
| [Guía de usuario](docs/guia-de-usuario.md) | Equipo de la pastoral que actualiza fotos y textos |
| [Decisiones de arquitectura](docs/decisiones/) | Registro de decisiones y sus motivos |
| [Planificación inicial](docs/reportes/pastoral-vocacional-web/01-planificacion.md) | Contexto histórico |
