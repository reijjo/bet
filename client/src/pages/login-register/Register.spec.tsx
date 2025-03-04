import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { store } from "../../store/store";
import { Register } from "./Register";

const user = userEvent.setup();

describe.only("Register", () => {
  const renderComponent = () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>,
    );
  };

  it("renders component", () => {
    renderComponent();

    expect(
      screen.getByText("Start tracking your bets at Tärpit"),
    ).toBeInTheDocument();
  });

  it("handles email input", async () => {
    renderComponent();

    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();

    await user.type(emailInput, "repe@repe.com");

    expect(emailInput).toHaveValue("repe@repe.com");
  });

  it("throws invalid email error", async () => {
    renderComponent();

    const emailInput = screen.getByLabelText("Email");
    const registerButton = screen.getByText("sign up");

    await user.type(emailInput, "repe@repe");
    await user.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
    });
  });
});
