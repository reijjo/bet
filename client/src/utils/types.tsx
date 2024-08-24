import { BetStatus, BetType, Bookmaker, SportLeague } from "./enums";

export type Bet = {
  id: number;
  user_id: number;
  date: string;
  home_team: string;
  away_team: string;
  selection: string;
  sport: SportLeague;
  status: BetStatus;
  bookmaker: Bookmaker;
  odds: number;
  stake: number;
  tipper: string;
  bet_type: BetType;
  free_bet: boolean;
  live_bet: boolean;
  notes: string;
  result: string | null;
};
