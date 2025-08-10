import { describe, test, expect, afterEach, spyOn } from "bun:test";
import supertest from "supertest";
import app from "../../../app";
import { FeedbackModel } from "../../../models/feedbackModel";
import { UserModel } from "../../../models/userModel";
import { feedbackData } from "./helpers/feecback";

const api = supertest(app);

describe("FEEDBACK CONTROLLER - createFeedback", () => {
  afterEach(async () => {
    await FeedbackModel.destroy({ where: {}, truncate: true, cascade: true });
    await UserModel.destroy({ where: {}, truncate: true, cascade: true });
  });

  describe("success cases", () => {
    test("valid feedback", async () => {
      await api.post("/api/feedback").send(feedbackData).expect(201);
    });
  });

  describe("error cases", () => {
    test("empty name", async () => {
      const response = await api
        .post("/api/feedback")
        .send({ ...feedbackData, name: "" })
        .expect(400);

      expect(response.body.message).toBe(
        "Name and message are required fields."
      );
    });

    test("input validation - short name", async () => {
      const response = await api
        .post("/api/feedback")
        .send({ ...feedbackData, name: "ab" })
        .expect(400);

      expect(response.body.message).toBe(
        "Name must be between 3 and 50 characters"
      );
    });

    test("input validation - short message", async () => {
      const response = await api
        .post("/api/feedback")
        .send({ ...feedbackData, message: "test" })
        .expect(400);

      expect(response.body.message).toBe(
        "Message must be between 5 and 1000 characters"
      );
    });

    test("server error", async () => {
      const createFeedbackSpy = spyOn(
        FeedbackModel,
        "create"
      ).mockImplementation(async () => {
        throw new Error("Database error");
      });

      const response = await api
        .post("/api/feedback")
        .send(feedbackData)
        .expect(500);
      expect(response.body.message).toBe("Failed to create feedback");

      createFeedbackSpy.mockRestore();
    });
  });
});
