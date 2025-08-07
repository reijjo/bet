import type { NextFunction, Request, Response } from "express";
import { FeedbackModel } from "../models/feedbackModel";
import type { FeedbackMessage, FeedbackMessageAdmin } from "../utils/types";
import { HttpError } from "../middleware/errorHandler";
import { isFeedbackValid } from "./utils/feedbackUtils";

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

//
// POST
// Create new feedback
export const createFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Check the request body for required fields
  const { name, email, message } = req.body as FeedbackMessage;

  if (!name.trim() || !message.trim()) {
    return next(new HttpError("Name and message are required fields.", 400));
  }

  // Validate the feedback content
  const validationError = isFeedbackValid(name, message, email);
  if (validationError) {
    return next(new HttpError(validationError, 400));
  }

  // Create a new feedback entry
  try {
    const feedback = await FeedbackModel.create({
      name: name.trim(),
      email: email.trim() || "",
      message: message.trim(),
    });

    res.status(201).json({
      data: feedback,
      success: true,
      message: "Thanks for the feedback!",
    });
  } catch (error) {
    return next(new HttpError("Failed to create feedback", 500));
  }
  // Catch any errors and pass them to the
};

//
// PATCH
// Edit existing feedback (Admin only)
export const editFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { readByAdmin, responseText } = req.body as FeedbackMessageAdmin;

  if (!Number(id) || isNaN(Number(id))) {
    return next(new HttpError("Invalid feedback ID", 400));
  }

  try {
    const feedback = await FeedbackModel.findByPk(id);

    if (!feedback) {
      return next(new HttpError("Feedback not found", 404));
    }

    await feedback.update({
      readByAdmin,
      responded: responseText ? true : false,
      responseText,
    });

    const updatedFeedback = await FeedbackModel.findByPk(id);
    res.status(200).json({
      data: updatedFeedback,
      success: true,
      message: "Feedback updated successfully",
    });
  } catch (error: unknown) {
    return next(new HttpError("Failed to edit feedback", 500));
  }
};
