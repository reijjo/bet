import "./TypeBetsTable.css";

import { Bet } from "../../../utils/types";

interface TypeBetsTableProps {
  bet: Bet;
}

export const TypeBetsTable = ({ bet }: TypeBetsTableProps) => (
  <td className="table-type">
    <p title={bet.bet_type}>{bet.bet_type}</p>
  </td>
);
