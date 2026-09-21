import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav
      className="px-6 md:px-8 py-4 border-b"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-[var(--text)]"
        >
          FinanceOS
        </Link>

        <div className="flex items-center gap-3">

          <Link
            to="/dashboard"
            className="hidden sm:inline-flex text-sm text-[var(--muted)] hover:text-[var(--text)] transition"
          >
            Dashboard
          </Link>

          <Link
            to="/signup"
            className="primary-btn px-4 py-2 text-sm rounded-lg"
          >
            Get started
          </Link>

          <ThemeToggle />

        </div>

      </div>
    </nav>
  );
}

export default Navbar;