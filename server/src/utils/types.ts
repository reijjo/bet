import type { BetStatus, BetType, Bookmaker } from "./enums";

export type Bet = {
  id: number;
  user_id: number;
  sport_id: number;
  stake: number;
  bookmaker: Bookmaker;
  tipper?: string;
  status: BetStatus;
  bet_final_type: BetType;
  sport?: Sport;
  notes?: string;
  betDetails?: BetDetails[];
};

export type BetDetails = {
  id: number;
  date: string;
  home_team: string;
  away_team: string;
  selection: string;
  odds: number | string;
  home_result?: string;
  away_result?: string;
  betbuilder_selection?: string[];
  betbuilder_result?: string[];
  freebet: boolean;
  livebet: boolean;
  bet_type: BetType;
};

export type Sport = {
  id?: number;
  name: string;
};
