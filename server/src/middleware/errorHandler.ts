import { magentaBright } from "colorette";
import type { NextFunction, Request, Response } from "express";
import { DatabaseError, ValidationError } from "sequelize";

export class HttpError extends Error {
  statusCode: number;
  comment?: string;

  constructor(message: string, statusCode: number, comment?: string) {
    super(message);
    this.statusCode = statusCode;
    this.comment = comment;
  }
}

interface CustomError extends Error {
  statusCode?: number;
  comment?: string;
}

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = error.statusCode || 500;
  const errorResponse = {
    success: false,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
    message: error.message || "Internal server error",
    status: statusCode,
    comment: error.comment || "No comments.",
    // ...(Bun.env.NODE_ENV === 'development' && { stack: error.stack }),
  };

  if (error instanceof ValidationError) {
    console.error(`[ValidationError] ${error.message}`, errorResponse);
  } else if (error instanceof DatabaseError) {
    errorResponse.comment =
      "Probably a shady bet insert attempt by a shady user.";
    console.error(`[DatabaseError] ${error.message}`, errorResponse);
    console.log(
      magentaBright("Probably a shady bet insert attempt by a shady user."),
    );
  } else if (error instanceof TypeError) {
    console.error(`[TypeError] ${error.message}`, errorResponse);
  } else if (error instanceof HttpError) {
    errorResponse.comment = error.comment || "No comments.";
    console.log("Error", error);
    console.error(`[HttpError] ${error.message}`, errorResponse);
  } else {
    console.log("NO NAME ERROR", error);
    console.error(`[Error] ${error.message}`, errorResponse);
  }

  res.status(statusCode).json(errorResponse);
};
