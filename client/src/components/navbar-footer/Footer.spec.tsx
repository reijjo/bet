import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Footer } from "./Footer";

describe("Footer", async () => {
  test("renders Footer", () => {
    render(<Footer />);

    const copyright = screen.getByText(/2024 Reijjo/i);
    expect(copyright).toBeInTheDocument();
  });

  test("adds numbers", () => {
    expect(1 + 1).toBe(2);
  });
});
