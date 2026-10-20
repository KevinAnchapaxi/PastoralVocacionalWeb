import Image from "next/image";
import { testimonios } from "@/data/testimonios";
import { ContentImage } from "./ContentImage";
import { SectionHeading, Video } from "./ui";
import styles from "./landing.module.css";

export function Testimonios() {
  return (
    <section id="testimonios" className={`${styles.section} ${styles.testimonios}`}>
      <div className={styles.testimonios_mark} aria-hidden="true">
        <Image src="/brand/logotipo-negativo-blanco.png" alt="" width={833} height={898} />
      </div>
      <div className={styles.container}>
        <SectionHeading kicker={testimonios.kicker} title={testimonios.titulo} lead={testimonios.lead} center dark />

        {/* VIDEO PENDIENTE: completa testimonios.video.src en src/data/testimonios.ts */}
        <Video
          src={testimonios.video.src}
          poster={testimonios.video.poster}
          title={testimonios.video.titulo}
          className={styles.testi_video}
        />

        <ul className={styles.testi_grid}>
          {testimonios.lista.map((t) => (
            <li key={t.nombre + t.rol}>
              <figure className={styles.testi}>
                {t.provisional ? <span className={styles.testi_tag}>Testimonio de ejemplo</span> : null}
                <blockquote className={styles.quote}>“{t.texto}”</blockquote>
                <figcaption className={styles.avatar}>
                  <div className={styles.avatar_img}>
                    {t.foto ? (
                      <ContentImage src={t.foto} alt="" fill sizes="48px" style={{ objectFit: "cover" }} />
                    ) : (
                      <Image src="/brand/isotipo.png" alt="" width={30} height={30} />
                    )}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700 }}>{t.nombre}</p>
                    <p className={styles.small} style={{ color: "var(--on-brand-muted)" }}>
                      {t.rol}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
