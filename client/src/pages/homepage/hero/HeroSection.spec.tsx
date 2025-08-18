import { render, screen } from "@testing-library/react";
import { describe, vi, expect, it } from "vitest";
import { HeroSection } from "./HeroSection";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("HEROPAGE", () => {
  describe("HeroSection", async () => {
    it('navigates to "/register" when "Sign Up here!" button is clicked', async () => {
      const mockNavigate = vi.fn();

      render(<HeroSection navigate={mockNavigate} />);

      await user.click(screen.getByRole("button", { name: /Sign Up here!/i }));
      expect(mockNavigate).toHaveBeenCalledWith("/register");
    });
  });
});
