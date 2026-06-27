import ExpensePieChart from "../components/ExpensePieChart";
import MonthlyChart from "../components/MonthlyChart";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FileDown } from "lucide-react";
import AddTransactionModal from "../components/AddTransactionModal";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { generatePDF } from "../utils/generatePDF";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Search,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import ScanReceiptModal from "../components/ScanReceiptModal";
import { Camera } from "lucide-react";
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
const [showScanner, setShowScanner] = useState(false);
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

    toast.success("Transaction deleted");

    fetchTransactions();
    fetchSummary();

  } catch (error) {
    toast.error("Failed to delete transaction");
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

  <div className="flex gap-3">

  <button
    onClick={() =>
      generatePDF(
        transactions,
        summary,
        user
      )
    }
    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-5 py-3 rounded-xl shadow-lg hover:scale-105 transition-all"
  >
    📄 Export PDF
  </button>

  <button
    onClick={() =>
      setShowScanner(true)
    }
    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl shadow-lg hover:scale-105 transition-all"
  >
    <Camera size={18} />
    Scan Receipt
  </button>

  <button
    onClick={() => {
      setEditingTransaction(null);
      setShowModal(true);
    }}
    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl shadow-lg hover:scale-105 transition-all"
  >
    <Plus size={18} />
    Add Transaction
  </button>

</div>
</div>
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 rounded-2xl p-6 shadow-lg hover:shadow-green-500/20 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/20 p-4 rounded-xl">
              <TrendingUp
                size={30}
                className="text-green-400"
              />
            </div>
        
            <div>
              <p className="text-slate-400">
                Total Income
              </p>
        
              <h2 className="text-3xl font-bold text-green-400 mt-2">
                ₹{summary.income.toLocaleString("en-IN")}
              </h2>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900 rounded-2xl p-6 shadow-lg hover:shadow-red-500/20 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="bg-red-500/20 p-4 rounded-xl">
              <TrendingDown
                size={30}
                className="text-red-400"
              />
            </div>
        
            <div>
              <p className="text-slate-400">
                Total Expenses
              </p>
        
              <h2 className="text-3xl font-bold text-red-400 mt-2">
                ₹{summary.expense.toLocaleString("en-IN")}
              </h2>
            </div>
          </div>
        </div>
        
         <div className="bg-slate-900 rounded-2xl p-6 shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/20 p-4 rounded-xl">
              <Wallet
                size={30}
                className="text-blue-400"
              />
            </div>
        
            <div>
              <p className="text-slate-400">
                Net Balance
              </p>
        
              <h2 className="text-3xl font-bold text-blue-400 mt-2">
                ₹{summary.balance.toLocaleString("en-IN")}
              </h2>
            </div>
          </div>
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
  <Pencil size={18} />
</button>
    <button
      onClick={() => deleteTransaction(transaction._id)}
      className="text-red-500 hover:text-red-700"
    >
     <Trash2 size={18} />
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
      {showScanner && (
  <ScanReceiptModal
    onClose={() => setShowScanner(false)}
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