import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function Signup() {
  const navigate = useNavigate();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const handleSubmit = async () => {
  try {
    await axios.post(
      "http://localhost:8000/auth/register",
      {
        name,
        email,
        password,
      }
    );

    navigate("/login");
  } catch (error) {
    console.log(error);
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

        <div className="space-y-4">

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
          <button
  onClick={handleSubmit}
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

        </div>

      </div>

    </div>
  );
}

export default Signup;