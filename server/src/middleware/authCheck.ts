import type { NextFunction, Request, Response } from "express";

export const authCheck = (requiredRole?: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.session.user;

    if (!user) {
      req.session.destroy(() => {
        res.clearCookie("connect.sid"); // or whatever your cookie name is
        res.status(401).json({
          success: false,
          message: "Session expired or user not logged in",
        });
      });
      return;
    }

    // Extend session if close to expiration
    const cookie = req.session.cookie;
    const timeLeft = (cookie.expires?.getTime() ?? 0) - Date.now();

    if (timeLeft && timeLeft < 10 * 60 * 1000) {
      const maxAge = req.session.cookie.originalMaxAge ?? 60 * 60 * 1000;
      req.session.cookie.expires = new Date(Date.now() + maxAge);
      req.session.save((err) => {
        if (err) {
          console.error("Failed to extend session:", err);
        } else {
          console.log("Session extended properly");
        }
      });
      console.log("Session extended via authCheck");
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
