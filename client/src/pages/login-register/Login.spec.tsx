import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as authApi from "../../features/api/authApi";
// import { loginUser } from "../../features/authSlice";
import { store } from "../../store/store";
import { Login } from "./Login";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ state: { from: { pathname: "dash" } } }),
  };
});

// Mock Redux dispatch
vi.mock("../../store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => mockUseSelector,
}));
const mockDispatch = vi.fn();
const mockUseSelector = vi.fn().mockReturnValue({ isAuthenticated: false });

const user = userEvent.setup();

describe.only("Login.tsx", () => {
  const mockLogin = vi.fn();
  const mockFetchSession = vi.fn();
  const fetchSessionFn = vi.fn();

  beforeEach(() => {
    vi.spyOn(authApi, "useLoginMutation").mockReturnValue([
      mockLogin,
      {
        isLoading: false,
        isError: false,
        isSuccess: false,
        error: null,
        reset: vi.fn(),
      },
    ]);

    fetchSessionFn.mockReturnValue({
      unwrap: () =>
        Promise.resolve({
          success: true,
          data: {
            id: 123,
            username: "testuser",
            email: "testi@ukko.com",
            role: "Guest",
          },
        }),
    });

    vi.spyOn(authApi, "useLazyGetSessionUserQuery").mockReturnValue([
      fetchSessionFn as unknown as ReturnType<
        typeof authApi.useLazyGetSessionUserQuery
      >[0],
      {
        isLoading: false,
        data: null,
        reset: vi.fn(),
        isSuccess: false,
        isError: false,
        error: null,
      },
      { lastArg: undefined },
    ]);

    mockLogin.mockReset();
    mockFetchSession.mockReset();
    mockDispatch.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderComponent = () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>,
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
    mockLogin.mockResolvedValue({ success: true });

    renderComponent();

    const usernameInput = screen.getByRole("textbox", {
      name: /username \/ email/i,
    });
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    await user.type(usernameInput, "testuser");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        login: "testuser",
        password: "password123",
      });
    });
  });
});
