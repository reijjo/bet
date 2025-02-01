import { render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import { store } from "../../../store/store";
import { initialBetValues } from "../../../utils/defaults";
import { SportLeague } from "../../../utils/enums";
// import { SportLeague } from "../../../utils/enums";
import { FinishBetForm } from "./FinishBetForm";

describe("FinishBetForm", () => {
  // const user = userEvent.setup();
  const mockSetMyBet = vi.fn();
  const mockSetModifyIndex = vi.fn();

  it("handles sport inputs", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FinishBetForm
            myBet={initialBetValues}
            setMyBet={mockSetMyBet}
            modifyIndex={null}
            setModifyIndex={mockSetModifyIndex}
          />
        </MemoryRouter>
      </Provider>,
    );

    const sportInput = screen.getByLabelText(/sport/i) as HTMLSelectElement;

    expect(sportInput).toBeInTheDocument();
    await waitFor(() => expect(sportInput).not.toBeDisabled());
    expect(sportInput).toHaveValue(SportLeague.NBA);

    // console.log("Before selection:", sportInput.value);
    // const options = Array.from(sportInput.querySelectorAll("option")).map(
    //   (option) => option.value,
    // );
    // console.log("Options:", options);

    // // Simulate selecting "NHL" from the dropdown
    // await user.selectOptions(sportInput, SportLeague.NHL);

    // // Log the updated value for debugging
    // console.log("After selection:", sportInput.value);

    // // Verify the updated value
    // await waitFor(() => {
    //   expect(sportInput).toHaveValue(SportLeague.NHL);
    // });
  });
});

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});
