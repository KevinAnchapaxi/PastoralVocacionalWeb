import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sitio 100 % estático: `next build` genera la carpeta out/ que publica Cloudflare Pages.
  // Sin servidor no hay optimizador de imágenes: las fotos usan Cloudinary
  // (src/lib/cloudinary.ts) y los logos de public/brand/ son WebP ya reducidos.
  output: "export",
};

export default nextConfig;
