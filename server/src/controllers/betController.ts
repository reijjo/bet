import { HttpError } from "../middleware/errorHandler";
import { BetDetailsModel, BetModel } from "../models";
import type {
  CreateBetApiResponse,
  GetBetsApiResponse,
} from "../utils/api-response-types";
import { sequelize } from "../utils/db/db";
import type { BetDetails } from "../utils/types";
import type { NextFunction, Request, Response } from "express";

//
// GET
// Get all bets
export const getBets = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const bets = await BetModel.findAll({
      include: [
        {
          model: BetDetailsModel,
          as: "betDetails",
        },
      ],
    });
    res.status(200).json({ data: bets } as GetBetsApiResponse);
  } catch (error: unknown) {
    next(error);
  }
};

//
// POST
// Create a bet
export const createBet = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const transaction = await sequelize.transaction(); // Transactions are used to ensure that all operations are completed successfully before committing the changes to the database

  try {
    const {
      user_id,
      stake,
      bookmaker,
      tipper,
      status,
      bet_final_type,
      bet_final_odds,
      sport,
      notes,
      betDetails,
    } = req.body;

    console.log("BET FINAL ODDS", bet_final_odds);

    if (!stake) {
      throw new HttpError('The "stake" field is required.', 400);
    } else if (!bookmaker) {
      throw new HttpError('The "bookmaker" field is required.', 400);
    } else if (!status) {
      throw new HttpError('The "status" field is required.', 400);
    } else if (!bet_final_type) {
      throw new HttpError('The "bet_final_type" field is required.', 400);
    } else if (!sport) {
      throw new HttpError('The "sport" field is required.', 400);
    }
    // The create method is used to create a new bet in the database
    // Transaction in the end makes sure this operation is tied to the transaction
    const newBet = await BetModel.create(
      {
        user_id,
        stake,
        bookmaker,
        tipper,
        status,
        bet_final_type,
        bet_final_odds,
        sport,
        notes,
      },
      { transaction },
    );

    // The map method is used to create a new array of bet details with the bet_id set to the id of the newly created bet
    const betDetailsData = betDetails.map((details: BetDetails) => ({
      ...details,
      bet_id: newBet.id,
    }));

    // bulkCreate is used to create multiple bet details in the database
    await BetDetailsModel.bulkCreate(betDetailsData, { transaction });
    await transaction.commit();

    res
      .status(201)
      .json({ data: newBet, message: "Bet created." } as CreateBetApiResponse);
  } catch (error: unknown) {
    // If an error occurs, the transaction is rolled back
    await transaction.rollback();
    next(error);
  }
};

//
// GET
// Get a bet by id
export const getBetById = async (
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

    const bet = await BetModel.findByPk(Number(id), {
      include: [
        {
          model: BetDetailsModel,
          as: "betDetails",
        },
      ],
    });

    if (!bet) {
      throw new HttpError("Bet not found88.", 404);
    }

    res.status(200).json({ data: bet });
  } catch (error: unknown) {
    next(error);
  }
};

//
// PATCH
// Update a bet by id
export const updateBet = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const { stake, bookmaker, tipper, status, sport, notes, betDetails } =
      req.body;

    if (!Number(id)) {
      throw new HttpError(
        "Bet ID must be a number.",
        400,
        "Don't mess with the ID.",
      );
    }

    const bet = await BetModel.findByPk(Number(id), {
      include: [
        {
          model: BetDetailsModel,
          as: "betDetails",
        },
      ],
    });

    if (!bet) {
      throw new HttpError("Bet not found.", 404);
    }

    console.log("betdetails", betDetails);
    console.log("bet", JSON.stringify(bet, null, 2));

    // Update the bet with transaction
    await bet.update(
      {
        stake,
        bookmaker,
        tipper,
        status,
        sport,
        notes,
      },
      { transaction },
    );

    if (betDetails && Array.isArray(betDetails)) {
      // Delete old bet details with transaction
      await BetDetailsModel.destroy({
        where: { bet_id: bet.id },
        transaction,
      });

      // Create new bet details with transaction
      const betDetailsData = betDetails.map((details: BetDetails) => ({
        ...details,
        bet_id: bet.id,
      }));

      await BetDetailsModel.bulkCreate(betDetailsData, { transaction });
    }

    // Commit transaction
    await transaction.commit();

    // Fetch updated bet with its details
    const updatedBet = await BetModel.findByPk(Number(id), {
      include: [
        {
          model: BetDetailsModel,
          as: "betDetails",
        },
      ],
    });

    res.status(200).json({
      data: updatedBet,
      message: "Bet updated successfully.",
    });
  } catch (error: unknown) {
    // Rollback transaction on error
    await transaction.rollback();
    next(error);
  }
};

//
// DELETE
// Delete a bet by id
export const deleteBet = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    if (!Number(id)) {
      throw new HttpError(
        "Bet ID must be a number.",
        400,
        "Don't mess with the ID.",
      );
    }

    const deletedCount = await BetModel.destroy({
      where: { id },
      transaction,
    });

    console.log("DELETED COUNT", deletedCount);

    if (deletedCount === 0) {
      throw new HttpError("Bet not found.", 404);
    }

    // await BetDetailsModel.destroy({ where: { bet_id: bet.id }, transaction });

    await transaction.commit();

    res.status(200).json({ message: `Bet with ID ${id} deleted.` });
  } catch (error: unknown) {
    console.log("WHATTHE HTELL", error);
    await transaction.rollback();
    next(error);
  }
};
