import Image from "next/image";
import { hero, site } from "@/data/landing";
import { Button, Wave } from "./ui";
import styles from "./landing.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.hero_bg} aria-hidden="true">
        {hero.foto ? (
          <Image src={hero.foto} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        ) : (
          <div className={styles.hero_bg_mark}>
            <Image src="/brand/logotipo-negativo-blanco.png" alt="" width={833} height={898} priority />
          </div>
        )}
        <div className={styles.hero_veil} />
        {!hero.foto ? <span className={styles.hero_photoLabel}>{hero.fotoAlt}</span> : null}
      </div>

      <div className={`${styles.container} ${styles.hero_content}`}>
        <span className={styles.hero_badge}>{hero.insignia}</span>
        <h1 id="hero-titulo" className={styles.h1}>
          {hero.titulo}
        </h1>
        <p className={styles.hero_text}>{hero.texto}</p>
        <p className={`${styles.verse} ${styles.hero_verse}`}>
          {site.lema} · {site.cita}
        </p>
        <div className={styles.hero_actions}>
          <Button href="#contacto" variant="accent" size="lg">
            Agenda una conversación
          </Button>
          <Button href="#programa" variant="white" size="lg">
            Conoce el programa
          </Button>
        </div>
      </div>

      <div className={styles.hero_wave}>
        <Wave />
      </div>
    </section>
  );
}
