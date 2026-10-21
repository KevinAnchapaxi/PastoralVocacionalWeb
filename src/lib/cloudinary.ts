/**
 * Entrega de fotos desde Cloudinary.
 *
 * Una foto puede indicarse de tres formas en `src/data/landing.ts`:
 * - Ruta local en /public, p. ej. "/brand/isotipo.png" → la optimiza Next.js.
 * - URL copiada desde Cloudinary, p. ej.
 *   "https://res.cloudinary.com/<cuenta>/image/upload/v1730000000/pastoral/retiro.jpg".
 * - ID público de Cloudinary, p. ej. "pastoral/retiro" (requiere
 *   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME).
 *
 * En los dos últimos casos Cloudinary redimensiona y elige el formato (WebP/AVIF),
 * así que Next.js no vuelve a optimizar la imagen.
 */
import type { ImageLoaderProps } from "next/image";

const CLOUDINARY_HOST = "res.cloudinary.com";
const UPLOAD_SEGMENT = "/image/upload/";

export function isCloudinarySrc(src: string): boolean {
  if (src.startsWith("/")) return false;
  if (/^https?:\/\//.test(src)) return new URL(src).hostname === CLOUDINARY_HOST;
  return true;
}

export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality ?? "auto"}`].join(",");

  if (/^https?:\/\//.test(src)) {
    const index = src.indexOf(UPLOAD_SEGMENT);
    if (index === -1) {
      throw new Error(`La URL de Cloudinary no contiene "${UPLOAD_SEGMENT}": ${src}`);
    }
    const cut = index + UPLOAD_SEGMENT.length;
    return `${src.slice(0, cut)}${params}/${src.slice(cut)}`;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    throw new Error(
      `Falta NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME para mostrar la foto "${src}". Configúrala en .env.local.`,
    );
  }
  return `https://${CLOUDINARY_HOST}/${cloudName}${UPLOAD_SEGMENT}${params}/${src}`;
}
