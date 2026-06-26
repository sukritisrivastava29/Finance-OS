import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import AddTransactionModal from "../components/AddTransactionModal";
function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
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
      const { data } = await axios.get(
        `${API_URL}/transactions?q=${search}`,
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
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
               Transactions
             </h1>
         
             <p className="text-slate-400 mt-2">
               Manage all your income and expenses in one place.
             </p>

         <button
  onClick={() => {
    setEditingTransaction(null);
    setShowModal(true);
  }}
  className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
>
  + Add Transaction
</button>
        </div>

      {/* Summary Cards */}
<div className="grid md:grid-cols-3 gap-6 mb-8">
  <div className="bg-slate-900 rounded-xl p-6">
    <p className="text-slate-400">
      Total Income
    </p>

    <h2 className="text-3xl font-bold text-green-400 mt-2">
      ₹{summary.income}
    </h2>
  </div>

  <div className="bg-slate-900 rounded-xl p-6">
    <p className="text-slate-400">
      Total Expenses
    </p>

    <h2 className="text-3xl font-bold text-red-400 mt-2">
      ₹{summary.expense}
    </h2>
  </div>

  <div className="bg-slate-900 rounded-xl p-6">
    <p className="text-slate-400">
      Net Balance
    </p>

    <h2 className="text-3xl font-bold mt-2">
      ₹{summary.balance}
    </h2>
  </div>
</div>

        {/* Search Box */}
        <input
          type="text"
          placeholder="🔍 Search transactions.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 rounded-xl p-4 mb-6 outline-none"
        />

        {/* Transactions Table */}
        <div className="bg-slate-900 rounded-xl p-6">
        <div className="grid grid-cols-5 font-semibold border-b border-slate-700 pb-4 mb-4">
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
      className="grid grid-cols-5 py-4 border-b border-slate-800 items-center"
    >
      <p>{transaction.title}</p>

     <p>
  {getCategoryEmoji(transaction.category)}{" "}
  {transaction.category}
</p>
<p
  className={`font-semibold flex items-center gap-2 ${
    transaction.type === "income"
      ? "text-green-400"
      : "text-red-400"
  }`}
>
  {transaction.type === "income" ? "📈" : "📉"}

  {transaction.type === "income" ? "+" : "-"}₹
  {transaction.amount}
</p>

      <p>
        {new Date(transaction.date).toLocaleDateString()}
      </p>

      <div className="flex gap-4">
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
          onClick={() =>
            deleteTransaction(transaction._id)
          }
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