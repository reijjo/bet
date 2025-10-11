import { BetBuilderInputTypes, BetType } from "../../utils/enums";
import { BetDetails } from "../../utils/types";

// Checks the type of the input
export const getInputValue = (
  type: string,
  checked: boolean,
  value: string
) => {
  if (type === "checkbox") {
    return checked;
  }
  return type === "number" ? parseFloat(value) : value;
};

export const getFinalBetType = (details: BetDetails[]): BetType => {
  if (
    details.length === 1 ||
    (details.length > 1 && details[0].bet_type === BetType.Moniveto) ||
    (details.length > 1 && details[0].bet_type === BetType.Tuplaus)
  ) {
    return details[0].bet_type;
  }

  if (details.length === 2) return BetType.Double;
  if (details.length === 3) return BetType.Treble;
  if (details.length === 4) return BetType.Parlayx4;
  if (details.length > 4) return BetType.BigParlay;

  return BetType.Single;
};

// Checks if should use betbuilder input field
export const isBetBuilderType = (betType: BetType) => {
  return Object.values(BetBuilderInputTypes).includes(
    betType as (typeof BetBuilderInputTypes)[keyof typeof BetBuilderInputTypes]
  );
};
