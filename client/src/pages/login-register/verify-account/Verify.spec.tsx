import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as authApi from "../../../features/api/authApi";
import { store } from "../../../store/store";
import { mockUser } from "../../../tests/mocks/userMock";
import { Verify } from "./Verify";

const mockNavigate = vi.fn();

// This needs to be at the top level, not inside beforeAll
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Verify.tsx", () => {
  const user = userEvent.setup();

  const renderComponent = () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Verify />
        </MemoryRouter>
      </Provider>,
    );
  };

  beforeEach(() => {
    vi.spyOn(authApi, "useVerifyQuery").mockReturnValue({
      data: {
        message: "Account found",
        data: mockUser.email,
      },
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
      currentData: {
        message: "Account found",
        data: mockUser.email,
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Loading.tsx component is rendered", async () => {
    vi.spyOn(authApi, "useVerifyQuery").mockReturnValue({
      data: {
        message: "Account found",
        data: mockUser.email,
      },
      isLoading: true,
      isSuccess: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
      currentData: {
        message: "Account found",
        data: mockUser.email,
      },
    });
    renderComponent();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("NoAccount.tsx component is rendered", async () => {
    vi.spyOn(authApi, "useVerifyQuery").mockReturnValue({
      data: null,
      isLoading: false,
      isSuccess: false,
      isError: true,
      error: {
        data: {
          status: 404,
          message: "No account found. Please register",
        },
      },
      refetch: vi.fn(),
      currentData: null,
    });

    renderComponent();

    const button = screen.getByRole("button", { name: /register/i });
    await user.click(button);

    expect(screen.getByText("Please register")).toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });

  it("TokenExpired.tsx component is rendered", async () => {
    vi.spyOn(authApi, "useVerifyQuery").mockReturnValue({
      data: null,
      isLoading: false,
      isSuccess: false,
      isError: true,
      error: {
        data: {
          status: 400,
          message: "Token expired",
        },
      },
      refetch: vi.fn(),
      currentData: null,
    });

    const mockUpdateToken = vi.fn();

    // Mock the useUpdateTokenMutation hook
    vi.spyOn(authApi, "useUpdateTokenMutation").mockReturnValue([
      mockUpdateToken,
      {
        data: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: null,
        reset: vi.fn(),
      },
    ]);

    renderComponent();

    expect(screen.getByText("Verify token expired")).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /refresh/i });
    await user.click(button);

    // Verify the update token function was called
    expect(mockUpdateToken).toHaveBeenCalled();
  });
});
