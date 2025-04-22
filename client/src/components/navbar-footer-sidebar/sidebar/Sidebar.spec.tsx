import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, test, vi } from "vitest";

import * as screenWidthHook from "../../../hooks/useScreenWidth";
import * as reduxHooks from "../../../store/hooks";
import { store } from "../../../store/store";
import { initialRegisterValues } from "../../../utils/defaults/defaults";
import { UserRoles } from "../../../utils/enums";
import { Sidebar } from "./Sidebar";
import { afterEach } from "node:test";

const renderOnlySidebar = () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    </Provider>,
  );
};

describe("Sidebar", async () => {
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
  });

  test("renders Sidebar", () => {
    renderOnlySidebar();

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();
  });

  test("finds all links in the sidebar", async () => {
    renderOnlySidebar();

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(8);
  });

  it("Open and close sidebar", async () => {
    vi.spyOn(reduxHooks, "useAppSelector").mockImplementation((selectorFn) => {
      return selectorFn({
        sidebar: { sidebar: false },
        modal: {
          isModalOpen: false,
          isModifyBetModalOpen: { id: undefined, isOpen: false },
          isConfirmModalOpen: false,
          isRefreshModalOpen: false,
        },
        auth: {
          isAuthenticated: true,
          user: {
            id: 1,
            username: "testiukko",
            email: "testi@ukko.com",
            role: UserRoles.Guest,
          },
        },
        register: initialRegisterValues,
        api: {
          queries: {},
          mutations: {},
          provided: undefined,
          subscriptions: {},
          config: undefined,
        } as never,
      });
    });

    renderOnlySidebar();

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar.classList.contains("active")).toBe(false);

    const closeButton = screen.getByTestId("close-sidebar");
    expect(closeButton).toBeInTheDocument();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });
});
