import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/organisms/Navbar";
import products, { categories } from "../utils/dummyData";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const featured = products.slice(0, 4);

  return (
    <div className="home">
      <Navbar />

      {/* ── HERO BANNER ──────────────────── */}
      <section className="home__banner">
        <div className="home__banner-bg">
          <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&q=80" alt="banner" />
          <div className="home__banner-overlay" />
        </div>
        <div className="home__banner-content">
          <div className="home__banner-badge">🔥 Summer Sale — Up to 70% Off</div>
          <h1 className="home__banner-title">
            Your One-Stop<br />
            <span>Shopping Universe</span>
          </h1>
          <p className="home__banner-desc">
            From premium electronics to fresh food — everything delivered to you.
          </p>
          <div className="home__banner-actions">
            <button className="home__btn-primary" onClick={() => navigate("/shop")}>
              Shop Now →
            </button>
            <button className="home__btn-ghost" onClick={() => navigate("/services")}>
              Our Services
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="home__search-wrap">
          <div className="home__search">
            <span className="home__search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search for products, brands, categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────── */}
      <section className="home__section">
        <div className="home__container">
          <div className="home__section-header">
            <h2 className="home__section-title">Shop by Category</h2>
            <button className="home__see-all" onClick={() => navigate("/shop")}>See All →</button>
          </div>
          <div className="home__cats-grid">
            {categories.map((cat, i) => (
              <button
                key={i}
                className="home__cat-card"
                style={{ "--cat-color": cat.color }}
                onClick={() => navigate("/shop")}
              >
                <div className="home__cat-icon">{cat.icon}</div>
                <span className="home__cat-name">{cat.name}</span>
                <span className="home__cat-count">{cat.subCategories.length} types</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────── */}
      <section className="home__section home__section--dark">
        <div className="home__container">
          <div className="home__section-header">
            <h2 className="home__section-title">Featured Products</h2>
            <button className="home__see-all" onClick={() => navigate("/shop")}>View All →</button>
          </div>
          {search && filtered.length === 0 ? (
            <div className="home__no-results">
              <span>😕</span>
              <p>No products found for "<strong>{search}</strong>"</p>
            </div>
          ) : (
            <div className="home__products-grid">
              {(search ? filtered : featured).map((p) => (
                <div key={p.id} className="home__product-card" onClick={() => navigate(`/product/${p.id}`)}>
                  <div className="home__product-img-wrap">
                    <img src={p.images[0]} alt={p.name} className="home__product-img" />
                    <div className="home__product-overlay">
                      <span>Quick View</span>
                    </div>
                    <div className="home__product-badges">
                      {p.rating >= 4.8 && <span className="home__badge home__badge--hot">🔥 Hot</span>}
                      {p.inStock && <span className="home__badge home__badge--stock">In Stock</span>}
                    </div>
                  </div>
                  <div className="home__product-info">
                    <span className="home__product-category">{p.category}</span>
                    <h3 className="home__product-name">{p.name}</h3>
                    <div className="home__product-rating">
                      {"★".repeat(Math.round(p.rating))}{"☆".repeat(5 - Math.round(p.rating))}
                      <span>({p.reviews.toLocaleString()})</span>
                    </div>
                    <div className="home__product-price">
                      <span className="home__price-inr">₹{p.priceINR.toLocaleString("en-IN")}</span>
                      <span className="home__price-usd">${p.priceUSD}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── PROMO BANNERS ────────────────── */}
      <section className="home__section">
        <div className="home__container">
          <div className="home__promos">
            <div className="home__promo home__promo--purple" onClick={() => navigate("/shop")}>
              <div className="home__promo-text">
                <div className="home__promo-tag">LIMITED TIME</div>
                <h3>Summer Electronics Sale</h3>
                <p>Up to 40% off on laptops, phones & more</p>
                <button>Shop Now →</button>
              </div>
              <div className="home__promo-emoji">💻</div>
            </div>
            <div className="home__promo home__promo--gold" onClick={() => navigate("/shop")}>
              <div className="home__promo-text">
                <div className="home__promo-tag">YEAR END DEALS</div>
                <h3>Fashion Mega Sale</h3>
                <p>Top brands. Lowest prices of the year.</p>
                <button>Explore →</button>
              </div>
              <div className="home__promo-emoji">👗</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────── */}
      <footer className="home__footer">
        <div className="home__container">
          <div className="home__footer-grid">
            <div>
              <div className="home__footer-logo">🛒 ShopEase</div>
              <p className="home__footer-tagline">Built with passion by a developer who cares about your experience.</p>
            </div>
            {[
              { title: "Quick Links", links: ["Home", "Shop", "Services", "Cart", "Orders"] },
              { title: "Categories", links: ["Electronics", "Fashion", "Watches", "Food", "Footwear"] },
              { title: "Support", links: ["Track Order", "Returns", "Help Center", "Contact Us"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="home__footer-heading">{col.title}</h4>
                <ul className="home__footer-list">
                  {col.links.map((l, j) => (
                    <li key={j} onClick={() => navigate("/shop")}>{l}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="home__footer-bottom">
            <p>© 2025 ShopEase. Made with 🔥 by a passionate fresher developer.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;