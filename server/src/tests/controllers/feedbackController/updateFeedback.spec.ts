import {
  describe,
  test,
  expect,
  beforeAll,
  afterEach,
  spyOn,
  afterAll,
} from "bun:test";
import supertest from "supertest";
import app from "../../../app";
import { FeedbackModel } from "../../../models/feedbackModel";
import { UserModel } from "../../../models/userModel";
import { addFeedbackData, feedbackData } from "./helpers/feecback";
import { createAdminukko } from "../helpers/createTestuser";
import { adminUkko } from "../helpers/testUsers";

const agent = supertest.agent(app);

describe("FEEDBACK CONTROLLER - updateFeedback", () => {
  beforeAll(async () => {
    const admin = await createAdminukko(adminUkko);
    const loginResponse = await agent.post("/api/auth/login").send({
      login: admin.username,
      password: adminUkko.password,
    });

    expect(loginResponse.body.success).toBe(true);
  });

  afterEach(async () => {
    await FeedbackModel.destroy({ where: {}, truncate: true, cascade: true });
  });

  afterAll(async () => {
    await UserModel.destroy({ where: {}, truncate: true, cascade: true });
  });

  describe("success cases", () => {
    test("update feedback as admin", async () => {
      const feedback = await addFeedbackData(feedbackData);

      const res = await agent.patch(`/api/feedback/${feedback.id}`).send({
        readByAdmin: true,
        responseText: "Updated response",
      });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Feedback updated successfully");
      expect(res.body.data.readByAdmin).toBe(true);
      expect(res.body.data.responseText).toBe("Updated response");
    });
  });

  describe("error cases", () => {
    test("server error", async () => {
      const feedback = await addFeedbackData(feedbackData);

      const findByPkSpy = spyOn(FeedbackModel, "findByPk").mockImplementation(
        async () => {
          throw new Error("Database error");
        }
      );

      const res = await agent.patch(`/api/feedback/${feedback.id}`).send({
        readByAdmin: true,
        responseText: "Updated response",
      });

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to edit feedback");

      findByPkSpy.mockRestore();
    });

    test("feedback not found", async () => {
      const res = await agent.patch("/api/feedback/999999").send({
        readByAdmin: true,
        responseText: "Updated response",
      });

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Feedback not found");
    });

    test("invalid id", async () => {
      const res = await agent.patch("/api/feedback/aaa").send({
        readByAdmin: true,
        responseText: "Updated response",
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid feedback ID");
    });
  });
});
