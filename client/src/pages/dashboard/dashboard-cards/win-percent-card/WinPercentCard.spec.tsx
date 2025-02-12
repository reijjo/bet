/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { mockManyBets } from "../../../../tests/mocks/betsManyMock";
import { WinPercentCard } from "./WinPercentCard";

// import { PieChartDashboard } from "../../../../components";

// Mock the PieChartDashboard component to test hover behavior
vi.mock("../../../../components", () => ({
  PieChartDashboard: ({ onHover, hoverText }: any) => (
    <div data-testid="pie-chart">
      <div data-testid="hover-text">{hoverText}</div>
      <button
        data-testid="trigger-hover-won"
        onClick={() => onHover({ name: "Won", value: 5, percent: 0.5 })}
      >
        Hover Won
      </button>
      <button
        data-testid="trigger-hover-lost"
        onClick={() => onHover({ name: "Lost", value: 3, percent: 0.3 })}
      >
        Hover Lost
      </button>
      <button data-testid="trigger-hover-out" onClick={() => onHover(null)}>
        Hover Out
      </button>
    </div>
  ),
}));

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("WinPercentCard", () => {
  beforeAll(() => {
    // Setup ResizeObserver mock
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

  it("should render correctly", () => {
    render(<WinPercentCard allBets={mockManyBets} />);
    expect(screen.getByRole("heading", { name: "Win %" })).toBeInTheDocument();
  });

  it("should display 'No settled bets yet' when there are no settled bets", () => {
    render(<WinPercentCard allBets={[]} />);
    expect(screen.getByText("No settled bets yet.")).toBeInTheDocument();
  });

  describe("hover behavior", () => {
    it("should update hover text when hovering over Won section", () => {
      render(<WinPercentCard allBets={mockManyBets} />);
      const hoverWonButton = screen.getByTestId("trigger-hover-won");

      fireEvent.click(hoverWonButton);

      expect(screen.getByTestId("hover-text")).toHaveTextContent("Won: 50%");
    });

    it("should update hover text when hovering over Lost section", () => {
      render(<WinPercentCard allBets={mockManyBets} />);
      const hoverLostButton = screen.getByTestId("trigger-hover-lost");

      fireEvent.click(hoverLostButton);

      expect(screen.getByTestId("hover-text")).toHaveTextContent("Lost: 30%");
    });

    it("should reset to default hover text when mouse leaves", () => {
      const settledBets = mockManyBets.filter(
        (bet) => bet.status !== "Pending",
      );
      const wonBets = settledBets.filter(
        (bet) => bet.status === "Won" || bet.status === "Half Won",
      ).length;
      const expectedPercentage = Math.round(
        (wonBets / settledBets.length) * 100,
      );

      render(<WinPercentCard allBets={mockManyBets} />);

      // First hover over a section
      const hoverWonButton = screen.getByTestId("trigger-hover-won");
      fireEvent.click(hoverWonButton);

      // Then trigger mouse leave
      const hoverOutButton = screen.getByTestId("trigger-hover-out");
      fireEvent.click(hoverOutButton);

      expect(screen.getByTestId("hover-text")).toHaveTextContent(
        `Won: ${expectedPercentage}%`,
      );
    });
  });
});
