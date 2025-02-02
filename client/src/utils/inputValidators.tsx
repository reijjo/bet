import { isBetBuilderType } from "../pages/add-bet/betUtils";
import { inputErrors } from "./defaults/errors";
import { BetType } from "./enums";
import { BetDetails } from "./types";

export const hasLength = (value: string) => {
  return value?.trim().length > 0;
};

export const isNumber = (value: string) => {
  return !isNaN(Number(value));
};

export const hasBuilderSelections = (selections: string[]) => {
  return Array.isArray(selections) && selections.length > 0;
};

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
    return "Selection is required";
  }
  return "";
};

export const validOdds = (odds: string | number) => {
  if (!hasLength(String(odds))) {
    return "Odds is required";
  }

  if (!isNumber(String(odds))) {
    return "Odds must be a number";
  }
  return "";
};

export const validBetBuilderSelection = (
  selections: string[],
  betType: BetType,
) => {
  if (
    selections &&
    (betType === BetType.BetBuilder || betType === BetType.Tuplaus) &&
    !hasBuilderSelections(selections)
  ) {
    return "One or more selections are required";
  }
  return "";
};

export const hasInputError = (errors: string) => {
  const ulStyle = {
    padding: "0.5rem 0.75rem",
    listStylePosition: "inside" as const,
    color: "var(--error-dark)",
    backgroundColor: "var(--error-xxlight)",
    border: "1px solid var(--error-dark)",
    borderRadius: "8px",
    fontSize: "var(--font-smaller)",
    maxWidth: "max-content",
    marginTop: "0.5rem",
  };

  const liStyle = {
    listStyle: "none",
  };

  return (
    <ul style={ulStyle}>
      <li style={liStyle}>{errors}</li>
    </ul>
  );
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
  if (
    details.betbuilder_selection &&
    (details.bet_type === BetType.BetBuilder ||
      details.bet_type === BetType.Tuplaus) &&
    !hasBuilderSelections(details.betbuilder_selection)
  ) {
    errors.betbuilder_selection = "One or more selections are required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
