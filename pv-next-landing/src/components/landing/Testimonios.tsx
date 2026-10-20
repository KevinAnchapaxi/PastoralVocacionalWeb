import Image from "next/image";
import { testimonios } from "@/data/landing";
import { Icon } from "./Icon";
import { SectionHeading } from "./ui";
import styles from "./landing.module.css";

export function Testimonios() {
  return (
    <section id="testimonios" className={`${styles.section} ${styles.testimonios}`}>
      <div className={styles.testimonios_mark} aria-hidden="true">
        <Image src="/brand/logotipo-negativo-blanco.png" alt="" width={833} height={898} />
      </div>
      <div className={styles.container}>
        <div className={styles.testimonios_head}>
          <SectionHeading kicker={testimonios.kicker} title={testimonios.titulo} dark />
          <div className={styles.resenas}>
            <div className={styles.stars} aria-label="Cinco estrellas">
              {Array.from({ length: 5 }, (_, i) => (
                <Icon key={i} name="star5" size={22} filled />
              ))}
            </div>
            <p style={{ fontWeight: 700 }}>{testimonios.resenas.texto}</p>
            <a href={testimonios.resenas.url} className={styles.small} style={{ color: "var(--on-brand-muted)" }}>
              {testimonios.resenas.fuente}
            </a>
          </div>
        </div>

        <div className={styles.testi_grid}>
          {testimonios.lista.map((t) => (
            <figure key={t.nombre + t.rol} className={styles.testi} style={{ margin: 0 }}>
              <blockquote className={styles.quote} style={{ margin: 0 }}>
                “{t.cita}”
              </blockquote>
              <figcaption className={styles.avatar}>
                <div className={styles.avatar_img}>
                  <Image src="/brand/isotipo.png" alt="" width={30} height={30} />
                </div>
                <div>
                  <p style={{ fontWeight: 700 }}>{t.nombre}</p>
                  <p className={styles.small} style={{ color: "var(--on-brand-muted)" }}>
                    {t.rol}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
