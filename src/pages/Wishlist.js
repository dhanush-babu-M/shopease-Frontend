import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/organisms/Navbar";
import products from "../utils/dummyData";
import "./Wishlist.css";

// Show first 4 as wishlist items for demo
const wishlistItems = products.slice(0, 4);

const Wishlist = () => {
  const navigate = useNavigate();
  return (
    <div className="wishlist">
      <Navbar />
      <div className="wishlist__container">
        <h1 className="wishlist__title">❤️ My Wishlist</h1>
        <p className="wishlist__sub">Items you've saved for later</p>
        <div className="wishlist__grid">
          {wishlistItems.map((p) => (
            <div key={p.id} className="wishlist__card" onClick={() => navigate(`/product/${p.id}`)}>
              <div className="wishlist__img-wrap">
                <img src={p.images[0]} alt={p.name} />
                <button className="wishlist__remove" onClick={e => { e.stopPropagation(); }}>✕</button>
              </div>
              <div className="wishlist__info">
                <span className="wishlist__cat">{p.category}</span>
                <h3 className="wishlist__name">{p.name}</h3>
                <div className="wishlist__price">
                  <span className="wishlist__inr">₹{p.priceINR.toLocaleString("en-IN")}</span>
                  <span className="wishlist__usd">${p.priceUSD}</span>
                </div>
                <button className="wishlist__cart-btn" onClick={e => { e.stopPropagation(); navigate(`/product/${p.id}`); }}>
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;