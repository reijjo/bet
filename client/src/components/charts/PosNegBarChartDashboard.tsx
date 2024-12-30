import "./PosNegBarChartDashboard.css";

import {
  Bar,
  BarChart,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { allBetsProp } from "../../utils/types";
import { last4months } from "../dashboard/dashboard-cards/summaryUtils";

type CustomTooltipProps = {
  active: boolean;
  payload: { value: number }[];
  label: string;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const profit = payload[0].value;
    const isProfitPositive = profit >= 0;
    const backgroundColor = isProfitPositive ? "#e9f6ee" : "#fce9e9";
    const textColor = isProfitPositive ? "#01a73e" : "#e16141";

    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor,
          padding: "10px",
          borderRadius: "4px",
          color: textColor,
        }}
      >
        <p className="posneg-chart-label">
          {`${label}: `}
          <span style={{ fontWeight: "bold", color: textColor }}>
            {profit} &euro;
          </span>
        </p>
      </div>
    );
  }

  return null;
};

// Chart Dashboard

export const PosNegBarChartDashboard = ({ allBets }: allBetsProp) => {
  const posNegBarData = last4months(allBets);

  console.log("posNegBarData", posNegBarData);

  console.log(
    "mapped",
    posNegBarData.every((bet) => bet.profit === 0),
  );

  if (posNegBarData.every((bet) => bet.profit === 0)) {
    return (
      <p style={{ display: "grid", placeContent: "center" }}>
        No settled bets yet.
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={posNegBarData}
        margin={{
          top: 16,
          left: -16,
        }}
      >
        <XAxis
          dataKey="name"
          stroke="#ccc"
          style={{ fontSize: "var(--font-smaller" }}
        />
        <YAxis stroke="#ccc" style={{ fontSize: "var(--font-smaller" }} />
        <Tooltip
          content={<CustomTooltip active={false} payload={[]} label={""} />}
          cursor={{ fill: "#9eb1ff20" }}
        />
        {/* <Legend /> */}
        <ReferenceLine y={0} stroke="#808080" />
        <Bar dataKey="profit" fill="#000" barSize={15}>
          {posNegBarData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.profit >= 0 ? "#b3e6c5" : "#f1b6a7"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
