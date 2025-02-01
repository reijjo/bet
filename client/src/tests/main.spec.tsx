import * as ReactDOM from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("react-dom/client", async () => {
  const mockCreateRoot = vi.fn(() => ({
    render: vi.fn(),
  }));

  return {
    default: { createRoot: mockCreateRoot },
    createRoot: mockCreateRoot,
  };
});

describe("Main entry", () => {
  const div = document.createElement("div");
  div.id = "root";

  beforeEach(() => {
    document.body.appendChild(div);
  });

  afterEach(() => {
    document.body.removeChild(div);
    vi.clearAllMocks();
  });

  it("renders without crashing", async () => {
    await import("../main");
    expect(ReactDOM.createRoot).toHaveBeenCalledWith(div);
  });
});
