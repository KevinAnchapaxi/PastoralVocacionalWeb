# PastoralVocacionalWeb

Base pública de la Pastoral Vocacional de la Arquidiócesis de Quito. Esta primera
fase ofrece una portada mínima en español sobre Next.js, sin CMS, formularios,
autenticación ni infraestructura de despliegue.

## Requisitos

- Node.js 24 LTS (la versión de trabajo está indicada en `.nvmrc`).
- npm 11 o posterior.
- NVM para Windows, recomendado para seleccionar el runtime.

## Ejecución local

Selecciona Node.js 24 e instala exactamente las dependencias del lockfile:

```powershell
nvm use 24.21.0
npm ci
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Comandos

```powershell
npm run dev        # servidor local de desarrollo
npm run lint       # análisis estático
npm test           # prueba de humo en modo no interactivo
npm run test:watch # pruebas durante el desarrollo
npm run build      # compilación optimizada de producción
npm run start      # ejecución de la compilación de producción
```

## Base técnica

- Next.js con App Router, React y TypeScript estricto.
- Renderizado estático por defecto.
- Tailwind CSS y variables CSS para los tokens visuales iniciales.
- Vitest y Testing Library para pruebas de componentes.
- Código de aplicación dentro de `src/` con el alias `@/*`.

La planificación aprobada se conserva en
`docs/reportes/pastoral-vocacional-web/01-planificacion.md`.
