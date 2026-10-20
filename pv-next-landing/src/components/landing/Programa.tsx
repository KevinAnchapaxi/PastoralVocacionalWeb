import { programa } from "@/data/landing";
import type { Tone } from "@/data/landing";
import { Button, Photo, SectionHeading } from "./ui";
import styles from "./landing.module.css";

const TONES: Tone[] = ["mar", "vocacional", "cafe"];

export function Programa() {
  return (
    <section id="programa" className={`${styles.section} ${styles.section_tint}`}>
      <div className={`${styles.container} ${styles.programa}`}>
        <SectionHeading kicker={programa.kicker} title={programa.titulo} lead={programa.lead} center />

        {programa.bloques.map((b, k) => (
          <div key={b.titulo} className={styles.bloque}>
            <div className={styles.bloque_head}>
              <div className={styles.stack} style={{ gap: "var(--space-2)" }}>
                <span className={styles.pill}>{b.frecuencia}</span>
                <h3 className={`${styles.h3} ${styles.bloque_title}`}>{b.titulo}</h3>
              </div>
              <p className={styles.lead} style={{ color: "var(--ink)" }}>
                {b.texto}
              </p>
            </div>
            <div className={styles.strip} role="list" aria-label={`Fotos de ${b.titulo}`}>
              {b.fotos.map((f, i) => (
                <div key={f} role="listitem">
                  <Photo alt={`[FOTO: ${f}]`} tone={TONES[(k + i) % TONES.length]} className={styles.strip_item} sizes="270px" />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className={styles.center}>
          <Button href="#contacto" size="lg">
            Ver el calendario completo
          </Button>
        </div>
      </div>
    </section>
  );
}
