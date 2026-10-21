/**
 * Contenido general de la landing. Testimonios, Instagram y áreas pastorales
 * tienen su propio archivo en esta carpeta.
 * Los valores entre corchetes son marcadores: sustitúyelos por los datos reales.
 *
 * Fotos: acepta una URL de Cloudinary (recomendado), un ID público de Cloudinary
 * o una ruta en /public. Vacío = marcador. Ver docs/guia-de-usuario.md.
 * Videos: ver el componente `Video` en src/components/landing/ui.tsx.
 */
import type { IconName } from "@/components/landing/Icon";
import { perfilInstagram } from "./instagram";

export type Tone = "mar" | "vocacional" | "rojo" | "cafe";

export const site = {
  nombre: "Pastoral Vocacional",
  organizacion: "Arquidiócesis de Quito",
  lema: "“Dejándolo todo, lo siguieron”",
  cita: "Lucas 5, 11",
  anioFundacion: "[AÑO]",
  telefono: "[TELÉFONO / WHATSAPP]",
  whatsappUrl: "#contacto",
  correo: "[CORREO DE LA PASTORAL]",
  direccion: "Arquidiócesis de Quito · [DIRECCIÓN]",
  mapaUrl: "#",
  horario: "Atención: lunes a viernes, [HORARIO]",
  oracion: "Oración por las vocaciones: jueves, [HORA]",
  redes: [
    { nombre: "Facebook", url: "#" },
    { nombre: "Instagram", url: perfilInstagram.url },
    { nombre: "TikTok", url: "#" },
    { nombre: "YouTube", url: "#" },
  ],
};

export const nav = [
  { id: "inicio", label: "Inicio" },
  { id: "que-es", label: "¿Qué es?" },
  { id: "para-que", label: "Misión" },
  { id: "testimonios", label: "Testimonios" },
  { id: "equipo", label: "Equipo" },
  { id: "contacto", label: "Contáctanos" },
];

export const hero = {
  titulo: "Pastoral Vocacional",
  /*
   * Opciones de slogan (una línea):
   * 1. «Escucha su llamado, descubre tu camino.»  ← en uso: invita a la acción
   *    personal y resume el discernimiento en dos verbos.
   * 2. «Dios te llama; te acompañamos a responder.»
   * 3. «Tu vocación empieza con un sí.»
   */
  slogan: "Escucha su llamado, descubre tu camino.",
  /** Imagen de fondo: URL de Cloudinary, ID público o ruta en /public. Vacío = logo de marca. */
  foto: "",
};

export const queEs = {
  kicker: "Conócenos",
  titulo: "¿Qué es la Pastoral Vocacional?",
  lead: "Es el espacio de la Iglesia de Quito que te acompaña a descubrir lo que Dios sueña para tu vida.",
  texto:
    "La vocación no es solo el sacerdocio o la vida consagrada: también es el matrimonio, el servicio y el compromiso de todo bautizado. Caminamos sobre todo con niños, adolescentes y jóvenes, junto a las parroquias, los colegios y las demás pastorales de la Arquidiócesis.",
  boton: "Hablar con un acompañante",
  /** Video de la sección. Vacío = marcador. Formatos admitidos: ver `Video` en ui.tsx. */
  video: { src: "", poster: "", titulo: "¿Qué es la Pastoral Vocacional?" },
};

export const paraQue = {
  kicker: "Nuestra misión",
  titulo: "¿Para qué existe la Pastoral Vocacional?",
  lead: "Para que nadie descubra su vocación en soledad.",
  puntos: [
    {
      icon: "cross",
      tone: "mar",
      titulo: "Encontrarte con Jesús",
      texto: "Él es quien llama. Todo empieza por conocerlo y dejarte querer por Él.",
    },
    {
      icon: "star",
      tone: "vocacional",
      titulo: "Descubrir tu vocación",
      texto: "Te ayudamos a escuchar lo que Dios quiere para ti, con libertad y sin presión.",
    },
    {
      icon: "hand",
      tone: "rojo",
      titulo: "Acompañarte de cerca",
      texto: "Una persona de confianza camina contigo y te escucha mientras decides.",
    },
    {
      icon: "book",
      tone: "cafe",
      titulo: "Ayudarte a crecer",
      texto: "Formación humana, espiritual y bíblica para dar tu respuesta con madurez.",
    },
    {
      icon: "pray",
      tone: "mar",
      titulo: "Rezar por las vocaciones",
      texto: "Animamos la oración en parroquias, familias y grupos de toda la ciudad.",
    },
    {
      icon: "people",
      tone: "vocacional",
      titulo: "Para niños, adolescentes y jóvenes",
      texto: "Y también para sus familias, catequistas y parroquias que los acompañan.",
    },
  ] satisfies { icon: IconName; tone: Tone; titulo: string; texto: string }[],
  boton: "Quiero que me acompañen",
};

export const equipo = {
  kicker: "Nuestro equipo",
  titulo: "Personas que caminan contigo",
  lead: "Sacerdotes, religiosas, matrimonios y jóvenes animadores al servicio del discernimiento.",
  miembros: [
    { nombre: "P. Francisco Calderón Luzuriaga", rol: "Delegado Arquidiocesano de Pastoral Vocacional", foto: "" },
    { nombre: "[NOMBRE]", rol: "Acompañante vocacional", foto: "" },
    { nombre: "[NOMBRE]", rol: "Coordinación de retiros", foto: "" },
    { nombre: "[NOMBRE]", rol: "Animación juvenil", foto: "" },
    { nombre: "[NOMBRE]", rol: "Dimensión infantil y educativa", foto: "" },
    { nombre: "[NOMBRE]", rol: "Comunicación", foto: "" },
  ],
  delegado: {
    kicker: "Palabras del delegado",
    nombre: "P. Francisco Calderón Luzuriaga",
    mensaje:
      "[MENSAJE DEL DELEGADO: dos o tres frases de bienvenida e invitación al discernimiento.]",
    foto: "",
  },
};

export const contacto = {
  kicker: "Contáctanos",
  titulo: "Agenda una conversación",
  lead: "Escríbenos y un acompañante vocacional te responderá en pocos días. Sin compromiso.",
  boton: "Agendar conversación",
  aviso: "Tus datos solo se usan para responderte.",
};

export const footer = {
  descripcion:
    "Ámbito de la Iglesia que acompaña a los fieles de la Arquidiócesis de Quito en el descubrimiento de la llamada de Dios.",
  columnas: [
    {
      titulo: "Pastoral",
      enlaces: [
        { label: "¿Qué es?", href: "#que-es" },
        { label: "Nuestra misión", href: "#para-que" },
        { label: "Testimonios", href: "#testimonios" },
        { label: "Otras pastorales", href: "#areas" },
      ],
    },
  ],
};
