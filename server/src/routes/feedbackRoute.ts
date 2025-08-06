import {
  createFeedback,
  editFeedback,
  getAllFeedback,
} from "../controllers/feedbackController";
import { authCheck } from "../middleware/authCheck";
import express from "express";

export const feedbackRouter = express.Router({ mergeParams: true });

feedbackRouter.get("/", authCheck("Admin"), getAllFeedback);
feedbackRouter.post("/", createFeedback);
feedbackRouter.patch("/:id", authCheck("Admin"), editFeedback);
