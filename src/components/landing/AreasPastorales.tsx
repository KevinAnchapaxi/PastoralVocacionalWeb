import { areasPastorales } from "@/data/areas-pastorales";
import { Icon } from "./Icon";
import { SectionHeading, toneVar } from "./ui";
import styles from "./landing.module.css";

export function AreasPastorales() {
  return (
    <section id="areas" className={styles.section}>
      <div className={styles.container}>
        <SectionHeading kicker={areasPastorales.kicker} title={areasPastorales.titulo} lead={areasPastorales.lead} center />

        <ul className={styles.cards3}>
          {areasPastorales.lista.map((a) => (
            <li key={a.url}>
              <a href={a.url} target="_blank" rel="noopener noreferrer" className={`${styles.card} ${styles.card_link}`}>
                <div className={styles.circle} style={{ background: toneVar[a.tone] }}>
                  <Icon name={a.icon} size={28} />
                </div>
                <h3 className={styles.h3}>{a.nombre}</h3>
                <p className={styles.body}>{a.descripcion}</p>
                <span className={styles.card_more}>
                  Visitar página
                  <Icon name="external" size={18} />
                  <span className={styles.srOnly}>(se abre en una pestaña nueva)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
