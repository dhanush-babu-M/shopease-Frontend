import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/organisms/Navbar";
import "./Services.css";

const services = [
  {
    icon: "🚀",
    title: "Express Delivery",
    desc: "Same-day delivery in 50+ Indian cities. Your orders dispatched within 2 hours of confirmation. Tracked at every step.",
    features: ["Same-Day in 50+ cities", "Real-time tracking", "Safe packaging", "Contactless delivery"],
    color: "#6C63FF",
  },
  {
    icon: "🔒",
    title: "Secure Payments",
    desc: "Bank-grade 256-bit SSL encryption. Support for UPI, Credit/Debit Cards, Net Banking, EMI, and Cash on Delivery.",
    features: ["UPI & PhonePe", "EMI Available", "COD Option", "256-bit SSL"],
    color: "#10B981",
  },
  {
    icon: "↩️",
    title: "Easy Returns",
    desc: "30-day hassle-free returns. Pick-up from your doorstep. Full refund within 5-7 business days.",
    features: ["30-day window", "Free pick-up", "Fast refunds", "No questions asked"],
    color: "#F59E0B",
  },
  {
    icon: "🎯",
    title: "Price Guarantee",
    desc: "We match any lower price you find online. Best prices across electronics, fashion, food, and more.",
    features: ["Price match", "Daily deals", "Member discounts", "No hidden fees"],
    color: "#EF4444",
  },
  {
    icon: "💬",
    title: "24/7 Support",
    desc: "Real humans ready to help — not bots. Chat, call, or email anytime. Average response time under 2 minutes.",
    features: ["Live chat", "Call support", "Email help", "< 2 min response"],
    color: "#8B5CF6",
  },
  {
    icon: "🌿",
    title: "Eco Packaging",
    desc: "100% recyclable packaging. Carbon-neutral shipping on all orders. Every order plants 1 tree.",
    features: ["Recyclable boxes", "Carbon-neutral", "Tree planting", "Green couriers"],
    color: "#06B6D4",
  },
];

const seasonalDeals = [
  {
    season: "☀️ Summer 2025 Sale",
    period: "April – June",
    badge: "LIVE NOW",
    badgeColor: "#EF4444",
    desc: "Beat the heat with massive discounts on ACs, coolers, summer fashion, cold beverages & health foods.",
    highlights: ["Up to 60% on Electronics", "40% on Summer Clothing", "30% on Beverages", "Free delivery on ₹299+"],
    bg: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(239,68,68,0.1))",
    border: "rgba(245,158,11,0.25)",
  },
  {
    season: "🎓 Back to School",
    period: "June – July",
    badge: "UPCOMING",
    badgeColor: "#6C63FF",
    desc: "Stock up on school essentials — backpacks, stationery, electronics, kids wear, and healthy snacks.",
    highlights: ["Kids Wear from ₹299", "School Bags up to 50% off", "Stationery Bundles", "Special Student Coupons"],
    bg: "linear-gradient(135deg, rgba(108,99,255,0.15), rgba(16,185,129,0.08))",
    border: "rgba(108,99,255,0.25)",
  },
  {
    season: "🪔 Festive Season",
    period: "October – November",
    badge: "COMING SOON",
    badgeColor: "#F59E0B",
    desc: "The biggest sale of the year. Diwali, Navratri & Dussehra — unbeatable deals across every category.",
    highlights: ["Up to 80% off", "Flash Sales daily", "Gift Cards Available", "Premium Brand Offers"],
    bg: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(249,115,22,0.1))",
    border: "rgba(245,158,11,0.25)",
  },
  {
    season: "🎄 Year-End Clearance",
    period: "December – January",
    badge: "MARK CALENDAR",
    badgeColor: "#10B981",
    desc: "End of year mega clearance. The lowest prices of the entire year across all categories.",
    highlights: ["Clearance up to 90%", "New Year Bundles", "Premium Gifts", "Loyalty Points x3"],
    bg: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(6,182,212,0.08))",
    border: "rgba(16,185,129,0.25)",
  },
];

