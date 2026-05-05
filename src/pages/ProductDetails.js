import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/organisms/Navbar";
import { CartContext } from "../context/CartContext";
import products from "../utils/dummyData";
import "./ProductDetails.css";

const USD_TO_INR = 83.5;

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const product = products.find((p) => p.id === Number(id));
  const related = products.filter((p) => p.id !== Number(id) && p.category === product?.category).slice(0, 4);

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="pd">
        <Navbar />
        <div className="pd__not-found">
          <span>😕</span>
          <h2>Product Not Found</h2>
          <button onClick={() => navigate("/shop")}>← Back to Shop</button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, selectedSize, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pd">
      <Navbar />
      <div className="pd__container">

        {/* Breadcrumb */}
        <div className="pd__breadcrumb">
          <span onClick={() => navigate("/home")}>Home</span>
          <span>›</span>
          <span onClick={() => navigate("/shop")}>Shop</span>
          <span>›</span>
          <span onClick={() => navigate("/shop")}>{product.category}</span>
          <span>›</span>
          <span className="pd__breadcrumb-current">{product.name}</span>
        </div>

        {/* ── MAIN LAYOUT ─────────────────── */}
        <div className="pd__layout">

          {/* LEFT: Image Gallery */}
          <div className="pd__gallery">
            {/* Big Image */}
            <div className="pd__main-img-wrap">
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="pd__main-img"
              />
              {product.rating >= 4.8 && (
                <span className="pd__img-badge">🔥 Bestseller</span>
              )}
            </div>

            {/* 4 Thumbnails */}
            <div className="pd__thumbnails">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`pd__thumb ${activeImg === i ? "pd__thumb--active" : ""}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`view-${i}`} />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="pd__info">
            <span className="pd__category">{product.category} · {product.subCategory}</span>
            <h1 className="pd__name">{product.name}</h1>
            <div className="pd__brand">By <span>{product.brand}</span></div>

            {/* Rating */}
            <div className="pd__rating">
              <span className="pd__stars">{"★".repeat(Math.round(product.rating))}{"☆".repeat(5 - Math.round(product.rating))}</span>
              <span className="pd__rating-val">{product.rating}</span>
              <span className="pd__reviews">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="pd__price-block">
              <div className="pd__price-inr">₹{product.priceINR.toLocaleString("en-IN")}</div>
              <div className="pd__price-usd">${product.priceUSD} <span>USD</span></div>
              <div className="pd__price-note">
                💱 1 USD ≈ ₹{USD_TO_INR} · Prices include all taxes
              </div>
            </div>

            {/* Stock */}
            <div className={`pd__stock ${product.inStock ? "pd__stock--in" : "pd__stock--out"}`}>
              {product.inStock ? "✓ In Stock – Ready to ship" : "✗ Out of Stock"}
            </div>

            {/* Sizes */}
            {product.sizes.length > 1 && (
              <div className="pd__sizes-section">
                <div className="pd__sizes-label">
                  Size <span>{selectedSize ? `– ${selectedSize} selected` : "– Please select"}</span>
                </div>
                <div className="pd__sizes">
                  {product.sizes.map((size, i) => (
                    <button
                      key={i}
                      className={`pd__size-btn ${selectedSize === size ? "pd__size-btn--active" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty */}
            <div className="pd__qty-section">
              <span className="pd__qty-label">Quantity</span>
              <div className="pd__qty-ctrl">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)}>+</button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pd__cta">
              <button
                className={`pd__btn-cart ${added ? "pd__btn-cart--added" : ""}`}
                onClick={handleAddToCart}
              >
                {added ? "✓ Added to Cart!" : "🛒 Add to Cart"}
              </button>
              <button className="pd__btn-buy" onClick={() => { handleAddToCart(); navigate("/cart"); }}>
                ⚡ Buy Now
              </button>
            </div>

            {/* Perks */}
            <div className="pd__perks">
              {[
                { icon: "🚀", text: "Free delivery on orders above ₹499" },
                { icon: "↩️", text: "30-day easy returns" },
                { icon: "🔒", text: "100% secure payments" },
                { icon: "✅", text: "Original & genuine product" },
              ].map((perk, i) => (
                <div key={i} className="pd__perk">
                  <span>{perk.icon}</span>
                  <span>{perk.text}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="pd__desc">
              <h3>About This Product</h3>
              <p>{product.description}</p>
            </div>
          </div>
        </div>

        {/* ── RELATED PRODUCTS ─────────────── */}
        {related.length > 0 && (
          <section className="pd__related">
            <h2 className="pd__related-title">More in {product.category}</h2>
            <div className="pd__related-grid">
              {related.map((p) => (
                <div key={p.id} className="pd__related-card" onClick={() => { navigate(`/product/${p.id}`); window.scrollTo(0, 0); }}>
                  <div className="pd__related-img-wrap">
                    <img src={p.images[0]} alt={p.name} />
                  </div>
                  <div className="pd__related-info">
                    <p className="pd__related-name">{p.name}</p>
                    <p className="pd__related-price">₹{p.priceINR.toLocaleString("en-IN")}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;