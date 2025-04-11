import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as userApi from "../../features/api/userApi";
import * as registerSlice from "../../features/registerSlice";
// import { useAppSelector } from "../../store/hooks";
import { store } from "../../store/store";
import { Register } from "./Register";

const mockNavigate = vi.fn();
const user = userEvent.setup();
let mockLocationState: { from: { pathname: string } } | undefined = {
  from: { pathname: "/dash" },
};

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ state: mockLocationState }),
  };
});

let mockIsAuthenticated = false;
vi.mock("../../store/hooks", () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: () => ({ isAuthenticated: mockIsAuthenticated }),
}));

describe("Register", () => {
  const mockSetRegister = vi.fn();
  const mockCheckDuplicateEmail = vi.fn();

  beforeEach(() => {
    mockIsAuthenticated = false;
    mockLocationState = { from: { pathname: "/dash" } };

    vi.spyOn(userApi, "useLazyGetUserByEmailQuery").mockReturnValue([
      mockCheckDuplicateEmail,
      {
        data: null,
        isLoading: false,
        isError: false,
        error: null,
        reset: vi.fn(),
      },
      { lastArg: undefined },
    ]);

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
      {
        data: null,
        isLoading: true,
        isError: false,
        error: null,
        reset: vi.fn(),
      },
      { lastArg: undefined },
    ]);

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
        reset: vi.fn(),
      },
      { lastArg: undefined },
    ]);

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

  it("redirects if user is already authenticated", async () => {
    mockIsAuthenticated = true;
    renderComponent();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dash", { replace: true });
    });
  });

  it("onSubmit random error", () => {
    mockCheckDuplicateEmail.mockRejectedValue(
      new Error("Something went wrong"),
    );

    renderComponent();
  });
});
