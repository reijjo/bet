import {
  afterAll,
  afterEach,
  beforeAll,
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

beforeAll(async () => {
  await connectToDB();
  await initializeDatabase();
});

afterAll(async () => {
  await closeDBconnection();
});

describe("register route", () => {
  describe("email validation", () => {
    test("empty email", async () => {
      const res = await api.post("/api/auth/register").send({ email: "" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid email");
    });

    test("invalid email", async () => {
      const res = await api
        .post("/api/auth/register")
        .send({ email: "invalidemail" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid email");
    });

    test("too short email", async () => {
      const res = await api.post("/api/auth/register").send({ email: "a@b.c" });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "Email must be between 6 and 100 characters",
      );
    });

    test("too long email", async () => {
      const res = await api.post("/api/auth/register").send({
        email: `a@basdkjlsdakjdlakjdslakdjlasdjlsadjlkadjlksdjlksadjlkasdjlksajdlkakdjlksadjlksajdlksajdlksadjklsadjlksadjlksadjlsadjlksadjlasdjldsa.com`,
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "Email must be between 6 and 100 characters",
      );
    });
  });

  describe("register user", () => {
    test("register user", async () => {
      const res = await api
        .post("/api/auth/register")
        .send({ email: "testi@ukko.com" });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe(
        `User '${res.body.data}' registered! Check your email to verify your account.`,
      );
      expect(res.body.success).toBe(true);
    });

    test("register user with existing email", async () => {
      await api.post("/api/auth/register").send({ email: "testi@ukko.com" });

      const res = await api
        .post("/api/auth/register")
        .send({ email: "testi@ukko.com" });

      expect(res.status).toBe(409);
      expect(res.body.message).toBe(
        "Email already registered. Please use different email",
      );
      expect(res.body.comment).toBe("Duplicate email");
    });

    test("register user catch block", async () => {
      // Create a spy on the sendVerificationEmail method
      const emailSpy = spyOn(
        emailService,
        "sendVerificationEmail",
      ).mockImplementation(async () => {
        throw new Error("Email error");
      });

      try {
        const res = await api.post("/api/auth/register").send({
          email: "test@ukko.com",
        });

        // Verify the error response
        expect(res.status).toBe(500);
        expect(res.body.message).toBe(
          "Failed to register user. Please try again later.",
        );

        // Optional: Verify the spy was called
        expect(emailSpy).toHaveBeenCalled();
      } finally {
        // Restore the original method
        emailSpy.mockRestore();
      }
    });
  });
});

describe("verifyAccount route", () => {
  test("invalid token", async () => {
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
});

afterEach(async () => {
  await UserModel.destroy({ where: {}, truncate: true, cascade: true });
  jest.restoreAllMocks();
});
