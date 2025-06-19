/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import modalReducer from "../../../features/modalSlice";
import sidebarReducer from "../../../features/sidebarSlice";
import { baseApi } from "../../../features/api/baseApi";
import { mockBet } from "../../../tests/mocks/betMock";
import { ModifyBetModal } from "./ModifyBetModal";

const mockUseGetBetByIdQuery = vi.fn();

vi.mock("../../../features/api/betsApiSlice", () => ({
  useGetBetByIdQuery: (...args: any) => mockUseGetBetByIdQuery(...args),
}));

describe("ModifyBetModal", () => {
  const createTestStore = () =>
    configureStore({
      reducer: {
        modal: modalReducer,
        sidebar: sidebarReducer,
        [baseApi.reducerPath]: baseApi.reducer,
      },
      preloadedState: {
        modal: {
          isModifyBetModalOpen: { id: mockBet.id, isOpen: true },
          isModalOpen: true,
          isConfirmModalOpen: false,
          isRefreshModalOpen: false,
        },
        sidebar: {
          sidebar: false,
        },
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
    });

  let testStore: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    testStore = createTestStore();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("renders the ModifyBetModal component", async () => {
    mockUseGetBetByIdQuery.mockReturnValue({
      data: mockBet,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <Provider store={testStore}>
        <ModifyBetModal />
      </Provider>
    );

    expect(screen.getByText("Modify Bet")).toBeInTheDocument();
  });

  it("shows error on ModifyBetModal", async () => {
    mockUseGetBetByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: {
        status: 404,
        data: { message: "Bet not found" },
      },
      refetch: vi.fn(),
    });

    render(
      <Provider store={testStore}>
        <MemoryRouter>
          <ModifyBetModal />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Something shady happened")).toBeInTheDocument();
    expect(screen.getByText("Error: 404")).toBeInTheDocument();
  });
});
