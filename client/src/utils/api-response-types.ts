import type { Bet } from "./types";

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
