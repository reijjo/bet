import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

import { store } from "../../store/store";
import { Dashboard } from "./Dashboard";

beforeEach(() => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    </Provider>,
  );
});

describe("Dashboard", () => {
  it("renders Dashboard", () => {
    expect(true).toBe(true);
  });
});
