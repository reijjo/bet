import { BetStatus, BetType, Bookmaker, SportLeague } from "../enums";

export const initialBetDetailValues = {
  home_team: "",
  away_team: "",
  selection: "",
  odds: "",
  date: new Date(),
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
  bookmaker: Bookmaker.Bet365,
  status: BetStatus.Pending,
  tipper: "",
  bet_final_type: BetType.Single,
  bet_final_odds: 0,
  sport: SportLeague.NBA,
  betDetails: [],
  user_id: 0,
};

export const initialRegisterValues = {
  email: "",
  username: "",
  password: "",
  password2: "",
};

export const SHOW_LOGOUT_MODAL = 60 * 50 * 1000;
// export const SHOW_LOGOUT_MODAL = 5 * 1000;
