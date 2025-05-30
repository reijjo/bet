import type {
  BetStatus,
  BetType,
  Bookmaker,
  SportLeague,
  UserRolesType,
} from "./enums";

export type Bet = {
  id: number;
  user_id: number;
  stake: number;
  bookmaker: Bookmaker;
  tipper?: string;
  status: BetStatus;
  bet_final_type: BetType;
  bet_final_odds: number;
  sport?: SportLeague;
  notes?: string;
  betDetails?: BetDetails[];
};

export type BetDetails = {
  id: number;
  bet_id: number;
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

export type User = {
  id: number;
  email: string;
  username?: string;
  password?: string;
  role: UserRolesType;
  resetToken?: string;
  resetTokenExpiration?: Date;
};

export interface RegisterValues {
  email: string;
  username: string;
  password: string;
}

export interface LoginValues {
  login: string;
  password: string;
}
