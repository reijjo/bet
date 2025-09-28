import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { initialBetValues } from "@/utils/defaults/defaults";
import { inputErrors } from "@/utils/defaults/errors";
import { AddBetForm } from "../../forms";

const user = userEvent.setup();
const mockFn = vi.fn();

beforeEach(() => {
  render(
    <AddBetForm
      myBet={initialBetValues}
      setMyBet={mockFn}
      modifyIndex={null}
      setModifyIndex={mockFn}
      disabled={false}
    />
  );
});

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

describe("SelectionInput", () => {
  it("handles ok selection", async () => {
    const selectionInput = screen.getByLabelText(/selection/i);
    const continueButton = screen.getByRole("button", { name: /continue/i });

    expect(selectionInput).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();

    await user.type(selectionInput, "Test Selection");
    await user.click(continueButton);

    expect(screen.queryByText(inputErrors.selection)).not.toBeInTheDocument();
  });

  it("handles trimmed/empty selection", async () => {
    const selectionInput = screen.getByLabelText(/selection/i);
    const continueButton = screen.getByRole("button", { name: /continue/i });

    expect(selectionInput).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();

    await user.type(selectionInput, "  ");
    await user.click(continueButton);

    expect(screen.queryByText(inputErrors.selection)).toBeInTheDocument();
  });
});
