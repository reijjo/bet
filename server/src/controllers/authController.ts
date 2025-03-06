import bcryptjs from "bcryptjs";

import { HttpError } from "../middleware/errorHandler";
import { UserModel } from "../models/userModel";
import { sendVerificationEmail } from "../utils/emailService";
import { UserRoles } from "../utils/enums";
import { isEmailValid } from "../utils/input-validators/email";
import { isPasswordValid } from "../utils/input-validators/password";
import { isUsernameValid } from "../utils/input-validators/username";
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

export const verifyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.params;
  const now = new Date().getTime();

  if (token.length < 5) {
    return next(new HttpError("Invalid token", 400));
  }

  try {
    const accountToFinish = await UserModel.findOne({
      where: { resetToken: token },
    });

    if (!accountToFinish) {
      return next(
        new HttpError("No account found Please register", 404, "test comment"),
      );
    }

    if (
      !accountToFinish.resetTokenExpiration ||
      new Date(accountToFinish.resetTokenExpiration).getTime() < now
    ) {
      return next(
        new HttpError(`${accountToFinish.email}`, 400, "Token expired"),
      );
    }

    res.status(200).json({
      success: true,
      message:
        "Account found. Please set your password to finish registration.",
      data: accountToFinish.email,
    });
  } catch (error) {
    console.error("Verification error:", error);
    return next(
      new HttpError("Failed to verify account. Please try again later.", 500),
    );
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;

  if (!email) {
    return next(new HttpError("Email is required", 400));
  }

  try {
    const user = await UserModel.findOne({
      where: { email },
    });

    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    const verifyToken = randomBytes(32).toString("hex");

    // Set token expiration (1 hour from now)
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 1);

    await user.update({
      resetToken: verifyToken,
      resetTokenExpiration: tokenExpiration,
    });

    await sendVerificationEmail(email, verifyToken);

    res.status(201).json({
      success: true,
      message: `Token refreshed! Check your email to verify your account.`,
      data: email,
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    return next(
      new HttpError("Failed to refresh token. Please try again later.", 500),
    );
  }
};

export const finishRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, username, password } = req.body;

  if (!username || !password || !email) {
    return next(
      new HttpError("Username, email and password are required", 400),
    );
  }

  const usernameValidation = isUsernameValid(username);
  if (usernameValidation) {
    return next(new HttpError(usernameValidation, 400));
  }

  const passwordValidation = isPasswordValid(password);
  if (passwordValidation) {
    return next(new HttpError(passwordValidation, 400));
  }

  try {
    const user = await UserModel.findOne({
      where: { email },
    });

    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    const hashPw = await bcryptjs.hash(password, 10);
    const newUser = await user.update({
      username: username.toLowerCase(),
      password: hashPw,
      role: UserRoles.Guest,
    });

    res.status(201).json({
      success: true,
      message: `User ${username} created successfully!`,
      data: newUser,
    });
  } catch (error) {
    console.error("Finish registration error:", error);
    return next(
      new HttpError(
        "Failed to finish registration. Please try again later.",
        500,
      ),
    );
  }
};
