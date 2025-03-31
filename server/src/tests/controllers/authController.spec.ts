import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  spyOn,
  test,
} from "bun:test";

import app from "../../app";
import { initializeDatabase } from "../../models";
import { UserModel } from "../../models/userModel";
import { closeDBconnection, connectToDB } from "../../utils/db/db";
import * as emailService from "../../utils/emailService";
import { randomBytes } from "crypto";
import supertest from "supertest";

const api = supertest(app);

if (process.env.NODE_ENV === "test") {
  console.log = function () {};
  console.error = function () {};
}

// beforeAll(async () => {
//   await connectToDB();
//   await initializeDatabase();
// });

// afterAll(async () => {
//   await closeDBconnection();
// });

describe("verifyAccount route", () => {
  test.only("invalid token", async () => {
    const res = await api.get("/api/auth/register/aa");

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid token");
  });

  test("no account found", async () => {
    const res = await api.get("/api/auth/register/123456");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("No account found Please register");
    expect(res.body.comment).toBe("test comment");
  });

  test("expired token", async () => {
    const yesterday = new Date().getTime() - 24 * 60 * 60 * 1000;
    const token = randomBytes(32).toString("hex");

    await api.post("/api/auth/register").send({
      email: "testukko@com.com",
      restToken: token,
      resetTokenExpiration: yesterday,
    });

    const user = await UserModel.findOne({
      where: { email: "testukko@com.com" },
    });

    if (user) {
      await user.update({
        resetToken: token,
        resetTokenExpiration: new Date(yesterday),
      });

      const res = await api.get(`/api/auth/register/${token}`);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("testukko@com.com");
      expect(res.body.comment).toBe("Token expired");
    } else {
      expect(true).toBe(false); //fail the test, because the user was not found.
    }
  });

  test("valid token", async () => {
    const tomorrow = new Date().getTime() + 24 * 60 * 60 * 1000;
    const token = randomBytes(32).toString("hex");

    await api.post("/api/auth/register").send({
      email: "testukko@com.com",
      restToken: token,
      resetTokenExpiration: tomorrow,
    });

    const user = await UserModel.findOne({
      where: { email: "testukko@com.com" },
    });

    if (user) {
      await user.update({
        resetToken: token,
        resetTokenExpiration: new Date(tomorrow),
      });

      const res = await api.get(`/api/auth/register/${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    } else {
      expect(true).toBe(false); //fail the test, because the user was not found.
    }
  });

  test("valid token catch block", async () => {
    const token = randomBytes(32).toString("hex");
    const findOneSpy = spyOn(UserModel, "findOne").mockImplementation(
      async () => {
        throw new Error("Database error");
      },
    );

    try {
      const res = await api.get(`/api/auth/register/${token}`);

      expect(res.status).toBe(500);
      expect(res.body.message).toBe(
        "Failed to verify account. Please try again later.",
      );
    } finally {
      findOneSpy.mockRestore();
    }
  });

  describe("refresh token route", () => {
    test("no email", async () => {
      const res = await api.patch("/api/auth/register/13246a").send({});

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Email is required");
    });

    test("user not found", async () => {
      const res = await api
        .patch("/api/auth/register/13246a")
        .send({ email: "testukko@aa.com" });

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("User not found");
    });

    test("refresh token", async () => {
      const email = "testi@ukko.com";
      const token = randomBytes(32).toString("hex");
      const tokenExpiration = new Date();
      tokenExpiration.setHours(tokenExpiration.getHours() + 1);

      await UserModel.create({
        email,
        resetToken: token,
        resetTokenExpiration: tokenExpiration,
      });

      const user = await UserModel.findOne({ where: { email } });

      if (user) {
        await user.update({
          resetToken: token,
          resetTokenExpiration: tokenExpiration,
        });

        const res = await api
          .patch(`/api/auth/register/${token}`)
          .send({ token, email });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe(
          "Token refreshed! Check your email to verify your account.",
        );
        expect(res.body.data).toBe(email);
      } else {
        expect(true).toBe(false);
      }
    });

    test("refresh token catch block", async () => {
      const token = randomBytes(32).toString("hex");
      const findOneSpy = spyOn(UserModel, "findOne").mockImplementation(
        async () => {
          throw new Error("Database error");
        },
      );

      try {
        const res = await api
          .patch(`/api/auth/register/${token}`)
          .send({ token, email: "test@ukko.com" });

        expect(res.status).toBe(500);
        expect(res.body.message).toBe(
          "Failed to refresh token. Please try again later.",
        );
      } finally {
        findOneSpy.mockRestore();
      }
    });
  });

  describe("finish registration route", () => {
    const registerValues = {
      email: "testi@ukko.com",
      username: "repe",
      password: "Pass_123",
    };

    beforeEach(async () => {
      const token = randomBytes(32).toString("hex");
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      await UserModel.create({
        email: "testi@ukko.com",
        resetToken: token,
        resetTokenExpiration: tomorrow,
      });
    });

    test("no email", async () => {
      const res = await api
        .patch("/api/auth/register/")
        .send({ email: "", password: "password", username: "username" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "Username, email and password are required",
      );
    });

    test("invalid username", async () => {
      const res = await api
        .patch("/api/auth/register/")
        .send({ ...registerValues, username: "aaa@aaa" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid username");
    });

    test("too short username", async () => {
      const res = await api.patch("/api/auth/register/").send({
        ...registerValues,
        username: "a",
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "Username must be between 3 and 20 characters",
      );
    });

    test("too short password", async () => {
      const res = await api
        .patch("/api/auth/register/")
        .send({ ...registerValues, password: "passwor" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "Password must be between 8 and 50 characters",
      );
    });

    test("password no uppercase", async () => {
      const res = await api
        .patch("/api/auth/register/")
        .send({ ...registerValues, password: "password" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "Password must contain at least one uppercase letter",
      );
    });

    test("password no lowercase", async () => {
      const res = await api
        .patch("/api/auth/register/")
        .send({ ...registerValues, password: "PASSWORD" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "Password must contain at least one lowercase letter",
      );
    });

    test("password no number", async () => {
      const res = await api
        .patch("/api/auth/register/")
        .send({ ...registerValues, password: "Password" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "Password must contain at least one number",
      );
    });

    test("password no special char", async () => {
      const res = await api
        .patch("/api/auth/register/")
        .send({ ...registerValues, password: "Password123" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "Password must contain at least one special character",
      );
    });

    test("user not found", async () => {
      const res = await api
        .patch("/api/auth/register/")
        .send({ ...registerValues, email: "huru@ukko.com" });
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("User not found");
    });

    test("finishing registering", async () => {
      const res = await api.patch("/api/auth/register/").send(registerValues);

      expect(res.status).toBe(201);
      expect(res.body.message).toBe(
        `User ${registerValues.username} created successfully!`,
      );
    });

    test("finishing registering catch block", async () => {
      const findOneSpy = spyOn(UserModel, "findOne").mockImplementation(
        async () => {
          throw new Error("Database error");
        },
      );

      try {
        const res = await api.patch(`/api/auth/register`).send(registerValues);

        expect(res.status).toBe(500);
        expect(res.body.message).toBe(
          "Failed to finish registration. Please try again later.",
        );
      } finally {
        findOneSpy.mockRestore();
      }
    });
  });
});

afterEach(async () => {
  await UserModel.destroy({ where: {}, truncate: true, cascade: true });
  jest.restoreAllMocks();
});
