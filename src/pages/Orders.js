import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/organisms/Navbar";
import "./Orders.css";

const dummyOrders = [
  {
    id: "SE2025050001",
    date: "04 May 2025",
    status: "Delivered",
    items: [{ name: "Sony WH-1000XM5 Headphones", qty: 1, price: 29990, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80" }],
    total: 29990,
  },
  {
    id: "SE2025040032",
    date: "28 Apr 2025",
    status: "Out for Delivery",
    items: [{ name: "Nike Air Max 270", qty: 1, price: 12995, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80" }],
    total: 12995,
  },
  {
    id: "SE2025040018",
    date: "20 Apr 2025",
    status: "Processing",
    items: [
      { name: "Classic Linen Shirt", qty: 2, price: 2598, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200&q=80" },
      { name: "Organic Honey (500g)", qty: 1, price: 549, image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=200&q=80" },
    ],
    total: 3147,
  },
];

const statusColor = {
  "Delivered": "#10B981",
  "Out for Delivery": "#F59E0B",
  "Processing": "#6C63FF",
  "Cancelled": "#EF4444",
};

const Orders = () => {
  const navigate = useNavigate();
  return (
    <div className="orders">
      <Navbar />
      <div className="orders__container">
        <h1 className="orders__title">My Orders</h1>
        {dummyOrders.length === 0 ? (
          <div className="orders__empty">
            <span>📦</span>
            <h3>No orders yet</h3>
            <p>When you place orders, they'll appear here.</p>
            <button onClick={() => navigate("/shop")}>Start Shopping →</button>
          </div>
        ) : (
          <div className="orders__list">
            {dummyOrders.map((order) => (
              <div key={order.id} className="orders__card">
                <div className="orders__card-header">
                  <div>
                    <div className="orders__order-id">Order #{order.id}</div>
                    <div className="orders__date">Placed on {order.date}</div>
                  </div>
                  <div className="orders__status" style={{ background: statusColor[order.status] + "20", color: statusColor[order.status], borderColor: statusColor[order.status] + "40" }}>
                    {order.status}
                  </div>
                </div>
                <div className="orders__items">
                  {order.items.map((item, i) => (
                    <div key={i} className="orders__item">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <div className="orders__item-name">{item.name}</div>
                        <div className="orders__item-qty">Qty: {item.qty}</div>
                      </div>
                      <div className="orders__item-price">₹{item.price.toLocaleString("en-IN")}</div>
                    </div>
                  ))}
                </div>
                <div className="orders__card-footer">
                  <span className="orders__total">Total: ₹{order.total.toLocaleString("en-IN")} <span>(≈ ${(order.total / 83.5).toFixed(2)})</span></span>
                  {order.status === "Delivered" && (
                    <button className="orders__review-btn">Write a Review</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;