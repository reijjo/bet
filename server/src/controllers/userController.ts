import bcryptjs from "bcryptjs";

import { HttpError } from "../middleware/errorHandler";
import { UserModel } from "../models/userModel";
import { sendVerificationEmail } from "../utils/emailService";
import { UserRoles } from "../utils/enums";
import { isEmailValid } from "../utils/input-validators/email";
import { isPasswordValid } from "../utils/input-validators/password";
import { isUsernameValid } from "../utils/input-validators/username";
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

export const registration = async (
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

  const emailValidation = isEmailValid(email);
  if (emailValidation) {
    return next(new HttpError(emailValidation, 400));
  }

  const passwordValidation = isPasswordValid(password);
  if (passwordValidation) {
    return next(new HttpError(passwordValidation, 400));
  }

  try {
    // Check for duplicate email and username
    let user = await UserModel.findOne({
      where: { email },
    });

    if (user) {
      return next(new HttpError("Email already in use.", 404));
    }

    user = await UserModel.findOne({
      where: { username },
    });

    if (user) {
      return next(new HttpError("Username already in use.", 404));
    }

    const hashPw = await bcryptjs.hash(password, 10);
    const newUser = await UserModel.create({
      email: email,
      username: username.toLowerCase(),
      password: hashPw,
      role: UserRoles.Guest,
    });

    // Change UserRoles.Guest to UserRoles.Registered and after the verification to guest

    // On return Change message to please verify your email create verifytoken and expiration and send check your email message
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
        500,
      ),
    );
  }
};

// export const register = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const { email } = req.body;

//   const emailValidation = isEmailValid(email);
//   if (emailValidation) {
//     return next(new HttpError(emailValidation, 400));
//   }

//   const userExists = await UserModel.findOne({
//     where: { email },
//   });

//   if (userExists) {
//     return next(
//       new HttpError(
//         "Email already registered. Please use different email",
//         409,
//         "Duplicate email",
//       ),
//     );
//   }

//   try {
//     const verifyToken = randomBytes(32).toString("hex");

//     // Set token expiration (1 hour from now)
//     const tokenExpiration = new Date();
//     tokenExpiration.setHours(tokenExpiration.getHours() + 1);

//     await UserModel.create({
//       email: email,
//       resetToken: verifyToken,
//       resetTokenExpiration: tokenExpiration,
//     });

//     // Send verification email
//     await sendVerificationEmail(email, verifyToken);

//     res.status(201).json({
//       success: true,
//       message: `User '${email}' registered! Check your email to verify your account.`,
//       data: email,
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     return next(
//       new HttpError("Failed to register user. Please try again later.", 500),
//     );
//   }
// };
