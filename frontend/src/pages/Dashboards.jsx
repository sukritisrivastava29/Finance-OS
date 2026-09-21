import ExpensePieChart from "../components/ExpensePieChart";
import MonthlyChart from "../components/MonthlyChart";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import AddTransactionModal from "../components/AddTransactionModal";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { generatePDF } from "../utils/generatePDF";
import FloatingAIButton from "../components/FloatingAIButton";

import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Plus,
  Pencil,
  Trash2,
  Camera,
  FileDown,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
} from "lucide-react";

import toast from "react-hot-toast";
import ScanReceiptModal from "../components/ScanReceiptModal";

function Dashboards() {
  const [editingTransaction, setEditingTransaction] =
    useState(null);

  const [transactions, setTransactions] = useState([]);

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
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchAnalytics = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/transactions/analytics`,
        { headers }
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
        { headers }
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
        { headers }
      );

      setSummary(data);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshDashboard = async () => {
    await Promise.all([
      fetchTransactions(),
      fetchSummary(),
      fetchAnalytics(),
    ]);
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/transactions/${id}`,
        { headers }
      );

      toast.success("Transaction deleted");

      await refreshDashboard();
    } catch (error) {
      toast.error("Failed to delete transaction");
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const loadDashboard = async () => {
      setLoading(true);
      await refreshDashboard();
      setLoading(false);
    };

    loadDashboard();
  }, [navigate]);

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString("en-IN");
  };

  const recentTransactions = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )
    .slice(0, 6);

  if (loading) {
    return (
      <div className="app-theme min-h-screen flex">
        <Sidebar />

        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 rounded-full border-4 border-[var(--border)] border-t-[var(--accent)] animate-spin mx-auto" />

            <p className="text-muted mt-4">
              Loading your finances...
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-theme min-h-screen flex">
      <Sidebar />

      <main className="flex-1 min-w-0 p-4 md:p-8 lg:p-10 pt-20 md:pt-10 overflow-x-hidden">

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">

            <div>
              <p className="text-sm font-medium text-primary mb-2">
                FINANCEOS
              </p>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-theme">
                Dashboard
              </h1>

              <p className="text-muted mt-2">
                Welcome back{user?.name ? `, ${user.name}` : ""}.
                Here's your financial overview.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">

              <button
                type="button"
                onClick={() =>
                  generatePDF(
                    transactions,
                    summary,
                    user
                  )
                }
                className="secondary-btn flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium"
              >
                <FileDown size={17} />
                Export PDF
              </button>

              <button
                type="button"
                onClick={() => setShowScanner(true)}
                className="secondary-btn flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium"
              >
                <Camera size={17} />
                Scan receipt
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditingTransaction(null);
                  setShowModal(true);
                }}
                className="primary-btn flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium"
              >
                <Plus size={18} />
                Add transaction
              </button>

            </div>
          </div>
        </header>

        {/* Summary cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          {/* Income */}
          <div className="card-theme rounded-2xl p-6">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm text-muted">
                  Total income
                </p>

                <h2 className="text-3xl font-bold mt-3 text-green-500">
                  ₹{formatCurrency(summary.income)}
                </h2>

                <p className="text-xs text-muted mt-2">
                  Money coming in
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center">
                <TrendingUp
                  size={21}
                  className="text-green-500"
                />
              </div>

            </div>
          </div>

          {/* Expenses */}
          <div className="card-theme rounded-2xl p-6">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm text-muted">
                  Total expenses
                </p>

                <h2 className="text-3xl font-bold mt-3 text-red-500">
                  ₹{formatCurrency(summary.expense)}
                </h2>

                <p className="text-xs text-muted mt-2">
                  Money going out
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center">
                <TrendingDown
                  size={21}
                  className="text-red-500"
                />
              </div>

            </div>
          </div>

          {/* Balance */}
          <div className="card-theme rounded-2xl p-6">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm text-muted">
                  Net balance
                </p>

                <h2 className="text-3xl font-bold mt-3 text-primary">
                  ₹{formatCurrency(summary.balance)}
                </h2>

                <p className="text-xs text-muted mt-2">
                  Current financial position
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                <Wallet
                  size={21}
                  className="text-primary"
                />
              </div>

            </div>
          </div>

        </section>

        {/* Analytics */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

          <div className="card-theme rounded-2xl p-5 md:p-6 overflow-hidden">
            <div className="mb-5">
              <h2 className="text-xl font-semibold">
                Spending by category
              </h2>

              <p className="text-sm text-muted mt-1">
                Understand where your money goes.
              </p>
            </div>

            <ExpensePieChart
              data={analytics.expenseByCategory}
            />
          </div>

          <div className="card-theme rounded-2xl p-5 md:p-6 overflow-hidden">
            <div className="mb-5">
              <h2 className="text-xl font-semibold">
                Income & expenses
              </h2>

              <p className="text-sm text-muted mt-1">
                Track your financial activity over time.
              </p>
            </div>

            <MonthlyChart
              data={analytics.monthlyIncomeExpense}
            />
          </div>

        </section>

        {/* Recent transactions */}
        <section className="card-theme rounded-2xl p-5 md:p-6 mb-10">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

            <div>
              <h2 className="text-xl font-semibold">
                Recent transactions
              </h2>

              <p className="text-sm text-muted mt-1">
                Your latest financial activity.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/transactions")}
              className="text-sm font-medium text-primary hover:opacity-80 transition"
            >
              View all →
            </button>

          </div>

          {recentTransactions.length === 0 ? (
            <div className="py-14 text-center">

              <div className="w-14 h-14 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center mx-auto">
                <Receipt
                  size={23}
                  className="text-muted"
                />
              </div>

              <h3 className="font-semibold mt-4">
                No transactions yet
              </h3>

              <p className="text-sm text-muted mt-1">
                Add your first transaction to start
                understanding your finances.
              </p>

              <button
                type="button"
                onClick={() => {
                  setEditingTransaction(null);
                  setShowModal(true);
                }}
                className="primary-btn mt-5 px-4 py-2.5 rounded-xl text-sm font-medium"
              >
                Add transaction
              </button>

            </div>
          ) : (
            <div className="divide-y divide-[var(--border)]">

              {recentTransactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >

                  <div className="flex items-center gap-3 min-w-0">

                    <div className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
                      {transaction.type === "income" ? (
                        <ArrowUpRight
                          size={18}
                          className="text-green-500"
                        />
                      ) : (
                        <ArrowDownRight
                          size={18}
                          className="text-red-500"
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium truncate">
                        {transaction.title}
                      </p>

                      <p className="text-xs text-muted mt-1">
                        {transaction.category}
                        {" • "}
                        {new Date(
                          transaction.date
                        ).toLocaleDateString("en-IN")}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5">

                    <p
                      className={`font-semibold ${
                        transaction.type === "income"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.type === "income"
                        ? "+"
                        : "-"}
                      ₹
                      {formatCurrency(
                        transaction.amount
                      )}
                    </p>

                    <div className="flex items-center gap-1">

                      <button
                        type="button"
                        onClick={() => {
                          setEditingTransaction(transaction);
                          setShowModal(true);
                        }}
                        className="icon-btn p-2 text-muted hover:text-primary"
                        title="Edit transaction"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Delete this transaction?"
                            )
                          ) {
                            deleteTransaction(
                              transaction._id
                            );
                          }
                        }}
                        className="icon-btn p-2 text-muted hover:text-red-500"
                        title="Delete transaction"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

      </main>

      {/* Add/Edit transaction */}
      {showModal && (
        <AddTransactionModal
          transaction={editingTransaction}
          onClose={() => {
            setShowModal(false);
            setEditingTransaction(null);
          }}
          refreshTransactions={refreshDashboard}
        />
      )}

      {/* Receipt scanner */}
      {showScanner && (
        <ScanReceiptModal
          onClose={() => setShowScanner(false)}
          refreshTransactions={refreshDashboard}
        />
      )}

      {/* AI */}
      <FloatingAIButton />
    </div>
  );
}

export default Dashboards;