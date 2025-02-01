import { BetStatus, BetType, Bookmaker } from "../../utils/enums";
import { Bet } from "../../utils/types";

export const mockBet: Bet = {
  id: 1,
  user_id: 1,
  stake: 1,
  bookmaker: Bookmaker.Bet365,
  tipper: "Reijjo",
  status: BetStatus.Won,
  sport: "NBA",
  notes: "",
  bet_final_type: BetType.Single,
  bet_final_odds: 1.8,
  betDetails: [
    {
      date: new Date("2025-01-12"),
      home_team: "Orlando",
      away_team: "76ers",
      selection: "Orlando",
      odds: 1.8,
      home_result: "104",
      away_result: "99",
      betbuilder_selection: [],
      betbuilder_result: [],
      freebet: false,
      livebet: false,
      bet_type: BetType.Single,
    },
  ],
};
