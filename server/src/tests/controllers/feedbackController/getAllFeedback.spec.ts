import { describe, test, expect, beforeEach, afterEach, spyOn } from "bun:test";
import supertest from "supertest";
import app from "../../../app";
import { FeedbackModel } from "../../../models/feedbackModel";
import { UserModel } from "../../../models/userModel";
import {
  createAdminukko,
  createGuestUser,
  createTestiukko,
  loginTestiukko,
} from "../helpers/createTestuser";
import { adminUkko, guestUkko, testiukko } from "../helpers/testUsers";
import type { User } from "../../../utils/types";
import exp from "constants";

const api = supertest(app);

// if (process.env.NODE_ENV === "test") {
//   console.log = function () {};
//   console.error = function () {};
// }

describe("FEEDBACK CONTROLLER - getAllFeedback", () => {
  beforeEach(async () => {
    await FeedbackModel.destroy({ where: {}, truncate: true, cascade: true });
    await UserModel.destroy({ where: {}, truncate: true, cascade: true });
  });

  afterEach(async () => {
    await FeedbackModel.destroy({ where: {}, truncate: true, cascade: true });
    await UserModel.destroy({ where: {}, truncate: true, cascade: true });
  });
  describe("success cases", () => {
    test("get all feedback as admin", async () => {
      const agent = supertest.agent(app); // Keeps session cookies

      const admin = await createAdminukko(adminUkko);

      const test = await agent.post("/api/auth/login").send({
        login: admin.username,
        password: adminUkko.password,
      });

      expect(test.body.success).toBe(true);

      const res = await agent.get("/api/feedback");
      expect(res.status).toBe(200);
    });
  });

  describe("error cases", () => {
    test("server error", async () => {
      const agent = supertest.agent(app); // Keeps session cookies

      const admin = await createAdminukko(adminUkko);

      const test = await agent.post("/api/auth/login").send({
        login: admin.username,
        password: adminUkko.password,
      });

      expect(test.body.success).toBe(true);

      const getAllFeedbackSpy = spyOn(
        FeedbackModel,
        "findAll"
      ).mockImplementation(async () => {
        throw new Error("Database error");
      });

      const res = await agent.get("/api/feedback");

      expect(res.status).toBe(500);
      expect(getAllFeedbackSpy).toHaveBeenCalled();

      getAllFeedbackSpy.mockRestore();
    });

    test("user not logged in", async () => {
      const res = await api.get("/api/feedback");
      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Session expired or user not logged in");
    });

    test("user does not have the required role", async () => {
      const agent = supertest.agent(app);

      const guest = await createGuestUser(guestUkko);

      const test = await agent.post("/api/auth/login").send({
        login: guest.username,
        password: guestUkko.password,
      });

      expect(test.body.success).toBe(true);

      const res = await agent.get("/api/feedback");
      expect(res.status).toBe(403);
      expect(res.body.message).toBe("User does not have the required role");
    });
  });
});
