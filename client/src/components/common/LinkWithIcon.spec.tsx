import { faHome } from "@fortawesome/free-solid-svg-icons";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Mock, describe, expect, it, vi } from "vitest";

import { LinkWithIcon } from "./LinkWithIcon";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

describe("LinkWithIcon", () => {
  it("should add active-link class when current path matches link prop", () => {
    const mockUseLocation = useLocation as Mock;
    mockUseLocation.mockReturnValue({ pathname: "/home" });

    render(
      <BrowserRouter>
        <LinkWithIcon
          link="/home"
          icon={faHome}
          linkText="Home"
          className="base-class"
        />
      </BrowserRouter>,
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveClass("base-class");
    expect(linkElement).toHaveClass("active-link");
  });

  it("should not add active-link class when current path doesn't match link prop", () => {
    const mockUseLocation = useLocation as Mock;
    mockUseLocation.mockReturnValue({ pathname: "/about" });

    render(
      <BrowserRouter>
        <LinkWithIcon
          link="/home"
          icon={faHome}
          linkText="Home"
          className="base-class"
        />
      </BrowserRouter>,
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveClass("base-class");
    expect(linkElement).not.toHaveClass("active-link");
  });

  it("should render icon and text correctly", () => {
    const mockUseLocation = useLocation as Mock;
    mockUseLocation.mockReturnValue({ pathname: "/" });

    render(
      <BrowserRouter>
        <LinkWithIcon
          link="/home"
          icon={faHome}
          linkText="Home"
          className="base-class"
        />
      </BrowserRouter>,
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
  });
});
