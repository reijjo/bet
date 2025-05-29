import type { Bet, BetDetails, Sport, User } from "./types";

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

export type GetBetDetailsApiResponse = {
  data: BetDetails[];
};

export type GetDetailByIdApiResponse = {
  data: BetDetails;
};

export type RegisterUserApiResponse = {
  data?: User;
  success: boolean;
  message: string;
};

export type BasicApiResponse = {
  data?: string;
  success: boolean;
  message: string;
};

export interface FinishUserResponse {
  data: User;
  success: boolean;
  message: string;
}

export interface MinimalUserResponse {
  data: Omit<User, "password" | "resetToken" | "resetTokenExpiration">;
  success: boolean;
  message: string;
}

export interface LoginUserApiResponse {
  data: User;
  success: boolean;
  message?: string;
  error?: string;
}
