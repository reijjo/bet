import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { BetStatus, BetType, Bookmaker, SportLeague } from "./enums";

export type Bet = {
  id?: number | string;
  user_id?: number;
  stake: string | number;
  bookmaker?: Bookmaker;
  tipper: string;
  status: BetStatus;
  bet_final_type: BetType;
  sport: SportLeague;
  notes?: string;
  betDetails: BetDetails[];
};

export type BetDetails = {
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

export type BetInputProps = {
  handleBetInput?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  myBet?: Bet;
  setMyBet?: Dispatch<SetStateAction<Bet>>;
  modifyIndex?: number | null;
  details: BetDetails;
  disabled?: boolean;
};
