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

export type SportLeague = (typeof SportLeague)[keyof typeof SportLeague];

export const BetStatus = {
  Pending: "Pending",
  Won: "Won",
  Lost: "Lost",
  Void: "Void",
  HalfWon: "Half Won",
  HalfLost: "Half Lost",
} as const;

export type BetStatus = (typeof BetStatus)[keyof typeof BetStatus];

export const Bookmaker = {
  EpicBet: "EpicBet",
  Bet365: "Bet365",
  Unibet: "Unibet",
  Veikkaus: "Veikkaus",
  Other: "Other",
} as const;

export type Bookmaker = (typeof Bookmaker)[keyof typeof Bookmaker];

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
  Moniveto: "Moniveto",
  Tulosveto: "Tulosveto",
  Tuplaus: "Ladder Challenge",
  Props: "Player Props",
} as const;

export type BetType = (typeof BetType)[keyof typeof BetType];

export const LimitedBetType = {
  Single: "Single",
  Over: "Over",
  Under: "Under",
  BetBuilder: "Bet Builder",
  Btts: "Both Teams to Score",
  Moniveto: "Moniveto",
  Tulosveto: "Tulosveto",
  Tuplaus: "Ladder Challenge",
  Props: "Player Props",
  Other: "Other",
} as const;

export type LimitedBetType =
  (typeof LimitedBetType)[keyof typeof LimitedBetType];

export const BetBuilderInputTypes = {
  BetBuilder: "Bet Builder",
  Tuplaus: "Ladder Challenge",
  Props: "Player Props",
  Other: "Other",
} as const;

export type BetBuilderInputTypes =
  (typeof BetBuilderInputTypes)[keyof typeof BetBuilderInputTypes];

export const UserRoles = {
  Admin: "Admin",
  User: "User",
  Guest: "Guest",
  Registered: "Registered",
} as const;

export type UserRolesType = (typeof UserRoles)[keyof typeof UserRoles];
