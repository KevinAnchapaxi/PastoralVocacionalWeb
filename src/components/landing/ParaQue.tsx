import { paraQue } from "@/data/landing";
import { Icon } from "./Icon";
import { Button, SectionHeading, toneVar } from "./ui";
import styles from "./landing.module.css";

export function ParaQue() {
  return (
    <section id="para-que" className={`${styles.section} ${styles.section_tint}`}>
      <div className={styles.container}>
        <SectionHeading kicker={paraQue.kicker} title={paraQue.titulo} lead={paraQue.lead} center />

        <ul className={styles.cards3}>
          {paraQue.puntos.map((p) => (
            <li key={p.titulo} className={styles.card}>
              <div className={styles.circle} style={{ background: toneVar[p.tone] }}>
                <Icon name={p.icon} size={28} />
              </div>
              <h3 className={styles.h3}>{p.titulo}</h3>
              <p className={styles.body}>{p.texto}</p>
            </li>
          ))}
        </ul>

        <div className={styles.center} style={{ marginTop: "var(--space-12)" }}>
          <Button href="#contacto" size="lg">
            {paraQue.boton}
          </Button>
        </div>
      </div>
    </section>
  );
}
