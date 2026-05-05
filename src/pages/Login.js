import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Auth.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill all fields.");
      return;
    }
    login({ email: form.email });
    navigate("/home");
  };

  return (
    <div className="auth">
      <div className="auth__bg">
        <div className="auth__orb auth__orb--1" />
        <div className="auth__orb auth__orb--2" />
      </div>

      <div className="auth__card">
        <div className="auth__logo" onClick={() => navigate("/")}>
          🛒 <span className="auth__logo-text">Shop<span>Ease</span></span>
        </div>

        <h1 className="auth__title">Welcome back</h1>
        <p className="auth__subtitle">Sign in to continue shopping</p>

        {error && <div className="auth__error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth__form">
          <div className="auth__field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="auth__field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button type="submit" className="auth__submit">
            Sign In
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>

        <p className="auth__switch">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
        <p className="auth__back">
          <span onClick={() => navigate("/")}>← Back to Home</span>
        </p>
      </div>
    </div>
  );
};

export default Login;