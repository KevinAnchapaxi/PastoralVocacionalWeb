"use client";

import Image, { type ImageProps } from "next/image";
import { cloudinaryLoader, isCloudinarySrc } from "@/lib/cloudinary";

/**
 * `next/image` para fotos de contenido. Las fotos de Cloudinary se redimensionan
 * allí; las de /public se sirven tal cual, porque el sitio se exporta como HTML
 * estático y no tiene el optimizador de imágenes de Next.js.
 * Es un Client Component porque el `loader` es una función.
 */
export function ContentImage({ src, alt, ...props }: Omit<ImageProps, "src" | "loader" | "unoptimized"> & { src: string }) {
  const cloudinary = isCloudinarySrc(src);
  return <Image src={src} alt={alt} loader={cloudinary ? cloudinaryLoader : undefined} unoptimized={!cloudinary} {...props} />;
}
