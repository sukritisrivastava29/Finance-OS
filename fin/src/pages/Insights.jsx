import Sidebar from "../components/Sidebar";

function Insights() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8">
          Insights
        </h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-slate-900 rounded-xl p-6">
            <p className="text-slate-400">Income</p>
            <h2 className="text-3xl font-bold mt-2">
              ₹45,000
            </h2>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <p className="text-slate-400">Expenses</p>
            <h2 className="text-3xl font-bold mt-2">
              ₹12,300
            </h2>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <p className="text-slate-400">Savings Rate</p>
            <h2 className="text-3xl font-bold mt-2">
              72%
            </h2>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <p className="text-slate-400">
              Health Score
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-400">
              82/100
            </h2>
          </div>

        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">
            Monthly Spending
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <p>Food</p>
              <p>₹4,000</p>
            </div>

            <div className="flex justify-between">
              <p>Entertainment</p>
              <p>₹2,500</p>
            </div>

            <div className="flex justify-between">
              <p>Transport</p>
              <p>₹1,800</p>
            </div>

            <div className="flex justify-between">
              <p>Shopping</p>
              <p>₹4,000</p>
            </div>

          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Smart Insights
          </h2>

          <div className="space-y-4">

            <div className="border border-red-500 rounded-lg p-4">
              ⚠️ Oh no! You spent more on groceries than your monthly target.
            </div>

            <div className="border border-yellow-500 rounded-lg p-4">
              💡 Entertainment spending increased by 15% this month.
            </div>

            <div className="border border-green-500 rounded-lg p-4">
              🎉 Excellent! Your savings rate is above 70%.
            </div>

            <div className="border border-blue-500 rounded-lg p-4">
              🎯 You are on track to reach your monthly savings goal.
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Insights;