import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-6">
      <h1 className="text-2xl font-bold">
        FinanceOS
      </h1>
      <Link to="/dashboard">
       <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
        Open Dashboard
      </button>
      </Link>
    </nav>
  );
}

export default Navbar;