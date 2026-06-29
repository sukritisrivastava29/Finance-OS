import { NavLink } from "react-router-dom";

function Sidebar() {
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/";
};
  return (
   <div className="w-64 min-h-screen bg-slate-900 p-6 flex flex-col">

      <h1 className="text-2xl font-bold mb-10">
        FinanceOS
      </h1>

     <div className="flex flex-col gap-3 flex-1">

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
  );
}

export default Sidebar;