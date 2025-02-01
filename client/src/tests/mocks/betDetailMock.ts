import { BetType } from "../../utils/enums";
import { BetDetails } from "../../utils/types";

export const mockBetDetail: BetDetails = {
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
};
