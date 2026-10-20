import Image from "next/image";
import { footer, site } from "@/data/landing";
import { Wave } from "./ui";
import styles from "./landing.module.css";

export function Footer() {
  return (
    <footer className={styles.footer} style={{ marginTop: -110 }}>
      <div className={styles.footer_waveWrap}>
        <Wave flip />
      </div>
      <div className={`${styles.container} ${styles.footer_grid}`}>
        <div className={styles.footer_brand}>
          <Image
            src="/brand/logotipo-negativo-blanco.png"
            alt={`${site.nombre}, ${site.organizacion}`}
            width={833}
            height={898}
            className={styles.footer_logo}
          />
          <p className={`${styles.small} ${styles.footer_muted}`} style={{ maxWidth: 360 }}>
            {footer.descripcion}
          </p>
          <p className={styles.quote} style={{ fontSize: 20, lineHeight: "28px" }}>
            {site.lema} — {site.cita}
          </p>
        </div>

        {footer.columnas.map((col) => (
          <div key={col.titulo} className={styles.footer_col}>
            <p className={styles.kicker}>{col.titulo}</p>
            {col.enlaces.map((e) => (
              <a key={e.label} href={e.href}>
                {e.label}
              </a>
            ))}
          </div>
        ))}

        <div className={styles.footer_col}>
          <p className={styles.kicker}>Contacto</p>
          <span>{site.telefono}</span>
          <span>{site.correo}</span>
          <span>{site.direccion}</span>
        </div>

        <div className={styles.footer_col}>
          <p className={styles.kicker}>Redes</p>
          {site.redes.map((r) => (
            <a key={r.nombre} href={r.url}>
              {r.nombre}
            </a>
          ))}
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.footer_legal}>
          © {new Date().getFullYear()} {site.nombre} · {site.organizacion}
        </div>
      </div>
    </footer>
  );
}
