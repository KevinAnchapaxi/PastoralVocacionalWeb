import { galeria, site } from "@/data/landing";
import type { Tone } from "@/data/landing";
import { Button, Photo, SectionHeading } from "./ui";
import styles from "./landing.module.css";

const TONES: Tone[] = ["mar", "vocacional", "cafe", "vocacional", "mar", "rojo"];

export function Galeria() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.rowHead}>
          <SectionHeading kicker={galeria.kicker} title={galeria.titulo} lead={galeria.lead} />
          <Button href="#" variant="outline">
            Seguir a {site.instagram}
          </Button>
        </div>
        <div className={styles.galeria}>
          {galeria.fotos.map((foto, i) => (
            <Photo key={i} src={foto.src} alt={foto.alt} tone={TONES[i % TONES.length]} sizes="(min-width: 1024px) 16vw, 50vw" />
          ))}
        </div>
      </div>
    </section>
  );
}
