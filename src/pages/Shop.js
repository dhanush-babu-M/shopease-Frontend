import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/organisms/Navbar";
import products, { categories } from "../utils/dummyData";
import "./Shop.css";

const Shop = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const filtered = products
    .filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sort === "price-asc") return a.priceINR - b.priceINR;
      if (sort === "price-desc") return b.priceINR - a.priceINR;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="shop">
      <Navbar />
      <div className="shop__hero">
        <div className="shop__hero-bg" />
        <div className="shop__hero-content">
          <h1 className="shop__hero-title">Our Store</h1>
          <p className="shop__hero-sub">Explore {products.length}+ curated products across all categories</p>
        </div>
      </div>

      <div className="shop__container">
        {/* ── FILTERS ─────────────────── */}
        <div className="shop__controls">
          <div className="shop__search">
            <span>🔍</span>
            <input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="shop__sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Category tabs */}
        <div className="shop__cats">
          <button
            className={`shop__cat-tab ${activeCategory === "All" ? "shop__cat-tab--active" : ""}`}
            onClick={() => setActiveCategory("All")}
          >
            🛒 All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`shop__cat-tab ${activeCategory === cat.name ? "shop__cat-tab--active" : ""}`}
              style={{ "--cat-color": cat.color }}
              onClick={() => setActiveCategory(cat.name)}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* ── PRODUCTS ─────────────────── */}
        <div className="shop__results-info">
          {filtered.length} products found
          {activeCategory !== "All" && ` in "${activeCategory}"`}
        </div>

        {filtered.length === 0 ? (
          <div className="shop__empty">
            <span>🔍</span>
            <p>No products found</p>
            <button onClick={() => { setActiveCategory("All"); setSearch(""); }}>Clear Filters</button>
          </div>
        ) : (
          <div className="shop__grid">
            {filtered.map((p) => (
              <div key={p.id} className="shop__card" onClick={() => navigate(`/product/${p.id}`)}>
                <div className="shop__card-img-wrap">
                  <img src={p.images[0]} alt={p.name} className="shop__card-img" />
                  <div className="shop__card-hover-overlay">
                    <span>View Details</span>
                  </div>
                  {p.rating >= 4.8 && (
                    <span className="shop__card-badge shop__card-badge--hot">🔥</span>
                  )}
                </div>
                <div className="shop__card-body">
                  <div className="shop__card-meta">
                    <span className="shop__card-cat">{p.category}</span>
                    <span className="shop__card-brand">{p.brand}</span>
                  </div>
                  <h3 className="shop__card-name">{p.name}</h3>
                  <div className="shop__card-rating">
                    {"★".repeat(Math.round(p.rating))}
                    <span>{p.rating} ({p.reviews.toLocaleString()})</span>
                  </div>
                  <div className="shop__card-prices">
                    <span className="shop__card-inr">₹{p.priceINR.toLocaleString("en-IN")}</span>
                    <span className="shop__card-usd">${p.priceUSD}</span>
                  </div>
                  <div className="shop__card-sizes">
                    {p.sizes.slice(0, 4).map((s, i) => (
                      <span key={i} className="shop__size-chip">{s}</span>
                    ))}
                    {p.sizes.length > 4 && <span className="shop__size-chip shop__size-more">+{p.sizes.length - 4}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
