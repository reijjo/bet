import { describe, test, expect, jest, afterEach, spyOn } from "bun:test";
import supertest from "supertest";
import app from "../../../app";
import { createTestiukko } from "../helpers/createTestuser";
import { UserModel } from "../../../models/userModel";

const api = supertest(app);

if (process.env.NODE_ENV === "test") {
  console.log = function () {};
  console.error = function () {};
}

describe("USER CONTROLLER - getUserQuery", () => {
  afterEach(async () => {
    await UserModel.destroy({ where: {}, truncate: true, cascade: true });
    jest.restoreAllMocks();
  });

  test("no user with email", async () => {
    const res = await api.get("/api/users/find?email=testi@ukko.com");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test("no user with username", async () => {
    const res = await api.get("/api/users/find?username=testiukko");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test("empty email & username", async () => {
    const res = await api.get("/api/users/find");
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid query");
  });

  test("email already registered", async () => {
    await createTestiukko();

    const res = await api.get("/api/users/find?email=testi@ukko.com");

    expect(res.status).toBe(409);
    expect(res.body.message).toBe("Email already registered");
  });

  test("username already registered", async () => {
    await createTestiukko();

    const res = await api.get("/api/users/find?username=testiukko");

    expect(res.status).toBe(409);
    expect(res.body.message).toBe("Username already registered");
  });

  test("error finding user", async () => {
    const findOneSpy = spyOn(UserModel, "findOne").mockImplementation(
      async () => {
        throw new Error("Database error");
      }
    );

    const res = await api.get("/api/users/find?email=testi@ukko.com");

    expect(findOneSpy).toHaveBeenCalled();
    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Database error");
    findOneSpy.mockRestore();
  });
});
