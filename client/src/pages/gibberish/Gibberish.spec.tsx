import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Terms from "./Terms";
import Privacy from "./Privacy";
import Feedback from "./Feedback";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import Faq from "./Faq";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Footer Links", () => {
  describe("Terms of Service", () => {
    it("should render the Terms of Service link", () => {
      render(<Terms />);
      expect(screen.getByText(/terms of service/i)).toBeInTheDocument();
    });
  });

  describe("Privacy Policy", () => {
    it("should render the Privacy Policy link", () => {
      render(<Privacy />);
      expect(screen.getByText(/privacy policy/i)).toBeInTheDocument();
    });
  });

  describe("Feedback / Suggestions", () => {
    it("should render the Feedback link", () => {
      render(
        <Provider store={store}>
          <Feedback />
        </Provider>
      );
      expect(screen.getByText(/feedback and suggestions/i)).toBeInTheDocument();
    });
  });

  describe("FAQ", () => {
    it("should render the FAQ link", () => {
      render(
        <MemoryRouter>
          <Faq />
        </MemoryRouter>
      );

      expect(
        screen.getByText(/frequently asked questions/i)
      ).toBeInTheDocument();
    });

    it("toggles FAQ answers on click", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <Faq />
        </MemoryRouter>
      );

      const faqQuestion = screen.getByText(
        /why there are so many pages still under construction/i
      );

      // Initially, answer should not be visible
      expect(
        screen.queryByText(/because i was stupid when i started this project/i)
      ).not.toBeInTheDocument();

      // Click to open
      await user.click(faqQuestion);
      expect(
        screen.getByText(/because i was stupid when i started this project/i)
      ).toBeVisible();

      // Click to close
      await user.click(faqQuestion);
      expect(
        screen.queryByText(/because i was stupid when i started this project/i)
      ).not.toBeInTheDocument();
    });
  });
});
