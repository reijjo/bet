import bcryptjs from "bcryptjs";

import { HttpError } from "../middleware/errorHandler";
import { UserModel } from "../models/userModel";
import { UserRoles } from "../utils/enums";
import type { RegisterValues } from "../utils/types";
import { randomBytes } from "crypto";
import type { NextFunction, Request, Response } from "express";
import {
  isRegisterValuesValid,
  sendVerificationEmail,
} from "./utils/createUserUtils";

export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModel.findAll({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, username } = req.query as Partial<RegisterValues>;

  if (!email && !username) {
    return next(new HttpError("Invalid query", 400));
  }

  try {
    if (email) {
      const user = await UserModel.findOne({ where: { email } });
      if (user) {
        return next(new HttpError("Email already registered", 409));
      }
    }

    if (username) {
      const user = await UserModel.findOne({ where: { username } });
      if (user) {
        return next(new HttpError("Username already registered", 409));
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username, password } = req.body;

  if (!username || !password || !email) {
    return next(
      new HttpError("Username, email and password are required", 400)
    );
  }

  const validationError = isRegisterValuesValid(email, username, password);
  if (validationError) {
    return next(new HttpError(validationError, 400));
  }

  try {
    // Check for duplicate email and username
    let user = await UserModel.findOne({
      where: { email },
    });

    if (user) {
      return next(new HttpError("Email already in use.", 409));
    }

    user = await UserModel.findOne({
      where: { username },
    });

    if (user) {
      return next(new HttpError("Username already in use.", 409));
    }

    const hashPw = await bcryptjs.hash(password, 10);
    const verifyToken = randomBytes(32).toString("hex");

    // Set token expiration (1 hour from now)
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 1);

    const newUser = await UserModel.create({
      email: email,
      username: username.toLowerCase(),
      password: hashPw,
      role: UserRoles.Registered,
      resetToken: verifyToken,
      resetTokenExpiration: tokenExpiration,
    });

    await sendVerificationEmail(email, verifyToken);

    res.status(201).json({
      success: true,
      message: `Check your email '${email}' to verify your account.`,
      data: newUser,
    });
  } catch (error) {
    console.error("Finish registration error:", error);
    return next(
      new HttpError(
        "Failed to finish registration. Please try again later.",
        500
      )
    );
  }
};
