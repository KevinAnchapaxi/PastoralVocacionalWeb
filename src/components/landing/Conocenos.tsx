import Image from "next/image";
import { conocenos, site } from "@/data/landing";
import { Icon } from "./Icon";
import { Button, Photo, SectionHeading, toneVar } from "./ui";
import styles from "./landing.module.css";

export function Conocenos() {
  const [fotoA, fotoB] = conocenos.fotos;
  return (
    <section id="conocenos" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.split}>
          <div className={styles.stack}>
            <SectionHeading kicker={conocenos.kicker} title={conocenos.titulo} lead={conocenos.lead} />
            <p className={styles.body}>{conocenos.texto}</p>
            <div className={styles.stats}>
              {conocenos.cifras.map((c) => (
                <div key={c.etiqueta}>
                  <p className={styles.stat_value}>{c.valor}</p>
                  <p className={styles.small}>{c.etiqueta}</p>
                </div>
              ))}
            </div>
            <div>
              <Button href="#contacto">Hablar con un acompañante</Button>
            </div>
          </div>

          <div className={styles.collage}>
            <Photo src={fotoA.src} alt={fotoA.alt} tone="vocacional" className={styles.collage_a} sizes="(min-width: 1024px) 40vw, 80vw" />
            <Photo src={fotoB.src} alt={fotoB.alt} tone="mar" className={styles.collage_b} sizes="(min-width: 1024px) 30vw, 60vw" />
            <div className={styles.collage_badge}>
              <Image src="/brand/isotipo.png" alt="" width={32} height={32} />
              Desde {site.anioFundacion} en Quito
            </div>
          </div>
        </div>

        <div className={styles.cards4}>
          {conocenos.valores.map((v) => (
            <article key={v.titulo} className={styles.card}>
              <div className={styles.circle} style={{ background: toneVar[v.tone] }}>
                <Icon name={v.icon} size={28} />
              </div>
              <h3 className={styles.h3}>{v.titulo}</h3>
              <p className={styles.body}>{v.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
