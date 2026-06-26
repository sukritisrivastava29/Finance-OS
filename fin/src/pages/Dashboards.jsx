import ExpensePieChart from "../components/ExpensePieChart";
import MonthlyChart from "../components/MonthlyChart";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import AddTransactionModal from "../components/AddTransactionModal";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
function Dashboards() {
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  const navigate=useNavigate();
  const user = JSON.parse(
    localStorage.getItem("user")
  );
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });
  const [analytics, setAnalytics] = useState({
  expenseByCategory: [],
  monthlyIncomeExpense: [],
});
  const [showModal, setShowModal] = useState(false);

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
      console.log(error.response?.data);
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/transactions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions(data);
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
    }};

const deleteTransaction = async (id) => {
  try {
    await axios.delete(
      `${API_URL}/transactions/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchTransactions();
    fetchSummary();
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
   const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }
  fetchTransactions();
  fetchSummary();
  fetchAnalytics();
}, [navigate]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <div className="flex-1 p-10">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Dashboard
            </h1>

            <p className="text-slate-400">
             👋 Welcome back, {user?.name}
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
          >
           ➕ Add Transaction
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-slate-900 rounded-xl p-6">
            <p className="text-slate-400">
              Total Balance
            </p>

            <h2 className="text-3xl font-bold mt-2">
              ₹{summary.balance}
            </h2>

          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <p className="text-slate-400">
              Monthly Spending
            </p>

            <h2 className="text-3xl font-bold mt-2">
              ₹{summary.expense}
            </h2>

      
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <p className="text-slate-400">
              Savings
            </p>

            <h2 className="text-3xl font-bold mt-2">
              ₹{summary.income}
            </h2>

        
          </div>

        </div>

        {/* Recent Transactions */}
        <div className="bg-slate-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Recent Transactions
          </h2>

         <div className="space-y-4">
  {transactions.length === 0 ? (
    <p className="text-center text-slate-400 py-8">
     📭No transactions yet. Click "Add Transaction" to add your first expense.
    </p>
  ) : (
    transactions.map((transaction) => (
     <div
  key={transaction._id}
  className="flex justify-between items-center bg-slate-800 p-4 rounded-lg"
>
  <div>
    <p>{transaction.title}</p>
    <p className="text-sm text-slate-400">
      {transaction.category}
    </p>
  </div>

  <div className="flex items-center gap-4">
   <p
  className={`font-semibold flex items-center gap-2 ${
    transaction.type === "income"
      ? "text-green-400"
      : "text-red-400"
  }`}
>
  {transaction.type === "income" ? "📈" : "📉"}

  {transaction.type === "income"
    ? "+"
    : "-"}
  ₹{transaction.amount}
</p>

<button
  onClick={() => {
    setEditingTransaction(transaction);
    setShowModal(true);
  }}
  className="text-blue-400 hover:text-blue-600"
>
  ✏️
</button>
    <button
      onClick={() => deleteTransaction(transaction._id)}
      className="text-red-500 hover:text-red-700"
    >
      🗑️
    </button>
  </div>
</div>
    ))
  )}
</div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
  <ExpensePieChart
    data={analytics.expenseByCategory}
  />

  <MonthlyChart
    data={analytics.monthlyIncomeExpense}
  />
</div>
      </div>
      {showModal && (
      <AddTransactionModal
  transaction={editingTransaction}
  onClose={() => {
  setShowModal(false);
  setEditingTransaction(null);
}}
  refreshTransactions={() => {
    fetchTransactions();
    fetchSummary();
    fetchAnalytics();
  }}
/>
      )}
    </div>
  );
}

export default Dashboards;