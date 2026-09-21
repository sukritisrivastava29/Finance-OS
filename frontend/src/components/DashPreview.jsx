import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Wallet,
  CreditCard,
} from "lucide-react";

const transactions = [
  {
    name: "Recent transaction",
    category: "Expense",
    amount: "₹ —",
    type: "expense",
  },
  {
    name: "Recent transaction",
    category: "Income",
    amount: "₹ —",
    type: "income",
  },
  {
    name: "Recent transaction",
    category: "Expense",
    amount: "₹ —",
    type: "expense",
  },
  {
    name: "Recent transaction",
    category: "Expense",
    amount: "₹ —",
    type: "expense",
  },
];

const bars = [42, 58, 48, 72, 54, 68, 82, 64, 88, 76, 91, 79];

function DashPreview() {
  return (
    <section id="preview" className="px-6 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
          <div>
            <p className="text-sm font-medium text-[var(--accent)] mb-2">
              Inside FinanceOS
            </p>

            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--text)]">
              Everything you need at a glance.
            </h2>
          </div>

          <p className="max-w-md text-sm md:text-base leading-7 text-[var(--muted)]">
            A clean workspace for tracking transactions,
            monitoring spending, and understanding your finances.
          </p>
        </div>

        <div className="border border-[var(--border)] bg-[var(--card)] overflow-hidden">

          <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text)]">
                Dashboard
              </p>

              <p className="text-xs text-[var(--muted)] mt-0.5">
                Financial overview
              </p>
            </div>

            <span className="text-xs text-[var(--muted)]">
              Preview
            </span>
          </div>

          <div className="p-5 md:p-7">

            <div className="grid sm:grid-cols-3 gap-4 mb-5">

              <div className="p-5 border border-[var(--border)] bg-[var(--surface)]">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--muted)]">
                    Total balance
                  </span>

                  <Wallet
                    size={17}
                    className="text-[var(--accent)]"
                  />
                </div>

                <p className="text-2xl font-semibold text-[var(--text)] mt-4">
                  ₹ —
                </p>

                <p className="text-xs text-[var(--muted)] mt-2">
                  Connect your account
                </p>
              </div>

              <div className="p-5 border border-[var(--border)] bg-[var(--surface)]">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--muted)]">
                    Income
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="text-green-500"
                  />
                </div>

                <p className="text-2xl font-semibold text-[var(--text)] mt-4">
                  ₹ —
                </p>

                <p className="text-xs text-[var(--muted)] mt-2">
                  This month
                </p>
              </div>

              <div className="p-5 border border-[var(--border)] bg-[var(--surface)]">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--muted)]">
                    Expenses
                  </span>

                  <CreditCard
                    size={17}
                    className="text-[var(--accent)]"
                  />
                </div>

                <p className="text-2xl font-semibold text-[var(--text)] mt-4">
                  ₹ —
                </p>

                <p className="text-xs text-[var(--muted)] mt-2">
                  This month
                </p>
              </div>

            </div>

            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">

              <div className="border border-[var(--border)] bg-[var(--surface)] p-5">

                <div className="flex items-center justify-between mb-7">
                  <div>
                    <h4 className="font-medium text-[var(--text)]">
                      Spending overview
                    </h4>

                    <p className="text-xs text-[var(--muted)] mt-1">
                      Your spending over time
                    </p>
                  </div>

                  <TrendingUp
                    size={17}
                    className="text-[var(--accent)]"
                  />
                </div>

                <div className="h-44 flex items-end gap-2">
                  {bars.map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 h-full flex items-end"
                    >
                      <div
                        className="w-full rounded-t-sm bg-[var(--accent)] opacity-60"
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

              <div className="border border-[var(--border)] bg-[var(--surface)] p-5">

                <div className="flex items-center justify-between mb-5">
                  <h4 className="font-medium text-[var(--text)]">
                    Recent transactions
                  </h4>

                  <span className="text-xs text-[var(--accent)]">
                    View all
                  </span>
                </div>

                <div className="space-y-4">
                  {transactions.map((transaction, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">

                        <div className="w-8 h-8 border border-[var(--border)] flex items-center justify-center shrink-0">
                          {transaction.type === "income" ? (
                            <ArrowUpRight
                              size={14}
                              className="text-green-500"
                            />
                          ) : (
                            <ArrowDownRight
                              size={14}
                              className="text-[var(--accent)]"
                            />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[var(--text)]">
                            {transaction.name}
                          </p>

                          <p className="text-xs text-[var(--muted)]">
                            {transaction.category}
                          </p>
                        </div>

                      </div>

                      <span
                        className={
                          transaction.type === "income"
                            ? "text-sm font-medium text-green-500"
                            : "text-sm font-medium text-[var(--text)]"
                        }
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