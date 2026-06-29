import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

function Insights() {
  const token = localStorage.getItem("token");

  const [analytics, setAnalytics] = useState({
    expenseByCategory: [],
    monthlyIncomeExpense: [],
  });

  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const fetchAnalytics = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/transactions/analytics`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalytics(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSummary = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/transactions/summary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSummary(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    fetchSummary();
  }, []);

  const savingsRate =
    summary.income > 0
      ? Math.round(
          ((summary.income - summary.expense) /
            summary.income) *
            100
        )
      : 0;

  const healthScore =
    summary.income > 0
      ? Math.max(
          0,
          Math.min(
            100,
            Math.round(
              ((summary.income - summary.expense) /
                summary.income) *
                100
            )
          )
        )
      : 0;

  const highestCategory =
    analytics.expenseByCategory.length > 0
      ? [...analytics.expenseByCategory].sort(
          (a, b) => b.amount - a.amount
        )[0]
      : null;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8">
          Insights
        </h1>

        {/* Top Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-slate-900 rounded-xl p-6">
            <p className="text-slate-400">
              Income
            </p>

            <h2 className="text-3xl font-bold mt-2">
              ₹{summary.income}
            </h2>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <p className="text-slate-400">
              Expenses
            </p>

            <h2 className="text-3xl font-bold mt-2">
              ₹{summary.expense}
            </h2>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <p className="text-slate-400">
              Savings Rate
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {savingsRate}%
            </h2>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <p className="text-slate-400">
              Health Score
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-400">
              {healthScore}/100
            </h2>
          </div>

        </div>

        {/* Spending By Category */}
        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">
            Spending By Category
          </h2>

          <div className="space-y-4">
            {analytics.expenseByCategory.length ===
            0 ? (
              <p className="text-slate-400">
                No spending data available.
              </p>
            ) : (
              analytics.expenseByCategory.map(
                (item) => (
                  <div
                    key={item.category}
                    className="flex justify-between"
                  >
                    <p>{item.category}</p>

                    <p>
                      ₹{item.amount}
                    </p>
                  </div>
                )
              )
            )}
          </div>
        </div>

        {/* Smart Insights */}
        <div className="bg-slate-900 rounded-xl p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Smart Insights
          </h2>

          <div className="space-y-4">

            {summary.expense >
              summary.income * 0.8 && (
              <div className="border border-red-500 rounded-lg p-4">
                ⚠️ Your expenses are more
                than 80% of your income.
              </div>
            )}

            {summary.expense <
              summary.income * 0.5 &&
              summary.income > 0 && (
                <div className="border border-green-500 rounded-lg p-4">
                  🎉 Excellent savings
                  habit! You saved more
                  than 50% of your income.
                </div>
              )}

            {summary.balance > 0 && (
              <div className="border border-blue-500 rounded-lg p-4">
                💰 Current balance:
                ₹{summary.balance}
              </div>
            )}

            {highestCategory && (
              <div className="border border-yellow-500 rounded-lg p-4">
                📊 Highest spending
                category:{" "}
                {highestCategory.category}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Insights;