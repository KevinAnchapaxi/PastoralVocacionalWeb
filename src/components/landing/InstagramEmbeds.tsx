"use client";

import { useEffect, useRef } from "react";
import styles from "./landing.module.css";

const EMBED_SCRIPT = "https://www.instagram.com/embed.js";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

/**
 * Embeds oficiales de Instagram. El script de Meta (pesado y con cookies) solo se
 * descarga cuando la sección está por entrar en pantalla. Sin JavaScript, o si
 * Instagram falla, cada recuadro queda como enlace a la publicación.
 */
export function InstagramEmbeds({ publicaciones }: { publicaciones: string[] }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const lista = ref.current;
    if (!lista || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        } else if (!document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) {
          const script = document.createElement("script");
          script.src = EMBED_SCRIPT;
          script.async = true;
          document.body.appendChild(script);
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(lista);
    return () => observer.disconnect();
  }, []);

  return (
    <ul ref={ref} className={styles.instagram_grid}>
      {publicaciones.map((url) => (
        <li key={url}>
          <blockquote className={`instagram-media ${styles.instagram_embed}`} data-instgrm-permalink={url} data-instgrm-version="14">
            <a href={url} target="_blank" rel="noopener noreferrer">
              Ver esta publicación en Instagram
            </a>
          </blockquote>
        </li>
      ))}
    </ul>
  );
}
