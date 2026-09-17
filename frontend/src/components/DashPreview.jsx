import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Wallet,
  CreditCard,
  MoreHorizontal,
} from "lucide-react";

const transactions = [
  {
    name: "Salary",
    category: "Income",
    amount: "+₹30,000",
    type: "income",
  },
  {
    name: "Groceries",
    category: "Food",
    amount: "-₹2,450",
    type: "expense",
  },
  {
    name: "Transport",
    category: "Travel",
    amount: "-₹680",
    type: "expense",
  },
  {
    name: "Subscription",
    category: "Entertainment",
    amount: "-₹499",
    type: "expense",
  },
];

const bars = [42, 58, 48, 72, 54, 68, 82, 64, 88, 76, 91, 79];

function DashPreview() {
  return (
    <section
      id="preview"
      className="px-6 py-20 md:py-28"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-4">
            The FinanceOS workspace
          </p>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text)]">
            See your finances clearly.
          </h2>

          <p className="mt-5 text-lg text-[var(--muted)] leading-8">
            A single workspace for understanding where your
            money comes from, where it goes, and what to do next.
          </p>
        </div>

        {/* Dashboard shell */}
        <div className="relative rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-2xl overflow-hidden">

          {/* Browser bar */}
          <div className="h-12 px-5 border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface)]">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--border)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--border)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--border)]" />
            </div>

            <span className="text-xs text-[var(--muted)]">
              FinanceOS / Dashboard
            </span>

            <MoreHorizontal
              size={16}
              className="text-[var(--muted)]"
            />
          </div>

          {/* Dashboard */}
          <div className="p-5 md:p-8">

            {/* Preview label */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-[var(--muted)]">
                  Dashboard preview
                </p>

                <h3 className="text-2xl font-bold text-[var(--text)] mt-1">
                  Financial overview
                </h3>
              </div>

              <div className="hidden sm:block px-3 py-1.5 rounded-lg bg-[var(--surface)] text-xs text-[var(--muted)]">
                Sample data
              </div>
            </div>

            {/* KPI cards */}
            <div className="grid sm:grid-cols-3 gap-4 mb-6">

              <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--muted)]">
                    Total balance
                  </span>

                  <Wallet
                    size={18}
                    className="text-[var(--accent)]"
                  />
                </div>

                <p className="text-2xl font-bold text-[var(--text)] mt-4">
                  ₹48,240
                </p>

                <span className="text-xs text-green-500 flex items-center gap-1 mt-2">
                  <ArrowUpRight size={13} />
                  8.4% this month
                </span>
              </div>

              <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--muted)]">
                    Income
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="text-green-500"
                  />
                </div>

                <p className="text-2xl font-bold text-[var(--text)] mt-4">
                  ₹32,500
                </p>

                <span className="text-xs text-[var(--muted)] mt-2 block">
                  This month
                </span>
              </div>

              <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--muted)]">
                    Expenses
                  </span>

                  <CreditCard
                    size={18}
                    className="text-[var(--accent)]"
                  />
                </div>

                <p className="text-2xl font-bold text-[var(--text)] mt-4">
                  ₹18,720
                </p>

                <span className="text-xs text-green-500 flex items-center gap-1 mt-2">
                  <ArrowDownRight size={13} />
                  4.8% lower
                </span>
              </div>

            </div>

            {/* Chart + transactions */}
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">

              {/* Chart */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">

                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h4 className="font-semibold text-[var(--text)]">
                      Spending overview
                    </h4>

                    <p className="text-xs text-[var(--muted)] mt-1">
                      Last 12 months
                    </p>
                  </div>

                  <TrendingUp
                    size={18}
                    className="text-[var(--accent)]"
                  />
                </div>

                <div className="h-48 flex items-end gap-2 md:gap-3">
                  {bars.map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 h-full flex items-end"
                    >
                      <div
                        className="w-full rounded-t-md bg-[var(--accent)] opacity-70 hover:opacity-100 transition"
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-3 text-[10px] text-[var(--muted)]">
                  <span>Jan</span>
                  <span>Mar</span>
                  <span>Jun</span>
                  <span>Sep</span>
                  <span>Dec</span>
                </div>
              </div>

              {/* Transactions */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">

                <div className="flex items-center justify-between mb-5">
                  <h4 className="font-semibold text-[var(--text)]">
                    Recent transactions
                  </h4>

                  <span className="text-xs text-[var(--accent)]">
                    View all
                  </span>
                </div>

                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.name}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center shrink-0">
                          {transaction.type === "income" ? (
                            <ArrowUpRight
                              size={15}
                              className="text-green-500"
                            />
                          ) : (
                            <ArrowDownRight
                              size={15}
                              className="text-[var(--accent)]"
                            />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[var(--text)] truncate">
                            {transaction.name}
                          </p>

                          <p className="text-xs text-[var(--muted)]">
                            {transaction.category}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-sm font-semibold ${
                          transaction.type === "income"
                            ? "text-green-500"
                            : "text-[var(--text)]"
                        }`}
                      >
                        {transaction.amount}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default DashPreview;