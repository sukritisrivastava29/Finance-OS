import { useEffect, useState } from "react";
import axios from "axios";

import {
  User,
  Palette,
  Bell,
  Wallet,
  Bot,
  Shield,
  Database,
  Info,
  Moon,
  Sun,
  Monitor,
  Download,
  Trash2,
  Lock,
  Target,
  IndianRupee,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";
import { API_URL } from "../config";
import { generatePDF } from "../utils/generatePDF";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  const [activeSection, setActiveSection] = useState("appearance");

  const [showClearModal, setShowClearModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isClearingChat, setIsClearingChat] = useState(false);
  const [toast, setToast] = useState(null);

  const getStored = (key, fallback) => {
    try {
      const value = localStorage.getItem(key);

      if (value === null) {
        return fallback;
      }

      return JSON.parse(value);
    } catch {
      return localStorage.getItem(key) ?? fallback;
    }
  };

  const [notifications, setNotifications] = useState(
    getStored("notifications", true)
  );

  const [budgetAlerts, setBudgetAlerts] = useState(
    getStored("budgetAlerts", true)
  );

  const [monthlySummary, setMonthlySummary] = useState(
    getStored("monthlySummary", true)
  );

  const [aiInsights, setAiInsights] = useState(
    getStored("aiInsights", true)
  );

  const [currency, setCurrency] = useState(
    getStored("currency", "INR")
  );

  const [monthlyBudget, setMonthlyBudget] = useState(
    getStored("monthlyBudget", "")
  );

  const [savingsGoal, setSavingsGoal] = useState(
    getStored("savingsGoal", "")
  );

  const [responseStyle, setResponseStyle] = useState(
    getStored("responseStyle", "Balanced")
  );

  const [accentColor, setAccentColor] = useState(
    getStored("accentColor", "blue")
  );

  // -----------------------------
  // Persist settings
  // -----------------------------

  useEffect(() => {
    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(
      "budgetAlerts",
      JSON.stringify(budgetAlerts)
    );
  }, [budgetAlerts]);

  useEffect(() => {
    localStorage.setItem(
      "monthlySummary",
      JSON.stringify(monthlySummary)
    );
  }, [monthlySummary]);

  useEffect(() => {
    localStorage.setItem(
      "aiInsights",
      JSON.stringify(aiInsights)
    );
  }, [aiInsights]);

  useEffect(() => {
    localStorage.setItem(
      "currency",
      JSON.stringify(currency)
    );
  }, [currency]);

  useEffect(() => {
    localStorage.setItem(
      "monthlyBudget",
      JSON.stringify(monthlyBudget)
    );
  }, [monthlyBudget]);

  useEffect(() => {
    localStorage.setItem(
      "savingsGoal",
      JSON.stringify(savingsGoal)
    );
  }, [savingsGoal]);

  useEffect(() => {
    localStorage.setItem(
      "responseStyle",
      JSON.stringify(responseStyle)
    );
  }, [responseStyle]);

  useEffect(() => {
    localStorage.setItem(
      "accentColor",
      JSON.stringify(accentColor)
    );

    document.documentElement.setAttribute(
      "data-accent",
      accentColor
    );
  }, [accentColor]);

  // -----------------------------
  // Toast
  // -----------------------------

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // -----------------------------
  // Fetch transactions
  // -----------------------------

  const fetchTransactions = async () => {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(
      `${API_URL}/transactions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  };

  // -----------------------------
  // Export CSV
  // -----------------------------

  const exportCSV = async () => {
    try {
      const transactions = await fetchTransactions();

      if (!transactions.length) {
        showToast(
          "There are no transactions to export.",
          "error"
        );
        return;
      }

      const headers = [
        "Title",
        "Category",
        "Amount",
        "Type",
        "Date",
      ];

      const rows = transactions.map((transaction) => [
        transaction.title,
        transaction.category,
        transaction.amount,
        transaction.type,
        new Date(
          transaction.date
        ).toLocaleDateString(),
      ]);

      const csvContent = [
        headers,
        ...rows,
      ]
        .map((row) =>
          row
            .map((value) => {
              const stringValue = String(
                value ?? ""
              );

              return `"${stringValue.replace(
                /"/g,
                '""'
              )}"`;
            })
            .join(",")
        )
        .join("\n");

      const blob = new Blob(
        [csvContent],
        {
          type: "text/csv;charset=utf-8;",
        }
      );

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download = `financeos-transactions-${new Date()
        .toISOString()
        .split("T")[0]}.csv`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      showToast(
        `${transactions.length} transactions exported successfully.`,
        "success"
      );
    } catch (error) {
      console.error(
        "CSV export error:",
        error
      );

      showToast(
        error.response?.data?.message ||
          "Failed to export transactions.",
        "error"
      );
    }
  };

  // -----------------------------
  // Export PDF
  // -----------------------------

  const exportPDF = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const [
        transactionsResponse,
        summaryResponse,
      ] = await Promise.all([
        axios.get(
          `${API_URL}/transactions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),

        axios.get(
          `${API_URL}/transactions/summary`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
      ]);

      const transactions =
        transactionsResponse.data;

      const summary =
        summaryResponse.data;

      if (!transactions.length) {
        showToast(
          "There are no transactions to export.",
          "error"
        );
        return;
      }

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      generatePDF(
        transactions,
        summary,
        user
      );

      showToast(
        "Financial report generated successfully.",
        "success"
      );
    } catch (error) {
      console.error(
        "PDF export error:",
        error
      );

      showToast(
        error.response?.data?.message ||
          "Failed to generate PDF report.",
        "error"
      );
    }
  };

  // -----------------------------
  // Clear transactions
  // -----------------------------

  const clearTransactionHistory = async () => {
    setIsClearing(true);

    try {
      const token =
        localStorage.getItem("token");

      const { data } = await axios.delete(
        `${API_URL}/transactions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowClearModal(false);

      showToast(
        `${data.deletedCount} transactions deleted successfully.`,
        "success"
      );

      window.dispatchEvent(
        new Event("transactionsCleared")
      );
    } catch (error) {
      console.error(
        "Clear transaction history error:",
        error
      );

      showToast(
        error.response?.data?.message ||
          "Failed to clear transaction history.",
        "error"
      );
    } finally {
      setIsClearing(false);
    }
  };

  // -----------------------------
  // Clear AI Chat
  // -----------------------------

  const clearChatHistory = () => {
    setIsClearingChat(true);

    localStorage.removeItem(
      "aiChatHistory"
    );

    window.dispatchEvent(
      new Event("aiChatCleared")
    );

    setShowChatModal(false);
    setIsClearingChat(false);

    showToast(
      "AI chat history cleared successfully.",
      "success"
    );
  };

  // -----------------------------
  // Sections
  // -----------------------------

  const sections = [
    {
      id: "appearance",
      label: "Appearance",
      icon: Palette,
    },
    {
      id: "account",
      label: "Account",
      icon: User,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "finance",
      label: "Finance",
      icon: Wallet,
    },
    {
      id: "ai",
      label: "AI Assistant",
      icon: Bot,
    },
    {
      id: "privacy",
      label: "Data & Privacy",
      icon: Shield,
    },
    {
      id: "about",
      label: "About",
      icon: Info,
    },
  ];

  // -----------------------------
  // Reusable Components
  // -----------------------------

  const Toggle = ({
    enabled,
    onChange,
  }) => (
    <button
      type="button"
      onClick={() =>
        onChange(!enabled)
      }
      className={`relative w-11 h-6 rounded-full transition-colors ${
        enabled
          ? "bg-[var(--accent)]"
          : "bg-gray-300 dark:bg-gray-700"
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
          enabled
            ? "translate-x-5"
            : ""
        }`}
      />
    </button>
  );

  const SettingRow = ({
    icon: Icon,
    title,
    description,
    children,
  }) => (
    <div className="flex items-center justify-between gap-6 py-5 border-b border-[var(--border)] last:border-b-0">
      <div className="flex items-center gap-4">
        <div className="text-[var(--accent)]">
          <Icon size={21} />
        </div>

        <div>
          <h3 className="font-medium text-[var(--text)]">
            {title}
          </h3>

          <p className="text-sm text-[var(--muted)] mt-1">
            {description}
          </p>
        </div>
      </div>

      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );

  const Card = ({ children }) => (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-7">
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Settings
          </h1>

          <p className="text-[var(--muted)] mt-2">
            Manage your FinanceOS preferences and account.
          </p>
        </div>

        {/* Navigation */}

        <div className="flex overflow-x-auto border border-[var(--border)] rounded-2xl p-2 mb-8">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <button
                key={section.id}
                onClick={() =>
                  setActiveSection(
                    section.id
                  )
                }
                className={`flex items-center gap-2 px-5 py-3 rounded-xl whitespace-nowrap transition ${
                  activeSection ===
                  section.id
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--muted)] hover:bg-[var(--card)]"
                }`}
              >
                <Icon size={18} />
                {section.label}
              </button>
            );
          })}
        </div>

        {/* Appearance */}

        {activeSection ===
          "appearance" && (
          <Card>
            <h2 className="text-2xl font-semibold mb-1">
              Appearance
            </h2>

            <p className="text-[var(--muted)] mb-6">
              Customize how FinanceOS looks.
            </p>

            <SettingRow
              icon={Palette}
              title="Theme"
              description="Choose your preferred interface theme."
            >
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (
                      theme !==
                      "light"
                    ) {
                      toggleTheme();
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    theme === "light"
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                      : "border-[var(--border)]"
                  }`}
                >
                  <Sun size={16} />
                  Light
                </button>

                <button
                  onClick={() => {
                    if (
                      theme !==
                      "dark"
                    ) {
                      toggleTheme();
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    theme === "dark"
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                      : "border-[var(--border)]"
                  }`}
                >
                  <Moon size={16} />
                  Dark
                </button>

                <button
                  disabled
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] opacity-50 cursor-not-allowed"
                >
                  <Monitor size={16} />
                  System
                </button>
              </div>
            </SettingRow>

            <SettingRow
              icon={Palette}
              title="Accent Color"
              description="Choose your preferred accent color."
            >
              <div className="flex gap-2">
                {[
                  "blue",
                  "purple",
                  "green",
                  "cyan",
                  "pink",
                ].map((color) => (
                  <button
                    key={color}
                    onClick={() =>
                      setAccentColor(
                        color
                      )
                    }
                    className={`w-8 h-8 rounded-full border-2 ${
                      accentColor ===
                      color
                        ? "border-[var(--text)]"
                        : "border-transparent"
                    }`}
                    style={{
                      background:
                        color ===
                        "blue"
                          ? "#2563eb"
                          : color ===
                            "purple"
                          ? "#9333ea"
                          : color ===
                            "green"
                          ? "#16a34a"
                          : color ===
                            "cyan"
                          ? "#0891b2"
                          : "#db2777",
                    }}
                  />
                ))}
              </div>
            </SettingRow>
          </Card>
        )}

        {/* Account */}

        {activeSection ===
          "account" && (
          <Card>
            <h2 className="text-2xl font-semibold mb-1">
              Account
            </h2>

            <p className="text-[var(--muted)] mb-6">
              Manage your account information and security.
            </p>

            <SettingRow
              icon={User}
              title="Profile"
              description="Manage your personal profile information."
            >
              <button
                onClick={() =>
                  showToast(
                    "Profile editing will be connected next.",
                    "error"
                  )
                }
                className="px-5 py-2 rounded-lg bg-[var(--accent)] text-white"
              >
                Edit Profile
              </button>
            </SettingRow>

            <SettingRow
              icon={Lock}
              title="Password"
              description="Change your FinanceOS account password."
            >
              <button
                onClick={() =>
                  showToast(
                    "Password change will be connected next.",
                    "error"
                  )
                }
                className="px-5 py-2 rounded-lg border border-[var(--border)]"
              >
                Change Password
              </button>
            </SettingRow>

            <SettingRow
              icon={Trash2}
              title="Delete Account"
              description="Permanently delete your FinanceOS account."
            >
              <button
                onClick={() =>
                  showToast(
                    "Account deletion will be connected next.",
                    "error"
                  )
                }
                className="px-5 py-2 rounded-lg border border-red-500/30 text-red-500"
              >
                Delete Account
              </button>
            </SettingRow>
          </Card>
        )}

        {/* Notifications */}

        {activeSection ===
          "notifications" && (
          <Card>
            <h2 className="text-2xl font-semibold mb-1">
              Notifications
            </h2>

            <p className="text-[var(--muted)] mb-6">
              Control your FinanceOS notifications.
            </p>

            <SettingRow
              icon={Bell}
              title="Notifications"
              description="Receive FinanceOS notifications."
            >
              <Toggle
                enabled={
                  notifications
                }
                onChange={
                  setNotifications
                }
              />
            </SettingRow>

            <SettingRow
              icon={Wallet}
              title="Budget Alerts"
              description="Get notified when you're approaching your budget."
            >
              <Toggle
                enabled={
                  budgetAlerts
                }
                onChange={
                  setBudgetAlerts
                }
              />
            </SettingRow>

            <SettingRow
              icon={Database}
              title="Monthly Summary"
              description="Receive a summary of your monthly finances."
            >
              <Toggle
                enabled={
                  monthlySummary
                }
                onChange={
                  setMonthlySummary
                }
              />
            </SettingRow>
          </Card>
        )}

        {/* Finance */}

        {activeSection ===
          "finance" && (
          <Card>
            <h2 className="text-2xl font-semibold mb-1">
              Finance
            </h2>

            <p className="text-[var(--muted)] mb-6">
              Configure your financial preferences.
            </p>

            <SettingRow
              icon={IndianRupee}
              title="Currency"
              description="Choose your preferred currency."
            >
              <select
                value={currency}
                onChange={(e) =>
                  setCurrency(
                    e.target.value
                  )
                }
                className="px-4 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)] outline-none"
              >
                <option value="INR">
                  INR - ₹
                </option>

                <option value="USD">
                  USD - $
                </option>

                <option value="EUR">
                  EUR - €
                </option>
              </select>
            </SettingRow>

            <SettingRow
              icon={Wallet}
              title="Monthly Budget"
              description="Set your monthly spending budget."
            >
              <input
                type="number"
                min="0"
                value={monthlyBudget}
                onChange={(e) =>
                  setMonthlyBudget(
                    e.target.value
                  )
                }
                placeholder="e.g. 30000"
                className="w-40 px-4 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)] outline-none"
              />
            </SettingRow>

            <SettingRow
              icon={Target}
              title="Savings Goal"
              description="Set your target savings amount."
            >
              <input
                type="number"
                min="0"
                value={savingsGoal}
                onChange={(e) =>
                  setSavingsGoal(
                    e.target.value
                  )
                }
                placeholder="e.g. 100000"
                className="w-40 px-4 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)] outline-none"
              />
            </SettingRow>
          </Card>
        )}

        {/* AI Assistant */}

        {activeSection ===
          "ai" && (
          <Card>
            <h2 className="text-2xl font-semibold mb-1">
              AI Assistant
            </h2>

            <p className="text-[var(--muted)] mb-6">
              Customize your FinanceOS AI experience.
            </p>

            <SettingRow
              icon={Bot}
              title="AI Insights"
              description="Allow AI-powered financial insights."
            >
              <Toggle
                enabled={aiInsights}
                onChange={
                  setAiInsights
                }
              />
            </SettingRow>

            <SettingRow
              icon={Bot}
              title="Response Style"
              description="Choose how the AI assistant responds."
            >
              <select
                value={responseStyle}
                onChange={(e) =>
                  setResponseStyle(
                    e.target.value
                  )
                }
                className="px-4 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)] outline-none"
              >
                <option value="Concise">
                  Concise
                </option>

                <option value="Balanced">
                  Balanced
                </option>

                <option value="Detailed">
                  Detailed
                </option>
              </select>
            </SettingRow>

            <SettingRow
              icon={Trash2}
              title="Clear Chat"
              description="Delete your saved AI conversation history."
            >
              <button
                onClick={() =>
                  setShowChatModal(
                    true
                  )
                }
                className="px-5 py-2 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition"
              >
                Clear Chat
              </button>
            </SettingRow>
          </Card>
        )}

        {/* Data & Privacy */}

        {activeSection ===
          "privacy" && (
          <Card>
            <h2 className="text-2xl font-semibold mb-1">
              Data & Privacy
            </h2>

            <p className="text-[var(--muted)] mb-6">
              Manage your FinanceOS financial data.
            </p>

            <SettingRow
              icon={Download}
              title="Export Transactions"
              description="Download your transaction history."
            >
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-purple-600 text-white hover:opacity-90 transition"
              >
                <Download
                  size={17}
                />
                Export CSV
              </button>
            </SettingRow>

            <SettingRow
              icon={Download}
              title="Financial Report"
              description="Generate a PDF report of your finances."
            >
              <button
                onClick={exportPDF}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-green-600 text-white hover:opacity-90 transition"
              >
                <Download
                  size={17}
                />
                Export PDF
              </button>
            </SettingRow>

            <SettingRow
              icon={Trash2}
              title="Clear Transaction History"
              description="Permanently remove your transactions."
            >
              <button
                onClick={() =>
                  setShowClearModal(
                    true
                  )
                }
                className="flex items-center gap-2 px-5 py-2 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition"
              >
                <Trash2
                  size={17}
                />
                Clear Data
              </button>
            </SettingRow>
          </Card>
        )}

        {/* About */}

        {activeSection ===
          "about" && (
          <Card>
            <h2 className="text-2xl font-semibold mb-1">
              About
            </h2>

            <p className="text-[var(--muted)] mb-6">
              Information about FinanceOS.
            </p>

            <SettingRow
              icon={Info}
              title="Version"
              description="Current FinanceOS version."
            >
              <span className="text-[var(--muted)]">
                1.0.0
              </span>
            </SettingRow>

            <SettingRow
              icon={Bot}
              title="AI Engine"
              description="AI technology powering FinanceOS."
            >
              <span className="text-[var(--muted)]">
                Gemini 2.5 Flash
              </span>
            </SettingRow>

            <SettingRow
              icon={Database}
              title="Platform"
              description="FinanceOS platform."
            >
              <span className="text-[var(--muted)]">
                FinanceOS Web
              </span>
            </SettingRow>
          </Card>
        )}
      </div>

      {/* Toast Notification */}

      {toast && (
        <div className="fixed top-6 right-6 z-[70] w-[350px]">
          <div
            className={`flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md ${
              toast.type ===
              "success"
                ? "bg-green-500/10 border-green-500/30"
                : "bg-red-500/10 border-red-500/30"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                toast.type ===
                "success"
                  ? "bg-green-500/15 text-green-500"
                  : "bg-red-500/15 text-red-500"
              }`}
            >
              {toast.type ===
              "success"
                ? "✓"
                : "!"}
            </div>

            <div className="flex-1">
              <p
                className={`text-sm font-semibold ${
                  toast.type ===
                  "success"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {toast.type ===
                "success"
                  ? "Success"
                  : "Something went wrong"}
              </p>

              <p className="text-sm text-[var(--muted)] mt-1">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() =>
                setToast(null)
              }
              className="text-[var(--muted)] hover:text-[var(--text)] text-lg"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Clear Transactions Modal */}

      {showClearModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              if (!isClearing) {
                setShowClearModal(
                  false
                );
              }
            }}
          />

          <div className="relative w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-2xl p-7">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-5">
              <Trash2
                size={23}
                className="text-red-500"
              />
            </div>

            <h3 className="text-xl font-semibold text-[var(--text)]">
              Clear transaction history?
            </h3>

            <p className="text-sm text-[var(--muted)] mt-2 leading-6">
              This will permanently
              delete all of your
              transactions. This
              action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-7">
              <button
                type="button"
                disabled={isClearing}
                onClick={() =>
                  setShowClearModal(
                    false
                  )
                }
                className="px-5 py-2.5 rounded-xl border border-[var(--border)] text-[var(--text)] hover:bg-[var(--card)] transition disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isClearing}
                onClick={
                  clearTransactionHistory
                }
                className="px-5 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50 flex items-center gap-2"
              >
                {isClearing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Clearing...
                  </>
                ) : (
                  <>
                    <Trash2
                      size={16}
                    />
                    Clear Data
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear AI Chat Modal */}

      {showChatModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              if (!isClearingChat) {
                setShowChatModal(
                  false
                );
              }
            }}
          />

          <div className="relative w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-2xl p-7">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-5">
              <Trash2
                size={23}
                className="text-red-500"
              />
            </div>

            <h3 className="text-xl font-semibold text-[var(--text)]">
              Clear AI chat history?
            </h3>

            <p className="text-sm text-[var(--muted)] mt-2 leading-6">
              Your saved FinanceOS AI
              conversation history will
              be permanently removed.
            </p>

            <div className="flex justify-end gap-3 mt-7">
              <button
                type="button"
                disabled={
                  isClearingChat
                }
                onClick={() =>
                  setShowChatModal(
                    false
                  )
                }
                className="px-5 py-2.5 rounded-xl border border-[var(--border)] text-[var(--text)] hover:bg-[var(--card)] transition disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={
                  isClearingChat
                }
                onClick={
                  clearChatHistory
                }
                className="px-5 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50 flex items-center gap-2"
              >
                {isClearingChat ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Clearing...
                  </>
                ) : (
                  <>
                    <Trash2
                      size={16}
                    />
                    Clear Chat
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;