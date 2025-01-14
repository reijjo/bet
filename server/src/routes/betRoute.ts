import {
  createBet,
  deleteBet,
  getBetById,
  getBets,
  updateBet,
} from "../controllers/betController";
import express from "express";

export const betRouter = express.Router({ mergeParams: true });

betRouter.post("/", createBet);
betRouter.get("/", getBets);
betRouter.get("/:id", getBetById);
betRouter.patch("/:id", updateBet);
betRouter.delete("/:id", deleteBet);
