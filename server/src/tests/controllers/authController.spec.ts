import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  jest,
  mock,
  spyOn,
  test,
} from "bun:test";

import app from "../../app";
import { initializeDatabase } from "../../models";
import { UserModel } from "../../models/userModel";
import { closeDBconnection, connectToDB } from "../../utils/db/db";
import * as emailService from "../../utils/emailService";
import supertest from "supertest";

const api = supertest(app);

describe("register route", () => {
  beforeAll(async () => {
    await connectToDB();
    await initializeDatabase();
  });

  afterAll(async () => {
    await closeDBconnection();
  });

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

  afterEach(async () => {
    await UserModel.destroy({ where: {}, truncate: true, cascade: true });
    jest.restoreAllMocks();
  });
});
