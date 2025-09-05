import {
  describe,
  test,
  expect,
  beforeEach,
  afterEach,
  jest,
  spyOn,
} from "bun:test";
import supertest from "supertest";
import app from "../../../app";
import { UserModel } from "../../../models/userModel";
import { testiukko } from "../helpers/testUsers";
import { createTestiukko } from "../helpers/createTestuser";

if (process.env.NODE_ENV === "test") {
  console.log = function () {};
  console.error = function () {};
}

const api = supertest(app);

describe("AUTH CONTROLLER - verifyAccount", () => {
  beforeEach(async () => {
    await UserModel.destroy({ where: {}, truncate: true, cascade: true });
    jest.restoreAllMocks();
  });
  afterEach(async () => {
    await UserModel.destroy({ where: {}, truncate: true, cascade: true });
    jest.restoreAllMocks();
  });

  // ERROR CASES
  describe("error cases", () => {
    test("too short token", async () => {
      const res = await api.get("/api/auth/register/abc");
      expect(res.status).toBe(401);
    });

    test("no account found", async () => {
      const res = await api.get("/api/auth/register/validtoken123");
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("No account found. Please register");
    });

    test("expired token", async () => {
      const yesterday = new Date().getTime() - 24 * 60 * 60 * 1000;

      const expiredUser = await createTestiukko(testiukko);

      await UserModel.update(
        { resetTokenExpiration: new Date(yesterday) },
        { where: { id: expiredUser.body.data.id } }
      );

      const res = await api.get(
        `/api/auth/register/${expiredUser.body.data.resetToken}`
      );
      expect(res.status).toBe(400);
    });

    test("catch block", async () => {
      const createSpy = spyOn(UserModel, "findOne").mockImplementation(
        async () => {
          throw new Error("Database error");
        }
      );

      const res = await api.get("/api/auth/register/validtoken123");

      expect(createSpy).toHaveBeenCalled();
      expect(res.status).toBe(500);

      createSpy.mockRestore();
    });
  });

  // Success cases
  describe("success cases", () => {
    test("valid token", async () => {
      const user = await createTestiukko(testiukko);
      const res = await api.get(
        `/api/auth/register/${user.body.data.resetToken}`
      );
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe(
        "Account verified! You can now log in with your credentials."
      );
    });
  });
});
