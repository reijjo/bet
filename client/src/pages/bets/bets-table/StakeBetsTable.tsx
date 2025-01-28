import "./StakeBetsTable.css";

import { Bet } from "../../../utils/types";

interface StakeBetsTableProps {
  bet: Bet;
}

export const StakeBetsTable = ({ bet }: StakeBetsTableProps) => (
  <td className="table-stake">{Number(bet.stake).toFixed(2)} &euro;</td>
);
