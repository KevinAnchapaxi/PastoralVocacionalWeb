/**
 * Todo el contenido de la landing en un solo lugar.
 * Los valores entre corchetes son marcadores: sustitúyelos por los datos reales.
 */
import type { IconName } from "@/components/landing/Icon";

export type Tone = "mar" | "vocacional" | "rojo" | "cafe";

export const site = {
  nombre: "Pastoral Vocacional",
  organizacion: "Arquidiócesis de Quito",
  lema: "“Dejándolo todo, lo siguieron”",
  cita: "Lucas 5, 11",
  anioFundacion: "[AÑO]",
  instagram: "[@USUARIO]",
  telefono: "[TELÉFONO / WHATSAPP]",
  whatsappUrl: "#contacto",
  correo: "[CORREO DE LA PASTORAL]",
  direccion: "Arquidiócesis de Quito · [DIRECCIÓN]",
  mapaUrl: "#",
  horario: "Atención: lunes a viernes, [HORARIO]",
  oracion: "Oración por las vocaciones: jueves, [HORA]",
  redes: [
    { nombre: "Facebook", url: "#" },
    { nombre: "Instagram", url: "#" },
    { nombre: "TikTok", url: "#" },
    { nombre: "YouTube", url: "#" },
  ],
};

export const nav = [
  { id: "inicio", label: "Inicio" },
  { id: "conocenos", label: "Conócenos" },
  { id: "programa", label: "Programa" },
  { id: "equipo", label: "Nuestro equipo" },
  { id: "contacto", label: "Contáctanos" },
];

export const hero = {
  insignia: "Arquidiócesis de Quito",
  titulo: "La pastoral que te acompaña a descubrir a qué te llama Dios",
  texto:
    "Un espacio de escucha, oración y comunidad para niños, adolescentes y jóvenes de Quito que quieren dar una respuesta libre y generosa al amor de Dios.",
  fotoAlt: "[FOTO DE PORTADA: jóvenes en un encuentro vocacional]",
  /** Ruta de la foto real en /public, p. ej. "/fotos/portada.jpg". Vacío = marcador. */
  foto: "",
};

export const conocenos = {
  kicker: "Conócenos",
  titulo: "Una respuesta libre, generosa y concreta al amor de Dios",
  lead: "La Pastoral Vocacional Arquidiocesana es el ámbito de la Iglesia que acompaña a los fieles en el descubrimiento de la llamada de Dios en sus vidas.",
  texto:
    "La vocación no es solo el sacerdocio: es el llamado a la vida, a la santidad, al servicio, al matrimonio, al compromiso bautismal y a la construcción del Reino de Dios. Acompañamos especialmente a niños, adolescentes y jóvenes en el discernimiento de la voluntad de Dios para sus vidas.",
  cifras: [
    { valor: "9", etiqueta: "dimensiones pastorales" },
    { valor: "[N]", etiqueta: "parroquias acompañadas" },
    { valor: "[N]", etiqueta: "jóvenes en discernimiento" },
  ],
  fotos: [
    { alt: "[FOTO: retiro vocacional]", src: "" },
    { alt: "[FOTO: grupo en parroquia]", src: "" },
  ],
  valores: [
    {
      icon: "hand",
      tone: "mar",
      titulo: "Acompañamiento cercano",
      texto:
        "Un acompañante vocacional camina contigo, sin prisa y sin presión, hasta que descubras tu camino.",
    },
    {
      icon: "people",
      tone: "vocacional",
      titulo: "Comunidad viva",
      texto:
        "Encuentros, retiros y grupos donde el llamado se vive junto a otros jóvenes.",
    },
    {
      icon: "pray",
      tone: "rojo",
      titulo: "Oración y formación",
      texto:
        "Espacios de silencio, Palabra y formación para escuchar mejor la voz de Dios.",
    },
    {
      icon: "church",
      tone: "cafe",
      titulo: "Presente en tu parroquia",
      texto:
        "Equipos vocacionales en parroquias, colegios y movimientos de toda la Arquidiócesis.",
    },
  ] satisfies { icon: IconName; tone: Tone; titulo: string; texto: string }[],
};

