import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as userApi from "../../features/api/userApi";
import { store } from "../../store/store";
import FinishRegister from "./FinishRegister";

if (process.env.NODE_ENV === "test") {
  console.log = function () {};
  console.error = function () {};
}

const user = userEvent.setup();

const renderComponent = () => {
  const customStore = {
    ...store,
    getState: () => ({
      ...store.getState(),
      register: { email: "testi@ukko.com" },
    }),
  };

  render(
    <Provider store={customStore}>
      <MemoryRouter>
        <FinishRegister />
      </MemoryRouter>
    </Provider>
  );
};

describe("FinishRegister.tsx", () => {
  const mockRegisterUser = vi.fn();

  beforeEach(() => {
    vi.spyOn(userApi, "useRegisterUserMutation").mockReturnValue([
      mockRegisterUser,
      { isLoading: false, isError: false, error: null, reset: vi.fn() },
    ]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    mockRegisterUser.mockReset();
  });

  describe("successful stuff", () => {
    it("renders component", () => {
      renderComponent();

      expect(
        screen.getByRole("heading", { name: /finish your account/i })
      ).toBeInTheDocument();
    });

    it("calls registerUser on submit", async () => {
      const mockRegisterUserResult = {
        unwrap: () =>
          Promise.resolve({ message: "Account created successfully" }),
      };
      mockRegisterUser.mockReturnValue(mockRegisterUserResult);

      vi.spyOn(userApi, "useRegisterUserMutation").mockReturnValue([
        mockRegisterUser,
        { isLoading: false, isError: false, error: null, reset: vi.fn() },
      ]);

      renderComponent();

      const usernameInput = screen.getByRole("textbox", { name: /username/i });
      const passwordInput = screen.getByLabelText("Password");
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const submitButton = screen.getByRole("button", {
        name: /create account/i,
      });

      await user.type(usernameInput, "testuser");
      await user.type(passwordInput, "Password123!");
      await user.type(confirmPasswordInput, "Password123!");
      await user.click(submitButton);

      expect(mockRegisterUser).toHaveBeenCalledWith({
        username: "testuser",
        password: "Password123!",
        password2: "Password123!",
        email: "testi@ukko.com",
      });

      expect(
        await screen.findByText("Account created successfully")
      ).toBeInTheDocument();
    });

    it("shows isLoading state when submitting", async () => {
      vi.spyOn(userApi, "useRegisterUserMutation").mockReturnValue([
        mockRegisterUser,
        { isLoading: true, isError: false, error: null, reset: vi.fn() },
      ]);

      renderComponent();

      expect(
        await screen.findByText("Creating your account...")
      ).toBeInTheDocument();
    });
  });

  describe("error cases", () => {
    it("shows error message when registration fails", async () => {
      const mockRegisterUserResult = {
        unwrap: () =>
          Promise.reject({ data: { message: "Registration failed" } }),
      };
      mockRegisterUser.mockReturnValue(mockRegisterUserResult);

      vi.spyOn(userApi, "useRegisterUserMutation").mockReturnValue([
        mockRegisterUser,
        {
          isLoading: false,
          isError: true,
          error: { data: { message: "Registration failed" } },
          reset: vi.fn(),
        },
      ]);

      renderComponent();

      const usernameInput = screen.getByRole("textbox", { name: /username/i });
      const passwordInput = screen.getByLabelText("Password");
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const submitButton = screen.getByRole("button", {
        name: /create account/i,
      });

      await user.type(usernameInput, "testuser");
      await user.type(passwordInput, "Password123!");
      await user.type(confirmPasswordInput, "Password123!");
      await user.click(submitButton);

      expect(
        await screen.findByText("Registration failed")
      ).toBeInTheDocument();
    });

    it("shows error when passwords not matching", async () => {
      renderComponent();

      const usernameInput = screen.getByRole("textbox", { name: /username/i });
      const passwordInput = screen.getByLabelText("Password");
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const submitButton = screen.getByRole("button", {
        name: /create account/i,
      });

      await user.type(usernameInput, "testuser");
      await user.type(passwordInput, "password123");
      await user.type(confirmPasswordInput, "password1234");
      await user.click(submitButton);

      expect(
        await screen.findByText(/passwords don't match/i)
      ).toBeInTheDocument();
    });

    it("weird username", async () => {
      renderComponent();
      const usernameInput = screen.getByRole("textbox", { name: /username/i });
      const passwordInput = screen.getByLabelText("Password");
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const submitButton = screen.getByRole("button", {
        name: /create account/i,
      });

      await user.type(usernameInput, "weird@username");
      await user.type(passwordInput, "Password123!");
      await user.type(confirmPasswordInput, "Password123!");
      await user.click(submitButton);

      expect(
        await screen.findByText(/only numbers, letters, and ._-/i)
      ).toBeInTheDocument();
    });

    it("too short/long username", async () => {
      renderComponent();
      const usernameInput = screen.getByRole("textbox", { name: /username/i });
      const passwordInput = screen.getByLabelText("Password");
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const submitButton = screen.getByRole("button", {
        name: /create account/i,
      });

      await user.type(usernameInput, "ab");
      await user.type(passwordInput, "Password123!");
      await user.type(confirmPasswordInput, "Password123!");
      await user.click(submitButton);

      expect(
        await screen.findByText(/min 3 characters on username/i)
      ).toBeInTheDocument();

      await user.clear(usernameInput);
      await user.type(usernameInput, "a".repeat(21));
      await user.click(submitButton);

      expect(
        await screen.findByText(/max 20 characters on username/i)
      ).toBeInTheDocument();
    });

    it("too short password", async () => {
      renderComponent();

      const usernameInput = screen.getByRole("textbox", { name: /username/i });
      const passwordInput = screen.getByLabelText("Password");
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const submitButton = screen.getByRole("button", {
        name: /create account/i,
      });
      await user.type(usernameInput, "testuser");
      await user.type(passwordInput, "Short1!");
      await user.type(confirmPasswordInput, "Short1!");
      await user.click(submitButton);

      expect(await screen.findByText(/min 8 characters/i)).toBeInTheDocument();
      // expect(await screen.findByText(/one number/i)).toBeInTheDocument();
      // expect(await screen.findByText(/one special/i)).toBeInTheDocument();
      // expect(
      //   await screen.findByText(/password must contain/i)
      // ).toBeInTheDocument();
    });

    it("too long password", async () => {
      renderComponent();

      const usernameInput = screen.getByRole("textbox", { name: /username/i });
      const passwordInput = screen.getByLabelText("Password");
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const submitButton = screen.getByRole("button", {
        name: /create account/i,
      });
      await user.type(usernameInput, "testuser");
      await user.type(passwordInput, "Short1!".repeat(10));
      await user.type(confirmPasswordInput, "Short!1".repeat(10));
      await user.click(submitButton);

      expect(await screen.findByText(/max 50 characters/i)).toBeInTheDocument();
    });

    it("no uppercase letter in password", async () => {
      renderComponent();

      const usernameInput = screen.getByRole("textbox", { name: /username/i });
      const passwordInput = screen.getByLabelText("Password");
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const submitButton = screen.getByRole("button", {
        name: /create account/i,
      });
      await user.type(usernameInput, "testuser");
      await user.type(passwordInput, "lowercase1!");
      await user.type(confirmPasswordInput, "lowercase1!");
      await user.click(submitButton);

      expect(await screen.findByText(/one uppercase/i)).toBeInTheDocument();
    });

    it("no lowercase letter in password", async () => {
      renderComponent();

      const usernameInput = screen.getByRole("textbox", { name: /username/i });
      const passwordInput = screen.getByLabelText("Password");
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const submitButton = screen.getByRole("button", {
        name: /create account/i,
      });
      await user.type(usernameInput, "testuser");
      await user.type(passwordInput, "UPPERCASE1!");
      await user.type(confirmPasswordInput, "UPPERCASE1!");
      await user.click(submitButton);

      expect(await screen.findByText(/one lowercase/i)).toBeInTheDocument();
    });

    it("no number in password", async () => {
      renderComponent();

      const usernameInput = screen.getByRole("textbox", { name: /username/i });
      const passwordInput = screen.getByLabelText("Password");
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const submitButton = screen.getByRole("button", {
        name: /create account/i,
      });
      await user.type(usernameInput, "testuser");
      await user.type(passwordInput, "NoNumber!");
      await user.type(confirmPasswordInput, "NoNumber!");
      await user.click(submitButton);

      expect(await screen.findByText(/one number/i)).toBeInTheDocument();
    });

    it("no special character in password", async () => {
      renderComponent();

      const usernameInput = screen.getByRole("textbox", { name: /username/i });
      const passwordInput = screen.getByLabelText("Password");
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const submitButton = screen.getByRole("button", {
        name: /create account/i,
      });
      await user.type(usernameInput, "testuser");
      await user.type(passwordInput, "NoSpecialChar1");
      await user.type(confirmPasswordInput, "NoSpecialChar1");
      await user.click(submitButton);

      expect(
        await screen.findByText(/one special character/i)
      ).toBeInTheDocument();
    });
  });
});