const whatWeSell = [
  { cat: "💻 Electronics", items: "Smartphones, Laptops, Tablets, Headphones, Smart TVs, Cameras, Gaming Consoles" },
  { cat: "⌚ Watches", items: "Luxury Swiss Watches, Smartwatches, Sports Watches, Casual & Vintage Timepieces" },
  { cat: "👔 Men's Fashion", items: "Shirts, T-Shirts, Trousers, Jeans, Formal Suits, Ethnic Kurtas, Jackets" },
  { cat: "👗 Women's Fashion", items: "Dresses, Kurtis, Sarees, Western Wear, Activewear, Accessories" },
  { cat: "👶 Kids Wear", items: "Infant Rompers, School Uniforms, Casual Clothes, Toys, Backpacks, Footwear" },
  { cat: "🍱 Food Items", items: "Organic Honey, Dry Fruits, Cold Brew Coffee, Health Snacks, Spices, Superfoods" },
  { cat: "👟 Footwear", items: "Sneakers, Formal Shoes, Sandals, Sports Shoes, Heels, Kids Shoes" },
  { cat: "🏡 Home & Decor", items: "Lamps, Bedding, Kitchen Appliances, Wall Art, Plants, Furniture" },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="svc">
      <Navbar />

      {/* ── HERO ──────────────────────────── */}
      <section className="svc__hero">
        <div className="svc__hero-orb svc__hero-orb--1" />
        <div className="svc__hero-orb svc__hero-orb--2" />
        <div className="svc__hero-content">
          <div className="svc__hero-badge">⚡ What We Offer</div>
          <h1 className="svc__hero-title">Services Built for You</h1>
          <p className="svc__hero-desc">
            Every feature, every policy, every deal — designed by someone who shops too.
            <br />We don't just sell products. We deliver <em>experiences</em>.
          </p>
        </div>
      </section>

      {/* ── CORE SERVICES ─────────────────── */}
      <section className="svc__section svc__section--alt">
        <div className="svc__container">
          <h2 className="svc__section-title">Core Services</h2>
          <p className="svc__section-sub">Six pillars that make ShopEase the best place to shop online.</p>
          <div className="svc__services-grid">
            {services.map((s, i) => (
              <div key={i} className="svc__service-card" style={{ "--color": s.color }}>
                <div className="svc__service-icon" style={{ background: `${s.color}20`, border: `1px solid ${s.color}40` }}>
                  {s.icon}
                </div>
                <h3 className="svc__service-title">{s.title}</h3>
                <p className="svc__service-desc">{s.desc}</p>
                <ul className="svc__service-features">
                  {s.features.map((f, j) => (
                    <li key={j}>✓ {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE SELL ──────────────────── */}
      <section className="svc__section">
        <div className="svc__container">
          <h2 className="svc__section-title">What We Sell</h2>
          <p className="svc__section-sub">A universe of products — handpicked, quality-checked, and ready to ship.</p>
          <div className="svc__sell-grid">
            {whatWeSell.map((item, i) => (
              <div key={i} className="svc__sell-card" onClick={() => navigate("/shop")}>
                <h3 className="svc__sell-cat">{item.cat}</h3>
                <p className="svc__sell-items">{item.items}</p>
                <span className="svc__sell-link">Browse →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEASONAL DEALS ────────────────── */}
      <section className="svc__section svc__section--alt">
        <div className="svc__container">
          <h2 className="svc__section-title">Seasonal Deals & Sales</h2>
          <p className="svc__section-sub">
            We plan our biggest events around India's calendar — so you never miss a deal.
          </p>
          <div className="svc__seasons-grid">
            {seasonalDeals.map((deal, i) => (
              <div key={i} className="svc__season-card" style={{ background: deal.bg, borderColor: deal.border }}>
                <div className="svc__season-header">
                  <div>
                    <h3 className="svc__season-title">{deal.season}</h3>
                    <span className="svc__season-period">{deal.period}</span>
                  </div>
                  <span className="svc__season-badge" style={{ background: deal.badgeColor + "25", color: deal.badgeColor, borderColor: deal.badgeColor + "50" }}>
                    {deal.badge}
                  </span>
                </div>
                <p className="svc__season-desc">{deal.desc}</p>
                <ul className="svc__season-highlights">
                  {deal.highlights.map((h, j) => (
                    <li key={j}>⚡ {h}</li>
                  ))}
                </ul>
                <button className="svc__season-btn" onClick={() => navigate("/shop")}>
                  {deal.badge === "LIVE NOW" ? "Shop the Sale →" : "Remind Me →"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND PROMISE ─────────────────── */}
      <section className="svc__promise">
        <div className="svc__container">
          <div className="svc__promise-inner">
            <div className="svc__promise-badge">💡 Developer's Note</div>
            <h2 className="svc__promise-title">Built by a Developer,<br />for Real People</h2>
            <p className="svc__promise-desc">
              Every line of code in ShopEase was written with one thought: <em>"Would I use this?"</em>
              This isn't a template. Every component, every animation, every interaction was thoughtfully designed —
              the kind of project where you can see the developer's fingerprints in the best possible way.
              ShopEase is what happens when a fresher developer dares to dream big and build bigger.
            </p>
            <div className="svc__promise-values">
              {["User First", "Clean Code", "Honest Design", "No Dark Patterns"].map((v, i) => (
                <span key={i} className="svc__promise-value">✦ {v}</span>
              ))}
            </div>
            <button className="svc__promise-btn" onClick={() => navigate("/shop")}>
              Start Shopping →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
