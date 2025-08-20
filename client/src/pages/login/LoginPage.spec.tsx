import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as authApi from "../../features/api/authApi";
import * as loginApi from "../../features/login/api/loginApiSlice";
import { loginUser } from "../../features/slices/authSlice";
import { store } from "../../store/store";
import { UserRoles } from "../../utils/enums";
import Login from "./LoginPage";

const mockNavigate = vi.fn();
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

const mockDispatch = vi.fn();
let mockIsAuthenticated = false;

vi.mock("../../store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => ({ isAuthenticated: mockIsAuthenticated }),
}));

const user = userEvent.setup();

describe("Login.tsx", () => {
  const mockLogin = vi.fn();
  const mockFetchSession = vi.fn();

  beforeEach(() => {
    mockIsAuthenticated = false;
    mockLocationState = { from: { pathname: "/dash" } };

    vi.spyOn(loginApi, "useLoginMutation").mockReturnValue([
      mockLogin,
      {
        isLoading: false,
        isError: false,
        isSuccess: false,
        error: null,
        reset: vi.fn(),
      },
    ]);
    vi.spyOn(authApi, "useLazyGetSessionUserQuery").mockReturnValue([
      mockFetchSession,
      { isLoading: false, reset: vi.fn() },
      { lastArg: undefined },
    ]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    mockLogin.mockReset();
    mockFetchSession.mockReset();
    mockDispatch.mockReset();
    mockNavigate.mockReset();
  });

  const renderComponent = () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
  };

  it("renders component", () => {
    renderComponent();
    expect(screen.getByText(/nice to have you here/i)).toBeInTheDocument();
  });

  it("empty login fields", async () => {
    renderComponent();

    const submitButton = screen.getByRole("button", {
      name: "Login",
    });
    await user.click(submitButton);
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it("successful login", async () => {
    mockLogin.mockResolvedValue({
      unwrap: () => Promise.resolve({ success: true }),
    });
    mockFetchSession.mockReturnValue({
      unwrap: () => Promise.resolve({ success: false }),
    });

    renderComponent();

    const usernameInput = screen.getByLabelText(/username \/ email/i);
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    await user.type(usernameInput, "  TestUser  ");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        login: "testuser", // Should be trimmed and lowercased
        password: "password123",
      });
    });
  });

  it("dispatches loginUser and navigates on successful session fetch", async () => {
    // Test lines 68-70
    const mockUserData = {
      id: 1,
      username: "testuser",
      email: "test@ukko.com",
      role: UserRoles.Guest,
    };
    mockLogin.mockImplementation(() => ({
      unwrap: () => Promise.resolve({ success: true }),
    }));
    mockFetchSession.mockReturnValue({
      unwrap: () =>
        Promise.resolve({
          success: true,
          data: mockUserData,
        }),
    });

    renderComponent();

    const usernameInput = screen.getByLabelText(/username \/ email/i);
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    await user.type(usernameInput, "testuser");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(
      () => {
        expect(mockDispatch).toHaveBeenCalledWith(loginUser(mockUserData));
        expect(mockNavigate).toHaveBeenCalledWith("/dash", { replace: true });
      },
      { timeout: 2000 }
    );
  });

  it("redirects if user is already authenticated", async () => {
    mockIsAuthenticated = true;
    renderComponent();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dash", { replace: true });
    });
  });

  it("navigates to default '/dash' when location state is undefined", async () => {
    // Set location state to undefined to test fallback
    mockLocationState = undefined;

    const mockUserData = {
      id: 1,
      username: "testuser",
      email: "test@ukko.com",
      role: UserRoles.Guest,
    };

    mockLogin.mockImplementation(() => ({
      unwrap: () => Promise.resolve({ success: true }),
    }));

    mockFetchSession.mockReturnValue({
      unwrap: () =>
        Promise.resolve({
          success: true,
          data: mockUserData,
        }),
    });

    renderComponent();

    const usernameInput = screen.getByLabelText(/username \/ email/i);
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    await user.type(usernameInput, "testuser");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      // Should navigate to default /dash when location state is undefined
      expect(mockNavigate).toHaveBeenCalledWith("/dash", { replace: true });
    });
  });
});
