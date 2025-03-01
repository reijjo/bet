import express from "express";
import { register } from "../controllers/authController";

export const authRouter = express.Router({ mergeParams: true });

authRouter.post('/register', register);