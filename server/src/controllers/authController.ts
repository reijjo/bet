import { HttpError } from "../middleware/errorHandler";
import { UserModel } from "../models/userModel";
import { sendVerificationEmail } from "../utils/emailService";
import { isEmailValid } from "../utils/input-validators/email";
import { randomBytes } from "crypto";
import type { NextFunction, Request, Response } from "express";

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

  // Check if email is already registered
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
