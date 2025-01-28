import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { BetStatus, BetType, Bookmaker } from "./enums";

export type Bet = {
  id?: number;
  user_id: number;
  stake: number;
  bookmaker: Bookmaker;
  tipper: string;
  status: BetStatus;
  sport: string;
  notes?: string;
  bet_final_type: BetType;
  bet_final_odds: number;
  betDetails: BetDetails[];
};

export type BetDetails = {
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
