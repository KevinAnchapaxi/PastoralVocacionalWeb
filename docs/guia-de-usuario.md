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
   `portada`, `testimonios` o `equipo`.
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

El contenido está en la carpeta `src/data/`. Pega la URL entre comillas en el
campo que corresponda:

| Sección | Archivo | Campo | Cantidad |
|---|---|---|---|
| Portada (imagen de fondo) | `landing.ts` | `hero.foto` | 1 |
| Testimonios | `testimonios.ts` | `lista[n].foto` (opcional) | 1 por testimonio |
| Nuestro equipo | `landing.ts` | `equipo.miembros[n].foto` | 1 por persona |
| Palabras del delegado | `landing.ts` | `equipo.delegado.foto` | 1 |

Ejemplo para la portada:

```ts
foto: "https://res.cloudinary.com/lywalzfq/image/upload/v1730000000/retiro-junio-2026.jpg",
```

Para la portada elige una foto horizontal y tranquila: encima va el título en
blanco con una capa azul semitransparente.

Luego:

```powershell
npm run dev     # revisar en http://localhost:3000
npm test        # comprobar que todo sigue funcionando
```

Sube el cambio a la rama `DEV_KA` y abre un pull request hacia `main`.

## 4. Videos

Hay dos videos pendientes. Mientras no se completen, se ve un recuadro azul con
un botón de reproducción y la etiqueta `[VIDEO: …]`.

| Video | Archivo | Campo |
|---|---|---|
| ¿Qué es la Pastoral Vocacional? | `landing.ts` | `queEs.video.src` |
| Testimonio en video | `testimonios.ts` | `testimonios.video.src` |

Hay dos formas de publicarlos:

- **YouTube (recomendado para videos con voz):** sube el video al canal de la
  pastoral y pega su enlace, p. ej. `"https://www.youtube.com/watch?v=XXXXXXXXXXX"`.
  YouTube ofrece subtítulos y no consume el cupo de Cloudinary ni del hosting.
- **Archivo propio:** copia el `.mp4` en `public/video/` y escribe su ruta, p. ej.
  `"/video/que-es.mp4"`. En `poster` puedes poner la imagen que se ve antes de
  reproducir. Formato horizontal 16:9, idealmente de menos de 10 MB.

## 5. Testimonios escritos

Están en `src/data/testimonios.ts`. Los tres que hay son **ejemplos
inventados** y se ven con la etiqueta «Testimonio de ejemplo». Por cada
testimonio real:

```ts
{
  nombre: "Andrés Pérez",
  rol: "Seminarista · Parroquia San José",
  texto: "Dos o tres frases, en primera persona.",
  foto: "", // opcional: URL de Cloudinary
  provisional: false,
},
```

Pide siempre permiso por escrito a la persona (y a sus padres si es menor de
edad) para publicar su nombre, su foto y su testimonio.

## 6. Publicaciones de Instagram

En `src/data/instagram.ts`:

1. Escribe el nombre de la cuenta **sin @** en `usuario`, p. ej.
   `usuario: "pastoralvocacionaluio"`. Con eso funciona el botón «Seguir».
2. En Instagram, abre cada publicación o reel que quieras mostrar, pulsa
   **… → Copiar enlace** y pégalo en `publicaciones`:

   ```ts
   publicaciones: [
     "https://www.instagram.com/reel/ABC123xyz/",
     "https://www.instagram.com/p/DEF456uvw/",
     "https://www.instagram.com/reel/GHI789rst/",
   ],
   ```

   Se recomiendan 3 o 6 para que la cuadrícula quede completa. La cuenta debe
   ser **pública**. Si borras una publicación en Instagram, quítala también de
   esta lista.

## 7. Otras áreas pastorales

La lista está en `src/data/areas-pastorales.ts`, tomada de la página de la
Arquidiócesis. Si cambia un enlace o se crea un área nueva, actualízala ahí.

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
