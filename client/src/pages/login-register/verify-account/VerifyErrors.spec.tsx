import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NoAccount } from "./NoAccount";
import { store } from "../../../store/store";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { TokenExpired } from "./TokenExpired";

const user = userEvent.setup();
const mockNavigate = vi.fn();
const mockUpdateToken = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../../features/api/authApi", () => ({
  useUpdateTokenMutation: () => [
    mockUpdateToken,
    {
      data: undefined,
      isLoading: false,
      isError: false,
      error: undefined,
    },
  ],
}));

describe("Verify Error Components", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("NoAccount", () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <NoAccount />
          </MemoryRouter>
        </Provider>
      );
    });

    it("renders NoAccount component", () => {
      expect(
        screen.getByRole("heading", { name: /no account found/i })
      ).toBeInTheDocument();
    });

    it("navigates to /register on button click", async () => {
      const button = screen.getByRole("button", { name: /register/i });
      await user.click(button);

      expect(mockNavigate).toHaveBeenCalledWith("/register");
    });
  });

  describe("TokenExpired", () => {
    it("renders TokenExpired component", () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <TokenExpired token="expired-token" />
          </MemoryRouter>
        </Provider>
      );

      expect(
        screen.getByRole("heading", { name: /verify token expired/i })
      ).toBeInTheDocument();
    });

    it("calls updateToken with correct token when refresh button is clicked", async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <TokenExpired token="expired-token" />
          </MemoryRouter>
        </Provider>
      );

      const refreshButton = screen.getByRole("button", {
        name: /refresh token/i,
      });
      await user.click(refreshButton);

      expect(mockUpdateToken).toHaveBeenCalledWith({
        token: "expired-token",
      });
    });
  });
});
