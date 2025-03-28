import bcryptjs from "bcryptjs";

import { HttpError } from "../middleware/errorHandler";
import { UserModel } from "../models/userModel";
import { sendVerificationEmail } from "../utils/emailService";
import { UserRoles } from "../utils/enums";
import { isPasswordValid } from "../utils/input-validators/password";
import { isUsernameValid } from "../utils/input-validators/username";
import type { LoginValues } from "../utils/types";
import { randomBytes } from "crypto";
import type { NextFunction, Request, Response } from "express";

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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { login, password } = req.body as LoginValues;
  let user;

  if (!login || !password) {
    return next(new HttpError("Username and password are required", 400));
  }

  try {
    if (login.includes("@")) {
      user = await UserModel.findOne({ where: { email: login } });
    } else {
      user = await UserModel.findOne({ where: { username: login } });
    }

    if (!user) {
      return next(new HttpError(`No user found with ${login}`, 404));
    }

    const validPassword = await bcryptjs.compare(
      password,
      user.password as string,
    );

    if (!validPassword) {
      return next(new HttpError("Invalid password", 400));
    }

    req.session.user = {
      id: user.id,
      email: user.email,
      username: user.username as string,
      role: user.role,
    };

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error("Login error:", error);
    return next(new HttpError("Failed to login. Please try again later.", 500));
  }
};

export const logout = async (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  });
};

export const getSessionUser = (req: Request, res: Response) => {
  if (req.session.user) {
    res.status(200).json({ success: true, data: req.session.user });
  } else {
    res.status(401).json({
      success: false,
      message: "No user session found",
    });
  }
};
