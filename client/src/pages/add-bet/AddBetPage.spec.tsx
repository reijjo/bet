import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useAddBetForm } from "@features/add-bet/hooks/useAddBetForm";
import { store } from "../../store/store";
import { mockBet } from "../../tests/mocks/betMock";
import { mockUseAddBetForm } from "../../tests/mocks/hooks/useAddBetFormMock";
import AddBetPage from "./AddBetPage";

vi.mock("@features/add-bet/hooks/useAddBetForm", () => ({
  useAddBetForm: vi.fn(() => mockUseAddBetForm),
}));

describe("AddBetPage", () => {
  it("renders AddBetForm by default", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddBetPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId("addbet-form")).toBeInTheDocument();
    expect(screen.getByTestId("add-stake")).toBeInTheDocument();
  });

  it("renders AddStakeForm component", () => {
    vi.mocked(useAddBetForm).mockReturnValue({
      ...mockUseAddBetForm,
      myBet: mockBet,
      modifyId: 0,
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddBetPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId("add-stake")).toBeInTheDocument();
  });
});

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});
