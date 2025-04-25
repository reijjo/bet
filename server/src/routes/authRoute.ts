import {
  getSessionUser,
  login,
  logout,
  // refreshToken,
  // verifyAccount,
} from "../controllers/authController";
import { authCheck } from "../middleware/authCheck";
import express from "express";

export const authRouter = express.Router({ mergeParams: true });

// authRouter.get("/register/:token", verifyAccount);
// authRouter.patch("/register/:token", refreshToken);

authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", getSessionUser);
