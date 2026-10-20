import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import Home from "@/app/page";
import { areasPastorales } from "@/data/areas-pastorales";
import { hero } from "@/data/landing";
import { testimonios } from "@/data/testimonios";

afterEach(cleanup);

describe("portada", () => {
  it("presenta la identidad y la estructura principal en español", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1, name: hero.titulo })).toBeDefined();
    expect(screen.getByText(hero.slogan)).toBeDefined();
    expect(screen.getByRole("banner")).toBeDefined();
    expect(screen.getByRole("main")).toBeDefined();
    expect(screen.getByRole("contentinfo")).toBeDefined();
  });

  it("muestra las secciones en el orden acordado, con Equipo y Contacto al final", () => {
    render(<Home />);

    const titulos = within(screen.getByRole("main"))
      .getAllByRole("heading", { level: 2 })
      .map((h) => h.textContent);
    expect(titulos).toEqual([
      "¿Qué es la Pastoral Vocacional?",
      "¿Para qué existe la Pastoral Vocacional?",
      "Historias de quienes escucharon el llamado",
      "Nuestro día a día en Instagram",
      "Otras áreas pastorales",
      "Personas que caminan contigo",
      "Agenda una conversación",
    ]);
  });

  it("deja marcadores accesibles para los videos pendientes", () => {
    render(<Home />);

    expect(screen.getByRole("img", { name: "Video pendiente: ¿Qué es la Pastoral Vocacional?" })).toBeDefined();
    expect(screen.getByRole("img", { name: `Video pendiente: ${testimonios.video.titulo}` })).toBeDefined();
  });

  it("marca los testimonios provisionales", () => {
    render(<Home />);

    const provisionales = testimonios.lista.filter((t) => t.provisional).length;
    expect(screen.getAllByText("Testimonio de ejemplo")).toHaveLength(provisionales);
  });

  it("enlaza las otras áreas pastorales en pestaña nueva, sin incluir la Vocacional", () => {
    render(<Home />);

    const seccion = screen.getByRole("heading", { level: 2, name: "Otras áreas pastorales" }).closest("section")!;
    const enlaces = within(seccion).getAllByRole("link");
    expect(enlaces).toHaveLength(areasPastorales.lista.length);
    for (const enlace of enlaces) {
      expect(enlace.getAttribute("target")).toBe("_blank");
      expect(enlace.getAttribute("rel")).toContain("noopener");
      expect(enlace.getAttribute("href")).not.toContain("pastoral-vocacional");
    }
  });
});
