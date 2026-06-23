import Sidebar from "../components/Sidebar";

function Transactions() {
  const transactions = [
    {
      id: 1,
      title: "Netflix Subscription",
      amount: -499,
      date: "15 Jun 2026",
    },
    {
      id: 2,
      title: "Salary Credit",
      amount: 45000,
      date: "14 Jun 2026",
    },
    {
      id: 3,
      title: "Grocery Shopping",
      amount: -1200,
      date: "13 Jun 2026",
    },
    {
      id: 4,
      title: "Petrol",
      amount: -800,
      date: "12 Jun 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Transactions
          </h1>

          <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
            Add Transaction
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 rounded-xl p-6">
            <p className="text-slate-400">
              Total Income
            </p>

            <h2 className="text-3xl font-bold text-green-400 mt-2">
              ₹45,000
            </h2>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <p className="text-slate-400">
              Total Expenses
            </p>

            <h2 className="text-3xl font-bold text-red-400 mt-2">
              ₹2,499
            </h2>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <p className="text-slate-400">
              Net Balance
            </p>

            <h2 className="text-3xl font-bold mt-2">
              ₹42,501
            </h2>
          </div>
        </div>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search transactions..."
          className="w-full bg-slate-900 rounded-xl p-4 mb-6 outline-none"
        />

        {/* Transactions Table */}
        <div className="bg-slate-900 rounded-xl p-6">
          <div className="grid grid-cols-3 font-semibold border-b border-slate-700 pb-4 mb-4">
            <p>Description</p>
            <p>Amount</p>
            <p>Date</p>
          </div>

          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="grid grid-cols-3 py-4 border-b border-slate-800"
            >
              <p>{transaction.title}</p>

              <p
                className={
                  transaction.amount > 0
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                ₹{transaction.amount}
              </p>

              <p>{transaction.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Transactions;