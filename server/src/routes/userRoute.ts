import {
  getUserQuery,
  getAllUsers,
  createUser,
  updateUser,
} from "../controllers/userController";
import express from "express";

export const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", createUser);

userRouter.patch("/:id", updateUser);

userRouter.get("/find", getUserQuery);
