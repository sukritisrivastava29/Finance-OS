import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Transactions", path: "/transactions" },
  { name: "Insights", path: "/insights" },
  { name: "Profile", path: "/profile" },
];

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
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 surface border-b flex items-center justify-between px-5 z-50">
        <h1 className="text-xl font-bold">
          FinanceOS
        </h1>

        <button onClick={() => setOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

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
          surface
          border-r
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
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-active" : ""}`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="mt-auto pt-8">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 py-2 rounded-lg hover:bg-red-700 transition"
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