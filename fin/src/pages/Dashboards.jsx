
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";


function Dashboards() {
 const [transactions, setTransactions] = useState([]);
 const token=localStorage.getItem("token");
 const user = JSON.parse(
  localStorage.getItem("user")
);
  const [summary, setSummary] = useState({
  income: 0,
  expense: 0,
  balance: 0,
});

useEffect(() => {
  fetchSummary();
  fetchTransactions();
}, []);
const API_URL = "http://localhost:8000";

const fetchTransactions = async () => {
  try {
    const { data } = await axios.get(
      `${API_URL}/transactions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTransactions(data);
  } catch (error) {
    console.log(error);
  }
};

const fetchSummary = async () => {
  try {
    const { data } = await axios.get(
      `${API_URL}/transactions/summary`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSummary(data);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <div className="flex-1 p-10">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Dashboard
            </h1>

           <p className="text-slate-400">
  Welcome back, {user?.name}
</p>
          </div>

          <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
            Add Transaction
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-slate-900 rounded-xl p-6">
            <p className="text-slate-400">
              Total Balance
            </p>

            <h2 className="text-3xl font-bold mt-2">
             ₹{summary.balance}
            </h2>

            <p className="text-green-400 mt-2">
              ↑ 12% from last month
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <p className="text-slate-400">
              Monthly Spending
            </p>

            <h2 className="text-3xl font-bold mt-2">
              ₹{summary.expense}
            </h2>

            <p className="text-red-400 mt-2">
              ↑ 5% from last month
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <p className="text-slate-400">
              Savings
            </p>

            <h2 className="text-3xl font-bold mt-2">
             ₹{summary.income}
            </h2>

            <p className="text-green-400 mt-2">
              ↑ 18% from last month
            </p>
          </div>

        </div>

        {/* Recent Transactions */}
        <div className="bg-slate-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Recent Transactions
          </h2>

          <div className="space-y-4">
  {transactions.map((transaction) => (
    <div
      key={transaction._id}
      className="flex justify-between"
    >
      <p>{transaction.title}</p>

      <p
        className={
          transaction.type === "income"
            ? "text-green-400"
            : "text-red-400"
        }
      >
        {transaction.type === "income" ? "+" : "-"}₹
        {transaction.amount}
      </p>
    </div>
  ))}
</div>
        </div>

       
        
      </div>
    </div>
  );
}

export default Dashboards;