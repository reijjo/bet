import { describe, expect, it } from "vitest";
import { store } from "../../../store/store";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Forgot from "./Forgot";
// import userEvent from "@testing-library/user-event";

// const user = userEvent.setup();

const renderComponent = () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Forgot />
      </MemoryRouter>
    </Provider>
  );
};

describe("Forgot.tsx", () => {
  describe("success cases", () => {
    it("should render the forgot password page", () => {
      renderComponent();
      expect(screen.getByText("Forgot Password?")).toBeInTheDocument();
    });
  });

  // describe("error cases", () => {
  //   it("should display an error message when the email is invalid", async () => {
  //     renderComponent();
  //     const emailInput = screen.getByPlaceholderText("Your Email");
  //     await user.type(emailInput, "invalid-email");
  //     const submitButton = screen.getByRole("button", { name: "Send Link" });
  //     await user.click(submitButton);
  //     expect(
  //       screen.getByText("Failed to send reset link. Please try again.")
  //     ).toBeInTheDocument();
  //   });
  // });
});
