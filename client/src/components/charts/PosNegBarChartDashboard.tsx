import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

export const PosNegBarChartDashboard = () => {
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
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={600}
        height={400}
        data={posNegBarData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        {/* <Tooltip /> */}
        <Legend />
        <ReferenceLine y={0} stroke="#fff" />
        <Bar dataKey="profit" fill="#fff" />
      </BarChart>
    </ResponsiveContainer>
  );
};
