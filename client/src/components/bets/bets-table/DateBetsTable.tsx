import "./DateBetsTable.css";

import dayjs from "dayjs";

import { Bet } from "../../../utils/types";

interface DateBetsTableProps {
  bet: Bet;
}

export const DateBetsTable = ({ bet }: DateBetsTableProps) => {
  return (
    <td className="table-date">
      <p title={dayjs(bet.betDetails[0].date).format("D MMM")}>
        {dayjs(bet.betDetails[0].date).format("D MMM")}
      </p>
    </td>
  );
};
