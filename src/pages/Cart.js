import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/organisms/Navbar";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, updateQty, total } = useContext(CartContext);
  const navigate = useNavigate();

  const totalUSD = (total / 83.5).toFixed(2);

  return (
    <div className="cart">
      <Navbar />
      <div className="cart__container">
        <h1 className="cart__title">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="cart__empty">
            <span>🛒</span>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything yet.</p>
            <button onClick={() => navigate("/shop")}>Start Shopping →</button>
          </div>
        ) : (
          <div className="cart__layout">
            {/* Items */}
            <div className="cart__items">
              {cart.map((item, idx) => (
                <div key={idx} className="cart__item">
                  <img src={item.images?.[0]} alt={item.name} className="cart__item-img" />
                  <div className="cart__item-details">
                    <span className="cart__item-cat">{item.category}</span>
                    <h3 className="cart__item-name">{item.name}</h3>
                    {item.selectedSize && (
                      <span className="cart__item-size">Size: {item.selectedSize}</span>
                    )}
                    <div className="cart__item-price">
                      <span className="cart__price-inr">₹{(item.priceINR * item.qty).toLocaleString("en-IN")}</span>
                      <span className="cart__price-usd">${(item.priceUSD * item.qty).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="cart__item-right">
                    <div className="cart__qty-ctrl">
                      <button onClick={() => updateQty(item.id, item.selectedSize, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.selectedSize, item.qty + 1)}>+</button>
                    </div>
                    <button
                      className="cart__remove"
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                    >
                      🗑 Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="cart__summary">
              <h3 className="cart__summary-title">Order Summary</h3>
              <div className="cart__summary-row">
                <span>Items ({cart.reduce((s, i) => s + i.qty, 0)})</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div className="cart__summary-row">
                <span>Delivery</span>
                <span className="cart__free">FREE</span>
              </div>
              <div className="cart__summary-row cart__summary-total">
                <span>Total (INR)</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div className="cart__summary-usd">≈ ${totalUSD} USD</div>
              <button className="cart__checkout-btn" onClick={() => navigate("/checkout")}>
                Proceed to Checkout →
              </button>
              <button className="cart__continue-btn" onClick={() => navigate("/shop")}>
                ← Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;