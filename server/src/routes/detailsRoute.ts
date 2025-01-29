import {
  getDetailsByBetId,
  updateDetails,
} from "../controllers/detailsController";
import { Router } from "express";

export const detailsRouter = Router({ mergeParams: true });

detailsRouter.get("/bets/:id/details", getDetailsByBetId);
detailsRouter.patch("/details/:id", updateDetails);
