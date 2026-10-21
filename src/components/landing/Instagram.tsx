import { instagram, perfilInstagram } from "@/data/instagram";
import type { Tone } from "@/data/landing";
import { Icon } from "./Icon";
import { InstagramEmbeds } from "./InstagramEmbeds";
import { Button, Photo, SectionHeading } from "./ui";
import styles from "./landing.module.css";

const TONES: Tone[] = ["mar", "vocacional", "cafe"];

export function Instagram() {
  return (
    <section id="instagram" className={`${styles.section} ${styles.section_tint}`}>
      <div className={styles.container}>
        <div className={styles.rowHead}>
          <SectionHeading
            kicker="Síguenos"
            title="Nuestro día a día en Instagram"
            lead="Encuentros, retiros y momentos de oración contados por sus protagonistas."
          />
          <Button href={perfilInstagram.url} external={perfilInstagram.url !== "#"}>
            <Icon name="instagram" size={20} />
            Seguir a {perfilInstagram.etiqueta}
          </Button>
        </div>

        {instagram.publicaciones.length > 0 ? (
          <InstagramEmbeds publicaciones={instagram.publicaciones} />
        ) : (
          // PUBLICACIONES PENDIENTES: agrega los enlaces en src/data/instagram.ts
          <ul className={styles.instagram_grid}>
            {TONES.map((tone, i) => (
              <li key={i}>
                <Photo alt={`[REEL DE INSTAGRAM ${i + 1}]`} tone={tone} className={styles.instagram_placeholder} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
