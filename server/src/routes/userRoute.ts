import {
  getUserQuery,
  getAllUsers,
  createUser,
} from "../controllers/userController";
import express from "express";

export const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", createUser);

userRouter.get("/find", getUserQuery);
