import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { Error } from "../fallback/Error";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

describe("Error component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle PARSING_ERROR", () => {
    const mockError: FetchBaseQueryError = {
      status: "PARSING_ERROR",
      originalStatus: 404,
      data: "fetchbase error",
      error: "parsing error",
    };

    render(
      <BrowserRouter>
        <Error error={mockError} />
      </BrowserRouter>
    );

    expect(screen.getByText(/fetchbase error/i)).toBeInTheDocument();
  });

  it("should handle other than PARSING_ERROR", () => {
    const mockError: FetchBaseQueryError = {
      status: "FETCH_ERROR",
      data: undefined,
      error: "Network error",
    };

    render(
      <BrowserRouter>
        <Error error={mockError} />
      </BrowserRouter>
    );

    expect(screen.getByText(/fetch_error/i)).toBeInTheDocument();
  });

  it("should handle SerializedError with message", () => {
    const mockError = {
      name: "TypeError",
      message: "Cannot read property of undefined",
      stack: "Error stack trace...",
    };

    render(
      <BrowserRouter>
        <Error error={mockError} />
      </BrowserRouter>
    );

    expect(
      screen.getByText("Cannot read property of undefined")
    ).toBeInTheDocument();
  });

  it("should handle SerializedError without message", () => {
    const mockError = {
      name: "Error",
      stack: "Error stack trace...",
    };

    render(
      <BrowserRouter>
        <Error error={mockError} />
      </BrowserRouter>
    );

    expect(
      screen.getByText("An unexpected error occurred. Please try again later.")
    ).toBeInTheDocument();
  });
});
