import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test } from "vitest";

import { Navbar } from "./Navbar";

beforeEach(() => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );
});

describe("Navbar", async () => {
  test("renders Navbar", () => {
    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();
  });

  test("renders NavLinks", () => {
    const navLinks = screen.getAllByRole("link");
    expect(navLinks).toHaveLength(3);
    expect(navLinks[0]).toHaveTextContent(/tärpit/i);
    expect(navLinks[1]).toHaveTextContent(/login/i);
    expect(navLinks[2]).toHaveTextContent(/sign up/i);
  });
});
