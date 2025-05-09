import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useAddBetForm } from "../../hooks/useAddBetForm";
import { store } from "../../store/store";
import { mockBet } from "../../tests/mocks/betMock";
import { mockUseAddBetForm } from "../../tests/mocks/hooks/useAddBetFormMock";
import AddBet from "./AddBet";

vi.mock("../../hooks/useAddBetForm", () => ({
  useAddBetForm: vi.fn(() => mockUseAddBetForm),
}));

describe("AddBet", () => {
  it("renders AddBetForm by default", async () => {
    render(<AddBet />);
    expect(screen.getByTestId("addbet-form")).toBeInTheDocument();
    expect(screen.queryByTestId("addstake")).not.toBeInTheDocument();
  });

  it("renders AddStakeForm component", () => {
    vi.mocked(useAddBetForm).mockReturnValue({
      ...mockUseAddBetForm,
      myBet: mockBet,
      modifyIndex: 0,
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddBet />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByTestId("add-stake")).toBeInTheDocument();
  });
});

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});
