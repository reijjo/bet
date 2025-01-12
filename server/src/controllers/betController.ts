import type { Request, Response, NextFunction } from "express";
import { sequelize } from "../utils/db/db";
import { BetDetailsModel, BetModel } from "../models";
import type { BetDetails } from "../utils/types";
import type { GetBetsApiResponse } from "../utils/api-response-types";

//
// GET
// Get all bets
export const getBets = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
	try {
		const bets = await BetModel.findAll({
			include: [{
				model: BetDetailsModel,
				as: 'betDetails'
			}]
		});
		res.status(200).json({ data: bets } as GetBetsApiResponse);
	} catch (error: unknown) {
		next(error);
	}
}

//
// POST
// Create a bet
export const createBet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const transaction = await sequelize.transaction();

	try {
		const { user_id, stake, bookmaker, tipper, status, bet_final_type, sport, notes, betDetails } = req.body;
		const newBet = await BetModel.create({
			user_id,
			stake,
			bookmaker,
			tipper,
			status,
			bet_final_type,
			sport,
			notes
		}, { transaction });

		const betDetailsData = betDetails.map((details: BetDetails) => ({
			...details,
			bet_id: newBet.id
		}))

		await BetDetailsModel.bulkCreate(betDetailsData, { transaction });

		await transaction.commit();

		res.status(201).json({ data: newBet, message: "Bet created." });
	}	catch (error: unknown) {
		await transaction.rollback();
		next(error);
	}
}
