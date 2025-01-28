import { HttpError } from "../middleware/errorHandler";
import { SportsModel } from "../models/sportsModel";
import type { NextFunction, Request, Response } from "express";

//
// GET
// Get all sports/leagues
export const getSports = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const sports = await SportsModel.findAll();
    res.status(200).json({ data: sports });
  } catch (error: unknown) {
    next(error);
  }
};

//
// POST
// Adds new sport/league
export const createSport = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { name } = req.body;

  try {
    if (!name) {
      throw new HttpError('The "sport" field is required.', 400);
    }

    const newSport = await SportsModel.create({ name });
    res.status(201).json({ data: newSport });
  } catch (error: unknown) {
    next(error);
  }
};
