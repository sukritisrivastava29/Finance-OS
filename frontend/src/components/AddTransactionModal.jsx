import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
import toast from "react-hot-toast";

function AddTransactionModal({
  transaction,
  onClose,
  refreshTransactions,
}) {
  const token = localStorage.getItem("token");

  // Refs
  const titleRef = useRef(null);
  const amountRef = useRef(null);
  const categoryRef = useRef(null);
  const typeRef = useRef(null);
  const dateRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(
    transaction?.title || ""
  );

  const [amount, setAmount] = useState(
    transaction?.amount || ""
  );

  const [type, setType] = useState(
    transaction?.type || "expense"
  );

  const [category, setCategory] = useState(
    transaction?.category || ""
  );

  const [date, setDate] = useState(
    transaction?.date
      ? transaction.date.substring(0, 10)
      : new Date().toISOString().split("T")[0]
  );

  // Categories

  const expenseCategories = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Rent",
    "Healthcare",
    "Education",
    "Entertainment",
    "Travel",
    "Subscriptions",
    "Other",
  ];

  const incomeCategories = [
    "Salary",
    "Freelance",
    "Business",
    "Investment",
    "Bonus",
    "Other Income",
  ];

  useEffect(() => {
    titleRef.current?.focus();

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleEscape
      );
  }, [onClose]);

  const handleSubmit = async () => {
    if (loading) return;

    if (
      !title.trim() ||
      !amount ||
      !category ||
      !date
    ) {
      toast.error(
        "Please fill all required fields."
      );
      return;
    }

    if (Number(amount) <= 0) {
      toast.error(
        "Amount must be greater than zero."
      );
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: title.trim(),
        amount: Number(amount),
        category,
        type,
        date,
      };

      if (transaction) {
        await axios.put(
          `${API_URL}/transactions/${transaction._id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Transaction updated successfully!"
        );
      } else {
        await axios.post(
          `${API_URL}/transactions`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Transaction added successfully!"
        );
      }

      refreshTransactions();
      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save transaction."
      );
    } finally {
      setLoading(false);
    }
  };

  return (<div
  className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
  onClick={onClose}
>
  <div
    onClick={(e) => e.stopPropagation()}
    className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-8"
  >
    <h2 className="text-2xl font-bold mb-2">
      {transaction ? "Edit Transaction" : "Add Transaction"}
    </h2>

    <p className="text-slate-400 mb-6">
      {transaction
        ? "Update your transaction details."
        : "Record a new income or expense."}
    </p>

    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {/* Title */}

      <input
        ref={titleRef}
        type="text"
        placeholder="Transaction Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            amountRef.current?.focus();
          }
        }}
        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500"
      />

      {/* Amount */}

      <input
        ref={amountRef}
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            categoryRef.current?.focus();
          }
        }}
        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500"
      />

      {/* Category */}

      <select
        ref={categoryRef}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            typeRef.current?.focus();
          }
        }}
        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500"
      >
        <option value="">
          Select Category
        </option>

        {(type === "expense"
          ? expenseCategories
          : incomeCategories
        ).map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>

      {/* Type */}

      <select
        ref={typeRef}
        value={type}
        onChange={(e) => {
          setType(e.target.value);
          setCategory("");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            dateRef.current?.focus();
          }
        }}
        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500"
      >
        <option value="expense">
          Expense
        </option>

        <option value="income">
          Income
        </option>
      </select>

      {/* Date */}

      <input
        ref={dateRef}
        type="date"
        value={date}
        onChange={(e) =>
          setDate(e.target.value)
        }
        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500"
      />

      {/* Buttons */}

      <div className="flex justify-end gap-3 pt-3">

        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
            loading
              ? "bg-slate-700 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 shadow-lg"
          }`}
        >
          {loading
            ? "Saving..."
            : transaction
            ? "Update"
            : "Save"}
        </button>

      </div>
    </form>
  </div>
</div>
);
}

export default AddTransactionModal;