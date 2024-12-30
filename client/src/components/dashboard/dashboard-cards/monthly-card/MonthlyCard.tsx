import "./MonthlyCard.css";

import { allBetsProp } from "../../../../utils/types";
import { PosNegBarChartDashboard } from "../../../charts";

export const MonthlyCard = ({ allBets }: allBetsProp) => {
  return (
    <div className="dash-monthly">
      <h5>Monthly results</h5>
      <PosNegBarChartDashboard allBets={allBets} />
    </div>
  );
};
