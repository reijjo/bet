import { render, screen } from "@testing-library/react";
import { MultipleFieldErrors } from "react-hook-form";
import { describe, expect, it } from "vitest";

import { InputErrorContainer } from "./InputErrorContainer";

describe("InputErrorContainer.tsx", () => {
  it("renders a single error message", () => {
    render(<InputErrorContainer errors={{ message: "This is an error" }} />);

    const errorElement = screen.getByRole("alert");
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent("This is an error");
  });

  it("skips rendering null/undefined error messages", () => {
    const errors: MultipleFieldErrors = {
      valid: false,
      empty: undefined,
      error: "This is an error",
    };

    render(<InputErrorContainer errors={errors} />);

    const errorElements = screen.getAllByRole("alert");
    expect(errorElements).toHaveLength(1);
    expect(errorElements[0]).toHaveTextContent("This is an error");
  });

  it("handles errors object with falsy message property", () => {
    const errors = {
      message: "", // falsy message property
      required: "This field is required",
      minLength: "Minimum length is 5 characters",
    };

    render(<InputErrorContainer errors={errors} />);

    const errorElements = screen.getAllByRole("alert");
    expect(errorElements).toHaveLength(2);
    expect(errorElements[0]).toHaveTextContent("This field is required");
    expect(errorElements[1]).toHaveTextContent(
      "Minimum length is 5 characters"
    );
  });
});
