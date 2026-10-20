/**
 * Sección «Otras áreas pastorales».
 *
 * Fuente: https://www.arquidiocesisdequito.com.ec/areas-pastorales.html
 * (consultada el 2026-10-20). Esa página no trae descripciones: cada una resume
 * el objetivo publicado en la página del área. No incluye la Pastoral Vocacional.
 */
import type { IconName } from "@/components/landing/Icon";
import type { Tone } from "./landing";

export const areasPastorales = {
  kicker: "Arquidiócesis de Quito",
  titulo: "Otras áreas pastorales",
  lead: "La Pastoral Vocacional camina junto a otras áreas de la Iglesia de Quito. Conócelas.",
  lista: [
    {
      nombre: "Pastoral Familiar",
      descripcion: "Acompaña, forma y anima a las familias de Quito en su vocación cristiana.",
      url: "https://www.arquidiocesisdequito.com.ec/areas-pastorales/item/pastoral-familiar-2.html",
      icon: "people",
      tone: "mar",
    },
    {
      nombre: "Pastoral Juvenil",
      descripcion: "Fortalece el camino de los jóvenes desde el encuentro con Jesucristo vivo.",
      url: "https://www.arquidiocesisdequito.com.ec/areas-pastorales/item/pastoral-juvenil.html",
      icon: "star",
      tone: "rojo",
    },
    {
      nombre: "Pastoral Litúrgica",
      descripcion: "Ayuda a vivir la liturgia como fuente y culmen de la vida cristiana.",
      url: "https://www.arquidiocesisdequito.com.ec/areas-pastorales/item/pastoral-liturgica.html",
      icon: "church",
      tone: "vocacional",
    },
    {
      nombre: "Misiones",
      descripcion: "Anima, forma y fortalece el espíritu misionero de los fieles.",
      url: "https://www.arquidiocesisdequito.com.ec/areas-pastorales/item/obras-misionales-pontificias.html",
      icon: "boat",
      tone: "cafe",
    },
    {
      nombre: "Pastoral de la Educación",
      descripcion: "Promueve una educación integral de identidad católica en sus instituciones.",
      url: "https://www.arquidiocesisdequito.com.ec/areas-pastorales/item/pastoral-de-la-educacion.html",
      icon: "book",
      tone: "mar",
    },
    {
      nombre: "Pastoral de la Comunicación",
      descripcion: "Fortalece la comunicación de la Arquidiócesis con una cultura evangelizadora.",
      url: "https://www.arquidiocesisdequito.com.ec/areas-pastorales/item/pastoral-de-la-comunicacion.html",
      icon: "speaker",
      tone: "vocacional",
    },
  ] satisfies { nombre: string; descripcion: string; url: string; icon: IconName; tone: Tone }[],
};
