import { describe, test, expect, beforeEach, afterEach, jest } from "bun:test";
import supertest from "supertest";
import app from "../../../app";

const api = supertest(app);

describe("AUTH CONTROLLER - verifyAccount", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("error cases", () => {
    test("too short token", async () => {
      const res = await api.get("/api/auth/register/abc");
      expect(res.status).toBe(400);
    });
  });
});
