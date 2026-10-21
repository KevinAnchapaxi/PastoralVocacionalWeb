import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Photo } from "@/components/landing/ui";
import { cloudinaryLoader, isCloudinarySrc } from "@/lib/cloudinary";

const URL_CLOUDINARY = "https://res.cloudinary.com/pastoral/image/upload/v1730000000/galeria/retiro.jpg";

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});

describe("isCloudinarySrc", () => {
  it("distingue fotos de Cloudinary de archivos locales y otros dominios", () => {
    expect(isCloudinarySrc(URL_CLOUDINARY)).toBe(true);
    expect(isCloudinarySrc("galeria/retiro")).toBe(true);
    expect(isCloudinarySrc("/brand/isotipo.png")).toBe(false);
    expect(isCloudinarySrc("https://example.com/foto.jpg")).toBe(false);
  });
});

describe("cloudinaryLoader", () => {
  it("inserta las transformaciones en una URL copiada de Cloudinary", () => {
    expect(cloudinaryLoader({ src: URL_CLOUDINARY, width: 640 })).toBe(
      "https://res.cloudinary.com/pastoral/image/upload/f_auto,c_limit,w_640,q_auto/v1730000000/galeria/retiro.jpg",
    );
  });

  it("respeta la calidad indicada", () => {
    expect(cloudinaryLoader({ src: URL_CLOUDINARY, width: 320, quality: 60 })).toContain("w_320,q_60/");
  });

  it("construye la URL a partir de un ID público y la cuenta configurada", () => {
    vi.stubEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME", "pastoral");
    expect(cloudinaryLoader({ src: "galeria/retiro", width: 1080 })).toBe(
      "https://res.cloudinary.com/pastoral/image/upload/f_auto,c_limit,w_1080,q_auto/galeria/retiro",
    );
  });

  it("explica qué falta si se usa un ID público sin cuenta configurada", () => {
    vi.stubEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME", "");
    expect(() => cloudinaryLoader({ src: "galeria/retiro", width: 640 })).toThrow(
      /NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME/,
    );
  });
});

describe("Photo", () => {
  it("sirve desde Cloudinary las fotos alojadas allí", () => {
    render(<Photo src={URL_CLOUDINARY} alt="Retiro vocacional" sizes="50vw" />);

    const img = screen.getByRole("img", { name: "Retiro vocacional" });
    expect(img.getAttribute("src")).toMatch(/^https:\/\/res\.cloudinary\.com\/pastoral\/image\/upload\/f_auto,/);
    expect(img.getAttribute("srcset")).toContain("w_640");
  });
});
