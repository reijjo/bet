import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { store } from "../../../store/store";
import { initialBetValues } from "../../../utils/defaults/defaults";
import { AddStakeForm } from "./AddStakeForm";

describe("AddStakeForm", () => {
  it("cancel bet changes modifyIndex to null and resets bet", async () => {
    const user = userEvent.setup();
    const mockSetMyBet = vi.fn();
    const mockfn = vi.fn();
    const mockSetIndex = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddStakeForm
            myBet={initialBetValues}
            setMyBet={mockSetMyBet}
            handleModifyBet={mockfn}
            modifyIndex={null}
            setModifyIndex={mockSetIndex}
          />
        </MemoryRouter>
      </Provider>,
    );

    const closeBtn = screen.getByTestId("mybets-close");
    expect(closeBtn).toBeInTheDocument();
    expect(closeBtn).not.toBeDisabled();

    const closeLink = screen.getByTitle("Close");
    await user.click(closeLink);

    await waitFor(() => {
      expect(mockSetIndex).toHaveBeenCalledWith(null);
      expect(mockSetMyBet).toHaveBeenCalledWith(initialBetValues);
    });
  });
});
