import "./SportBetsTable.css";

import { Bet } from "../../../utils/types";

interface SportBetsTableProps {
  bet: Bet;
}

export const SportBetsTable = ({ bet }: SportBetsTableProps) => (
  <td className="table-sport">
    <p title={bet.sport}>{bet.sport}</p>
  </td>
);
