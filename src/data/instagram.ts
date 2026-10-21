/**
 * Sección «Síguenos en Instagram».
 *
 * - `usuario`: nombre de la cuenta sin @, p. ej. "pastoralvocacionaluio".
 *   Vacío = marcador y el botón «Seguir» no lleva a ningún perfil.
 * - `publicaciones`: enlaces de publicaciones o reels públicos, copiados desde
 *   Instagram (… → Copiar enlace). Se muestran en este orden; se recomiendan 3 o 6.
 *   Ejemplo: "https://www.instagram.com/reel/ABC123xyz/"
 *   Vacío = se muestran recuadros de marcador.
 */
export const instagram = {
  usuario: "",
  publicaciones: [] as string[],
};

export const perfilInstagram = {
  etiqueta: instagram.usuario ? `@${instagram.usuario}` : "[@CUENTA_INSTAGRAM]",
  url: instagram.usuario ? `https://www.instagram.com/${instagram.usuario}/` : "#",
};
