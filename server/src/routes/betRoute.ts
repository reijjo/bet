import { createBet, getBets } from "../controllers/betController";
import express from "express";

export const betRouter = express.Router({ mergeParams: true });

betRouter.post("/", createBet);
betRouter.get("/", getBets);