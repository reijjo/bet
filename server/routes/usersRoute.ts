import express from "express";
import { getAllUsers } from "../controllers/usersController";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);

export default userRouter;
