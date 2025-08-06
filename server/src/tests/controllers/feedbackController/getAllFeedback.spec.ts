import { describe, test, expect, beforeEach, afterEach, spyOn } from "bun:test";
import supertest from "supertest";
import app from "../../../app";
import { FeedbackModel } from "../../../models/feedbackModel";
import { UserModel } from "../../../models/userModel";
import {
  createAdminukko,
  createTestiukko,
  loginTestiukko,
} from "../helpers/createTestuser";
import { adminUkko, testiukko } from "../helpers/testUsers";
import type { User } from "../../../utils/types";

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
  // describe("success cases", () => {});

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
  });
});
