import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { initialBetValues } from "../../../../../utils/defaults/defaults";
import { inputErrors } from "../../../../../utils/defaults/errors";
import { AddBetForm } from "../../AddBetForm";
import { afterEach } from "node:test";

const user = userEvent.setup();
const mockFn = vi.fn();

beforeEach(() => {
  render(
    <AddBetForm
      myBet={initialBetValues}
      setMyBet={mockFn}
      modifyIndex={null}
      setModifyIndex={mockFn}
      disabled={false}
    />,
  );
});

describe("MatchInput", () => {
  it("max 30chars per team", async () => {
    const home = screen.getByPlaceholderText("Home Team");
    const away = screen.getByPlaceholderText("Away Team");
    expect(home).toBeInTheDocument();
    expect(away).toBeInTheDocument();
    expect(screen.queryByText(inputErrors.match)).not.toBeInTheDocument();

    await user.type(home, "a".repeat(31));
    expect(home).toHaveValue("a".repeat(31));
    expect(screen.queryByText(inputErrors.match)).toBeInTheDocument();
    await user.clear(home);
    await user.type(home, "a".repeat(30));
    expect(home).toHaveValue("a".repeat(30));
    expect(screen.queryByText(inputErrors.match)).not.toBeInTheDocument();

    await user.type(away, "b".repeat(31));
    expect(away).toHaveValue("b".repeat(31));
    expect(screen.queryByText(inputErrors.match)).toBeInTheDocument();
    await user.clear(away);
    await user.type(away, "b".repeat(30));
    expect(away).toHaveValue("b".repeat(30));
    expect(screen.queryByText(inputErrors.match)).not.toBeInTheDocument();
  });

  it("alert input", async () => {
    const home = screen.getByPlaceholderText("Home Team");
    const continueButton = screen.getByRole("button", { name: /continue/i });

    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    expect(home).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();
    expect(screen.queryByText(inputErrors.match)).not.toBeInTheDocument();

    await user.type(home, "<script>alert('XSS')</script>");
    await user.click(continueButton);

    expect(alertMock).not.toHaveBeenCalled();

    // Clean up the mock
    alertMock.mockRestore();
  });
});

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});
