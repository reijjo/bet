import type { NextFunction, Request, Response } from "express";

export const authCheck = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) {
      res.status(401).json({
        success: false,
        message: "User is not logged in",
      });
      return;
    }

    if (req.session.user.role !== requiredRole) {
      res.status(403).json({
        success: false,
        message: "User does not have the required role",
      });
      return;
    }

    next();
  };
};
