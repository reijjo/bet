export enum SportLeague {
  NFL = "NFL",
  NBA = "NBA",
  MLB = "MLB",
  NHL = "NHL",
  MLS = "MLS",
  Soccer = "Soccer",
  IceHockey = "Ice Hockey",
  Basketball = "Basketball",
  AmFootball = "American Football",
  Mixed = "Mixed",
  Other = "Other",
}

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

export enum BetType {
  Single = "Single",
  Double = "Double",
  Treble = "Treble",
  Parlayx4 = "Parlay x4",
  BigParlay = "Parlay x5+",
  Over = "Over",
  Under = "Under",
  BetBuilder = "Bet Builder",
  Other = "Other",
  Btts = "Both Teams to Score",
  Moniveto = "Moniveto",
  Tulosveto = "Tulosveto",
  Tuplaus = "Ladder Challenge",
  Props = "Player Props",
}

export enum LimitedBetType {
  Single = "Single",
  Over = "Over",
  Under = "Under",
  BetBuilder = "Bet Builder",
  Btts = "Both Teams to Score",
  Moniveto = "Moniveto",
  Tulosveto = "Tulosveto",
  Tuplaus = "Ladder Challenge",
  Props = "Player Props",
  Other = "Other",
}

export const BetBuilderInputTypes = {
  BetBuilder: "Bet Builder" as const,
  Tuplaus: "Ladder Challenge" as const,
  Props: "Player Props" as const,
  Other: "Other" as const,
};
