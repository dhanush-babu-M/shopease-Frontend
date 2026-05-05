import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/organisms/Navbar";
import { CartContext } from "../context/CartContext";
import "./Checkout.css";

const paymentMethods = [
  { id: "upi", label: "UPI", icon: "📱", desc: "GPay, PhonePe, Paytm, BHIM" },
  { id: "card", label: "Credit / Debit Card", icon: "💳", desc: "Visa, Mastercard, RuPay" },
  { id: "netbanking", label: "Net Banking", icon: "🏦", desc: "SBI, HDFC, ICICI & more" },
  { id: "emi", label: "EMI", icon: "📅", desc: "No-cost EMI available" },
  { id: "cod", label: "Cash on Delivery", icon: "💵", desc: "Pay when delivered" },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, total, clearCart } = useContext(CartContext);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({ name: "", phone: "", address: "", city: "", pincode: "", state: "" });
  const [payMethod, setPayMethod] = useState("upi");
  const [placed, setPlaced] = useState(false);

  const handlePlaceOrder = () => {
    setPlaced(true);
    clearCart();
    setTimeout(() => navigate("/orders"), 3000);
  };

  if (placed) {
    return (
      <div className="checkout">
        <Navbar />
        <div className="checkout__success">
          <div className="checkout__success-icon">🎉</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for shopping with ShopEase. You'll receive a confirmation soon.</p>
          <p className="checkout__redirect">Redirecting to orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <Navbar />
      <div className="checkout__container">
        <h1 className="checkout__title">Checkout</h1>

        {/* Steps */}
        <div className="checkout__steps">
          {["Delivery Address", "Payment", "Review"].map((s, i) => (
            <div key={i} className={`checkout__step ${step >= i + 1 ? "checkout__step--done" : ""} ${step === i + 1 ? "checkout__step--active" : ""}`}>
              <div className="checkout__step-num">{step > i + 1 ? "✓" : i + 1}</div>
              <span>{s}</span>
            </div>
          ))}
        </div>

        <div className="checkout__layout">
          <div className="checkout__main">
            {/* Step 1: Address */}
            {step === 1 && (
              <div className="checkout__section">
                <h2>Delivery Address</h2>
                <div className="checkout__form">
                  <div className="checkout__row">
                    <div className="checkout__field"><label>Full Name</label><input placeholder="Rahul Sharma" value={address.name} onChange={e => setAddress({ ...address, name: e.target.value })} /></div>
                    <div className="checkout__field"><label>Phone</label><input placeholder="+91 98765 43210" value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })} /></div>
                  </div>
                  <div className="checkout__field"><label>Address</label><input placeholder="House No, Street, Area" value={address.address} onChange={e => setAddress({ ...address, address: e.target.value })} /></div>
                  <div className="checkout__row">
                    <div className="checkout__field"><label>City</label><input placeholder="Hyderabad" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} /></div>
                    <div className="checkout__field"><label>Pincode</label><input placeholder="500001" value={address.pincode} onChange={e => setAddress({ ...address, pincode: e.target.value })} /></div>
                    <div className="checkout__field"><label>State</label><input placeholder="Telangana" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} /></div>
                  </div>
                  <button className="checkout__next" onClick={() => setStep(2)}>Continue to Payment →</button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="checkout__section">
                <h2>Choose Payment Method</h2>
                <div className="checkout__payment-list">
                  {paymentMethods.map((m) => (
                    <div key={m.id} className={`checkout__pay-option ${payMethod === m.id ? "checkout__pay-option--active" : ""}`} onClick={() => setPayMethod(m.id)}>
                      <div className="checkout__pay-radio"><div className={`checkout__radio-dot ${payMethod === m.id ? "checkout__radio-dot--active" : ""}`} /></div>
                      <span className="checkout__pay-icon">{m.icon}</span>
                      <div><div className="checkout__pay-label">{m.label}</div><div className="checkout__pay-desc">{m.desc}</div></div>
                    </div>
                  ))}
                </div>
                <div className="checkout__btns">
                  <button className="checkout__back" onClick={() => setStep(1)}>← Back</button>
                  <button className="checkout__next" onClick={() => setStep(3)}>Review Order →</button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="checkout__section">
                <h2>Review Your Order</h2>
                <div className="checkout__review-items">
                  {cart.map((item, i) => (
                    <div key={i} className="checkout__review-item">
                      <img src={item.images?.[0]} alt={item.name} />
                      <div><div className="checkout__review-name">{item.name}</div><div className="checkout__review-detail">Qty: {item.qty} {item.selectedSize ? `· Size: ${item.selectedSize}` : ""}</div></div>
                      <div className="checkout__review-price">₹{(item.priceINR * item.qty).toLocaleString("en-IN")}</div>
                    </div>
                  ))}
                </div>
                <div className="checkout__btns">
                  <button className="checkout__back" onClick={() => setStep(2)}>← Back</button>
                  <button className="checkout__place" onClick={handlePlaceOrder}>✓ Place Order</button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="checkout__sidebar">
            <h3>Price Details</h3>
            <div className="checkout__sidebar-row"><span>Subtotal</span><span>₹{total.toLocaleString("en-IN")}</span></div>
            <div className="checkout__sidebar-row"><span>Delivery</span><span className="checkout__free">FREE</span></div>
            <div className="checkout__sidebar-total"><span>Total</span><span>₹{total.toLocaleString("en-IN")}</span></div>
            <div className="checkout__sidebar-usd">≈ ${(total / 83.5).toFixed(2)} USD</div>
            <div className="checkout__payment-badge">{paymentMethods.find(m => m.id === payMethod)?.icon} {paymentMethods.find(m => m.id === payMethod)?.label}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;