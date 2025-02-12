import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { mockBet } from "../../tests/mocks/betMock";
import { BetStatus } from "../../utils/enums";
import { Bet } from "../../utils/types";
import { PieChartDashboard } from "./PieChartDashboard";

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("PieChartDashboard", () => {
  const bets: Bet[] = [
    { ...mockBet, status: BetStatus.Won },
    { ...mockBet, status: BetStatus.HalfWon },
    { ...mockBet, status: BetStatus.Lost },
    { ...mockBet, status: BetStatus.HalfLost },
    { ...mockBet, status: BetStatus.Void },
  ];
  const user = userEvent.setup();

  beforeAll(() => {
    global.ResizeObserver = ResizeObserverMock;

    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = () => ({
      width: 500,
      height: 500,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    });
  });

  it("should render", () => {
    render(
      <PieChartDashboard myBets={[]} hoverText={null} onHover={() => {}} />,
    );
  });

  it("should render with different bet statuses", () => {
    render(
      <PieChartDashboard myBets={bets} hoverText={null} onHover={() => {}} />,
    );
  });

  it("should call onHover with correct data", async () => {
    const onHoverMock = vi.fn();
    const { container } = render(
      <PieChartDashboard
        myBets={bets}
        hoverText={null}
        onHover={onHoverMock}
      />,
    );

    // const pieSegment = screen.getByTestId("pie-segment-Won");
    const pieSegment = container.querySelectorAll("path");
    const wonSegment = pieSegment[0];

    await user.hover(wonSegment);

    expect(onHoverMock).toHaveBeenCalledWith({
      name: "Won",
      value: 2,
      percent: 0.4,
    });
  });
});
