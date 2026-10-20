# Planificación — PastoralVocacionalWeb

Estado: APROBADO

## Entendimiento

Crear en `C:\DevOps\Landing PV` la base productiva de un sitio público para la Pastoral Vocacional de la Arquidiócesis de Quito. La aplicación se llamará `PastoralVocacionalWeb` y usará Next.js con TypeScript. Esta fase entrega el andamiaje técnico y una portada mínima en español; no incluye todavía el diseño completo, CMS, formularios, autenticación ni infraestructura de nube.

## Decisión técnica confirmada

- Next.js estable con App Router.
- React y TypeScript en modo estricto.
- Node.js 24 LTS y npm, con versiones reproducibles mediante `package-lock.json` y declaración del runtime esperado.
- ESLint con reglas de Next.js/Core Web Vitals.
- Tailwind CSS y variables CSS como base del futuro sistema visual.
- Código bajo `src/` y alias de importación `@/*`.
- Arquitectura inicial de monolito modular, organizada por funcionalidades cuando aparezcan módulos reales.
- Renderizado estático por defecto; capacidades de servidor solo cuando un caso de uso las requiera.

No fue posible consultar las directivas técnicas de Debora porque el MCP `dev-debora` no está disponible en esta sesión. Esta planificación queda marcada como **sin directiva en Debora** y deberá reconciliarse con ella cuando el servicio esté disponible.

## Alcance

1. Actualizar el runtime local usado para el trabajo de Node.js 20.10.0, actualmente EOL, a Node.js 24 LTS mediante el `nvm` ya instalado.
2. Generar el proyecto con la herramienta oficial `create-next-app`, sin opciones interactivas.
3. Conservar este reporte dentro del proyecto y crear un repositorio Git independiente.
4. Sustituir la pantalla de ejemplo por una base semántica en español con `header`, `main` y `footer`.
5. Configurar metadatos mínimos, idioma `es` y estilos globales mediante tokens CSS.
6. Añadir una prueba de humo de la portada con Vitest y Testing Library.
7. Crear un README con requisitos y comandos locales, sin decisiones de infraestructura no implementadas.
8. Ejecutar instalación reproducible, lint, pruebas y build de producción.
9. Revisar el diff y verificar que no existan secretos, archivos temporales ni errores ocultos.

## Fuera de alcance

- Diseño visual definitivo o contenido pastoral final.
- CMS, base de datos, formularios, correo, analítica o cookies.
- Azure Static Web Apps, dominios, DNS, CI/CD o despliegue.
- Autenticación y panel administrativo.
- Microservicios, contenedores o Kubernetes.

## Estructura prevista

```text
C:\DevOps\Landing PV\
├── docs/reportes/pastoral-vocacional-web/01-planificacion.md
├── public/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── layout/
│   └── test/
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

La estructura crecerá por funcionalidades (`features/content`, `features/events`, `features/contact`) solamente cuando esas funcionalidades entren en alcance; no se crearán carpetas vacías ni abstracciones especulativas.

## Criterios de aceptación

- El proyecto reside directamente en `C:\DevOps\Landing PV`.
- `package.json` usa `pastoral-vocacional-web` como identificador válido y la interfaz muestra `PastoralVocacionalWeb` como nombre del producto.
- TypeScript está en modo estricto y App Router es el enrutador activo.
- La portada mínima se renderiza en español y usa HTML semántico.
- `npm run lint`, `npm test` y `npm run build` terminan correctamente con Node.js 24 LTS.
- No hay secretos, credenciales, errores de compilación ni advertencias ignoradas.
- El README permite ejecutar el proyecto con `npm ci` y `npm run dev`.

## Riesgos y mitigaciones

- **Runtime local obsoleto:** Node.js 20 está EOL. Se seleccionará Node.js 24 LTS antes de instalar dependencias.
- **Carpeta con espacios y documentación previa:** `create-next-app` puede rechazar un destino no vacío. Se generará en una carpeta temporal validada y luego se moverán únicamente los archivos generados al destino, preservando este reporte.
- **Deriva de versiones:** se conservará el lockfile y se evitarán versiones preview, beta o canary.
- **Sobrediseño:** esta fase solo crea una base mínima verificable; CMS, datos e infraestructura quedan fuera.
- **Privacidad futura:** cualquier formulario vocacional necesitará una fase separada con minimización de datos, consentimiento y revisión de protección de datos.

## Archivos a modificar

- Nuevos archivos del proyecto bajo `C:\DevOps\Landing PV`.
- Instalación/selección local de Node.js 24 LTS mediante NVM para ejecutar la cadena de herramientas.
- No se modificará el código de `C:\DevOps\Academikus.ProjectManagerAgent`.

## Aprobación

La implementación comienza cuando el usuario apruebe expresamente este plan. Tras la aprobación, esta línea cambiará a `Estado: APROBADO` antes de crear código fuente.
