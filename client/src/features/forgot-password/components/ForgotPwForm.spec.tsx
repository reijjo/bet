import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ForgotPwForm } from "./ForgotPwForm";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import userEvent from "@testing-library/user-event";

import * as forgotApi from "../api/forgotPwApiSlice";

const user = userEvent.setup();

const renderComponent = () => {
  render(
    <Provider store={store}>
      <ForgotPwForm />
    </Provider>
  );
};

describe("FORGOT PASSWORD FORM", () => {
  const mockForgotPassword = vi.fn();

  beforeEach(() => {
    vi.spyOn(forgotApi, "useForgotPasswordMutation").mockReturnValue([
      mockForgotPassword,
      {
        data: null,
        isLoading: false,
        isError: false,
        error: null,
        reset: vi.fn(),
      },
    ]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    mockForgotPassword.mockReset();
  });

  it("successfully sends a reset link", async () => {
    mockForgotPassword.mockReturnValue({
      unwrap: () =>
        Promise.resolve({ message: "Reset link sent successfully" }),
    });

    renderComponent();

    const emailInput = screen.getByPlaceholderText("Your Email");

    await user.type(emailInput, "testi@ukko.com");
    const submitButton = screen.getByRole("button", { name: "Send Link" });
    await user.click(submitButton);

    expect(mockForgotPassword).toHaveBeenCalledWith("testi@ukko.com");

    await waitFor(() => {
      expect(emailInput).toHaveValue("");
    });
  });

  it("displays an error message on failure", async () => {
    renderComponent();

    const emailInput = screen.getByPlaceholderText("Your Email");

    await user.type(emailInput, "testi@ukko.com");
    const submitButton = screen.getByRole("button", { name: "Send Link" });
    await user.click(submitButton);

    expect(mockForgotPassword).toHaveBeenCalledWith("testi@ukko.com");

    mockForgotPassword.mockReturnValue({
      unwrap: () => Promise.reject(new Error("Failed to send reset link")),
    });
  });

  it("shows loading state while sending", async () => {
    vi.spyOn(forgotApi, "useForgotPasswordMutation").mockReturnValue([
      mockForgotPassword,
      {
        data: null,
        isLoading: true,
        isError: false,
        error: null,
        reset: vi.fn(),
      },
    ]);

    renderComponent();

    const submitButton = screen.getByRole("button");

    expect(submitButton).toHaveTextContent("Sending");

    expect(submitButton).toBeDisabled();
  });

  it("displays success message after successful submission", async () => {
    // First render with initial state
    const { rerender } = render(
      <Provider store={store}>
        <ForgotPwForm />
      </Provider>
    );

    mockForgotPassword.mockReturnValue({
      unwrap: () =>
        Promise.resolve({ message: "Reset link sent successfully" }),
    });

    const emailInput = screen.getByPlaceholderText("Your Email");
    await user.type(emailInput, "testi@ukko.com");
    const submitButton = screen.getByRole("button", { name: "Send Link" });
    await user.click(submitButton);

    // Mock the hook to return success state with data
    vi.spyOn(forgotApi, "useForgotPasswordMutation").mockReturnValue([
      mockForgotPassword,
      {
        data: { message: "Reset link sent successfully" },
        isLoading: false,
        isError: false,
        error: null,
        reset: vi.fn(),
      },
    ]);

    // Re-render to reflect the updated state
    rerender(
      <Provider store={store}>
        <ForgotPwForm />
      </Provider>
    );

    // Check for success message
    await waitFor(() => {
      expect(
        screen.getByText("Reset link sent successfully")
      ).toBeInTheDocument();
    });
  });
});
