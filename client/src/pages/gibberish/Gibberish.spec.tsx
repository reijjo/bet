import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Terms from "./Terms";
import Privacy from "./Privacy";
// import Feedback from "./Feedback";

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

  // describe("Feedback / Suggestions", () => {
  //   it("should render the Feedback link", () => {
  //     render(<Feedback />);
  //     expect(screen.getByText(/feedback and suggestions/i)).toBeInTheDocument();
  //   });
  // });
});
