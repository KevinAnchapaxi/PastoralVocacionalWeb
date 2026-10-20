import Image from "next/image";
import { hero } from "@/data/landing";
import { ContentImage } from "./ContentImage";
import { Wave } from "./ui";
import styles from "./landing.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-titulo">
      <div className={styles.hero_bg} aria-hidden="true">
        {hero.foto ? (
          <ContentImage src={hero.foto} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        ) : (
          <div className={styles.hero_bg_mark}>
            <Image src="/brand/logotipo-negativo-blanco.png" alt="" width={833} height={898} priority />
          </div>
        )}
        <div className={styles.hero_veil} />
      </div>

      <div className={`${styles.container} ${styles.hero_content}`}>
        <h1 id="hero-titulo" className={styles.h1}>
          {hero.titulo}
        </h1>
        <p className={`${styles.verse} ${styles.hero_slogan}`}>{hero.slogan}</p>
      </div>

      <div className={styles.hero_wave}>
        <Wave />
      </div>
    </section>
  );
}
