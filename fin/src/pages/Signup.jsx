import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {
    try {
      setError("");

      await axios.post(
        `${API_URL}/auth/register`,
        {
          name,
          email,
          password,
        }
      );

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  return (

    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">

      <div className="bg-slate-900 p-8 rounded-xl w-full max-w-md">

        <h1 className="text-3xl font-bold mb-2">
          Create Account
        </h1>

        <p className="text-slate-400 mb-6">
          Start managing your finances today.
        </p>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        >

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 outline-none border border-slate-700"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 outline-none border border-slate-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 outline-none border border-slate-700"
          />
          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>

          <p className="text-slate-400 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300"
            >
              Login
            </Link>
          </p>
        </form>
      </div>

    </div>
  );
}

export default Signup;