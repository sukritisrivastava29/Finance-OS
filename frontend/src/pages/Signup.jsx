import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import { API_URL } from "../config";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      toast.success("Account created successfully!");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-theme min-h-screen flex items-center justify-center px-6">
      <div className="card-theme w-full max-w-md rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold mb-2">
          Create Account
        </h1>

        <p className="text-muted mb-6">
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
            onChange={(e) =>
              setName(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                emailRef.current?.focus();
              }
            }}
            className="input-theme"
          />

          <input
            ref={emailRef}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
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
            className={`w-full py-3 rounded-xl font-semibold transition ${
              loading
                ? "secondary-btn cursor-not-allowed"
                : "primary-btn"
            }`}
          >
            {loading
              ? "Creating Account..."
              : "Sign Up"}
          </button>

          <p className="text-muted text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[var(--primary)] hover:opacity-80 transition"
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