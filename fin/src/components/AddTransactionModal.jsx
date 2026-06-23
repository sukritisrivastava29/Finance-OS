import { useState } from "react";
import axios from "axios";

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
          `http://localhost:8000/transactions/${transaction._id}`,
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
        );
      } else {
        // Create new transaction
        await axios.post(
          "http://localhost:8000/transactions",
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
        );
      }

      refreshTransactions();
      onClose();
    } catch (error) {
      console.log(error);
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
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
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