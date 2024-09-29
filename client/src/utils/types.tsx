import { BetStatus, BetType, Bookmaker, SportLeague } from "./enums";

export type Bet = {
  id?: number;
  user_id?: number;
  stake: number;
  bookmaker?: Bookmaker;
  tipper: string;
  status: BetStatus;
  bet_type: BetType;
  sport: SportLeague;
  betDetails: BetDetails;
};

export type BetDetails = {
  date: string;
  home_team: string;
  away_team: string;
  selection: string;
  odds: number | string;
  result?: string;
  freebet: boolean;
  livebet: boolean;
  notes?: string;
};
