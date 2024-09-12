import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const posNegBarData = [
  {
    name: "Jan",
    profit: 200,
  },
  {
    name: "Feb",
    profit: 300,
  },
  {
    name: "Mar",
    profit: -50,
  },
  {
    name: "Apr",
    profit: -150,
  },
];

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

export const PosNegBarChartDashboard = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={600}
        height={600}
        data={posNegBarData}
        margin={{
          top: 16,
          right: 24,
          left: 0,
          bottom: 8,
        }}
      >
        <XAxis dataKey="name" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip
          content={<CustomTooltip active={false} payload={[]} label={""} />}
        />
        {/* <Legend /> */}
        <ReferenceLine y={0} stroke="#808080" />
        <Bar dataKey="profit" fill="#000" barSize={15}>
          {posNegBarData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.profit >= 0 ? "#d2eedc" : "#f8d3d3"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
