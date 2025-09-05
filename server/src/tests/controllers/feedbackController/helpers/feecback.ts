import supertest from "supertest";
import app from "../../../../app";
import type { FeedbackMessage } from "../../../../utils/types/types";

const api = supertest(app);

export const feedbackData = {
  name: "John Doe",
  email: "tester@email.com",
  message: "This is a test feedback message.",
};

export const addFeedbackData = async (data: FeedbackMessage) => {
  const response = await api.post("/api/feedback").send(data);
  expect(response.status).toBe(201);
  return response.body.data;
};
