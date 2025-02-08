import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { modalReducer, sidebarReducer } from "../../../features";
import { baseApi } from "../../../features/api/baseApi";
import { mockBet } from "../../../tests/mocks/betMock";
import { ModifyBetModal } from "./ModifyBetModal";

vi.mock("../../../features/api/betsApiSlice", () => ({
  useGetBetByIdQuery: () => ({
    data: mockBet,
    isLoading: false,
    isError: false,
    error: null,
    refetch: vi.fn(),
  }),
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
    render(
      <Provider store={testStore}>
        <ModifyBetModal />
      </Provider>,
    );

    expect(screen.getByText("Modify Bet")).toBeInTheDocument();
  });
});
