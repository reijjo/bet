import bcryptjs from "bcryptjs";

import { HttpError } from "../middleware/errorHandler";
import { UserModel } from "../models/userModel";
import { UserRoles } from "../utils/types/enums";
import type { RegisterValues, User } from "../utils/types/types";
import { randomBytes } from "crypto";
import type { NextFunction, Request, Response } from "express";
import {
  isRegisterValuesValid,
  sendVerificationEmail,
} from "./utils/createUserUtils";
import { isEmailValid } from "../utils/input-validators/email";
import { sendForgetPasswordEmail } from "./utils/forgetPasswordUtils";

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

    if (process.env.NODE_ENV !== "test") {
      await sendVerificationEmail(email, verifyToken);
    }

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

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const updates = req.body as Partial<User>;

  if (!updates || Object.keys(updates).length === 0) {
    return next(new HttpError("No update fields provided", 400));
  }

  try {
    const userToUpdate = await UserModel.findByPk(id);

    if (!userToUpdate) {
      return next(new HttpError("User not found", 404));
    }

    if (updates.password) {
      updates.password = await bcryptjs.hash(updates.password, 10);
    }

    const updatedUser: User = await userToUpdate.update(updates);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update user error:", error);
    return next(new HttpError("Failed to update user", 500));
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    return next(new HttpError("Email is required", 400));
  }

  const emailError = isEmailValid(email);
  if (emailError) {
    return next(new HttpError(emailError, 400));
  }

  try {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return next(new HttpError("Email not registered", 404));
    }

    // Extend token expiration (1 hour from now)
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 1);

    await user.update({
      resetTokenExpiration: tokenExpiration,
    });

    // Send reset link to email
    if (process.env.NODE_ENV !== "test") {
      await sendForgetPasswordEmail(email, user.resetToken as string);
    }

    res.status(200).json({
      success: true,
      message: `Reset link sent to '${email}'. Please check your inbox.`,
      data: email,
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return next(
      new HttpError("Failed to send link. Please try again later.", 500)
    );
  }
};

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.userFromToken;

  if (!user) {
    return next(new HttpError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "User found.",
    data: user,
  });
};
