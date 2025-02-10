import { describe, expect, test } from "bun:test";

import app from "../app";
import supertest from "supertest";

const api = supertest(app);

describe("APP.TS", () => {
  test("should return 200", async () => {
    const res = await api.get("/");

    expect(res.status).toBe(200);
    expect(res.text).toBe("hello todo");
  });
});
