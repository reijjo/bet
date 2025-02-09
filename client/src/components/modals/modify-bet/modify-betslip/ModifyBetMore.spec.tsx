import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ModifyBetMore } from "./ModifyBetMore";

vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: vi.fn(() => null),
}));

describe("ModifyBetMore", () => {
  it("renders the edit button with FontAwesomeIcon", () => {
    const handleModifyBet = vi.fn();
    const { container } = render(
      <ModifyBetMore handleModifyBet={handleModifyBet} betIndex={0} />,
    );

    expect(container.querySelector(".modifybet-slip-more")).toBeTruthy();
    expect(container.querySelector(".modifybet-edit")).toBeTruthy();
    expect(FontAwesomeIcon).toHaveBeenCalled();
  });

  it("calls handleModifyBet with correct index when clicked", () => {
    const handleModifyBet = vi.fn();
    const betIndex = 2;
    const { container } = render(
      <ModifyBetMore handleModifyBet={handleModifyBet} betIndex={betIndex} />,
    );

    const editButton = container.querySelector(".modifybet-edit");
    fireEvent.click(editButton!);

    expect(handleModifyBet).toHaveBeenCalledWith(betIndex);
    expect(handleModifyBet).toHaveBeenCalledTimes(1);
  });
});
