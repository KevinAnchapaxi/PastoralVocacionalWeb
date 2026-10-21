import { contacto, site } from "@/data/landing";
import { Icon } from "./Icon";
import { Photo, SectionHeading } from "./ui";
import styles from "./landing.module.css";

export function Contacto() {
  return (
    <section id="contacto" className={styles.section} style={{ paddingBottom: 150 }}>
      <div className={`${styles.container} ${styles.contacto}`}>
        <div className={styles.stack} style={{ gap: "var(--space-8)" }}>
          <SectionHeading kicker={contacto.kicker} title={contacto.titulo} lead={contacto.lead} />
          <address className={styles.datos} style={{ fontStyle: "normal" }}>
            <span className={styles.dato}>
              <Icon name="phone" size={22} />
              <span>{site.telefono}</span>
            </span>
            <span className={styles.dato}>
              <Icon name="mail" size={22} />
              <span>{site.correo}</span>
            </span>
            <span className={styles.dato}>
              <Icon name="pin" size={22} />
              <span>
                {site.direccion} · <a href={site.mapaUrl}>Ver en el mapa</a>
              </span>
            </span>
            <span className={styles.dato}>
              <Icon name="calendar" size={22} />
              <span>
                {site.horario} · {site.oracion}
              </span>
            </span>
          </address>
          <Photo alt="[MAPA]" tone="vocacional" className={styles.mapa} />
        </div>

        {/* Conecta el action a tu API route o servicio de formularios */}
        <form className={styles.form} action="#" method="post">
          <div className={styles.form_row}>
            <div className={styles.field}>
              <label htmlFor="nombre">Nombre</label>
              <input id="nombre" name="nombre" type="text" placeholder="Tu nombre" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="telefono">Teléfono</label>
              <input id="telefono" name="telefono" type="tel" placeholder="Tu número" />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="correo">Correo electrónico</label>
            <input id="correo" name="correo" type="email" placeholder="nombre@correo.com" required />
          </div>
          <div className={styles.field}>
            <label htmlFor="parroquia">Parroquia o colegio</label>
            <input id="parroquia" name="parroquia" type="text" placeholder="¿De dónde nos escribes?" />
          </div>
          <div className={styles.field}>
            <label htmlFor="mensaje">Mensaje (opcional)</label>
            <textarea id="mensaje" name="mensaje" placeholder="Cuéntanos brevemente tu inquietud vocacional" />
          </div>
          <button type="submit" className={styles.submit}>
            {contacto.boton}
          </button>
          <p className={styles.small}>{contacto.aviso}</p>
        </form>
      </div>
    </section>
  );
}
