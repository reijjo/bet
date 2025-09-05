import { HttpError } from "./errorHandler";
import type { NextFunction, Request, Response } from "express";

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  return next(new HttpError(`Not Found - ${req.originalUrl}`, 404));
};
