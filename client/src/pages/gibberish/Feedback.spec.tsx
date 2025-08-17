import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as feedbackApi from "../../features/api/feedbackApi";
import { store } from "../../store/store";
import Feedback from "./Feedback";

if (process.env.NODE_ENV === "test") {
  console.log = function () {};
  console.error = function () {};
  console.warn = function () {};
}

const user = userEvent.setup();

const renderComponent = () => {
  render(
    <Provider store={store}>
      <Feedback />
    </Provider>
  );
};

describe("Feedback.tsx", () => {
  const mockAddFeedback = vi.fn();

  beforeEach(() => {
    vi.spyOn(feedbackApi, "useAddFeedbackMutation").mockReturnValue([
      mockAddFeedback,
      {
        data: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: null,
        reset: vi.fn(),
        originalArgs: undefined,
      },
    ]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    mockAddFeedback.mockReset();
  });

  describe("success cases", () => {
    it("renders the feedback form", async () => {
      renderComponent();
      expect(screen.getByText(/feedback and suggestions/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it("submits feedback successfully", async () => {
      const mockAddFeedbackResult = {
        unwrap: () => Promise.resolve({ data: { message: "All good" } }),
      };
      mockAddFeedback.mockReturnValue(mockAddFeedbackResult);

      renderComponent();

      await user.type(screen.getByPlaceholderText(/name/i), "John Doe");
      await user.type(screen.getByPlaceholderText(/email/i), "john@doe.com");
      await user.type(screen.getByLabelText(/message/i), "Great app!");

      await user.click(screen.getByRole("button", { name: /submit/i }));
      waitFor(() => {
        expect("All good").toBeInTheDocument();
      });
    });

    it("reset button clears the form", async () => {
      renderComponent();

      const nameInput = screen.getByPlaceholderText(/name/i);
      const emailInput = screen.getByPlaceholderText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const resetButton = screen.getByRole("button", { name: /clear/i });

      await user.type(nameInput, "John Doe");
      await user.type(emailInput, "john@doe.com");
      await user.type(messageInput, "Great app!");
      await user.click(resetButton);
      expect(nameInput).toHaveValue("");
      expect(emailInput).toHaveValue("");
      expect(messageInput).toHaveValue("");
    });
  });

  describe("error cases", () => {
    it("shows error message when submission fails", async () => {
      const mockAddFeedbackResult = {
        unwrap: () => Promise.reject({ data: { message: "Server error" } }),
      };
      mockAddFeedback.mockReturnValue(mockAddFeedbackResult);

      renderComponent();

      const nameInput = screen.getByPlaceholderText(/name/i);
      const emailInput = screen.getByPlaceholderText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole("button", { name: /submit/i });

      await user.type(nameInput, "John Doe");
      await user.type(emailInput, "john@doe.com");
      await user.type(messageInput, "Great app!");
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Server error")).toBeInTheDocument();
      });
    });

    describe("input validation", () => {
      it("shows error when name is too short", async () => {
        renderComponent();

        const nameInput = screen.getByPlaceholderText(/name/i);
        const messageInput = screen.getByLabelText(/message/i);
        const submitButton = screen.getByRole("button", { name: /submit/i });

        await user.type(nameInput, "ab");
        await user.type(messageInput, "This is a test message.");
        await user.click(submitButton);

        expect(
          screen.getByText("Name must be between 3 and 50 characters")
        ).toBeInTheDocument();
      });

      it("shows error when message is too short", async () => {
        renderComponent();

        const nameInput = screen.getByPlaceholderText(/name/i);
        const messageInput = screen.getByLabelText(/message/i);
        const submitButton = screen.getByRole("button", { name: /submit/i });

        await user.type(nameInput, "abaaa");
        await user.type(messageInput, "T.");
        await user.click(submitButton);

        expect(
          screen.getByText("Message must be between 5 and 1000 characters")
        ).toBeInTheDocument();
      });
    });
  });
});
