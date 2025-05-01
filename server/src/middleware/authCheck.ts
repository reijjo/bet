import { SESSION_LENGTH } from "../utils/defaults";
import type { NextFunction, Request, Response } from "express";

export const authCheck = (requiredRole?: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.session.user;

    if (!user) {
      req.session.destroy(() => {
        res.clearCookie("connect.sid"); // or whatever your cookie name is
        res.status(401).json({
          success: false,
          message: `Session expired or user not logged in`,
        });
      });
      return;
    }

    // Extend session if close to expiration

    const sessionExpiresAt = req.session.cookie.expires?.getTime() ?? 0;
    const timeLeftMs = sessionExpiresAt - Date.now();
    const fifteenMinutesMs = 15 * 60 * 1000;

    console.log("time left", timeLeftMs);

    if (timeLeftMs > 0 && timeLeftMs < fifteenMinutesMs) {
      const originalMaxAge =
        req.session.cookie.originalMaxAge ?? SESSION_LENGTH;
      req.session.cookie.expires = new Date(Date.now() + originalMaxAge);

      req.session.save((err) => {
        if (err) {
          console.error("Failed to extend session:", err);
        }
      });
    }

    // if (req.session.user.role !== requiredRole) {
    //   res.status(403).json({
    //     success: false,
    //     message: "User does not have the required role",
    //   });
    //   return;
    // }

    next();
  };
};
