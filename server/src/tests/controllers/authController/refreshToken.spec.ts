import {
  describe,
  test,
  afterEach,
  expect,
  beforeEach,
  jest,
  spyOn,
} from "bun:test";
import supertest from "supertest";
import app from "../../../app";
import { UserModel } from "../../../models/userModel";
import { createTestiukko } from "../helpers/createTestuser";
import { testiukko } from "../helpers/testUsers";

const api = supertest(app);

describe("AUTH CONTROLLER - refreshToken", () => {
  beforeEach(async () => {
    await UserModel.destroy({ where: {}, truncate: true, cascade: true });
    jest.restoreAllMocks();
  });
  afterEach(async () => {
    await UserModel.destroy({ where: {}, truncate: true, cascade: true });
    jest.restoreAllMocks();
  });

  describe("valid cases", () => {
    test("successful token refresh", async () => {
      const user = await createTestiukko(testiukko);
      const { resetToken } = user.body.data;
      const res = await api.patch(`/api/auth/register/${resetToken}`).send({
        token: resetToken,
      });
      expect(res.status).toBe(200);
    });
  });

  describe("error cases", () => {
    test("invalid token", async () => {
      const res = await api.patch("/api/auth/register/43242342344").send({
        token: "",
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid token");
    });

    test("no user found", async () => {
      const user = await createTestiukko(testiukko);
      const { resetToken } = user.body.data;

      const res = await api.patch(`/api/auth/register/${resetToken}`).send({
        token: "asdjkdahj3",
      });

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("User not found");
    });

    test("catch block", async () => {
      const user = await createTestiukko(testiukko);
      const { resetToken } = user.body.data;

      const spy = spyOn(UserModel, "findOne").mockImplementation(() => {
        throw new Error("Database error");
      });

      const res = await api
        .patch(`/api/auth/register/${resetToken}`)
        .send({ token: resetToken });

      expect(spy).toHaveBeenCalled();
      expect(res.status).toBe(500);

      spy.mockRestore();
    });
  });
});
