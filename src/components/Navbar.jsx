import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import logo from '../assets/images/ui/logo.png'; // <-- CORRECTED LINE

const Navbar = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClasses = ({ isActive }) =>
    `relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-full after:bg-primary after:transition-transform after:duration-300 ${
      isActive ? 'after:scale-x-100 text-primary' : 'after:scale-x-0'
    } hover:text-primary transition-colors`;
    
  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-surface/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="ShopEase Logo" className="h-8 w-auto" />
          <span className="font-extrabold text-2xl text-textPrimary">ShopEase</span>
        </Link>
        <div className="hidden md:flex space-x-8 text-textPrimary font-semibold items-center">
          <NavLink to="/" className={navLinkClasses}>Home</NavLink>
          <NavLink to="/products" className={navLinkClasses}>Products</NavLink>
        </div>
        <div className="flex items-center space-x-5">
          <Link to="/cart" className="relative text-textPrimary hover:text-primary transition-colors">
            <FiShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <Link to="/login" className="text-textPrimary hover:text-primary transition-colors">
            <FiUser size={24} />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;