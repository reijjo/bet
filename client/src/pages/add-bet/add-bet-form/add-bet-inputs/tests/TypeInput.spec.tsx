import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { initialBetValues } from "../../../../../utils/defaults/defaults";
import { LimitedBetType } from "../../../../../utils/enums";
import { AddBetForm } from "../../AddBetForm";

describe("MatchInput", () => {
  const user = userEvent.setup();
  const mockFn = vi.fn();
  const mockSetMyBet = vi.fn();

  it("should update bet type when selection changes and form is submitted", async () => {
    // Create initial state
    const initialBet = { ...initialBetValues, betDetails: [] };

    render(
      <AddBetForm
        myBet={initialBet}
        setMyBet={mockSetMyBet}
        modifyIndex={null}
        setModifyIndex={mockFn}
        disabled={false}
      />,
    );

    const oddsInput = screen.getByLabelText(/odds/i);
    await user.type(oddsInput, "2.0");

    const selectionInput = screen.getByLabelText(/selection/i);
    await user.type(selectionInput, "Test Selection");

    const typeSelect = screen.getByLabelText(/bet type/i);
    await user.selectOptions(typeSelect, LimitedBetType.Over);

    await user.click(screen.getByText("Continue"));

    const updaterFn = mockSetMyBet.mock.calls[0][0];

    const updatedState = updaterFn(initialBet);

    // Now we can check the result
    expect(updatedState.betDetails[0]).toEqual(
      expect.objectContaining({
        bet_type: LimitedBetType.Over,
        odds: "2.0",
        selection: "Test Selection",
      }),
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });
});
