import Image from "next/image";
import { queEs, site } from "@/data/landing";
import { Button, SectionHeading, Video } from "./ui";
import styles from "./landing.module.css";

export function QueEs() {
  return (
    <section id="que-es" className={styles.section}>
      <div className={`${styles.container} ${styles.split}`}>
        <div className={styles.stack}>
          <SectionHeading kicker={queEs.kicker} title={queEs.titulo} lead={queEs.lead} />
          <p className={styles.body}>{queEs.texto}</p>
          <div>
            <Button href="#contacto">{queEs.boton}</Button>
          </div>
        </div>

        <div className={styles.media}>
          {/* VIDEO PENDIENTE: completa queEs.video.src en src/data/landing.ts */}
          <Video src={queEs.video.src} poster={queEs.video.poster} title={queEs.video.titulo} />
          <div className={styles.media_badge}>
            <Image src="/brand/isotipo.png" alt="" width={32} height={32} />
            Desde {site.anioFundacion} en Quito
          </div>
        </div>
      </div>
    </section>
  );
}
