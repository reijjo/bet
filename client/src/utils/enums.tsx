export const SportLeague = {
  NFL: "NFL",
  NBA: "NBA",
  MLB: "MLB",
  NHL: "NHL",
  MLS: "MLS",
  Soccer: "Soccer",
  IceHockey: "Ice Hockey",
  Basketball: "Basketball",
  AmFootball: "American Football",
  Mixed: "Mixed",
  Other: "Other",
} as const;

export type SportLeagueType = (typeof SportLeague)[keyof typeof SportLeague];

export enum BetStatus {
  Pending = "Pending",
  Won = "Won",
  Lost = "Lost",
  Void = "Void",
  HalfWon = "Half Won",
  HalfLost = "Half Lost",
}

export enum Bookmaker {
  EpicBet = "EpicBet",
  Bet365 = "Bet365",
  Unibet = "Unibet",
  Veikkaus = "Veikkaus",
  Other = "Other",
}

export const BetType = {
  Single: "Single",
  Double: "Double",
  Treble: "Treble",
  Parlayx4: "Parlay x4",
  BigParlay: "Parlay x5+",
  Over: "Over",
  Under: "Under",
  BetBuilder: "Bet Builder",
  Other: "Other",
  Btts: "Both Teams to Score",
  Moniveto: "Multiple Scores",
  Tulosveto: "Correct Score",
  Tuplaus: "Ladder Challenge",
  Props: "Player Props",
} as const;

export type BetType = (typeof BetType)[keyof typeof BetType];

export const LimitedBetType = {
  Single: BetType.Single,
  Over: BetType.Over,
  Under: BetType.Under,
  BetBuilder: BetType.BetBuilder,
  Btts: BetType.Btts,
  Tulosveto: BetType.Tulosveto,
  Tuplaus: BetType.Tuplaus,
  Props: BetType.Props,
  Other: BetType.Other,
} as const;

export type LimitedBetType =
  (typeof LimitedBetType)[keyof typeof LimitedBetType];

export const BetBuilderInputTypes = {
  BetBuilder: "Bet Builder",
  Tuplaus: "Ladder Challenge",
  Props: "Player Props",
  Other: "Other",
} as const;

export const UserRoles = {
  Admin: "Admin",
  User: "User",
  Guest: "Guest",
  Registered: "Registered",
} as const;

export type UserRolesType = (typeof UserRoles)[keyof typeof UserRoles];

export const MessageTypes = {
  Success: "Success",
  Error: "Error",
  Info: "Info",
  Warning: "Warning",
} as const;

export type MessageType = (typeof MessageTypes)[keyof typeof MessageTypes];
