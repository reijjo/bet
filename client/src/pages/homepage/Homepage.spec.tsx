import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { store } from "../../store/store";
import Homepage from "./Homepage";

// Mock FontAwesomeIcon with a component that renders the size as data attribute
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: ({
    icon,
    size,
    ...props
  }: {
    icon: { iconName: string; prefix: string };
    size?: string;
    [key: string]: unknown;
  }) => (
    <div
      data-testid={props["data-testid"]}
      data-fa-size={size}
      data-fa-icon={icon.iconName}
    >
      Mock Icon
    </div>
  ),
}));

// Create a mockable function
const mockUseScreenWidth = vi.fn();

// Mock the module
vi.mock("../../hooks/useScreenWidth", () => ({
  useScreenWidth: () => mockUseScreenWidth(),
}));

describe("Homepage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders large icons on desktop", async () => {
    // Set the mock implementation for desktop
    mockUseScreenWidth.mockReturnValue({
      isMobile: false,
      isTablet: false,
      isSidebarOpen: true,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Homepage />
        </MemoryRouter>
      </Provider>
    );

    const icons = screen.getAllByTestId("why-icon");
    expect(icons).toHaveLength(3);

    for (const icon of icons) {
      expect(icon.getAttribute("data-fa-size")).toBe("3x");
    }
  });

  it("renders smaller icons on mobile", async () => {
    // Set the mock implementation for mobile
    mockUseScreenWidth.mockReturnValue({
      isMobile: true,
      isTablet: true,
      isSidebarOpen: false,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Homepage />
        </MemoryRouter>
      </Provider>
    );

    const icons = screen.getAllByTestId("why-icon");
    expect(icons).toHaveLength(3);

    // Check for mobile size
    for (const icon of icons) {
      expect(icon.getAttribute("data-fa-size")).toBe("2x");
    }
  });
});
