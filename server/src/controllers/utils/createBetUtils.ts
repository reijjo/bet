import { createBetErrors } from "../../utils/errors";
import { isNumber } from "../../utils/input-validators/betValidators";
import { BetStatus, Bookmaker } from "../../utils/types/enums";
import type { Bet } from "../../utils/types/types";

export const isNewBetValid = (bet: Bet) => {
  if (!isNumber(String(bet.stake))) return createBetErrors.STAKE;

  const validBookmakers = Object.values(Bookmaker);
  if (!validBookmakers.includes(bet.bookmaker)) {
    return createBetErrors.BOOKMAKER;
  }

  const validBetStatus = Object.values(BetStatus);
  if (!validBetStatus.includes(bet.status)) {
    return createBetErrors.STATUS;
  }

  if (!bet.bet_final_type) return createBetErrors.BET_FINAL_TYPE;
  if (!bet.bet_final_odds) return createBetErrors.BET_FINAL_ODDS;
  if (!bet.sport) return createBetErrors.SPORT;

  return null;
};
