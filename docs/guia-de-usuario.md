# Guía de usuario — Fotos y contenido de la web

Para el equipo de la Pastoral Vocacional que actualiza las fotos y los textos
de la página. No hace falta saber programar, salvo para el último paso, que
puede hacerlo la persona encargada de la web.

## 1. Preparar las fotos

- Formato **JPG** (o PNG si tiene transparencia).
- Lado mayor de **2000 a 2500 píxeles** es suficiente. Fotos más grandes solo
  ocupan espacio: la web las reduce automáticamente.
- Nombres claros, sin espacios ni tildes: `retiro-junio-2026.jpg`.
- Cuenta con el **permiso** de las personas que aparecen, sobre todo si son
  menores de edad.
- Para la portada, usa fotos horizontales con el motivo principal al centro:
  en celulares se recortan los lados.

## 2. Subir la foto a Cloudinary

1. Entra a <https://cloudinary.com> con la cuenta de la pastoral.
2. Abre **Media Library** (Biblioteca de medios).
3. Entra a la carpeta `pastoral-vocacional` y a la subcarpeta de la sección:
   `portada`, `conocenos`, `galeria` o `equipo`.
4. Pulsa **Upload** (Subir) y elige las fotos.
5. Cuando terminen de subir, pasa el cursor sobre la foto y pulsa el ícono de
   **copiar URL** (Copy URL). Obtendrás algo como:

   ```text
   https://res.cloudinary.com/lywalzfq/image/upload/v1730000000/retiro-junio-2026.jpg
   ```

   Es normal que la URL no incluya el nombre de la carpeta: la cuenta usa
   carpetas dinámicas, que solo sirven para ordenar la biblioteca.

6. Envía esa URL a la persona encargada de la web, indicando **en qué sección**
   debe aparecer y una **descripción breve** de la foto (por ejemplo, «Jóvenes
   rezando en el retiro de junio»). La descripción la leen las personas con
   discapacidad visual y los buscadores.

> No borres ni renombres en Cloudinary una foto que ya está publicada: la web
> dejaría de mostrarla. Moverla a otra carpeta sí es seguro. Si quieres reemplazarla, sube la nueva y pide que se
> cambie la URL.

## 3. Publicar la foto en la web (persona encargada de la web)

Todo el contenido está en `src/data/landing.ts`. Pega la URL entre comillas en
el campo que corresponda:

| Sección | Campo | Cantidad |
|---|---|---|
| Portada | `hero.foto` | 1 |
| Conócenos | `conocenos.fotos[n].src` (y su `alt`) | 2 |
| Galería «Síguenos» | `galeria.fotos[n].src` (y su `alt`) | 6 |
| Nuestro equipo | `equipo.miembros[n].foto` | 1 por persona |
| Palabras del delegado | `equipo.delegado.foto` | 1 |

Ejemplo para la galería:

```ts
fotos: [
  {
    src: "https://res.cloudinary.com/lywalzfq/image/upload/v1730000000/retiro-junio-2026.jpg",
    alt: "Jóvenes rezando en el retiro de junio",
  },
  { src: "", alt: "[FOTO 2]" }, // vacío = se muestra un marcador con el logo
  // ...
],
```

Luego:

```powershell
npm run dev     # revisar en http://localhost:3000
npm test        # comprobar que todo sigue funcionando
```

Sube el cambio a la rama `DEV_KA` y abre un pull request hacia `main`.

## Preguntas frecuentes

**¿Una foto vacía rompe la página?**
No. Si el campo está vacío (`""`) se muestra un recuadro de color con el logo.

**¿Puedo poner fotos de Google Drive, Facebook u otra web?**
No. Solo se aceptan fotos de Cloudinary o de la carpeta `public/` del
proyecto. Descárgalas y súbelas a Cloudinary.

**La foto se ve recortada.**
Las fotos llenan su recuadro. Elige otra con el motivo más centrado o súbela
recortada desde Cloudinary (botón **Edit** de la foto) y usa la nueva URL.

**¿Cuántas fotos podemos subir?**
Con el plan gratuito hay espacio de sobra para cientos de fotos. Lo que se
consume mes a mes es el tráfico de visitas; ver
[infraestructura.md](infraestructura.md#cupo-del-plan-gratuito).

**Al compilar aparece «Falta NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME».**
Alguna foto se escribió como ID público (`pastoral-vocacional/galeria/retiro`)
en lugar de URL completa. Pega la URL completa o configura la variable en
`.env.local` (ver `.env.example`).
