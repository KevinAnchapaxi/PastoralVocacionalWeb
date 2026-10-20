import Image from "next/image";
import type { ReactNode } from "react";
import type { Tone } from "@/data/landing";
import { ContentImage } from "./ContentImage";
import { Icon } from "./Icon";
import styles from "./landing.module.css";

/* ---------- Botón ---------- */
export function Button({
  href,
  variant = "primary",
  size = "md",
  external = false,
  children,
}: {
  href: string;
  variant?: "primary" | "accent" | "outline" | "white";
  size?: "md" | "lg";
  /** Abre en una pestaña nueva. */
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={`${styles.btn} ${styles[`btn_${variant}`]} ${size === "lg" ? styles.btn_lg : ""}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

/* ---------- Encabezado de sección ---------- */
export function SectionHeading({
  kicker,
  title,
  lead,
  center = false,
  dark = false,
}: {
  kicker: string;
  title: string;
  lead?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div
      className={`${styles.heading} ${center ? styles.heading_center : ""} ${dark ? styles.heading_dark : ""}`}
    >
      <p className={styles.kicker}>{kicker}</p>
      <h2 className={styles.h2}>{title}</h2>
      <div className={styles.rule} aria-hidden="true" />
      {lead ? <p className={styles.lead}>{lead}</p> : null}
    </div>
  );
}

/* ---------- Círculo de icono ---------- */
export const toneVar: Record<Tone, string> = {
  mar: "var(--azul-mar-profundo)",
  vocacional: "var(--azul-vocacional)",
  rojo: "var(--rojo-compromiso)",
  cafe: "var(--cafe-mision)",
};

/* ---------- Foto o marcador ---------- */
export function Photo({
  src,
  alt,
  tone = "mar",
  className,
  sizes = "100vw",
  priority = false,
}: {
  src?: string;
  alt: string;
  tone?: Tone;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={`${styles.photo} ${className ?? ""}`}>
        <ContentImage src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover" }} />
      </div>
    );
  }
  return (
    <div
      className={`${styles.photo} ${styles.photo_placeholder} ${className ?? ""}`}
      style={{ background: toneVar[tone] }}
      role="img"
      aria-label={alt}
    >
      <Image src="/brand/isotipo.png" alt="" width={160} height={161} className={styles.photo_mark} />
      <span className={styles.photo_label}>{alt}</span>
    </div>
  );
}

/* ---------- Video o marcador ---------- */
const YOUTUBE_ID = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/;

/**
 * Video 16:9. Mientras `src` esté vacío muestra un marcador.
 *
 * VIDEO PENDIENTE → para publicarlo, completa `src` en el archivo de datos:
 *   - Archivo propio en public/video/:  src: "/video/que-es.mp4", poster: "/video/que-es.jpg"
 *   - YouTube:                          src: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
 * No hace falta tocar este componente ni la sección.
 */
export function Video({
  src,
  poster,
  title,
  className,
}: {
  src?: string;
  poster?: string;
  title: string;
  className?: string;
}) {
  const youtubeId = src?.match(YOUTUBE_ID)?.[1];
  if (youtubeId) {
    return (
      <div className={`${styles.video} ${className ?? ""}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={title}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  if (src) {
    return (
      <div className={`${styles.video} ${className ?? ""}`}>
        <video src={src} poster={poster || undefined} controls playsInline preload="none" aria-label={title} />
      </div>
    );
  }
  return (
    <div className={`${styles.video} ${styles.video_placeholder} ${className ?? ""}`} role="img" aria-label={`Video pendiente: ${title}`}>
      <span className={styles.video_play}>
        <Icon name="play" size={32} filled />
      </span>
      <span className={styles.photo_label}>[VIDEO: {title}]</span>
    </div>
  );
}

/* ---------- Ola decorativa del manual ---------- */
export function Wave({ flip = false, className }: { flip?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`${styles.wave} ${flip ? styles.wave_flip : ""} ${className ?? ""}`}
    >
      <path fill="var(--azul-ola)" d="M0,64 C240,120 480,0 720,48 C960,96 1200,24 1440,72 L1440,120 L0,120 Z" />
      <path fill="var(--azul-ola-brillo)" d="M0,92 C300,130 560,40 820,76 C1080,112 1260,60 1440,96 L1440,120 L0,120 Z" />
      <path fill="none" stroke="var(--blanco-decision)" strokeWidth="4" d="M0,80 C260,126 500,28 760,64 C1020,100 1220,44 1440,84" />
    </svg>
  );
}
