import { HttpError } from "../middleware/errorHandler";
import { UserModel } from "../models/userModel";
import { sendVerificationEmail } from "../utils/emailService";
import { isEmail } from "../utils/inputValidators";
import { randomBytes } from "crypto";
import type { NextFunction, Request, Response } from "express";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;

  console.log("email", req.body);

  if (!email || !isEmail(email)) {
    return next(new HttpError("Invalid email", 400));
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

    const newUser = await UserModel.create({
      email: email,
      resetToken: verifyToken,
      resetTokenExpiration: tokenExpiration,
    });

    // Send verification email
    await sendVerificationEmail(email, verifyToken);

    res.status(200).json({
      success: true,
      message: `User '${email}' registered! Check your email to verify your account.`,
      data: newUser.id,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return next(
      new HttpError("Failed to register user. Please try again later.", 500),
    );
  }
};
