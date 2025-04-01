import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// import * as authApi from "../../../features/api/authApi";
import { store } from "../../../store/store";
import { mockUser } from "../../../tests/mocks/userMock";
import { VerifyForm } from "./VerifyForm";

describe.skip("VerifyForm.tsx", () => {
  const mockData = {
    data: mockUser.email,
    success: true,
    message: "all good",
  };
  // const mockSubmit = vi.fn((username, password, password2) => {
  //   return Promise.resolve({ username, password, password2 });
  // });

  const user = userEvent.setup();

  const isFinishing = false;
  const isFinishError = false;
  const finishError: FetchBaseQueryError | SerializedError | undefined =
    undefined;
  const finishRegister = vi.fn();

  beforeEach(() => {
    // const mockFinishRegister = vi.fn();
    // vi.spyOn(authApi, "useFinishRegisterMutation").mockReturnValue([
    //   mockFinishRegister,
    //   {
    //     data: mockData,
    //     isLoading: isFinishing,
    //     isError: isFinishError,
    //     error: finishError,
    //     refetch: vi.fn(),
    //     reset: vi.fn(),
    //   },
    // ]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderComponent = () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <VerifyForm
            data={mockData}
            finishRegister={finishRegister}
            isFinishing={isFinishing}
            isFinishError={isFinishError}
            finishError={finishError}
          />
        </MemoryRouter>
      </Provider>,
    );
  };

  it("renders component", () => {
    renderComponent();
    expect(screen.getByText("create account")).toBeInTheDocument();
  });

  it("submits form", async () => {
    renderComponent();

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const passwordInput2 = screen.getByLabelText("Confirm password");
    const submitButton = screen.getByRole("button", { name: "create account" });

    await user.type(usernameInput, "test");
    await user.type(passwordInput, "Test_123");
    await user.type(passwordInput2, "Test_123");
    await user.click(submitButton);

    expect(finishRegister).toHaveBeenCalledWith({
      email: mockData.data,
      username: "test",
      password: "Test_123",
      password2: "Test_123",
    });
  });

  it("shows empty email when data is undefined", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <VerifyForm
            data={undefined}
            finishRegister={finishRegister}
            isFinishing={isFinishing}
            isFinishError={isFinishError}
            finishError={finishError}
          />
        </MemoryRouter>
      </Provider>,
    );
    expect((screen.getByLabelText("Username") as HTMLInputElement).value).toBe(
      "",
    );
  });

  describe("input errors", () => {
    it("shows invalid username error when username is not provided", async () => {
      renderComponent();

      const submitButton = screen.getByRole("button", {
        name: "create account",
      });
      await userEvent.click(submitButton);

      expect(await screen.findAllByRole("alert")).toHaveLength(10);
      expect(
        await screen.findByText(/min 3 characters on username/i),
      ).toBeInTheDocument();
      expect(
        await screen.findByText(/max 20 characters on username/i),
      ).toBeInTheDocument();
      expect(
        await screen.findByText(/Only numbers, letters, and ._-/i),
      ).toBeInTheDocument();
    });
  });
});
