function DashPreview() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">
        Your Financial Command Center
      </h2>

      <div className="bg-slate-800 rounded-3xl p-8 shadow-2xl">

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-slate-400 mb-2">
              Total Balance
            </p>

            <h3 className="text-3xl font-bold text-green-400">
              ₹25,000
            </h3>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-slate-400 mb-2">
              Income
            </p>

            <h3 className="text-3xl font-bold text-blue-400">
              ₹30,000
            </h3>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-slate-400 mb-2">
              Expenses
            </p>

            <h3 className="text-3xl font-bold text-red-400">
              ₹5,000
            </h3>
          </div>

        </div>

        <div className="mt-8 bg-slate-900 rounded-2xl p-6">

          <h3 className="text-xl font-semibold mb-4">
            Recent Transactions
          </h3>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span>💼 Salary</span>
              <span className="text-green-400">
                +₹20,000
              </span>
            </div>

            <div className="flex justify-between">
              <span>🍔 Food</span>
              <span className="text-red-400">
                -₹200
              </span>
            </div>

            <div className="flex justify-between">
              <span>☕ Coffee</span>
              <span className="text-red-400">
                -₹80
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default DashPreview;