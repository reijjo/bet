import { BetStatus, BetType, Bookmaker, SportLeague } from "../../utils/enums";
import { BetDetails } from "../../utils/types";

export const initialBetDetailValues = {
  home_team: "",
  away_team: "",
  selection: "",
  odds: "",
  date: new Date().toISOString().split("T")[0],
  notes: "",
  freebet: false,
  livebet: false,
  home_result: "",
  away_result: "",
  betbuilder_selection: [],
  betbuilder_result: [],
  bet_type: BetType.Single,
};

export const initialBetValues = {
  stake: 0,
  bookmaker: Bookmaker.Unibet,
  status: BetStatus.Pending,
  tipper: "",
  bet_final_type: BetType.Single,
  sport: SportLeague.Other,
  betDetails: [],
};

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
  if (!details.length) return BetType.Single;

  if (
    details[0].bet_type === BetType.Moniveto ||
    details[0].bet_type === BetType.Tuplaus
  ) {
    return details[0].bet_type;
  }

  switch (details.length) {
    case 1:
      return BetType.Single;
    case 2:
      return BetType.Double;
    case 3:
      return BetType.Treble;
    case 4:
      return BetType.Parlayx4;
    default:
      return details.length > 4 ? BetType.BigParlay : BetType.Single;
  }
};
