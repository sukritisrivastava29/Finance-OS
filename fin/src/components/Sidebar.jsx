import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-slate-900 p-6">

      <h1 className="text-2xl font-bold mb-10">
        FinanceOS
      </h1>

      <div className="flex flex-col gap-3">

        <NavLink
          to="/dashboard"
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

      </div>
    </div>
  );
}

export default Sidebar;