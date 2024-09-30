import { BetStatus, BetType, Bookmaker, SportLeague } from "../../utils/enums";

export const initialBetDetailValues = {
  home_team: "",
  away_team: "",
  selection: "",
  odds: "",
  date: new Date().toISOString().split("T")[0],
  notes: "",
  freebet: false,
  livebet: false,
  result: "",
};

export const initialBetValues = {
  stake: 0,
  bookmaker: Bookmaker.None,
  status: BetStatus.Pending,
  tipper: "",
  bet_type: BetType.Single || "",
  sport: SportLeague.None,
  betDetails: [initialBetDetailValues],
};

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