export const programa = {
  kicker: "Nuestro programa",
  titulo: "Así te acompañamos durante el año",
  lead: "Cuatro espacios que se repiten en el calendario arquidiocesano. Todos son gratuitos y abiertos.",
  bloques: [
    {
      titulo: "Encuentros vocacionales",
      frecuencia: "Mensual",
      texto:
        "Jornadas de un día con oración, dinámicas y testimonios para jóvenes que se preguntan por su vocación.",
      fotos: ["Oración inicial", "Dinámica de grupo", "Testimonio", "Adoración"],
    },
    {
      titulo: "Retiros de discernimiento",
      frecuencia: "Trimestral",
      texto:
        "Fines de semana de silencio y acompañamiento personal para quienes ya sienten un llamado concreto.",
      fotos: ["Silencio", "Acompañamiento", "Misa", "Compartir"],
    },
    {
      titulo: "Formación de animadores",
      frecuencia: "Semestral",
      texto:
        "Escuela para agentes vocacionales de parroquias, colegios y movimientos.",
      fotos: ["Clase", "Taller", "Trabajo en equipo", "Envío"],
    },
    {
      titulo: "Oración por las vocaciones",
      frecuencia: "Cada jueves",
      texto:
        "Vigilias y horas santas abiertas a toda la comunidad arquidiocesana.",
      fotos: ["Vigilia", "Rosario", "Hora santa", "Comunidad"],
    },
  ],
};

/** Los cinco elementos del logo (Manual de Marca, p. 4). */
export const metodo = {
  kicker: "Nuestro camino",
  titulo: "Cinco claves del discernimiento",
  lead: "Las mismas que dibuja nuestro logo: la cruz, las personas, la red, la barca y la estrella.",
  claves: [
    { icon: "cross", tone: "mar", titulo: "Cruz", texto: "Cristo que llama y da sentido a toda vocación." },
    { icon: "people", tone: "vocacional", titulo: "Personas", texto: "El llamado personal vivido en comunidad." },
    { icon: "net", tone: "cafe", titulo: "Red y peces", texto: "Iglesia que sale al encuentro y da frutos." },
    { icon: "boat", tone: "mar", titulo: "Barca", texto: "Comunidad que acoge, forma y acompaña." },
    { icon: "star", tone: "rojo", titulo: "Estrella", texto: "María, guía en el camino vocacional." },
  ] satisfies { icon: IconName; tone: Tone; titulo: string; texto: string }[],
};

export const testimonios = {
  kicker: "Testimonios",
  titulo: "Historias de quienes escucharon el llamado",
  resenas: { texto: "[N] familias nos recomiendan", fuente: "Reseñas de Google", url: "#" },
  lista: [
    {
      cita: "[TESTIMONIO 1: cómo el acompañamiento le ayudó a decidir su camino.]",
      nombre: "[NOMBRE]",
      rol: "Seminarista · [PARROQUIA]",
    },
    {
      cita: "[TESTIMONIO 2: una familia que acompañó a su hijo o hija en el discernimiento.]",
      nombre: "[NOMBRE]",
      rol: "Mamá de un joven del grupo",
    },
    {
      cita: "[TESTIMONIO 3: una joven que descubrió su vocación al matrimonio o a la vida consagrada.]",
      nombre: "[NOMBRE]",
      rol: "Religiosa · [CONGREGACIÓN]",
    },
  ],
};

export const galeria = {
  kicker: "Síguenos",
  titulo: "Un día con la Pastoral Vocacional",
  lead: "Momentos de encuentros, retiros y oración compartidos en nuestras redes.",
  /** Rutas de fotos en /public; vacías = marcadores. */
  fotos: ["", "", "", "", "", ""],
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
        { label: "Conócenos", href: "#conocenos" },
        { label: "Programa", href: "#programa" },
        { label: "Nuestro equipo", href: "#equipo" },
        { label: "Testimonios", href: "#testimonios" },
      ],
    },
  ],
};
