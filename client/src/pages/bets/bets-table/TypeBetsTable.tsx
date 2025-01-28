import "./TypeBetsTable.css";

import { Bet } from "../../../utils/types";

interface TypeBetsTableProps {
  bet: Bet;
}

export const TypeBetsTable = ({ bet }: TypeBetsTableProps) => (
  <td className="table-type">
    <p title={bet.bet_final_type}>{bet.bet_final_type}</p>
  </td>
);
