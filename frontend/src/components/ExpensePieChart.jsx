import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#f97316",
  "#14b8a6",
];

function ExpensePieChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="card-theme p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">
          Expenses by Category
        </h2>

        <p className="text-muted text-center py-16">
          No expense data available.
        </p>
      </div>
    );
  }

  return (
    <div className="card-theme p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">
        Expenses by Category
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpensePieChart;