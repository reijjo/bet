import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as userApi from "../../features/api/userApi";
import { store } from "../../store/store";
import { FinishRegister } from "./FinishRegister";

const user = userEvent.setup();

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
      </Provider>,
    );
  };

  it("renders component", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: /finish your account/i }),
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
      await screen.findByText(/passwords don't match/i),
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
      await screen.findByText("Account created successfully"),
    ).toBeInTheDocument();
  });

  it("invalid username", async () => {
    renderComponent();

    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    await user.type(usernameInput, "testuser!");
    await user.click(submitButton);

    expect(
      await screen.findByText(/only numbers, letters, and ._-/i),
    ).toBeInTheDocument();

    await user.clear(usernameInput);
    await user.type(usernameInput, "aa");
    await user.click(submitButton);

    expect(
      await screen.findByText(/Min 3 characters on username/i),
    ).toBeInTheDocument();

    await user.clear(usernameInput);
    await user.type(
      usernameInput,
      "aaasddaljsdklasdklasjdlkajdlkasdjlkasdjlaksdjlkasdjladjsalslkdljk",
    );
    await user.click(submitButton);

    expect(
      await screen.findByText(/Max 20 characters on username/i),
    ).toBeInTheDocument();
  });

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

    expect(await screen.findByText("Registration failed")).toBeInTheDocument();
  });
});
