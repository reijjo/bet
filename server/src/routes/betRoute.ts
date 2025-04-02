import {
  createBet,
  deleteBet,
  getBetById,
  getBets,
  updateBet,
} from "../controllers/betController";
import { authCheck } from "../middleware/authCheck";
import express from "express";

export const betRouter = express.Router({ mergeParams: true });

betRouter.post("/", authCheck(), createBet);
betRouter.get("/", authCheck(), getBets);
betRouter.get("/:id", getBetById);
betRouter.patch("/:id", authCheck(), updateBet);
betRouter.delete("/:id", deleteBet);
