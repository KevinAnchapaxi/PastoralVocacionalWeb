import { metodo } from "@/data/landing";
import { Icon } from "./Icon";
import { SectionHeading, toneVar } from "./ui";
import styles from "./landing.module.css";

export function Metodo() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading kicker={metodo.kicker} title={metodo.titulo} lead={metodo.lead} center />
        <ul className={styles.claves} style={{ listStyle: "none", margin: "var(--space-12) 0 0", padding: 0 }}>
          {metodo.claves.map((c) => (
            <li key={c.titulo} className={styles.clave}>
              <div className={styles.circle} style={{ background: toneVar[c.tone] }}>
                <Icon name={c.icon} size={56} />
              </div>
              <p className={styles.h3}>{c.titulo}</p>
              <p className={styles.small}>{c.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
