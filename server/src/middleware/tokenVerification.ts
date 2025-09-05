import type { NextFunction, Request, Response } from "express";
import { HttpError } from "./errorHandler";
import { UserModel } from "../models/userModel";

export const tokenVerification = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { token } = req.params;
  const now = new Date().getTime();

  console.log("token", token);

  if (!token || token.length < 5) {
    return next(new HttpError("Invalid token", 401));
  }

  try {
    const userWithToken = await UserModel.findOne({
      where: { resetToken: token },
    });

    if (!userWithToken) {
      return next(
        new HttpError("No account found. Please register", 404, "test comment")
      );
    }

    if (
      userWithToken.resetTokenExpiration &&
      new Date(userWithToken.resetTokenExpiration).getTime() < now
    ) {
      return next(
        new HttpError(`${userWithToken.email}`, 400, "Token expired")
      );
    }

    req.userFromToken = userWithToken;

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return next(new HttpError("Failed to verify token", 500));
  }
};
