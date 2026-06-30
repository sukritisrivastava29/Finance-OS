import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import ScanReceiptModal from "../components/ScanReceiptModal";
import { Camera } from "lucide-react";
import AddTransactionModal from "../components/AddTransactionModal";
import { generatePDF } from "../utils/generatePDF";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";
function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
const [showModal, setShowModal] = useState(false);
const [editingTransaction, setEditingTransaction] = useState(null);
  const token = localStorage.getItem("token");
  const [summary, setSummary] = useState({
  income: 0,
  expense: 0,
  balance: 0,
});
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

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_URL}/transactions?q=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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
const getCategoryEmoji = (category) => {
  switch (category.toLowerCase()) {
    case "food":
      return "🍔";
    case "transport":
      return "🚗";
    case "salary":
      return "💼";
    case "shopping":
      return "🛍️";
    case "health":
      return "🏥";
    case "education":
      return "📚";
    case "entertainment":
      return "🎬";
    case "bills":
      return "🧾";
    case "investment":
      return "📈";
    case "travel":
      return "✈️";
    default:
      return "📦";
  }
};

 useEffect(() => {
  fetchSummary();
}, []);

useEffect(() => {
  fetchTransactions();
}, [search]);
if (loading) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <div className="flex-1 flex items-center justify-center">
        <p className="text-slate-400 text-lg">
          Loading transactions...
        </p>
      </div>
    </div>
  );
}
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 lg:p-10 pt-20 md:pt-10 overflow-x-hidden">
       <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-8">

  <div>
    <h1 className="text-4xl font-bold tracking-tight">
      Transactions
    </h1>

    <p className="text-slate-400 mt-2">
      Manage all your income and expenses in one place.
    </p>
  </div>

  <div className="flex flex-wrap gap-3 w-full lg:w-auto">
    
    <button
      onClick={() =>
        generatePDF(
          transactions,
          summary,
          JSON.parse(localStorage.getItem("user"))
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
      className="bg-blue-600 px-5 py-2 rounded-xl hover:bg-blue-700 transition"
    >
      + Add Transaction
    </button>
  </div>

</div>

      {/* Summary Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
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

        {/* Search Box */}
        <div className="relative mb-6 max-w-2xl">
  <Search
    size={20}
    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
  />

  <input
    type="text"
    placeholder="Search transactions..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
  />
</div>

      {/* Transactions Table */}
<div className="bg-slate-900 rounded-2xl p-4 md:p-6 shadow-lg">
  <div className="overflow-x-auto rounded-xl">
    <div className="min-w-[820px]">

      {/* Header */}
      <div className="grid grid-cols-5 font-semibold text-slate-300 border-b border-slate-700 pb-4 mb-4">
        <p>📝 Description</p>
        <p>🏷️ Category</p>
        <p>💵 Amount</p>
        <p>📅 Date</p>
        <p>⚙️ Actions</p>
      </div>

      {transactions.length === 0 ? (
        <p className="text-center text-slate-400 py-6">
          No transactions found.
        </p>
      ) : (
        transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="grid grid-cols-5 items-center gap-4 py-4 px-2 border-b border-slate-800 hover:bg-slate-800/70 rounded-xl transition-all duration-200"
          >
            {/* Description */}
            <p className="truncate font-medium">
              {transaction.title}
            </p>

            {/* Category */}
            <span className="inline-flex items-center gap-2 bg-slate-700 px-3 py-1 rounded-full text-xs md:text-sm w-fit">
              {getCategoryEmoji(transaction.category)}
              {transaction.category}
            </span>

            {/* Amount */}
        <p
  className={`font-bold text-lg whitespace-nowrap ${
    transaction.type === "income"
      ? "text-green-400"
      : "text-red-400"
  }`}
>
  {transaction.type === "income" ? "📈" : "📉"}{" "}
  {transaction.type === "income" ? "+" : "-"}₹
  {transaction.amount}
</p>

            {/* Date */}
            <p>
              {new Date(transaction.date).toLocaleDateString()}
            </p>

            {/* Actions */}
            <div className="flex gap-4">
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
                onClick={() => {
                  if (
                    window.confirm(
                      "Delete this transaction?"
                    )
                  ) {
                    deleteTransaction(transaction._id);
                  }
                }}
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
      setShowModal(false);
      setEditingTransaction(null);
    }}
  />
)}
    </div>
  );
}

export default Transactions;