import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import Home from "@/app/page";
import { hero } from "@/data/landing";

afterEach(cleanup);

describe("portada", () => {
  it("presenta la identidad y la estructura principal en español", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: hero.titulo }),
    ).toBeDefined();
    expect(screen.getByRole("banner")).toBeDefined();
    expect(screen.getByRole("main")).toBeDefined();
    expect(screen.getByRole("contentinfo")).toBeDefined();
    expect(
      screen.getByRole("link", { name: "Agenda una conversación" }),
    ).toBeDefined();
  });
});
