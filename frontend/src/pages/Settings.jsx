import { useEffect, useState } from "react";
import {
  Sun,
  Moon,
  Monitor,
  Palette,
  User,
  Bell,
  DollarSign,
  LogOut,
  RotateCcw,
  Save,
  Check,
  Settings as SettingsIcon,
  Shield,
  Layout,
} from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

function SettingRow({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-5 border-b border-[var(--border)] last:border-b-0">
      <div className="flex items-start gap-4 min-w-0">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--surface)] border border-[var(--border)] shrink-0">
          {Icon && <Icon size={19} className="text-[var(--accent)]" />}
        </div>

        <div className="min-w-0">
          <h3 className="font-medium text-[var(--text)]">
            {title}
          </h3>

          {description && (
            <p className="text-sm text-[var(--muted)] mt-1">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="shrink-0">
        {children}
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition ${
        checked
          ? "bg-[var(--accent)]"
          : "bg-[var(--border)]"
      }`}
      aria-label={checked ? "Disable" : "Enable"}
    >
      <span
        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
          checked ? "left-7" : "left-1"
        }`}
      />
    </button>
  );
}

export default function Settings() {
  const { theme, setTheme } = useTheme();

  const [name, setName] = useState(
    localStorage.getItem("profileName") || ""
  );

  const [email, setEmail] = useState(
    localStorage.getItem("profileEmail") || ""
  );

  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "INR"
  );

  const [accent, setAccent] = useState(
    localStorage.getItem("accent") || "blue"
  );

  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") !== "false"
  );

  const [compactMode, setCompactMode] = useState(
    localStorage.getItem("compactMode") === "true"
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-accent",
      accent
    );

    localStorage.setItem("accent", accent);
  }, [accent]);

  useEffect(() => {
    localStorage.setItem(
      "notifications",
      notifications
    );
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(
      "compactMode",
      compactMode
    );

    document.documentElement.setAttribute(
      "data-compact",
      compactMode ? "true" : "false"
    );
  }, [compactMode]);

  const saveProfile = () => {
    localStorage.setItem("profileName", name);
    localStorage.setItem("profileEmail", email);

    toast.success("Profile settings saved");
  };

  const saveCurrency = () => {
    localStorage.setItem("currency", currency);

    toast.success("Currency updated");
  };

  const resetSettings = () => {
    const confirmed = window.confirm(
      "Reset all FinanceOS settings to their defaults?"
    );

    if (!confirmed) return;

    localStorage.removeItem("theme");
    localStorage.removeItem("accent");
    localStorage.removeItem("currency");
    localStorage.removeItem("notifications");
    localStorage.removeItem("compactMode");
    localStorage.removeItem("profileName");
    localStorage.removeItem("profileEmail");

    setTheme("dark");
    setAccent("blue");
    setCurrency("INR");
    setNotifications(true);
    setCompactMode(false);
    setName("");
    setEmail("");

    toast.success("Settings reset");
  };

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div className="app-theme min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <SettingsIcon
              size={28}
              className="text-[var(--accent)]"
            />

            <h1 className="text-3xl font-bold text-[var(--text)]">
              Settings
            </h1>
          </div>

          <p className="text-[var(--muted)]">
            Manage your FinanceOS preferences and account.
          </p>
        </div>

        {/* Appearance */}
        <section className="card-theme rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Palette
              size={20}
              className="text-[var(--accent)]"
            />

            <h2 className="text-xl font-semibold text-[var(--text)]">
              Appearance
            </h2>
          </div>

          <p className="text-sm text-[var(--muted)] mb-4">
            Customize how FinanceOS looks.
          </p>

          <SettingRow
            icon={Palette}
            title="Theme"
            description="Choose your preferred appearance."
          >
            <div className="flex flex-wrap gap-2 justify-end">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                  theme === "light"
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                    : "border-[var(--border)] text-[var(--text)] hover:bg-[var(--surface)]"
                }`}
              >
                <Sun size={16} />
                Light
              </button>

              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                  theme === "dark"
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                    : "border-[var(--border)] text-[var(--text)] hover:bg-[var(--surface)]"
                }`}
              >
                <Moon size={16} />
                Dark
              </button>

              <button
                type="button"
                onClick={() => setTheme("system")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                  theme === "system"
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                    : "border-[var(--border)] text-[var(--text)] hover:bg-[var(--surface)]"
                }`}
              >
                <Monitor size={16} />
                System
              </button>
            </div>
          </SettingRow>

          <SettingRow
            icon={Palette}
            title="Accent color"
            description="Choose your interface accent."
          >
            <div className="flex gap-2">
              {[
                ["blue", "#3b82f6"],
                ["purple", "#8b5cf6"],
                ["green", "#22c55e"],
                ["cyan", "#06b6d4"],
                ["pink", "#ec4899"],
              ].map(([value, color]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAccent(value)}
                  className={`w-8 h-8 rounded-full border-2 transition ${
                    accent === value
                      ? "border-[var(--text)] scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                  title={value}
                  aria-label={`Use ${value} accent`}
                >
                  {accent === value && (
                    <Check
                      size={16}
                      className="text-white mx-auto"
                    />
                  )}
                </button>
              ))}
            </div>
          </SettingRow>

          <SettingRow
            icon={Layout}
            title="Compact mode"
            description="Reduce spacing throughout the interface."
          >
            <Toggle
              checked={compactMode}
              onChange={setCompactMode}
            />
          </SettingRow>
        </section>

        {/* Profile */}
        <section className="card-theme rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <User
              size={20}
              className="text-[var(--accent)]"
            />

            <h2 className="text-xl font-semibold text-[var(--text)]">
              Profile
            </h2>
          </div>

          <p className="text-sm text-[var(--muted)] mb-4">
            Update your personal information.
          </p>

          <SettingRow
            icon={User}
            title="Name"
            description="Your display name."
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="input-theme max-w-xs"
            />
          </SettingRow>

          <SettingRow
            icon={User}
            title="Email"
            description="Your account email."
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input-theme max-w-xs"
            />
          </SettingRow>

          <div className="pt-5 flex justify-end">
            <button
              type="button"
              onClick={saveProfile}
              className="primary-btn flex items-center gap-2 px-5 py-2.5 rounded-lg"
            >
              <Save size={17} />
              Save profile
            </button>
          </div>
        </section>

        {/* Finance */}
        <section className="card-theme rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign
              size={20}
              className="text-[var(--accent)]"
            />

            <h2 className="text-xl font-semibold text-[var(--text)]">
              Finance
            </h2>
          </div>

          <p className="text-sm text-[var(--muted)] mb-4">
            Configure your financial preferences.
          </p>

          <SettingRow
            icon={DollarSign}
            title="Currency"
            description="Used when displaying financial amounts."
          >
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="input-theme max-w-xs"
            >
              <option value="INR">₹ Indian Rupee (INR)</option>
              <option value="USD">$ US Dollar (USD)</option>
              <option value="EUR">€ Euro (EUR)</option>
              <option value="GBP">£ British Pound (GBP)</option>
              <option value="JPY">¥ Japanese Yen (JPY)</option>
            </select>
          </SettingRow>

          <div className="pt-5 flex justify-end">
            <button
              type="button"
              onClick={saveCurrency}
              className="primary-btn flex items-center gap-2 px-5 py-2.5 rounded-lg"
            >
              <Save size={17} />
              Save currency
            </button>
          </div>
        </section>

        {/* Notifications */}
        <section className="card-theme rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Bell
              size={20}
              className="text-[var(--accent)]"
            />

            <h2 className="text-xl font-semibold text-[var(--text)]">
              Notifications
            </h2>
          </div>

          <p className="text-sm text-[var(--muted)] mb-4">
            Control FinanceOS notifications.
          </p>

          <SettingRow
            icon={Bell}
            title="Notifications"
            description="Enable or disable app notifications."
          >
            <Toggle
              checked={notifications}
              onChange={setNotifications}
            />
          </SettingRow>
        </section>

        {/* Security */}
        <section className="card-theme rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield
              size={20}
              className="text-[var(--accent)]"
            />

            <h2 className="text-xl font-semibold text-[var(--text)]">
              Account
            </h2>
          </div>

          <p className="text-sm text-[var(--muted)] mb-4">
            Manage your FinanceOS account.
          </p>

          <SettingRow
            icon={LogOut}
            title="Logout"
            description="Sign out of your FinanceOS account."
          >
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </SettingRow>
        </section>

        {/* Reset */}
        <section className="card-theme rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <RotateCcw
              size={20}
              className="text-[var(--accent)]"
            />

            <h2 className="text-xl font-semibold text-[var(--text)]">
              Reset settings
            </h2>
          </div>

          <p className="text-sm text-[var(--muted)] mb-5">
            Restore FinanceOS settings to their default values.
          </p>

          <button
            type="button"
            onClick={resetSettings}
            className="secondary-btn flex items-center gap-2 px-5 py-2.5 rounded-lg"
          >
            <RotateCcw size={17} />
            Reset all settings
          </button>
        </section>

      </div>
    </div>
  );
}