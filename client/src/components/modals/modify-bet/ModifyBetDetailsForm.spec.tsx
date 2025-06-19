/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import modalReducer from "../../../features/modalSlice";
import sidebarReducer from "../../../features/sidebarSlice";
import { baseApi } from "../../../features/api/baseApi";
import { mockBetDetail } from "../../../tests/mocks/betDetailMock";
import { mockBet } from "../../../tests/mocks/betMock";
import * as validators from "../../../utils/input-validators/inputValidators";
import { ModifyBetDetailsForm } from "./ModifyBetDetailsForm";

const user = userEvent.setup();
const mockUseGetDetailByIdQuery = vi.fn();
const mockSetMyBet = vi.fn();
const mockSetModifyIndex = vi.fn();
const mockDisabled = false;
const mockUpdateDetails = vi.fn();

vi.mock("../../../utils/inputValidators", () => ({
  validateBetDetailsInputs: vi.fn(),
}));

vi.mock("../../../features/api/detailsApiSlice", () => ({
  useGetDetailByIdQuery: (...args: any) => mockUseGetDetailByIdQuery(...args),
  useEditDetailsMutation: () => [
    mockUpdateDetails,
    { isLoading: false, isError: false },
  ],
}));

describe("ModifyBetDetailsForm", () => {
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
    mockUseGetDetailByIdQuery.mockReturnValue({
      data: mockBetDetail,
      isLoading: false,
      isError: false,
      error: null,
    });
    mockSetModifyIndex.mockClear();
    mockUpdateDetails.mockImplementation(() => ({
      unwrap: () => Promise.resolve({ ...mockBetDetail, odds: 2.0 }),
    }));
  });

  it("renders the ModifyBetDetailsForm component", async () => {
    render(
      <Provider store={testStore}>
        <ModifyBetDetailsForm
          modifyIndex={mockBet.id as number}
          setMyBet={mockSetMyBet}
          setModifyIndex={mockSetModifyIndex}
          disabled={mockDisabled}
        />
      </Provider>
    );

    expect(screen.getByTestId("modify-bet-form")).toBeInTheDocument();
  });

  it("handle cancel works", async () => {
    render(
      <Provider store={testStore}>
        <ModifyBetDetailsForm
          modifyIndex={mockBet.id as number}
          setMyBet={mockSetMyBet}
          setModifyIndex={mockSetModifyIndex}
          disabled={mockDisabled}
        />
      </Provider>
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();

    await user.click(cancelButton);

    expect(mockSetModifyIndex).toHaveBeenCalledWith(null);
    expect(mockSetModifyIndex).toHaveBeenCalledTimes(1);
    expect(mockSetMyBet).not.toHaveBeenCalled();
  });

  it("submits form successfully when validation passes", async () => {
    vi.spyOn(validators, "validateBetDetailsInputs").mockReturnValue({
      isValid: true,
      errors: {},
    });

    render(
      <Provider store={testStore}>
        <ModifyBetDetailsForm
          modifyIndex={mockBet.id as number}
          setMyBet={mockSetMyBet}
          setModifyIndex={mockSetModifyIndex}
          disabled={mockDisabled}
        />
      </Provider>
    );

    const submitButton = screen.getByRole("button", { name: /save/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateDetails).toHaveBeenCalledWith(mockBetDetail);
      expect(mockSetModifyIndex).toHaveBeenCalledWith(null);
    });
  });

  it("shows validation errors and prevents submission when validation fails", async () => {
    const mockErrors = { odds: "Invalid odds" };
    vi.spyOn(validators, "validateBetDetailsInputs").mockReturnValue({
      isValid: false,
      errors: mockErrors,
    });

    render(
      <Provider store={testStore}>
        <ModifyBetDetailsForm
          modifyIndex={mockBet.id as number}
          setMyBet={mockSetMyBet}
          setModifyIndex={mockSetModifyIndex}
          disabled={mockDisabled}
        />
      </Provider>
    );

    const submitButton = screen.getByRole("button", { name: /save/i });
    await user.click(submitButton);

    expect(mockUpdateDetails).not.toHaveBeenCalled();
    expect(mockSetModifyIndex).not.toHaveBeenCalled();
  });

  it("handles API error during submission", async () => {
    vi.spyOn(validators, "validateBetDetailsInputs").mockReturnValue({
      isValid: true,
      errors: {},
    });
    mockUpdateDetails.mockRejectedValue(new Error("API Error"));
    const consoleSpy = vi.spyOn(console, "log");

    render(
      <Provider store={testStore}>
        <ModifyBetDetailsForm
          modifyIndex={mockBet.id as number}
          setMyBet={mockSetMyBet}
          setModifyIndex={mockSetModifyIndex}
          disabled={mockDisabled}
        />
      </Provider>
    );

    const submitButton = screen.getByRole("button", { name: /save/i });
    await user.click(submitButton);

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error updating bet",
      expect.any(Error)
    );
    expect(mockSetModifyIndex).not.toHaveBeenCalled();
  });

  it("changes to betbuilder input", async () => {
    mockUseGetDetailByIdQuery.mockReturnValue({
      data: mockBetDetail,
      isLoading: false,
      isError: false,
      error: null,
    });
    render(
      <Provider store={testStore}>
        <ModifyBetDetailsForm
          modifyIndex={mockBet.id as number}
          setMyBet={mockSetMyBet}
          setModifyIndex={mockSetModifyIndex}
          disabled={mockDisabled}
        />
      </Provider>
    );
    expect(screen.getByLabelText("Selection")).toBeInTheDocument();
    expect(screen.queryByLabelText(/your selection/i)).not.toBeInTheDocument();

    const typeSelect = screen.getByLabelText(/bet type/i);
    expect(typeSelect).toBeInTheDocument();

    await user.selectOptions(typeSelect, "Bet Builder");

    expect(screen.getByLabelText(/your selection/i)).toBeInTheDocument();
    expect(screen.queryByLabelText("Selection")).not.toBeInTheDocument();
  });

  it("shows loading state", () => {
    mockUseGetDetailByIdQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
    });

    render(
      <Provider store={testStore}>
        <ModifyBetDetailsForm
          modifyIndex={mockBet.id as number}
          setMyBet={mockSetMyBet}
          setModifyIndex={mockSetModifyIndex}
          disabled={mockDisabled}
        />
      </Provider>
    );

    expect(screen.getByTestId("loading-component")).toBeInTheDocument();
  });

  it("shows error state for get details query", () => {
    mockUseGetDetailByIdQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { message: "Failed to fetch" },
    });

    render(
      <Provider store={testStore}>
        <MemoryRouter>
          <ModifyBetDetailsForm
            modifyIndex={mockBet.id as number}
            setMyBet={mockSetMyBet}
            setModifyIndex={mockSetModifyIndex}
            disabled={mockDisabled}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("error-component")).toBeInTheDocument();
  });
});
