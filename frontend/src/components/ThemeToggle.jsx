import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="icon-btn p-2 text-[var(--text)] hover:bg-[var(--surface)]"
      title={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
    >
      {isDark ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
}