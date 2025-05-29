import { describe, expect, test, vi, afterEach } from "vitest";
import * as authApi from "../../../features/api/authApi";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import { MemoryRouter } from "react-router-dom";
import Verify from "./Verify";
import { verifyQueryResponse } from "../../../tests/mocks/api-responses/useVerifyQuery";

const renderComponent = () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Verify />
      </MemoryRouter>
    </Provider>
  );
};

describe("Verify.tsx", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders Loading", () => {
    vi.spyOn(authApi, "useVerifyQuery").mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderComponent();

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders NoAccount", () => {
    vi.spyOn(authApi, "useVerifyQuery").mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { status: 404, data: { success: false, status: 404 } },
      refetch: vi.fn(),
    });

    renderComponent();

    expect(screen.getByText(/no account found/i)).toBeInTheDocument();
  });

  test("renders InvalidToken", () => {
    vi.spyOn(authApi, "useVerifyQuery").mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { status: 401, data: { success: false, status: 401 } },
      refetch: vi.fn(),
    });

    renderComponent();

    expect(screen.getByText(/invalid token/i)).toBeInTheDocument();
  });

  test("renders InvalidToken", () => {
    vi.spyOn(authApi, "useVerifyQuery").mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { status: 400, data: { success: false, status: 400 } },
      refetch: vi.fn(),
    });

    renderComponent();

    expect(screen.getByText(/verify token expired/i)).toBeInTheDocument();
  });

  test("renders VerifiedAccount", () => {
    vi.spyOn(authApi, "useVerifyQuery").mockReturnValue({
      data: verifyQueryResponse,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderComponent();
    expect(screen.getByText(/thanks for registering/i)).toBeInTheDocument();
  });
});
