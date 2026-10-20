"use client";

import Image, { type ImageProps } from "next/image";
import { cloudinaryLoader, isCloudinarySrc } from "@/lib/cloudinary";

/**
 * `next/image` para fotos de contenido: usa Cloudinary cuando la foto está allí
 * y la optimización de Next.js cuando está en /public.
 * Es un Client Component porque el `loader` es una función.
 */
export function ContentImage({ src, alt, ...props }: Omit<ImageProps, "src" | "loader"> & { src: string }) {
  return <Image src={src} alt={alt} loader={isCloudinarySrc(src) ? cloudinaryLoader : undefined} {...props} />;
}
