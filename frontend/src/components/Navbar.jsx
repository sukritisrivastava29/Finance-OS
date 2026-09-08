import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav
      className="flex justify-between items-center px-8 py-6 border-b"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <h1 className="text-2xl font-bold">
        FinanceOS
      </h1>

      <div className="flex items-center gap-4">
        <Link to="/dashboard">
          <button className="primary-btn px-4 py-2 rounded-lg">
            Open Dashboard
          </button>
        </Link>

        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;