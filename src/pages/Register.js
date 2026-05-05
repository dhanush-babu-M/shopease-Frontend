import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Auth.css";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError("Please fill all required fields."); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    login({ email: form.email, name: form.name });
    navigate("/home");
  };

  return (
    <div className="auth">
      <div className="auth__bg">
        <div className="auth__orb auth__orb--1" />
        <div className="auth__orb auth__orb--2" />
      </div>
      <div className="auth__card" style={{ maxWidth: 520 }}>
        <div className="auth__logo" onClick={() => navigate("/")}> 🛒 <span className="auth__logo-text">Shop<span>Ease</span></span></div>
        <h1 className="auth__title">Create Account</h1>
        <p className="auth__subtitle">Join 2M+ shoppers today</p>
        {error && <div className="auth__error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth__form">
          <div className="auth__row">
            <div className="auth__field">
              <label>Full Name *</label>
              <input type="text" placeholder="Rahul Sharma" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="auth__field">
              <label>Phone</label>
              <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>
          <div className="auth__field">
            <label>Email Address *</label>
            <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="auth__row">
            <div className="auth__field">
              <label>Password *</label>
              <input type="password" placeholder="Min. 8 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <div className="auth__field">
              <label>Confirm Password *</label>
              <input type="password" placeholder="Repeat password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} />
            </div>
          </div>
          <button type="submit" className="auth__submit">
            Create My Account
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
        <p className="auth__switch">Already have an account? <Link to="/login">Sign in</Link></p>
        <p className="auth__back"><span onClick={() => navigate("/")}>← Back to Home</span></p>
      </div>
    </div>
  );
};

export default Register;