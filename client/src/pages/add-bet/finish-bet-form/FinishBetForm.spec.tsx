import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import { store } from "../../../store/store";
import { initialBetValues } from "../../../utils/defaults";
import { SportLeague } from "../../../utils/enums";
import { FinishBetForm } from "./FinishBetForm";

describe("FinishBetForm", () => {
  const user = userEvent.setup();
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
    const options = Array.from(sportInput.querySelectorAll("option")).map(
      (option) => option.value,
    );
    const expectedValues = Object.values(SportLeague);

    expect(sportInput).toBeInTheDocument();
    expect(options).toEqual(expectedValues);
    await waitFor(() => expect(sportInput).not.toBeDisabled());

    expect(
      (screen.getByRole("option", { name: "NBA" }) as HTMLOptionElement)
        .selected,
    ).toBe(true);
    expect((screen.getByText(/nhl/i) as HTMLOptionElement).selected).toBe(
      false,
    );

    // console.log("Before", sportInput.value);

    // await user.selectOptions(
    //   screen.getByRole("combobox", { name: /sport/i }),
    //   screen.getByRole("option", { name: SportLeague.NHL }),
    // );

    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // expect(sportInput).toHaveValue("NHL");

    // console.log("After", sportInput.value);

    // await waitFor(() => {
    //   expect(sportInput).toHaveValue("NHL");
    // expect((screen.getByText(/nhl/i) as HTMLOptionElement).selected).toBe(
    //   true,
    // );
    // expect(
    //   (screen.getByRole("option", { name: "NHL" }) as HTMLOptionElement)
    //     .selected,
    // ).toBe(true);
    // });
  });
});

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});
