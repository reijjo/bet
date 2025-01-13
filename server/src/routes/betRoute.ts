import {
  createBet,
  deleteBet,
  getBetById,
  getBets,
} from "../controllers/betController";
import express from "express";

export const betRouter = express.Router({ mergeParams: true });

betRouter.post("/", createBet);
betRouter.get("/", getBets);
betRouter.get("/:id", getBetById);
betRouter.delete("/:id", deleteBet);
