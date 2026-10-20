/**
 * Sección «Testimonios».
 *
 * Los tres testimonios de abajo son CONTENIDO PROVISIONAL DE EJEMPLO: personas y
 * frases inventadas. Reemplázalos por testimonios reales (con permiso de cada
 * persona) y cambia `provisional` a false; mientras sea true, la tarjeta muestra
 * la etiqueta «Testimonio de ejemplo».
 *
 * - `foto` (opcional): URL de Cloudinary o ruta en /public. Vacío = isotipo.
 * - `video`: testimonio en video. Vacío = marcador. Ver `Video` en ui.tsx.
 */
export type Testimonio = {
  nombre: string;
  rol: string;
  texto: string;
  foto?: string;
  provisional?: boolean;
};

export const testimonios = {
  kicker: "Testimonios",
  titulo: "Historias de quienes escucharon el llamado",
  lead: "Jóvenes y familias que se dejaron acompañar nos cuentan cómo fue su camino.",
  video: { src: "", poster: "", titulo: "Testimonio vocacional" },
  lista: [
    {
      nombre: "Andrés (ejemplo)",
      rol: "Joven de la parroquia [PARROQUIA]",
      texto:
        "Llegué a un encuentro vocacional solo por acompañar a un amigo. Ahí entendí que Dios también tenía algo que decirme a mí.",
      foto: "",
      provisional: true,
    },
    {
      nombre: "María Elena (ejemplo)",
      rol: "Mamá de una joven en discernimiento",
      texto:
        "Tenía miedo de que mi hija se equivocara. El acompañamiento nos ayudó a escucharla y a confiar en Dios juntas.",
      foto: "",
      provisional: true,
    },
    {
      nombre: "Daniela (ejemplo)",
      rol: "Animadora juvenil · [COMUNIDAD]",
      texto:
        "Pensaba que vocación era solo ser cura o monja. Aquí descubrí que Dios me llamaba a formar una familia y a servir en mi comunidad.",
      foto: "",
      provisional: true,
    },
  ] satisfies Testimonio[],
};
