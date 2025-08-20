import { describe, expect, test, vi, afterEach } from "vitest";
import * as verifyApi from "../../features/verify-account/api/verifyApiSlice";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { MemoryRouter } from "react-router-dom";
import Verify from "./VerifyPage";
import { verifyQueryResponse } from "../../tests/mocks/api-responses/useVerifyQuery";
import { UserRoles } from "../../utils/enums";

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
    vi.spyOn(verifyApi, "useVerifyUserQuery").mockReturnValue({
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
    vi.spyOn(verifyApi, "useVerifyUserQuery").mockReturnValue({
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
    vi.spyOn(verifyApi, "useVerifyUserQuery").mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { status: 401, data: { success: false, status: 401 } },
      refetch: vi.fn(),
    });

    renderComponent();

    expect(screen.getByText(/invalid token/i)).toBeInTheDocument();
  });

  test("renders TokenExpired", () => {
    vi.spyOn(verifyApi, "useVerifyUserQuery").mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { status: 400, data: { success: false, status: 400 } },
      refetch: vi.fn(),
    });

    renderComponent();

    expect(screen.getByText(/verify token expired/i)).toBeInTheDocument();
  });

  describe("VerifiedAccount", () => {
    test("renders VerifiedAccount", () => {
      vi.spyOn(verifyApi, "useVerifyUserQuery").mockReturnValue({
        data: verifyQueryResponse,
        isLoading: false,
        isError: false,
        error: null,
        refetch: vi.fn(),
      });

      renderComponent();
      expect(screen.getByText(/thanks for registering/i)).toBeInTheDocument();
    });

    test("calls updateUser with correct parameters when VerifiedAccount renders", () => {
      const mockUpdateUser = vi.fn();

      // Create mock data with id property
      const mockVerifyResponse = {
        ...verifyQueryResponse,
        data: {
          ...verifyQueryResponse.data,
          id: "test-user-id-123",
        },
      };

      // Mock useUpdateUserMutation
      vi.spyOn(verifyApi, "useUpdateUserMutation").mockReturnValue([
        mockUpdateUser,
        {
          isLoading: false,
          isError: false,
          error: null,
          reset: vi.fn(),
        },
      ]);

      // Mock useVerifyUserQuery to return successful data
      vi.spyOn(verifyApi, "useVerifyUserQuery").mockReturnValue({
        data: mockVerifyResponse,
        isLoading: false,
        isError: false,
        error: null,
        refetch: vi.fn(),
      });

      renderComponent();

      // Verify that updateUser was called with the correct parameters
      expect(mockUpdateUser).toHaveBeenCalledWith({
        id: "test-user-id-123",
        role: UserRoles.Guest,
      });
      expect(mockUpdateUser).toHaveBeenCalledTimes(1);
    });
  });
});
