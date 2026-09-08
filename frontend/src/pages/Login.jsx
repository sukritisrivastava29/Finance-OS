import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import { API_URL } from "../config";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const passwordRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast.success("Welcome back!");

      navigate("/dashboard");
    } catch (error) {
  const status = error.response?.status;
  const message = error.response?.data?.message;

  if (status === 404) {
    toast.error(
      (t) => (
        <div className="flex items-center gap-3">
          <span>
            User doesn't exist. Please create an account.
          </span>

          <button
            onClick={() => {
              toast.dismiss(t.id);
              navigate("/signup");
            }}
            className="font-semibold text-[var(--primary)] hover:underline whitespace-nowrap"
          >
            Create Account
          </button>
        </div>
      ),
      {
        duration: 5000,
      }
    );
  } else {
    toast.error(
      message || "Invalid email or password"
    );
  }

  console.error(error);
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-theme min-h-screen flex items-center justify-center px-6">
      <div className="card-theme w-full max-w-md rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold mb-2">
          Welcome Back
        </h1>

        <p className="text-muted mb-6">
          Login to your FinanceOS account.
        </p>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                passwordRef.current?.focus();
              }
            }}
            className="input-theme"
          />

          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="input-theme"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading
                ? "secondary-btn cursor-not-allowed"
                : "primary-btn"
            } py-3 rounded-xl font-semibold transition`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-muted text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[var(--primary)] hover:opacity-80 transition"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;