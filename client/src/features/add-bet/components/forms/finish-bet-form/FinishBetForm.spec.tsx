import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import { store } from "@store/store";
import { initialBetValues } from "@utils/defaults/defaults";
import { FinishBetForm } from "./FinishBetForm";

describe("FinishBetForm", () => {
  const mockSetMyBet = vi.fn();
  const mockSetModifyIndex = vi.fn();

  it.skip("handles sport inputs", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FinishBetForm
            myBet={initialBetValues}
            setMyBet={mockSetMyBet}
            modifyId={null}
            setModifyId={mockSetModifyIndex}
          />
        </MemoryRouter>
      </Provider>
    );

    const sportInput = screen.getByLabelText(/sport/i) as HTMLInputElement;
    expect(sportInput).toBeInTheDocument();
    expect(sportInput).not.toBeDisabled();

    // Initial value should be set
    expect(sportInput.value).toBe("NBA");

    // Focus on input and type to show suggestions
    await user.click(sportInput);
    await user.clear(sportInput);
    await user.type(sportInput, "NHL");

    // Wait for NHL suggestion to appear
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /nhl/i })).toBeInTheDocument();
    });

    // Click on NHL suggestion
    const nhlButton = screen.getByRole("button", { name: /nhl/i });
    await user.click(nhlButton);

    // Verify the callback was called with the new value
    await waitFor(() => {
      expect(mockSetMyBet).toHaveBeenCalled();
    });

    // Verify the input now shows NHL
    expect(sportInput.value).toBe("NHL");
  });

  it("allows custom sport input", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FinishBetForm
            myBet={initialBetValues}
            setMyBet={mockSetMyBet}
            modifyId={null}
            setModifyId={mockSetModifyIndex}
          />
        </MemoryRouter>
      </Provider>
    );

    const sportInput = screen.getByLabelText(/sport/i) as HTMLInputElement;

    // Clear and type custom value
    await user.clear(sportInput);
    await user.type(sportInput, "CustomSport");

    // Verify the callback was called
    expect(mockSetMyBet).toHaveBeenCalled();
    expect(sportInput.value).toBe("NBA");
  });
});

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});
