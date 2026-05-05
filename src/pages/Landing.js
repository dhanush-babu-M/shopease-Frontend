import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const taglines = [
  "Shop Smarter.",
  "Live Better.",
  "Discover More.",
  "Own the Moment.",
];

const stats = [
  { value: "50K+", label: "Products" },
  { value: "2M+", label: "Happy Customers" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support" },
];

const features = [
  { icon: "🚀", title: "Lightning Delivery", desc: "Same-day delivery in 50+ cities across India." },
  { icon: "🔒", title: "Secure Payments", desc: "Bank-grade encryption. UPI, cards, COD – all safe." },
  { icon: "↩️", title: "Easy Returns", desc: "Hassle-free 30-day returns. No questions asked." },
  { icon: "🎯", title: "Best Prices", desc: "Price match guarantee on every product we sell." },
  { icon: "🌿", title: "Eco-Friendly", desc: "Sustainable packaging, carbon-neutral shipping." },
  { icon: "💬", title: "24/7 Support", desc: "Real humans, not bots, ready to help anytime." },
];

const Landing = () => {
  const navigate = useNavigate();
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    setVisible(true);
    const interval = setInterval(() => {
      setTaglineIdx((i) => (i + 1) % taglines.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing">
      {/* ── HERO ───────────────────────── */}
      <section className="landing__hero" ref={heroRef}>
        <div className="landing__hero-bg">
          <div className="landing__orb landing__orb--1" />
          <div className="landing__orb landing__orb--2" />
          <div className="landing__orb landing__orb--3" />
          <div className="landing__grid-overlay" />
        </div>

        <div className={`landing__hero-content ${visible ? "landing__hero-content--visible" : ""}`}>
          <div className="landing__badge">✨ India's Freshest E-Commerce Experience</div>

          <h1 className="landing__title">
            <span className="landing__title-shop">Shop</span>
            <span className="landing__title-ease">Ease</span>
          </h1>

          <p className="landing__tagline" key={taglineIdx}>
            {taglines[taglineIdx]}
          </p>

          <p className="landing__desc">
            From the latest electronics to handpicked fashion, fresh food to luxury watches —
            everything you love, delivered to your doorstep. Built with ❤️ by a passionate developer.
          </p>

          <div className="landing__cta-group">
            <button className="landing__btn-primary" onClick={() => navigate("/login")}>
              <span>Start Shopping</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="landing__btn-secondary" onClick={() => navigate("/register")}>
              Create Account
            </button>
          </div>

          {/* Stats */}
          <div className="landing__stats">
            {stats.map((s, i) => (
              <div key={i} className="landing__stat" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                <span className="landing__stat-value">{s.value}</span>
                <span className="landing__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating product cards */}
        <div className="landing__hero-visual">
          <div className="landing__float-card landing__float-card--1">
            <span className="landing__float-icon">⌚</span>
            <div>
              <div className="landing__float-name">Rolex Submariner</div>
              <div className="landing__float-price">₹14,50,000</div>
            </div>
          </div>
          <div className="landing__float-card landing__float-card--2">
            <span className="landing__float-icon">💻</span>
            <div>
              <div className="landing__float-name">MacBook Pro M3</div>
              <div className="landing__float-price">₹1,99,990</div>
            </div>
          </div>
          <div className="landing__float-card landing__float-card--3">
            <span className="landing__float-icon">👟</span>
            <div>
              <div className="landing__float-name">Nike Air Max 270</div>
              <div className="landing__float-price">₹12,995</div>
            </div>
          </div>
          <div className="landing__hero-showcase">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"
              alt="Premium Watch"
              className="landing__hero-img"
            />
            <div className="landing__hero-img-glow" />
          </div>
        </div>

        <div className="landing__scroll-hint">
          <span>Scroll to explore</span>
          <div className="landing__scroll-arrow">↓</div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────── */}
      <section className="landing__features">
        <div className="landing__features-inner">
          <h2 className="landing__section-title">Why ShopEase?</h2>
          <p className="landing__section-sub">
            Crafted by a developer who thinks like a customer.
          </p>
          <div className="landing__features-grid">
            {features.map((f, i) => (
              <div key={i} className="landing__feature-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="landing__feature-icon">{f.icon}</div>
                <h3 className="landing__feature-title">{f.title}</h3>
                <p className="landing__feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES PREVIEW ─────────── */}
      <section className="landing__cats">
        <div className="landing__cats-inner">
          <h2 className="landing__section-title">Shop by Category</h2>
          <p className="landing__section-sub">Everything you need, all in one place.</p>
          <div className="landing__cats-grid">
            {[
              { icon: "💻", name: "Electronics", color: "#6C63FF", bg: "rgba(108,99,255,0.12)" },
              { icon: "⌚", name: "Watches", color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
              { icon: "👔", name: "Men's Fashion", color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
              { icon: "👗", name: "Women's Fashion", color: "#EC4899", bg: "rgba(236,72,153,0.12)" },
              { icon: "👶", name: "Kids Wear", color: "#10B981", bg: "rgba(16,185,129,0.12)" },
              { icon: "🍱", name: "Food Items", color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
              { icon: "👟", name: "Footwear", color: "#8B5CF6", bg: "rgba(139,92,246,0.12)" },
              { icon: "🏡", name: "Home & Decor", color: "#F97316", bg: "rgba(249,115,22,0.12)" },
            ].map((cat, i) => (
              <button
                key={i}
                className="landing__cat-pill"
                style={{ "--cat-color": cat.color, "--cat-bg": cat.bg }}
                onClick={() => navigate("/login")}
              >
                <span className="landing__cat-icon">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ─────────────────── */}
      <section className="landing__footer-cta">
        <div className="landing__footer-cta-inner">
          <h2>Ready to experience it?</h2>
          <p>Join 2 million+ shoppers who trust ShopEase every day.</p>
          <button className="landing__btn-primary" onClick={() => navigate("/register")}>
            Get Started — It's Free
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <p className="landing__footer-note">
            Built with 🔥 by a passionate fresher developer who believes great UX is never accidental.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
