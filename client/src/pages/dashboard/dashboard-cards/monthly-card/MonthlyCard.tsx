import "./MonthlyCard.css";

import { PosNegBarChartDashboard } from "../../../../components";
import { allBetsProp } from "../../../../utils/types";

export const MonthlyCard = ({ allBets }: allBetsProp) => {
  return (
    <div className="dash-monthly">
      <h5>Monthly results</h5>
      <PosNegBarChartDashboard allBets={allBets} />
    </div>
  );
};
