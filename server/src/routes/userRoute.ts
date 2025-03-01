import { getAllUsers } from "../controllers/userController";
import express from "express";

export const userRouter = express.Router();

userRouter.get("/", getAllUsers);
