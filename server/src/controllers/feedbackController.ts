import type { NextFunction, Request, Response } from "express";
import { FeedbackModel } from "../models/feedbackModel";

//
// GET
// Get all feedback for admin
export const getAllFeedback = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const feedback = await FeedbackModel.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      data: feedback,
      // success: true,
      // message: "Feedback retrieved successfully",
    });
  } catch (err: unknown) {
    next(err);
  }
};
