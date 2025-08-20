import bcryptjs from "bcryptjs";

import { HttpError } from "../middleware/errorHandler";
import { UserModel } from "../models/userModel";
import { UserRoles } from "../utils/enums";
import { isPasswordValid } from "../utils/input-validators/password";
import { isUsernameValid } from "../utils/input-validators/username";
import type { LoginValues } from "../utils/types";
import { randomBytes } from "crypto";
import type { NextFunction, Request, Response } from "express";
import { sendVerificationEmail } from "./utils/createUserUtils";

export const verifyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;
  const now = new Date().getTime();

  if (token.length < 5) {
    return next(new HttpError("Invalid token", 401));
  }

  try {
    const accountToFinish = await UserModel.findOne({
      where: { resetToken: token },
    });

    if (!accountToFinish) {
      return next(
        new HttpError("No account found. Please register", 404, "test comment")
      );
    }

    if (
      accountToFinish.resetTokenExpiration &&
      new Date(accountToFinish.resetTokenExpiration).getTime() < now
    ) {
      return next(
        new HttpError(`${accountToFinish.email}`, 400, "Token expired")
      );
    }

    res.status(200).json({
      success: true,
      message: "Account verified! You can now log in with your credentials.",
      data: accountToFinish,
    });
  } catch (error) {
    console.error("Verification error:", error);
    return next(
      new HttpError("Failed to verify account. Please try again later.", 500)
    );
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body;

  if (!token || token.length < 5) {
    return next(new HttpError("Invalid token", 400));
  }

  try {
    const user = await UserModel.findOne({
      where: { resetToken: token },
    });

    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    // Set token expiration (1 hour from now)
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 1);

    await user.update({
      resetTokenExpiration: tokenExpiration,
    });

    if (process.env.NODE_ENV !== "test") {
      await sendVerificationEmail(user.email, token);
    }

    res.status(200).json({
      success: true,
      message: `Token refreshed! Check your email ${user.email} to verify your account.`,
      data: user.email,
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    return next(
      new HttpError("Failed to refresh token. Please try again later.", 500)
    );
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { login, password } = req.body as LoginValues;

  if (!login || !password) {
    return next(new HttpError("Login and password are required", 400));
  }

  try {
    const user = await UserModel.findOne({
      where: login.includes("@") ? { email: login } : { username: login },
    });

    if (!user) {
      return next(new HttpError(`No user found with ${login}`, 404));
    }

    const validPassword = await bcryptjs.compare(
      password,
      user.password as string
    );

    if (!validPassword) {
      return next(new HttpError("Invalid password", 400));
    }

    if (user.role === UserRoles.Registered) {
      return next(
        new HttpError(
          `Check your email '${user.email}' to verify your account before logging in.`,
          403
        )
      );
    }

    req.session.regenerate((err) => {
      if (err) {
        return next(new HttpError("Failed to regenerate session", 500));
      }

      req.session.user = {
        id: user.id,
        email: user.email,
        username: user.username as string,
        role: user.role,
      };

      req.session.save((err) => {
        if (err) {
          return next(new HttpError("Failed to save session", 500));
        }

        res.status(200).json({
          success: true,
          message: "User logged in successfully",
        });
      });
    });
  } catch (error) {
    console.error("Login error:", error);
    return next(new HttpError("Failed to login. Please try again later.", 500));
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.user) {
    res.status(200).json({
      success: true,
      message: "User already logged out",
    });
    return;
  }

  req.session.destroy((err) => {
    if (err) {
      return next(new HttpError("Failed to destroy session", 500));
    }

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
      data: null,
    });
  }
};

export const refreshSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.user) {
    return next(new HttpError("No active session to refresh", 401));
  }

  try {
    const userData = req.session.user;

    // Regenerate the session ID to enhance security
    req.session.regenerate((err) => {
      if (err) {
        return next(new HttpError("Failed to regenerate session", 500));
      }

      // Set the user data back in the new session
      req.session.user = userData;

      // Save the session
      req.session.save((err) => {
        if (err) {
          return next(new HttpError("Failed to save refreshed session", 500));
        }

        res.status(200).json({
          success: true,
          message: "Session refreshed successfully",
          data: req.session.user,
        });
      });
    });
  } catch (error) {
    console.error("Session refresh error:", error);
    return next(
      new HttpError("Failed to refresh session. Please try again later.", 500)
    );
  }
};
