import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { UnderCons } from "./UnderCons";

// Create mock navigate function
const mockNavigate = vi.fn();

// Mock useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("UnderCons", () => {
  it("should render correctly and navigate on button click", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <UnderCons />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Nothing here yet" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Check back later...")).toBeInTheDocument();

    expect(
      screen.getByRole("img", { name: "under-construction" }),
    ).toBeInTheDocument();

    const button = screen.getByRole("button", { name: "Go Back" });
    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  beforeEach(() => {
    mockNavigate.mockClear();
  });
});
