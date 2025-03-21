import { HttpError } from "../middleware/errorHandler";
import { UserModel } from "../models/userModel";
import { sendVerificationEmail } from "../utils/emailService";
import { isEmailValid } from "../utils/input-validators/email";
import type { RegisterValues } from "../utils/types";
import { randomBytes } from "crypto";
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

export const findUserQuery = async (
  req: Request,
  res: Response,
  next: NextFunction,
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

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;

  const emailValidation = isEmailValid(email);
  if (emailValidation) {
    return next(new HttpError(emailValidation, 400));
  }

  const userExists = await UserModel.findOne({
    where: { email },
  });

  if (userExists) {
    return next(
      new HttpError(
        "Email already registered. Please use different email",
        409,
        "Duplicate email",
      ),
    );
  }

  try {
    const verifyToken = randomBytes(32).toString("hex");

    // Set token expiration (1 hour from now)
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 1);

    await UserModel.create({
      email: email,
      resetToken: verifyToken,
      resetTokenExpiration: tokenExpiration,
    });

    // Send verification email
    await sendVerificationEmail(email, verifyToken);

    res.status(201).json({
      success: true,
      message: `User '${email}' registered! Check your email to verify your account.`,
      data: email,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return next(
      new HttpError("Failed to register user. Please try again later.", 500),
    );
  }
};
