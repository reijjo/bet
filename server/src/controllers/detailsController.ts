import { HttpError } from "../middleware/errorHandler";
import { BetDetailsModel } from "../models";
import type { NextFunction, Request, Response } from "express";

//
// GET
// Get details by bet id
export const getDetailsByBetId = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!Number(id)) {
      throw new HttpError(
        "Bet ID must be a number.",
        400,
        "Don't mess with the ID.",
      );
    }

    const details = await BetDetailsModel.findAll({
      where: { bet_id: Number(id) },
    });

    if (!details) {
      throw new HttpError("Details not found.", 404);
    }

    res.status(200).json({ data: details });
  } catch (error: unknown) {
    next(error);
  }
};

//
// PATCH
// Update details by id
export const updateDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const {
      date,
      home_team,
      away_team,
      selection,
      odds,
      betbuilder_selection,
      freebet,
      livebet,
      bet_type,
    } = req.body;

    if (!Number(id)) {
      throw new HttpError(
        "Bet ID must be a number.",
        400,
        "Don't mess with the ID.",
      );
    }
    const details = await BetDetailsModel.findByPk(Number(id));
    if (!details) {
      throw new HttpError("Details not found.", 404);
    }

    await details.update({
      date,
      home_team,
      away_team,
      selection,
      odds,
      betbuilder_selection,
      freebet,
      livebet,
      bet_type,
    });

    res.status(200).json(details);
  } catch (error: unknown) {
    next(error);
  }
};
