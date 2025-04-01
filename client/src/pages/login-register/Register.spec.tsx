import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as userApi from "../../features/api/userApi";
import * as registerSlice from "../../features/registerSlice";
import { store } from "../../store/store";
import { Register } from "./Register";

if (process.env.NODE_ENV === "test") {
  console.log = function () {};
  console.error = function () {};
}

const mockNavigate = vi.fn();
const user = userEvent.setup();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Register", () => {
  const mockSetRegister = vi.fn();
  const mockCheckDuplicateEmail = vi.fn();

  beforeEach(() => {
    (useNavigate as any).mockReturnValue(mockNavigate);

    vi.spyOn(userApi, "useLazyGetUserByEmailQuery").mockReturnValue([
      mockCheckDuplicateEmail,
      {
        data: null,
        isLoading: false,
        isError: false,
        error: null,
      },
    ] as any);

    vi.spyOn(registerSlice, "setRegister").mockImplementation(mockSetRegister);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    mockNavigate.mockReset();
    mockSetRegister.mockReset();
    mockCheckDuplicateEmail.mockReset();
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
      const errorElement = screen.getByRole("alert");
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent("Invalid email");
    });
  });

  it("shows loading state while checking email", async () => {
    vi.spyOn(userApi, "useLazyGetUserByEmailQuery").mockReturnValue([
      mockCheckDuplicateEmail,
      { data: null, isLoading: true, isError: false, error: null },
    ] as any);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("Checking email...")).toBeInTheDocument();
    });
  });

  it("shows error when email is already in use", async () => {
    vi.spyOn(userApi, "useLazyGetUserByEmailQuery").mockReturnValue([
      mockCheckDuplicateEmail,
      {
        data: null,
        isLoading: false,
        isError: true,
        error: { status: 409, data: { message: "Email already in use" } },
      },
    ] as any);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("Email already in use")).toBeInTheDocument();
    });
  });

  it("handles successful submission and navigates to next step", async () => {
    mockCheckDuplicateEmail.mockResolvedValue({
      isSuccess: true,
      data: null,
    });

    renderComponent();

    const emailInput = screen.getByLabelText("Email");
    const registerButton = screen.getByText("sign up");

    await user.type(emailInput, "test@example.com");
    await user.click(registerButton);

    await waitFor(() => {
      expect(mockCheckDuplicateEmail).toHaveBeenCalledWith("test@example.com");

      expect(mockSetRegister).toHaveBeenCalledWith({
        email: "test@example.com",
      });
    });
  });
});
