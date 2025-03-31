import {
  findUserQuery,
  getAllUsers,
  registration,
} from "../controllers/userController";
import express from "express";

export const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", registration);

userRouter.get("/find", findUserQuery);
