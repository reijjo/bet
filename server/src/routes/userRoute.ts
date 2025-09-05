import {
  getUserQuery,
  getAllUsers,
  createUser,
  updateUser,
  forgotPassword,
  checkToken,
} from "../controllers/userController";
import express from "express";
import { tokenVerification } from "../middleware/tokenVerification";

export const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", createUser);

userRouter.patch("/:id", updateUser);

userRouter.get("/find", getUserQuery);

userRouter.post("/forgot", forgotPassword);
userRouter.get("/forgot/:token", tokenVerification, checkToken);
