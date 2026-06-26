import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import toast from "react-hot-toast";
function AddTransactionModal({
  transaction,
  onClose,
  refreshTransactions,
}) {
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState(
    transaction?.title || ""
  );

  const [amount, setAmount] = useState(
    transaction?.amount || ""
  );

  const [category, setCategory] = useState(
    transaction?.category || ""
  );

  const [type, setType] = useState(
    transaction?.type || "expense"
  );

  const [date, setDate] = useState(
    transaction?.date
      ? transaction.date.substring(0, 10)
      : ""
  );

  const handleSubmit = async () => {
    try {
      if (transaction) {
        // Update existing transaction
      await axios.put(
  `${API_URL}/transactions/${transaction._id}`,
  {
    title,
    amount,
    category,
    type,
    date,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
); toast.success("Transaction updated successfully!");
      } else {
        // Create new transaction
       await axios.post(
  `${API_URL}/transactions`,
  {
    title,
    amount,
    category,
    type,
    date,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
); toast.success("Transaction added successfully!");
      }

      refreshTransactions();
      onClose();
    } catch (error) {
  console.log("ERROR:", error.response?.data);
}
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-slate-900 rounded-xl p-8 w-[450px]">

        <h2 className="text-2xl font-bold mb-6">
          {transaction
            ? "Edit Transaction"
            : "Add Transaction"}
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800"
          />

          <div className="flex justify-end gap-4 mt-6">

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-700"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
             className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-all duration-200 font-medium shadow-lg"
            >
              {transaction ? "Update" : "Save"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default AddTransactionModal;