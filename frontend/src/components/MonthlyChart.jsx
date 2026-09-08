import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function MonthlyChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="card-theme p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">
          Monthly Income vs Expense
        </h2>

        <p className="text-muted text-center py-16">
          No monthly data available.
        </p>
      </div>
    );
  }

  return (
    <div className="card-theme p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">
        Monthly Income vs Expense
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <CartesianGrid
            stroke="var(--border)"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="month"
            tick={{ fill: "var(--text)" }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={{ stroke: "var(--border)" }}
          />

          <YAxis
            tick={{ fill: "var(--text)" }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={{ stroke: "var(--border)" }}
          />

          <Tooltip
            contentStyle={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              color: "var(--text)",
            }}
          />

          <Legend
            wrapperStyle={{
              color: "var(--text)",
            }}
          />

          <Bar
            dataKey="income"
            fill="#22c55e"
            radius={[6, 6, 0, 0]}
          />

          <Bar
            dataKey="expense"
            fill="#ef4444"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyChart;