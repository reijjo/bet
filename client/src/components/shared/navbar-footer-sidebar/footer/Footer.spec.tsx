import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";

import { Footer } from "./Footer";

describe("Footer", async () => {
  test("renders Footer", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const copyright = screen.getByText(/2024 Reijjo/i);
    expect(copyright).toBeInTheDocument();
  });

  test("adds numbers", () => {
    expect(1 + 1).toBe(2);
  });
});
