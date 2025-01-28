import { createSport, getSports } from "../controllers/sportController";
import express from "express";

export const sportRouter = express.Router({ mergeParams: true });

sportRouter.get("/", getSports);
sportRouter.post("/", createSport);
