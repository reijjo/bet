import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as authApi from "../../features/api/authApi";
import { store } from "../../store/store";
import { Register } from "./Register";

const user = userEvent.setup();

describe.only("Register", () => {
  beforeEach(() => {
    vi.spyOn(authApi, "useRegisterMutation").mockReturnValue([
      vi.fn().mockImplementation(() => ({
        unwrap: vi
          .fn()
          .mockResolvedValue({ message: "Registered successfully" }),
      })),
      { isLoading: false, isError: false, error: null, reset: vi.fn() },
    ]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

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

  it("shows invalid email error", async () => {
    renderComponent();

    const emailInput = screen.getByLabelText("Email");
    const registerButton = screen.getByText("sign up");

    await user.type(emailInput, "repe@repe");
    await user.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
    });
  });

  it("handles registration error", async () => {
    vi.spyOn(authApi, "useRegisterMutation").mockReturnValue([
      vi.fn().mockImplementation(() => ({
        unwrap: vi.fn().mockRejectedValue({
          data: { message: "Email already in use" },
        }),
      })),
      {
        isLoading: false,
        isError: true,
        error: { data: { message: "Email already in use" } },
        reset: vi.fn(),
      },
    ]);

    renderComponent();
    const emailInput = screen.getByLabelText("Email");
    const registerButton = screen.getByText("sign up");

    await user.type(emailInput, "repe@repe.com");
    await user.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText("Email already in use")).toBeInTheDocument();
    });
  });

  it("handles successful registration", async () => {
    vi.spyOn(authApi, "useRegisterMutation").mockReturnValue([
      vi.fn().mockImplementation(() => ({
        unwrap: vi
          .fn()
          .mockResolvedValue({ message: "Registered successfully" }),
      })),
      { isLoading: false, isError: false, error: null, reset: vi.fn() },
    ]);

    renderComponent();
    const emailInput = screen.getByLabelText("Email");
    const registerButton = screen.getByText("sign up");

    await user.type(emailInput, "repe@repe.com");
    await user.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText("Registered successfully")).toBeInTheDocument();
    });
  });

  it('shows "Registering..." text', async () => {
    vi.spyOn(authApi, "useRegisterMutation").mockReturnValue([
      vi.fn().mockImplementation(() => ({
        unwrap: vi
          .fn()
          .mockResolvedValue({ message: "Registered successfully" }),
      })),
      { isLoading: true, isError: false, error: null, reset: vi.fn() },
    ]);

    renderComponent();

    const emailInput = screen.getByLabelText("Email");
    const registerButton = screen.getByText("sign up");

    await user.type(emailInput, "repe@repe.com");
    await user.click(registerButton);

    expect(screen.getByText("Registering...")).toBeInTheDocument();
  });

  it("shows input error when registration fails", async () => {
    vi.spyOn(authApi, "useRegisterMutation").mockReturnValue([
      vi.fn().mockImplementation(() => ({
        unwrap: vi.fn().mockRejectedValue({
          data: { message: "Something went wrong" },
        }),
      })),
      {
        isLoading: false,
        isError: true,
        error: { data: { message: "Something went wrong" } },
        reset: vi.fn(),
      },
    ]);

    renderComponent();
    const emailInput = screen.getByLabelText("Email");
    const registerButton = screen.getByText("sign up");

    await user.type(emailInput, "repe@repe.com");
    await user.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });
  });
});
