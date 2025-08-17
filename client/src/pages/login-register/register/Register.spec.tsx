import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as userApi from "../../../features/api/userApi";
import * as registerSlice from "../../../features/registerSlice";
import { store } from "../../../store/store";
import Register from "./Register";

if (process.env.NODE_ENV === "test") {
  console.log = function () {};
  console.error = function () {};
}

const user = userEvent.setup();
const mockNavigate = vi.fn();

let mockLocationState: { from: { pathname: string } } | undefined = {
  from: { pathname: "/dash" },
};
let mockIsAuthenticated = false;

// Mocking react-router-dom's useNavigate and useLocation
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ state: mockLocationState }),
  };
});

// Mocking the useAppDispatch and useAppSelector hooks
vi.mock("../../../store/hooks", () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: () => ({ isAuthenticated: mockIsAuthenticated }),
}));

const renderComponent = () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </Provider>
  );
};

describe("Register.tsx", () => {
  const mockCheckDuplicateEmail = vi.fn();
  const mockSetRegister = vi.fn();

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
    mockCheckDuplicateEmail.mockReset();
    mockSetRegister.mockReset();
    mockNavigate.mockReset();
  });

  // SUCCESSFUL STUFF
  describe("successful stuff", () => {
    it("renders component", () => {
      renderComponent();
      expect(
        screen.getByText("Start tracking your bets at Tärpit")
      ).toBeInTheDocument();
    });

    it("handles successful submission", async () => {
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
        expect(mockCheckDuplicateEmail).toHaveBeenCalledWith(
          "test@example.com"
        );

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

    it("navigates to /register/finish after successful email check", async () => {
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
        expect(mockNavigate).toHaveBeenCalledWith("/register/finish", {
          replace: true,
        });
      });
    });
  });

  // ERROR HANDLING
  describe("error handling", () => {
    it("onSubmit random error", async () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      // Make checkDuplicateEmail throw an error
      const testError = new Error("Network error");
      mockCheckDuplicateEmail.mockRejectedValue(testError);

      renderComponent();

      const emailInput = screen.getByLabelText("Email");
      const registerButton = screen.getByText("sign up");

      await user.type(emailInput, "test@example.com");
      await user.click(registerButton);

      await waitFor(() => {
        expect(mockCheckDuplicateEmail).toHaveBeenCalledWith(
          "test@example.com"
        );
        expect(consoleSpy).toHaveBeenCalledWith(
          "Verification error:",
          testError
        );
      });

      consoleSpy.mockRestore();
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
  });

  // EDGE CASES
  describe("edge cases for coverage", () => {
    it("uses default redirect path when location.state is undefined", async () => {
      // Set mockLocationState to undefined to trigger the fallback
      mockLocationState = undefined;
      mockIsAuthenticated = true;

      renderComponent();

      await waitFor(() => {
        // This will test the || "/dash" fallback on line 35
        expect(mockNavigate).toHaveBeenCalledWith("/dash", { replace: true });
      });
    });
  });
});
