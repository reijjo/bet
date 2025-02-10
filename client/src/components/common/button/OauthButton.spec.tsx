import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { OauthButton } from "./OauthButton";

describe("OauthButton", () => {
  it("should render correctly", () => {
    render(<OauthButton icon="google" provider="Google" action="login" />);

    expect(screen.getByText("Login with Google")).toBeInTheDocument();
  });

  it("should render correctly for register action", () => {
    render(<OauthButton icon="google" provider="Google" action="register" />);
    expect(screen.getByText("Sign up with Google")).toBeInTheDocument();
  });
});
