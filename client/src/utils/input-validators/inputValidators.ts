import { isBetBuilderType } from "../../pages/add-bet/betUtils";
import { inputErrors } from "../defaults/errors";
import { BetType } from "../enums";
import { BetDetails } from "../types";

export const isEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const hasLength = (value: string) => {
  return value?.trim().length > 0;
};

export const isNumber = (value: string) => {
  return !isNaN(Number(value));
};

export const hasBuilderSelections = (selections: string[]) => {
  return Array.isArray(selections) && selections.length > 0;
};

// export const hasMinLength = (value: string, minLength: number) => {
//   return value.trim().length >= minLength;
// };

export const hasMaxLength = (value: string, maxLength: number) => {
  return value.trim().length <= maxLength;
};

export const validMatch = (home: string, away: string) => {
  if (!hasMaxLength(home, 30) || !hasMaxLength(away, 30)) {
    return inputErrors.match;
  }
  return "";
};

export const validSelection = (selection: string, betType: BetType) => {
  if (!isBetBuilderType(betType) && !hasLength(selection)) {
    return inputErrors.selection;
  }
  return "";
};

export const validOdds = (odds: string | number) => {
  if (!hasLength(String(odds))) {
    return inputErrors.oddsEmpty;
  }

  if (!isNumber(String(odds))) {
    return inputErrors.oddsNotNumber;
  }
  return "";
};

export const validBetBuilderSelection = (
  selections: string[],
  betType: BetType
) => {
  if (
    selections &&
    (betType === BetType.BetBuilder || betType === BetType.Tuplaus) &&
    !hasBuilderSelections(selections)
  ) {
    return inputErrors.buildSelections;
  }
  return "";
};

// Bet input validations
export const validateBetDetailsInputs = (details: BetDetails) => {
  const errors: { [key: string]: string } = {};

  // Check match
  const matchError = validMatch(details.home_team, details.away_team);
  if (matchError) {
    errors.match = matchError;
    errors.home_team = matchError;
    errors.away_team = matchError;
  }
  // Check selection
  const selectionError = validSelection(details.selection, details.bet_type);
  if (selectionError) errors.selection = selectionError;

  // Check odds
  if (!hasLength(String(details.odds))) {
    errors.odds = "Odds is required";
  }

  if (!isNumber(String(details.odds))) {
    errors.odds = "Odds must be a number";
  }

  // Check betbuilder selections
  const builderSelectionError = validBetBuilderSelection(
    details.betbuilder_selection as string[],
    details.bet_type
  );
  if (builderSelectionError) {
    errors.betbuilder_selection = inputErrors.buildSelections;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
