import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { Verify } from "./Verify";

describe("Verify", () => {
  it("should render", () => {
    render(
      <MemoryRouter>
        <Verify />
      </MemoryRouter>,
    );

    expect(screen.getByText("Create account")).toBeInTheDocument();
  });
});
