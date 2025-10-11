import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { initialBetValues } from "@/utils/defaults/defaults";
import { inputErrors } from "@/utils/defaults/errors";
import { AddBetDetailsForm } from "../../AddBetDetailsForm";

const user = userEvent.setup();
const mockFn = vi.fn();
const mockSetMyBet = vi.fn();

beforeEach(() => {
  render(
    <AddBetDetailsForm
      myBet={initialBetValues}
      setMyBet={mockSetMyBet}
      modifyId={null}
      setModifyId={mockFn}
      disabled={false}
    />
  );
});

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

describe("BetbuilderInput", () => {
  it("Changes to betbuilder input", async () => {
    const typeSelect = screen.getByLabelText(/bet type/i);
    const addBuilder = screen.queryByRole("button", { name: /add/i });

    expect(typeSelect).toBeInTheDocument();
    expect(screen.getByLabelText("Selection")).toBeInTheDocument();
    expect(screen.queryByLabelText(/your selection/i)).not.toBeInTheDocument();
    expect(addBuilder).not.toBeInTheDocument();

    await user.selectOptions(typeSelect, "Bet Builder");

    const builderSelectionInput = screen.getByLabelText(/your selection/i);

    await waitFor(() => {
      expect(builderSelectionInput).toBeInTheDocument();
      expect(screen.queryByLabelText("Selection")).not.toBeInTheDocument();
    });

    await user.type(builderSelectionInput, "Test Selection");
    expect(builderSelectionInput).toHaveValue("Test Selection");
  });

  it("adds betbuilder selection", async () => {
    const typeSelect = screen.getByLabelText(/bet type/i);
    await user.selectOptions(typeSelect, "Bet Builder");

    await user.selectOptions(typeSelect, "Bet Builder");

    const builderSelectionInput = screen.getByLabelText(/your selection/i);
    const addBuilder = screen.getByRole("button", { name: /add/i });

    await waitFor(() => {
      expect(builderSelectionInput).toBeInTheDocument();
      expect(addBuilder).toBeInTheDocument();
    });

    await user.type(builderSelectionInput, "Test Selection");
    await user.click(addBuilder);

    const builderSelection = screen.getByText("Test Selection");
    expect(builderSelection).toBeInTheDocument();

    const selections = screen.getAllByTestId("bet-selection-component");
    expect(selections).toHaveLength(1);
  });

  it("removes betbuilder selection", async () => {
    const typeSelect = screen.getByLabelText(/bet type/i);
    await user.selectOptions(typeSelect, "Bet Builder");

    await user.selectOptions(typeSelect, "Bet Builder");

    const builderSelectionInput = screen.getByLabelText(/your selection/i);
    const addBuilder = screen.getByRole("button", { name: /add/i });

    await waitFor(() => {
      expect(builderSelectionInput).toBeInTheDocument();
      expect(addBuilder).toBeInTheDocument();
    });

    await user.type(builderSelectionInput, "Test Selection");
    await user.click(addBuilder);

    const builderSelection = screen.getByText("Test Selection");
    expect(builderSelection).toBeInTheDocument();

    const removeBuilder = screen.getByTestId("remove-selection");
    await user.click(removeBuilder);

    expect(builderSelection).not.toBeInTheDocument();

    const selections = screen.queryAllByTestId("bet-selection-component");
    expect(selections).toHaveLength(0);
  });

  it("handles empty betbuilder selection", async () => {
    const typeSelect = screen.getByLabelText(/bet type/i);
    await user.selectOptions(typeSelect, "Bet Builder");

    await user.selectOptions(typeSelect, "Bet Builder");

    const builderSelectionInput = screen.getByLabelText(/your selection/i);
    const addBuilder = screen.getByRole("button", { name: /add/i });

    await waitFor(() => {
      expect(builderSelectionInput).toBeInTheDocument();
      expect(addBuilder).toBeInTheDocument();
    });

    await user.type(builderSelectionInput, "  ");
    await user.click(addBuilder);

    const selections = screen.queryAllByTestId("bet-selection-component");
    expect(selections).toHaveLength(0);
  });

  it("doesnt add duplicate", async () => {
    const typeSelect = screen.getByLabelText(/bet type/i);
    await user.selectOptions(typeSelect, "Bet Builder");

    await user.selectOptions(typeSelect, "Bet Builder");

    const builderSelectionInput = screen.getByLabelText(/your selection/i);
    const addBuilder = screen.getByRole("button", { name: /add/i });

    await waitFor(() => {
      expect(builderSelectionInput).toBeInTheDocument();
      expect(addBuilder).toBeInTheDocument();
    });

    await user.type(builderSelectionInput, "eka");
    await user.click(addBuilder);

    expect(screen.queryAllByTestId("bet-selection-component")).toHaveLength(1);

    await user.type(builderSelectionInput, "eka");
    await user.click(addBuilder);

    const selections = screen.queryAllByTestId("bet-selection-component");
    expect(selections).toHaveLength(1);
  });

  it("handles input width based on screen size", async () => {
    const typeSelect = screen.getByLabelText(/bet type/i);
    await user.selectOptions(typeSelect, "Bet Builder");

    const builderSelectionInput = screen.getByLabelText(/your selection/i);

    expect(builderSelectionInput).toHaveStyle("width: 100%");
  });

  it("shows error message when selection is empty", async () => {
    const typeSelect = screen.getByLabelText(/bet type/i);
    await user.selectOptions(typeSelect, "Bet Builder");

    const builderSelectionInput = screen.getByLabelText(/your selection/i);

    await waitFor(() => {
      expect(builderSelectionInput).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: /continue/i }));

    await waitFor(() => {
      const error = screen.queryByText(inputErrors.buildSelections);
      expect(error).toBeInTheDocument();
    });
  });
});
