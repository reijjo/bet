import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as authApi from "../../features/api/authApi";
import { store } from "../../store/store";
import { Login } from "./Login";

if (process.env.NODE_ENV === "test") {
  console.log = function () {};
  console.error = function () {};
}

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock Redux dispatch
vi.mock("../../store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
}));
const mockDispatch = vi.fn();

const user = userEvent.setup();

describe("Login.tsx", () => {
  const mockLogin = vi.fn();
  const mockRefetch = vi.fn();
  const mockDispatch = vi.fn();

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

    vi.spyOn(authApi, "useGetSessionUserQuery").mockReturnValue({
      refetch: mockRefetch,
    });

    mockLogin.mockReset();
    mockRefetch.mockReset();
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
    expect(screen.getByText(/login to track your bets/i)).toBeInTheDocument();
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
    mockRefetch.mockReturnValue({
      unwrap: () =>
        Promise.resolve({
          success: true,
          data: { id: 123, username: "testuser" },
        }),
    });

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

    // await waitFor(() => {
    //   expect(mockRefetch).toHaveBeenCalled();
    //   expect(mockDispatch).toHaveBeenCalled();
    //   expect(mockNavigate).toHaveBeenCalledWith("/dash");
    // });
  });
});
