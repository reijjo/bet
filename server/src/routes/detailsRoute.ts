import {
  getDetailById,
  getDetailsByBetId,
  updateDetails,
} from "../controllers/detailsController";
import { Router } from "express";

export const detailsRouter = Router({ mergeParams: true });

detailsRouter.get("/bets/:id/details", getDetailsByBetId);
detailsRouter.get("/details/:id", getDetailById);
detailsRouter.patch("/details/:id", updateDetails);
