# Landing Pastoral Vocacional · integración en Next.js 16

Código generado desde el Manual de Marca y el sistema de diseño «Pastoral Vocacional».
Probado con Next 16.3, React 19.2 y TypeScript 5 (App Router, `src/`, alias `@/*`).
Sin dependencias nuevas: solo `next`, `react`, `react-dom`.

## Qué contiene

```
public/brand/                      logos oficiales (PNG, extraídos del manual)
src/app/layout.tsx                 fuentes (Poppins + Cormorant Garamond con next/font) y metadata
src/app/page.tsx                   la landing: compone las secciones
src/app/globals.css                base + importa los tokens
src/styles/tokens.css              variables CSS del sistema de diseño (colores oficiales, espaciado, radios)
src/data/landing.ts                TODO el texto y los datos; los [CORCHETES] son marcadores por rellenar
src/components/landing/
  ui.tsx                           Button, SectionHeading, Photo (foto o marcador), Wave (ola)
  Icon.tsx                         iconos de línea
  landing.module.css               estilos de todas las secciones (responsive)
  Navbar.tsx Hero.tsx Conocenos.tsx Programa.tsx Metodo.tsx
  Testimonios.tsx Galeria.tsx Equipo.tsx Contacto.tsx Footer.tsx
```

## Cómo integrarlo (3 pasos)

1. Descomprime el zip en la raíz del proyecto. Se copian `public/brand/` y `src/`.
   - Si ya tienes `src/app/layout.tsx`, `page.tsx` o `globals.css`, compara antes de sobrescribir:
     lo importante de `layout.tsx` es el bloque de `next/font` y las clases `poppins.variable`
     y `cormorant.variable` en `<html>`; de `globals.css`, el `@import "../styles/tokens.css"`.
   - Si tu proyecto NO usa carpeta `src/`, mueve `src/app`, `src/components`, `src/data` y
     `src/styles` a la raíz y ajusta el `@import` de `globals.css` a `"../styles/tokens.css"`.
   - Si tu alias no es `@/*`, cambia los imports `@/data/landing` y `@/components/landing/...`.
2. `npm run dev` y abre http://localhost:3000.
3. Rellena `src/data/landing.ts`: teléfonos, correo, dirección, horarios, cifras, testimonios,
   nombres del equipo e Instagram. Para las fotos, pon los archivos en `public/fotos/` y escribe
   su ruta en los campos `foto`/`src` (p. ej. `"/fotos/portada.jpg"`); mientras estén vacíos se
   muestran los marcadores azules con el isotipo.

## Con Claude Code en VS Code

Abre el proyecto en VS Code con la extensión Claude Code (o `claude` en la terminal) y pídele,
por ejemplo:

- «Conecta el formulario de `Contacto.tsx` a un Route Handler en `src/app/api/contacto/route.ts`
  que envíe correo con Resend» (o guarde en una hoja de cálculo, según prefieras).
- «Sustituye los marcadores de `src/data/landing.ts` con estos datos: …».
- «Añade una página `/eventos` reutilizando `SectionHeading` y `Photo` y el tono del sistema».

Claude Code puede leer el sistema de diseño y el lienzo de la landing si le pegas sus enlaces
de claude.ai, así mantiene los mismos tokens y componentes.

## Reglas de marca que el código ya respeta

- Colores oficiales sin alterar: `--azul-mar-profundo #182f71`, `--azul-vocacional #3b508b`,
  `--rojo-compromiso #e83e32`, `--cafe-mision #6a2800`, blanco.
- Rojo solo en botones y píldoras (texto ≥16px negrita); nunca en párrafos.
- Titulares Poppins Bold, cuerpo Poppins Regular, citas y versículos Cormorant Garamond itálica.
- Logo: principal sobre blanco, negativo blanco sobre azul; sin sombras, deformaciones ni rotación.
- Tema negativo disponible: pon `data-theme="negativo"` en cualquier contenedor.

## Formulario

`Contacto.tsx` es un `<form method="post" action="#">` sin lógica de envío, a propósito:
decide el servicio (Route Handler + Resend, Formspree, Google Sheets…) y conéctalo ahí.
