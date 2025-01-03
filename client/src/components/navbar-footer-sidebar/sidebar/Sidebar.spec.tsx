import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test } from "vitest";

import { store } from "../../../store/store";
import { Sidebar } from "./Sidebar";

beforeEach(() => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    </Provider>,
  );
});

describe("Sidebar", async () => {
  test("renders Sidebar", () => {
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();
  });

  test("finds all links in the sidebar", async () => {
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(9);
  });
});
