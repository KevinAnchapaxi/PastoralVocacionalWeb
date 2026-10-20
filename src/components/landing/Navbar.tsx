"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { nav, site } from "@/data/landing";
import { Icon } from "./Icon";
import styles from "./landing.module.css";

/**
 * Sección que cruza una franja delgada al 40 % del alto de la pantalla. Las
 * secciones sin enlace en el menú (Instagram, Otras áreas) no marcan ninguno.
 */
function useSeccionActiva() {
  const [activa, setActiva] = useState<string>(nav[0].id);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiva(visible.target.id);
      },
      { rootMargin: "-40% 0px -59% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return activa;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const activa = useSeccionActiva();

  return (
    <header className={styles.nav}>
      <div className={`${styles.container} ${styles.nav_inner}`}>
        <a href="#inicio" aria-label={`${site.nombre}, ${site.organizacion}`}>
          <Image
            src="/brand/logotipo-principal.png"
            alt={`${site.nombre}, ${site.organizacion}`}
            width={580}
            height={627}
            priority
            className={styles.nav_logo}
          />
        </a>

        <nav aria-label="Principal">
          <ul className={styles.nav_links}>
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={styles.nav_link} aria-current={item.id === activa ? "location" : undefined}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href={site.whatsappUrl} className={`${styles.btn} ${styles.btn_accent} ${styles.nav_cta}`}>
          <Icon name="phone" size={20} />
          Escríbenos
        </a>

        <button
          type="button"
          className={styles.nav_toggle}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open ? (
        <nav id="menu-movil" aria-label="Principal (móvil)" className={`${styles.container} ${styles.nav_mobile}`}>
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={styles.nav_link}
              aria-current={item.id === activa ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href={site.whatsappUrl} className={`${styles.btn} ${styles.btn_accent}`} onClick={() => setOpen(false)}>
            <Icon name="phone" size={20} />
            Escríbenos
          </a>
        </nav>
      ) : null}
    </header>
  );
}
