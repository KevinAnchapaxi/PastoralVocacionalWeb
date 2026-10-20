"use client";

import { useState } from "react";
import Image from "next/image";
import { nav, site } from "@/data/landing";
import { Icon } from "./Icon";
import styles from "./landing.module.css";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header id="inicio" className={styles.nav}>
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
            {nav.map((item, i) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={styles.nav_link} aria-current={i === 0 ? "page" : undefined}>
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
            <a key={item.id} href={`#${item.id}`} className={styles.nav_link} onClick={() => setOpen(false)}>
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
