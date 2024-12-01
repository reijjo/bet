import "./PayoutBetsTable.css";

import { Bet } from "../../../utils/types";
import {
  calculateTotalLosses,
  calculateTotalPayout,
} from "../../dashboard/dashboard-cards/summaryUtils";

interface PayoutBetsTableProps {
  bet: Bet;
}

export const PayoutBetsTable = ({ bet }: PayoutBetsTableProps) => {
  const payout = (bet: Bet) => {
    const payout = calculateTotalPayout([bet]);
    const losses = calculateTotalLosses([bet]);
    return payout - losses;
  };

  return <td className="table-winloss">{payout(bet).toFixed(2)} &euro;</td>;
};
