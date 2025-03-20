import {
  finishRegistration,
  getSessionUser,
  login,
  logout,
  refreshToken,
  register,
  verifyAccount,
} from "../controllers/authController";
import express from "express";

export const authRouter = express.Router({ mergeParams: true });

authRouter.post("/register", register);
authRouter.patch("/register", finishRegistration);

authRouter.get("/register/:token", verifyAccount);
authRouter.patch("/register/:token", refreshToken);

authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", getSessionUser);
