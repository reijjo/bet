import { beforeEach, describe, expect, it, vi } from "vitest";

import { afterEach } from "node:test";

vi.mock("../features/api/authApi", () => ({
  ...vi.importActual("../features/api/authApi"),
  useGetSessionUserQuery: vi.fn(),
}));

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("test", () => {
    expect(true).toBe(true);
  });
});
