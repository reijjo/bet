import "./ModifyBet.css";

import { BetDetails } from "../../../../../utils/types";

type ModifyBetOddsProps = {
  details: BetDetails;
};

export const ModifyBetOdds = ({ details }: ModifyBetOddsProps) => (
  <div className="modifybet-slip-odds">{Number(details.odds).toFixed(2)}</div>
);
