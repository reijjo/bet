import { BetBuilderInputTypes, BetType } from "../../utils/enums";
import { BetDetails } from "../../utils/types";

// Checks the type of the input
export const getInputValue = (
  type: string,
  checked: boolean,
  value: string,
) => {
  if (type === "checkbox") {
    return checked;
  }
  return type === "number" ? parseFloat(value) : value;
};

export const getFinalBetType = (details: BetDetails[]): BetType => {
  let finalType = BetType.Single;

  if (
    details.length === 1 ||
    (details.length > 1 && details[0].bet_type === BetType.Moniveto) ||
    (details.length > 1 && details[0].bet_type === BetType.Tuplaus)
  ) {
    finalType = details[0].bet_type;
  } else if (details.length === 2) {
    finalType = BetType.Double;
  } else if (details.length === 3) {
    finalType = BetType.Treble;
  } else if (details.length === 4) {
    finalType = BetType.Parlayx4;
  } else if (details.length > 4) {
    finalType = BetType.BigParlay;
  }

  return finalType;
};

// Checks if should use betbuilder input field
export const isBetBuilderType = (betType: BetType) => {
  return Object.values(BetBuilderInputTypes).includes(
    betType as (typeof BetBuilderInputTypes)[keyof typeof BetBuilderInputTypes],
  );
};
