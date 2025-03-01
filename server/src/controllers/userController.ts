import { UserModel } from "../models/userModel";
import type { NextFunction, Request, Response } from "express";

export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await UserModel.findAll({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
