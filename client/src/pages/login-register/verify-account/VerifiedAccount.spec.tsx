import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { store } from "../../../store/store";
import { UserRoles } from "../../../utils/enums";
import { VerifiedAccount } from "./VerifiedAccount";

const mockNavigate = vi.fn();

// This needs to be at the top level, not inside beforeAll
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe.skip("VerifiedAccount.tsx", () => {
  const data = {
    data: {
      id: 1,
      username: "test",
      password: "Test_123",
      email: "testi@ukko.com",
      role: UserRoles.Guest,
      resetToken: "testtoken12345",
      resetTokenExpiration: new Date(),
    },
    success: true,
    message: "all good",
  };

  const user = userEvent.setup();

  const renderComponent = () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <VerifiedAccount data={data} />
        </MemoryRouter>
      </Provider>,
    );
  };

  it("renders component", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: "Thanks for registering!" }),
    ).toBeInTheDocument();
  });

  it("To login button navigates to /login", async () => {
    renderComponent();
    const button = screen.getByRole("button", { name: "To login" });
    await user.click(button);
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
