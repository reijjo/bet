import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Terms from "./TermsPage";
import Privacy from "./PrivacyPage";
import Feedback from "./FeedbackPage";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import Faq from "./FaqPage";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Support from "./SupportPage";

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

  Object.assign(navigator, {
    clipboard: {
      writeText: vi.fn(),
    },
  });

  describe("Support Page", () => {
    beforeEach(() => {
      // Clear all mocks before each test
      vi.clearAllMocks();
    });

    it("should render the Support page", () => {
      render(
        <MemoryRouter>
          <Support />
        </MemoryRouter>
      );
      expect(screen.getByText(/support me/i)).toBeInTheDocument();
      expect(screen.getByText(/spare some change/i)).toBeInTheDocument();
    });

    it("should copy Bitcoin address to clipboard when first copy button is clicked", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <Support />
        </MemoryRouter>
      );

      // Get all copy buttons and select the first one (Bitcoin)
      const copyButtons = screen.getAllByText(/copy/i);
      const bitcoinCopyButton = copyButtons[0];

      await user.click(bitcoinCopyButton);

      // Wait for the "Copied!" text to appear
      await waitFor(() => {
        expect(screen.getByText(/copied!/i)).toBeInTheDocument();
      });
    });

    // it("should give error when copying fails", async () => {
    //   const user = userEvent.setup();
    //   const consoleErrorSpy = vi
    //     .spyOn(console, "error")
    //     .mockImplementation(() => {});

    //   render(
    //     <MemoryRouter>
    //       <Support />
    //     </MemoryRouter>
    //   );

    //   // Mock the clipboard writeText to throw an error
    //   const mockWriteText = navigator.clipboard.writeText as any;
    //   mockWriteText.mockImplementationOnce(() => {
    //     throw new Error("Failed to copy");
    //   });

    //   // Get the first copy button and click it
    //   const copyButtons = screen.getAllByText(/copy/i);
    //   const bitcoinCopyButton = copyButtons[0];

    //   await user.click(bitcoinCopyButton);

    //   // Verify the error was logged
    //   expect(consoleErrorSpy).toHaveBeenCalledWith(
    //     "Failed to copy text: ",
    //     expect.any(Error)
    //   );

    //   // Clean up
    //   consoleErrorSpy.mockRestore();
    // });

    it("should toggle QR code visibility when QR toggle is clicked", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <Support />
        </MemoryRouter>
      );

      // Find the first QR toggle button using data-testid
      const firstQrToggle = screen.getByTestId("qr-toggle-1");

      // Initially, QR should not be flipped (showQr is null)
      const qrElement = firstQrToggle.querySelector(".qr");
      expect(qrElement).not.toHaveClass("flipped");

      // Click to show QR
      await user.click(firstQrToggle);

      // Now QR should be flipped (visible)
      await waitFor(() => {
        expect(qrElement).toHaveClass("flipped");
      });

      // Click again to hide QR
      await user.click(firstQrToggle);

      // QR should no longer be flipped (hidden)
      await waitFor(() => {
        expect(qrElement).not.toHaveClass("flipped");
      });
    });

    it("should only show one QR code at a time", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <Support />
        </MemoryRouter>
      );

      const firstQrToggle = screen.getByTestId("qr-toggle-1");
      const secondQrToggle = screen.getByTestId("qr-toggle-2");

      const firstQrElement = firstQrToggle.querySelector(".qr");
      const secondQrElement = secondQrToggle.querySelector(".qr");

      // Click first QR toggle
      await user.click(firstQrToggle);

      await waitFor(() => {
        expect(firstQrElement).toHaveClass("flipped");
      });

      // Click second QR toggle
      await user.click(secondQrToggle);

      await waitFor(() => {
        expect(firstQrElement).not.toHaveClass("flipped");
        expect(secondQrElement).toHaveClass("flipped");
      });
    });

    it("should render all support options correctly", () => {
      render(
        <MemoryRouter>
          <Support />
        </MemoryRouter>
      );

      // Check if all payment methods are rendered
      expect(screen.getByText("MobilePay")).toBeInTheDocument();
      expect(screen.getByText("Revolut")).toBeInTheDocument();
      expect(screen.getByText("Bitcoin")).toBeInTheDocument();
      expect(screen.getByText("Solana")).toBeInTheDocument();

      // Check if short answers are displayed
      expect(screen.getByText("3913YS")).toBeInTheDocument();
      expect(screen.getByText("repewow")).toBeInTheDocument();
      expect(screen.getByText("BTC")).toBeInTheDocument();
      expect(screen.getByText("SOL")).toBeInTheDocument();

      // Check if "click here" links are present for non-crypto options
      const clickHereLinks = screen.getAllByText("click here");
      expect(clickHereLinks).toHaveLength(2); // MobilePay and Revolut
    });
  });
});
