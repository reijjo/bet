import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { Register } from "./Register";

const user = userEvent.setup();

describe("Register", () => {
  it("renders component", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("Start tracking your bets at Tärpit"),
    ).toBeInTheDocument();
  });

  it("handles email input", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );

    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();

    await user.type(emailInput, "repe@repe.com");

    expect(emailInput).toHaveValue("repe@repe.com");
  });

  it("register button submits form", async () => {
    const consoleSpy = vi.spyOn(console, "log");

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );

    const emailInput = screen.getByLabelText("Email");
    const registerButton = screen.getByText("sign up");

    await user.type(emailInput, "repe@repe.com");
    await user.click(registerButton);

    expect(consoleSpy).toHaveBeenCalledWith(
      "Registering with email:",
      "repe@repe.com",
    );
  });
});
