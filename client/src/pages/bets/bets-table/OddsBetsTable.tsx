import "./OddsBetsTable.css";

import { useBetCalculations } from "../../../hooks/useBetCalculations";
import { Bet } from "../../../utils/types";

interface OddsBetsTableProps {
  bet: Bet;
}

export const OddsBetsTable = ({ bet }: OddsBetsTableProps) => {
  const { finalOdds } = useBetCalculations();

  return <td className="table-odds">{finalOdds(bet.betDetails).toFixed(2)}</td>;
};
