import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test } from "vitest";

import { store } from "../../../store/store";
import { NavbarUser } from "./NavbarUser";

beforeEach(() => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <NavbarUser />
      </MemoryRouter>
    </Provider>,
  );
});

describe.skip("NavbarUser", () => {
  const user = userEvent.setup();

  test("renders NavbarUser", () => {
    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();
  });

  test("toggles usermenu", async () => {
    const userProfile = screen.getByText(/testuser/i);
    expect(userProfile).toBeInTheDocument();

    let userMenu = screen.queryByTestId("user-menu");
    expect(userMenu).not.toBeInTheDocument();

    await user.click(userProfile);
    userMenu = screen.getByTestId("user-menu");
    expect(userMenu).toBeInTheDocument();

    await user.click(userProfile);
    userMenu = screen.queryByTestId("user-menu");
    expect(userMenu).not.toBeInTheDocument();
  });
});
