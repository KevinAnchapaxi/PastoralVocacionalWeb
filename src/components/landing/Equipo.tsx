import { equipo } from "@/data/landing";
import type { Tone } from "@/data/landing";
import { Photo, SectionHeading } from "./ui";
import styles from "./landing.module.css";

const TONES: Tone[] = ["mar", "vocacional", "cafe"];

export function Equipo() {
  return (
    <section id="equipo" className={`${styles.section} ${styles.section_tint}`}>
      <div className={styles.container}>
        <SectionHeading kicker={equipo.kicker} title={equipo.titulo} lead={equipo.lead} center />

        <ul className={styles.equipo} style={{ listStyle: "none", padding: 0 }}>
          {equipo.miembros.map((m, i) => (
            <li key={m.nombre + m.rol} className={styles.miembro}>
              <Photo src={m.foto} alt={m.foto ? m.nombre : "[FOTO]"} tone={TONES[i % TONES.length]} className={styles.miembro_foto} sizes="200px" />
              <p style={{ fontWeight: 700, color: "var(--azul-mar-profundo)" }}>{m.nombre}</p>
              <p className={styles.small}>{m.rol}</p>
            </li>
          ))}
        </ul>

        <div className={styles.delegado}>
          <Photo src={equipo.delegado.foto} alt={equipo.delegado.foto ? equipo.delegado.nombre : "[FOTO]"} tone="mar" className={styles.delegado_foto} sizes="200px" />
          <div className={styles.stack} style={{ gap: "var(--space-3)" }}>
            <p className={styles.kicker}>{equipo.delegado.kicker}</p>
            <h3 className={`${styles.h3} ${styles.bloque_title}`}>{equipo.delegado.nombre}</h3>
            <p className={styles.quote}>“{equipo.delegado.mensaje}”</p>
          </div>
        </div>
      </div>
    </section>
  );
}
