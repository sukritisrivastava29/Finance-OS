import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

import {
  Menu,
  X,
  Settings,
  LayoutDashboard,
  Receipt,
  Sparkles,
  User,
  Home,
  LogOut,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Transactions",
    path: "/transactions",
    icon: Receipt,
  },
  {
    name: "Insights",
    path: "/insights",
    icon: Sparkles,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
];

function Sidebar() {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  const closeSidebar = () => {
    setOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-[var(--accent)] text-white shadow-sm"
        : "text-muted hover:text-[var(--text)] hover:bg-[var(--card)]"
    }`;

  return (
    <>
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 surface border-b border-[var(--border)] flex items-center justify-between px-5 z-50">

        <Link
          to="/"
          className="text-xl font-bold text-theme"
        >
          FinanceOS
        </Link>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="icon-btn p-2 text-theme"
          aria-label="Open navigation"
        >
          <Menu size={25} />
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          top-0 left-0
          h-screen
          w-64
          surface
          border-r border-[var(--border)]
          p-5
          flex flex-col
          z-50
          transform
          transition-transform
          duration-300
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >

        {/* Brand */}
        <div className="flex items-center justify-between mb-8">

          <Link
            to="/"
            onClick={closeSidebar}
            className="group"
          >
            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center shadow-sm">
                <span className="text-white font-bold">
                  F
                </span>
              </div>

              <div>
                <h1 className="text-lg font-bold text-theme leading-none">
                  FinanceOS
                </h1>

                <p className="text-[10px] text-muted mt-1 tracking-wide">
                  PERSONAL FINANCE
                </p>
              </div>

            </div>
          </Link>

          <button
            type="button"
            onClick={closeSidebar}
            className="md:hidden icon-btn p-2 text-theme"
            aria-label="Close navigation"
          >
            <X size={22} />
          </button>

        </div>

        {/* Home */}
        <div className="mb-6">

          <p className="text-[11px] font-semibold tracking-wider text-muted uppercase px-3 mb-2">
            Main
          </p>

          <Link
            to="/"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-muted hover:text-[var(--text)] hover:bg-[var(--card)] transition-all duration-200"
          >
            <Home size={18} />
            <span className="font-medium">
              Home
            </span>
          </Link>

        </div>

        {/* Application navigation */}
        <nav className="flex flex-col gap-1.5 flex-1">

          <p className="text-[11px] font-semibold tracking-wider text-muted uppercase px-3 mb-2">
            Workspace
          </p>

          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeSidebar}
                className={linkClass}
              >
                <Icon size={18} />

                <span className="font-medium">
                  {link.name}
                </span>
              </NavLink>
            );
          })}

          <NavLink
            to="/settings"
            onClick={closeSidebar}
            className={linkClass}
          >
            <Settings size={18} />

            <span className="font-medium">
              Settings
            </span>
          </NavLink>

        </nav>

        {/* Bottom */}
        <div className="pt-5 border-t border-[var(--border)]">

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all duration-200 font-medium"
          >
            <LogOut size={17} />
            Logout
          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;