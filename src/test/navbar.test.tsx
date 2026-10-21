import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Home from "@/app/page";

type Callback = (entries: Partial<IntersectionObserverEntry>[]) => void;

let notificar: Callback;

beforeEach(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: Callback) {
        notificar = callback;
      }
      observe() {}
      disconnect() {}
    },
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function entrarEn(id: string) {
  act(() => notificar([{ isIntersecting: true, target: document.getElementById(id)! }]));
}

describe("menú principal", () => {
  it("marca la sección que se está viendo", () => {
    render(<Home />);
    const menu = screen.getByRole("navigation", { name: "Principal" });
    const activo = () => menu.querySelector('[aria-current="location"]')?.textContent;

    expect(activo()).toBe("Inicio");

    entrarEn("para-que");
    expect(activo()).toBe("Misión");

    entrarEn("contacto");
    expect(activo()).toBe("Contáctanos");
  });

  it("no marca ningún enlace en secciones que no están en el menú", () => {
    render(<Home />);
    const menu = screen.getByRole("navigation", { name: "Principal" });

    entrarEn("instagram");
    expect(menu.querySelector("[aria-current]")).toBeNull();
  });
});
