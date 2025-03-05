import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { BetStatus, BetType, Bookmaker, UserRolesType } from "./enums";

export type Bet = {
  id?: number;
  user_id: number;
  stake: number | string;
  bookmaker: Bookmaker;
  tipper: string;
  status: BetStatus;
  sport: string;
  notes?: string;
  bet_final_type: BetType;
  bet_final_odds: number;
  createdAt?: Date;
  betDetails: BetDetails[];
};

export type BetDetails = {
  id?: number;
  bet_id?: number;
  date: Date;
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

export type BetInputProps = {
  handleBetInput: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  myBet?: Bet;
  setMyBet?: Dispatch<SetStateAction<Bet>>;
  modifyIndex?: number | null;
  details: BetDetails;
  disabled?: boolean;
};

export type allBetsProp = {
  allBets: Bet[];
};

export type Sport = {
  id: number;
  name: string;
};

export interface RegisterValues {
  email: string;
  username?: string;
  password?: string;
  password2?: string;
}

export type User = {
  id: number;
  email: string;
  username?: string;
  password?: string;
  role: UserRolesType;
  resetToken?: string;
  resetTokenExpiration?: Date;
};

export interface ApiErrorResponse {
  success: boolean;
  timestamp: string;
  path: string;
  method: string;
  message: string;
  status: number;
  comment?: string;
}

export interface TokenUpdate {
  token: string;
  email: string;
}

export interface ErrorWithData {
  data?: {
    message?: string;
  };
}
