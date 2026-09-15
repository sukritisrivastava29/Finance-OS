import { useEffect, useState } from "react";
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

function Settings() {
  const [activeSection, setActiveSection] = useState("appearance");
  const { theme, toggleTheme } = useTheme();

  const getStored = (key, fallback) => {
    const value = localStorage.getItem(key);

    if (value === null) return fallback;

    try {
      return JSON.parse(value);
    } catch {
      return value;
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
    localStorage.getItem("accentColor") || "blue"
  );

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("budgetAlerts", JSON.stringify(budgetAlerts));
  }, [budgetAlerts]);

  useEffect(() => {
    localStorage.setItem(
      "monthlySummary",
      JSON.stringify(monthlySummary)
    );
  }, [monthlySummary]);

  useEffect(() => {
    localStorage.setItem("aiInsights", JSON.stringify(aiInsights));
  }, [aiInsights]);

  useEffect(() => {
    localStorage.setItem("currency", currency);
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
    localStorage.setItem("responseStyle", responseStyle);
  }, [responseStyle]);

  useEffect(() => {
    localStorage.setItem("accentColor", accentColor);
    document.documentElement.setAttribute(
      "data-accent",
      accentColor
    );
  }, [accentColor]);

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

  const Toggle = ({ enabled, onChange }) => (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-11 rounded-full transition ${
        enabled ? "bg-[var(--accent)]" : "bg-gray-600"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
          enabled ? "left-6" : "left-1"
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
    <div className="flex flex-col gap-4 border-b border-white/10 py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/10">
          <Icon
            size={19}
            className="text-[var(--accent)]"
          />
        </div>

        <div>
          <p className="font-medium">{title}</p>

          <p className="mt-1 text-sm opacity-60">
            {description}
          </p>
        </div>
      </div>

      <div className="sm:ml-6">{children}</div>
    </div>
  );

  const Card = ({ title, description, children }) => (
    <div className="surface rounded-2xl border p-6">
      <div className="mb-2">
        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <p className="mt-1 text-sm opacity-60">
          {description}
        </p>
      </div>

      {children}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "appearance":
        return (
          <Card
            title="Appearance"
            description="Customize how FinanceOS looks."
          >
            <SettingRow
              icon={Palette}
              title="Theme"
              description={`Currently using ${
                theme === "dark" ? "dark" : "light"
              } mode.`}
            >
              <div className="flex rounded-xl border border-white/10 p-1">
                <button
                  type="button"
                  onClick={() => {
                    if (theme !== "light") toggleTheme();
                  }}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                    theme === "light"
                      ? "bg-[var(--accent)] text-white"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Sun size={15} />
                  Light
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (theme !== "dark") toggleTheme();
                  }}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                    theme === "dark"
                      ? "bg-[var(--accent)] text-white"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Moon size={15} />
                  Dark
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm opacity-60 transition hover:opacity-100"
                  disabled
                  title="System theme will be added later"
                >
                  <Monitor size={15} />
                  System
                </button>
              </div>
            </SettingRow>

            <SettingRow
              icon={Palette}
              title="Accent Color"
              description="Choose the accent used across FinanceOS."
            >
              <div className="flex gap-3">
                {[
                  {
                    name: "blue",
                    color: "bg-blue-500",
                  },
                  {
                    name: "purple",
                    color: "bg-purple-500",
                  },
                  {
                    name: "green",
                    color: "bg-green-500",
                  },
                  {
                    name: "cyan",
                    color: "bg-cyan-500",
                  },
                  {
                    name: "pink",
                    color: "bg-pink-500",
                  },
                ].map((accent) => (
                  <button
                    key={accent.name}
                    type="button"
                    onClick={() =>
                      setAccentColor(accent.name)
                    }
                    aria-label={`Set ${accent.name} accent color`}
                    className={`h-7 w-7 rounded-full ${
                      accent.color
                    } transition hover:scale-110 ${
                      accentColor === accent.name
                        ? "scale-110 ring-2 ring-blue-500 ring-offset-2 ring-offset-[var(--background)]"
                        : ""
                    }`}
                  />
                ))}
              </div>
            </SettingRow>
          </Card>
        );

      case "account":
        return (
          <Card
            title="Account"
            description="Manage your FinanceOS account."
          >
            <SettingRow
              icon={User}
              title="Profile"
              description="Update your name, email and avatar."
            >
              <button
                type="button"
                className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm text-white transition hover:opacity-90"
                onClick={() =>
                  alert("Profile editing will be connected next.")
                }
              >
                Edit Profile
              </button>
            </SettingRow>

            <SettingRow
              icon={Lock}
              title="Password"
              description="Change your account password."
            >
              <button
                type="button"
                className="rounded-lg border border-white/10 px-4 py-2 text-sm transition hover:bg-white/5"
                onClick={() =>
                  alert("Password change will be connected next.")
                }
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
                type="button"
                className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                onClick={() => {
                  const confirmed = window.confirm(
                    "Are you sure you want to permanently delete your account?"
                  );

                  if (confirmed) {
                    alert(
                      "Account deletion will be connected next."
                    );
                  }
                }}
              >
                Delete Account
              </button>
            </SettingRow>
          </Card>
        );

      case "notifications":
        return (
          <Card
            title="Notifications"
            description="Control the alerts you receive."
          >
            <SettingRow
              icon={Bell}
              title="Notifications"
              description="Enable FinanceOS notifications."
            >
              <Toggle
                enabled={notifications}
                onChange={setNotifications}
              />
            </SettingRow>

            <SettingRow
              icon={Wallet}
              title="Budget Alerts"
              description="Get notified when you're close to your budget."
            >
              <Toggle
                enabled={budgetAlerts}
                onChange={setBudgetAlerts}
              />
            </SettingRow>

            <SettingRow
              icon={Database}
              title="Monthly Summary"
              description="Receive a summary of your monthly finances."
            >
              <Toggle
                enabled={monthlySummary}
                onChange={setMonthlySummary}
              />
            </SettingRow>
          </Card>
        );

      case "finance":
        return (
          <Card
            title="Finance Preferences"
            description="Customize your financial tracking."
          >
            <SettingRow
              icon={IndianRupee}
              title="Currency"
              description="Default currency used throughout FinanceOS."
            >
              <select
                value={currency}
                onChange={(e) =>
                  setCurrency(e.target.value)
                }
                className="rounded-lg border border-white/10 bg-transparent px-4 py-2 text-sm outline-none"
              >
                <option
                  value="INR"
                  className="bg-slate-900"
                >
                  ₹ INR — Indian Rupee
                </option>

                <option
                  value="USD"
                  className="bg-slate-900"
                >
                  $ USD — US Dollar
                </option>

                <option
                  value="EUR"
                  className="bg-slate-900"
                >
                  € EUR — Euro
                </option>
              </select>
            </SettingRow>

            <SettingRow
              icon={Wallet}
              title="Monthly Budget"
              description="Set your monthly spending limit."
            >
              <div className="flex items-center rounded-lg border border-white/10 px-3">
                <span className="opacity-60">
                  {currency === "INR"
                    ? "₹"
                    : currency === "USD"
                    ? "$"
                    : "€"}
                </span>

                <input
                  type="number"
                  value={monthlyBudget}
                  onChange={(e) =>
                    setMonthlyBudget(e.target.value)
                  }
                  placeholder="50,000"
                  className="w-24 bg-transparent px-2 py-2 text-sm outline-none"
                />
              </div>
            </SettingRow>

            <SettingRow
              icon={Target}
              title="Savings Goal"
              description="Set your monthly savings target."
            >
              <div className="flex items-center rounded-lg border border-white/10 px-3">
                <span className="opacity-60">
                  {currency === "INR"
                    ? "₹"
                    : currency === "USD"
                    ? "$"
                    : "€"}
                </span>

                <input
                  type="number"
                  value={savingsGoal}
                  onChange={(e) =>
                    setSavingsGoal(e.target.value)
                  }
                  placeholder="10,000"
                  className="w-24 bg-transparent px-2 py-2 text-sm outline-none"
                />
              </div>
            </SettingRow>
          </Card>
        );

      case "ai":
        return (
          <Card
            title="AI Assistant"
            description="Customize your FinanceOS AI experience."
          >
            <SettingRow
              icon={Bot}
              title="AI Insights"
              description="Allow FinanceOS to generate financial insights."
            >
              <Toggle
                enabled={aiInsights}
                onChange={setAiInsights}
              />
            </SettingRow>

            <SettingRow
              icon={Bot}
              title="Response Style"
              description="Choose how detailed AI responses should be."
            >
              <select
                value={responseStyle}
                onChange={(e) =>
                  setResponseStyle(e.target.value)
                }
                className="rounded-lg border border-white/10 bg-transparent px-4 py-2 text-sm outline-none"
              >
                <option
                  value="Concise"
                  className="bg-slate-900"
                >
                  Concise
                </option>

                <option
                  value="Balanced"
                  className="bg-slate-900"
                >
                  Balanced
                </option>

                <option
                  value="Detailed"
                  className="bg-slate-900"
                >
                  Detailed
                </option>
              </select>
            </SettingRow>

            <SettingRow
              icon={Trash2}
              title="Clear Chat History"
              description="Clear your FinanceOS AI conversation."
            >
              <button
                type="button"
                className="rounded-lg border border-white/10 px-4 py-2 text-sm transition hover:bg-white/5"
                onClick={() => {
                  localStorage.removeItem("aiChatHistory");
                  window.dispatchEvent(
                    new Event("aiChatCleared")
                  );
                }}
              >
                Clear Chat
              </button>
            </SettingRow>
          </Card>
        );

      case "privacy":
        return (
          <Card
            title="Data & Privacy"
            description="Manage your FinanceOS financial data."
          >
            <SettingRow
              icon={Download}
              title="Export Transactions"
              description="Download your transaction history."
            >
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm text-white transition hover:bg-purple-700"
              >
                <Download size={15} />
                Export CSV
              </button>
            </SettingRow>

            <SettingRow
              icon={Download}
              title="Financial Report"
              description="Generate a PDF report of your finances."
            >
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm text-white transition hover:bg-green-700"
              >
                <Download size={15} />
                Export PDF
              </button>
            </SettingRow>

            <SettingRow
              icon={Trash2}
              title="Clear Transaction History"
              description="Permanently remove your transactions."
            >
              <button
                type="button"
                className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                onClick={() => {
                  const confirmed = window.confirm(
                    "Are you sure you want to clear all transaction history?"
                  );

                  if (confirmed) {
                    alert(
                      "Transaction deletion will be connected next."
                    );
                  }
                }}
              >
                Clear Data
              </button>
            </SettingRow>
          </Card>
        );

      case "about":
        return (
          <Card
            title="About FinanceOS"
            description="Your personal financial command center."
          >
            <div className="rounded-xl border border-white/10 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                  <Wallet
                    className="text-[var(--accent)]"
                    size={24}
                  />
                </div>

                <div>
                  <h3 className="font-semibold">
                    FinanceOS
                  </h3>

                  <p className="text-sm opacity-60">
                    Personal Finance Management Platform
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-60">
                    Version
                  </span>

                  <span>1.0.0</span>
                </div>

                <div className="flex justify-between">
                  <span className="opacity-60">
                    AI Engine
                  </span>

                  <span>Gemini 2.5 Flash</span>
                </div>

                <div className="flex justify-between">
                  <span className="opacity-60">
                    Platform
                  </span>

                  <span>FinanceOS Web</span>
                </div>
              </div>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="px-5 py-8 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Settings
          </h1>

          <p className="mt-2 text-sm opacity-60">
            Manage your FinanceOS preferences and account.
          </p>
        </div>

        <div className="surface mb-6 overflow-x-auto rounded-2xl border p-2">
          <div className="flex min-w-max gap-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const active =
                activeSection === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() =>
                    setActiveSection(section.id)
                  }
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm transition ${
                    active
                      ? "bg-[var(--accent)] text-white"
                      : "opacity-60 hover:bg-white/5 hover:opacity-100"
                  }`}
                >
                  <Icon size={16} />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}

export default Settings;