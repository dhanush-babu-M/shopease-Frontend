import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import "./Navbar.css";

const navItems = [
  {
    label: "Products",
    icon: "🛍️",
    dropdown: [
      { section: "Electronics", icon: "💻", items: ["Smartphones", "Laptops", "Headphones", "Tablets", "Cameras", "Smart TVs", "Gaming"] },
      { section: "Fashion", icon: "👗", items: ["Men's Clothing", "Women's Clothing", "Kids Wear", "Accessories", "Ethnic Wear"] },
      { section: "Watches", icon: "⌚", items: ["Luxury Watches", "Sports Watches", "Smartwatches", "Casual", "Vintage"] },
      { section: "Footwear", icon: "👟", items: ["Sneakers", "Formal Shoes", "Sandals", "Sports Shoes", "Boots"] },
    ],
  },
  {
    label: "Food Items",
    icon: "🍱",
    dropdown: [
      { section: "Organic", icon: "🌿", items: ["Honey", "Cold-Pressed Oils", "Herbal Teas", "Superfoods"] },
      { section: "Dry Fruits", icon: "🥜", items: ["Almonds", "Cashews", "Walnuts", "Pistachios", "Raisins"] },
      { section: "Beverages", icon: "☕", items: ["Cold Brew Coffee", "Green Tea", "Protein Shakes", "Juices"] },
      { section: "Snacks", icon: "🍿", items: ["Chips", "Cookies", "Granola Bars", "Popcorn"] },
    ],
  },
  {
    label: "Services",
    icon: "⚡",
    link: "/services",
  },
  {
    label: "Payments Mode",
    icon: "💳",
    dropdown: [
      { section: "UPI", icon: "📱", items: ["Google Pay", "PhonePe", "Paytm", "BHIM UPI"] },
      { section: "Cards", icon: "💳", items: ["Credit Card", "Debit Card", "EMI", "Bajaj Finserv"] },
      { section: "Net Banking", icon: "🏦", items: ["SBI", "HDFC", "ICICI", "Axis Bank"] },
      { section: "Other", icon: "💰", items: ["Cash on Delivery", "Wallets", "Gift Cards", "Crypto"] },
    ],
  },
];

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const cartCount = cart.reduce((s, i) => s + (i.qty || 1), 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNav = (path) => {
    navigate(path);
    setActiveDropdown(null);
    setMobileOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <div className="navbar__logo" onClick={() => handleNav("/home")}>
          <span className="navbar__logo-icon">🛒</span>
          <span className="navbar__logo-text">
            Shop<span className="navbar__logo-accent">Ease</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="navbar__links" ref={dropdownRef}>
          {navItems.map((item, idx) => (
            <div
              key={idx}
              className="navbar__item"
              onMouseEnter={() => !item.link && setActiveDropdown(idx)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`navbar__link ${activeDropdown === idx ? "navbar__link--active" : ""}`}
                onClick={() => item.link ? handleNav(item.link) : setActiveDropdown(activeDropdown === idx ? null : idx)}
              >
                <span>{item.icon}</span>
                {item.label}
                {!item.link && (
                  <svg className={`navbar__caret ${activeDropdown === idx ? "rotated" : ""}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>

              {item.dropdown && activeDropdown === idx && (
                <div className="navbar__dropdown">
                  <div className="navbar__dropdown-grid">
                    {item.dropdown.map((group, gIdx) => (
                      <div key={gIdx} className="navbar__dropdown-group">
                        <div className="navbar__dropdown-heading">
                          <span>{group.icon}</span> {group.section}
                        </div>
                        {group.items.map((sub, sIdx) => (
                          <button
                            key={sIdx}
                            className="navbar__dropdown-item"
                            onClick={() => handleNav("/shop")}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Actions */}
        <div className="navbar__actions">
          <button className="navbar__icon-btn" onClick={() => handleNav("/wishlist")} title="Wishlist">
            ❤️
          </button>
          <button className="navbar__icon-btn navbar__cart-btn" onClick={() => handleNav("/cart")} title="Cart">
            🛒
            {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
          </button>
          <button className="navbar__icon-btn" onClick={() => handleNav("/orders")} title="Orders">
            📦
          </button>
          <button className="navbar__logout" onClick={logout}>
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button className="navbar__hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="navbar__mobile">
          {navItems.map((item, idx) => (
            <button key={idx} className="navbar__mobile-item" onClick={() => item.link ? handleNav(item.link) : handleNav("/shop")}>
              {item.icon} {item.label}
            </button>
          ))}
          <button className="navbar__mobile-item" onClick={() => handleNav("/cart")}>🛒 Cart ({cartCount})</button>
          <button className="navbar__mobile-item" onClick={logout}>🚪 Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;