import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, test, vi } from "vitest";

import * as screenWidthHook from "../../../hooks/useScreenWidth";
import { store } from "../../../store/store";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  // Desktop view tests
  describe("Desktop View", () => {
    beforeEach(() => {
      vi.spyOn(screenWidthHook, "useScreenWidth").mockReturnValue({
        isMobile: false,
        isTablet: false,
        isSidebarOpen: true,
      });

      render(
        <Provider store={store}>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </Provider>,
      );
    });

    test("renders Navbar", () => {
      const navbar = screen.getByRole("navigation");
      expect(navbar).toBeInTheDocument();
    });

    test("renders NavLinks", () => {
      const navLinks = screen.getAllByRole("link");
      expect(navLinks).toHaveLength(3);
      expect(navLinks[0]).toHaveTextContent(/tärpit/i);
      expect(navLinks[1]).toHaveTextContent(/login/i);
      expect(navLinks[2]).toHaveTextContent(/sign up/i);
    });
  });

  // Mobile view test
  describe("Mobile View", () => {
    beforeEach(() => {
      // Mock for mobile view
      vi.spyOn(screenWidthHook, "useScreenWidth").mockReturnValue({
        isMobile: true,
        isTablet: false,
        isSidebarOpen: false,
      });

      // Re-render with mobile view mock
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </Provider>,
      );
    });

    it("renders mobile navbar", () => {
      const navbar = screen.getByRole("navigation");
      expect(navbar).toBeInTheDocument();

      const logotext = screen.getByText(/tärpit/i);
      expect(logotext).toHaveClass("display-none");

      // Also check for wrapper class
      const wrapper = navbar.querySelector(".wrapper");
      expect(wrapper).toHaveClass("nav-wrapper");
    });
  });
});
