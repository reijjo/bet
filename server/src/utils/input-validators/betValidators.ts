import { createBetErrors } from "../errors";
import { BetBuilderInputTypes, type BetType } from "../types/enums";

export const hasBuilderSelections = (selections: string[]) => {
  return Array.isArray(selections) && selections.length > 0;
};

export const isBetBuilderType = (betType: BetType) => {
  return Object.values(BetBuilderInputTypes).includes(
    betType as (typeof BetBuilderInputTypes)[keyof typeof BetBuilderInputTypes]
  );
};

export const hasLength = (value: string) => {
  return value?.trim().length > 0;
};

export const hasMaxLength = (value: string, maxLength: number) => {
  return value?.trim().length <= maxLength;
};

export const isNumber = (value: string) => {
  const numericValue = Number(value);
  return !Number.isNaN(numericValue) && numericValue > 0;
};

export const validSelection = (selection: string, betType: BetType) => {
  if (!isBetBuilderType(betType) && !hasLength(selection)) {
    return createBetErrors.SELECTION;
  }

  if (!hasMaxLength(selection, 30)) {
    return createBetErrors.IS_TOO_LONG_SELECTION;
  }
  return "";
};
