import "./OddsBetsTable.css";

import { Bet } from "../../../utils/types";
import { calculateCombinedOdds } from "../../dashboard/dashboard-cards/summaryUtils";

interface OddsBetsTableProps {
  bet: Bet;
}

export const OddsBetsTable = ({ bet }: OddsBetsTableProps) => (
  <td className="table-odds">
    {calculateCombinedOdds(bet.betDetails).toFixed(2)}
  </td>
);
