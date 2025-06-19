import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";

import authReducer from "../../../features/authSlice";
import * as authApi from "../../../features/api/authApi";
import * as screenWidthHook from "../../../hooks/useScreenWidth";
import * as reduxHooks from "../../../store/hooks";
import { UserRoles } from "../../../utils/enums";
import { NavbarUser } from "./NavbarUser";

const createMockStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
};

const mockstore = createMockStore();

const renderComponent = () => {
  render(
    <Provider store={mockstore}>
      <MemoryRouter>
        <NavbarUser />
      </MemoryRouter>
    </Provider>
  );
};

describe("NavbarUser", () => {
  const user = userEvent.setup();

  describe("Desktop View", () => {
    beforeEach(() => {
      vi.spyOn(screenWidthHook, "useScreenWidth").mockReturnValue({
        isMobile: false,
        isTablet: false,
        isSidebarOpen: true,
      });

      vi.spyOn(reduxHooks, "useAppSelector").mockReturnValue({
        id: 1,
        username: "testiukko",
        email: "testi@ukko.com",
        role: UserRoles.Guest,
      });

      renderComponent();
    });

    test("renders NavbarUser", () => {
      const navbar = screen.getByRole("navigation");
      expect(navbar).toBeInTheDocument();
    });

    test("toggles usermenu", async () => {
      const userProfile = screen.getByText(/testiukko/i);
      expect(userProfile).toBeInTheDocument();

      let userMenu = screen.queryByTestId("user-menu");
      expect(userMenu).not.toBeInTheDocument();

      await user.click(userProfile);
      userMenu = screen.getByTestId("user-menu");
      expect(userMenu).toBeInTheDocument();

      await user.click(userProfile);
      userMenu = screen.queryByTestId("user-menu");
      expect(userMenu).not.toBeInTheDocument();
    });

    test("closes user menu on outside click", async () => {
      const userProfile = screen.getByText(/testiukko/i);
      expect(userProfile).toBeInTheDocument();

      let userMenu = screen.queryByTestId("user-menu");
      expect(userMenu).not.toBeInTheDocument();

      await user.click(userProfile);
      userMenu = screen.getByTestId("user-menu");
      expect(userMenu).toBeInTheDocument();

      // Simulate clicking outside the user menu
      await user.click(document.body);

      userMenu = screen.queryByTestId("user-menu");
      expect(userMenu).not.toBeInTheDocument();
    });

    test("keeps menu open when clicking profile element", async () => {
      // First open the menu
      const userProfile = screen.getByText(/testiukko/i);
      await user.click(userProfile);

      // Verify menu is open
      expect(screen.queryByTestId("user-menu")).toBeInTheDocument();

      // Click the profile element
      const profileElement = screen.getByText(/testiukko/i).closest("a");
      if (profileElement) {
        fireEvent.mouseDown(profileElement);

        // Verify menu is still open
        expect(screen.queryByTestId("user-menu")).toBeInTheDocument();
      } else {
        throw new Error("Profile element not found");
      }
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });
  });

  describe("Mobile View", () => {
    beforeEach(() => {
      vi.spyOn(screenWidthHook, "useScreenWidth").mockReturnValue({
        isMobile: true,
        isTablet: false,
        isSidebarOpen: false,
      });

      vi.spyOn(reduxHooks, "useAppSelector").mockReturnValue({
        id: 1,
        username: "testiukko",
        email: "testi@ukko.com",
        role: UserRoles.Guest,
      });
    });

    it("logs out when logout is clicked", async () => {
      const mockDispatch = vi.fn();
      vi.spyOn(reduxHooks, "useAppDispatch").mockReturnValue(mockDispatch);

      // const mockNavigate = vi.fn();
      // vi.spyOn(reactRouter, "useNavigate").mockReturnValue(mockNavigate);

      // Mock the logout mutation
      const mockLogout = vi.fn().mockResolvedValue({ data: { success: true } });
      vi.spyOn(authApi, "useLogoutMutation").mockReturnValue([
        mockLogout,
        { isLoading: false, isSuccess: false, isError: false, reset: vi.fn() },
      ]);

      renderComponent();

      const userProfile = screen.getByText(/testiukko/i);
      await user.click(userProfile);

      // Verify menu is open and find logout button
      const logoutButton = screen.getByText(/logout/i);
      expect(logoutButton).toBeInTheDocument();

      // Click logout
      await user.click(logoutButton);

      // Verify our mocks were called correctly
      expect(mockLogout).toHaveBeenCalledTimes(1);
      // expect(mockDispatch).toHaveBeenCalledWith(logoutUser());
      // expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
