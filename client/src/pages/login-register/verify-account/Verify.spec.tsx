import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { store } from "../../../store/store";
import { Verify } from "./Verify";

describe("Verify", () => {
  it("should render", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Verify />
        </MemoryRouter>
      </Provider>,
    );

    // expect(screen.getByText("Create account")).toBeInTheDocument();
  });
});
