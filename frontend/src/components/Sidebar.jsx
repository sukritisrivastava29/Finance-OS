import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const closeSidebar = () => setOpen(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-5 z-50">
        <h1 className="text-xl font-bold text-white">
          FinanceOS
        </h1>

        <button onClick={() => setOpen(true)}>
          <Menu className="text-white" size={28} />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static
          top-0 left-0
          h-screen
          w-64
          bg-slate-900
          p-6
          flex
          flex-col
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
        {/* Mobile Close */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold">
            FinanceOS
          </h1>

          <button
            onClick={closeSidebar}
            className="md:hidden"
          >
            <X size={26} />
          </button>
        </div>

        <div className="flex flex-col gap-3 flex-1">
          <NavLink
            to="/dashboard"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `p-3 rounded-lg transition ${
                isActive
                  ? "bg-slate-800"
                  : "hover:bg-slate-800"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/transactions"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `p-3 rounded-lg transition ${
                isActive
                  ? "bg-slate-800"
                  : "hover:bg-slate-800"
              }`
            }
          >
            Transactions
          </NavLink>

          <NavLink
            to="/insights"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `p-3 rounded-lg transition ${
                isActive
                  ? "bg-slate-800"
                  : "hover:bg-slate-800"
              }`
            }
          >
            Insights
          </NavLink>

          <NavLink
            to="/profile"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `p-3 rounded-lg transition ${
                isActive
                  ? "bg-slate-800"
                  : "hover:bg-slate-800"
              }`
            }
          >
            Profile
          </NavLink>

          <div className="mt-auto pt-8">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;