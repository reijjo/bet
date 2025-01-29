import type { Bet, BetDetails, Sport } from "./types";

export type GetBetsApiResponse = {
  data: Bet[];
};

export type CreateBetApiResponse = {
  data: Bet;
  message: string;
};

export type GetBetByIdApiResponse = {
  data: Bet;
};

export type GetSportApiResponse = {
  data: Sport[];
};

export type CreateSportApiResponse = {
  data: string;
};

export type GetDetailByIdApiResponse = {
  data: BetDetails;
};
