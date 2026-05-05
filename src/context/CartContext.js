import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.id === product.id && i.selectedSize === product.selectedSize
      );
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.selectedSize === product.selectedSize
            ? { ...i, qty: (i.qty || 1) + (product.qty || 1) }
            : i
        );
      }
      return [...prev, { ...product, qty: product.qty || 1 }];
    });
  };

  const removeFromCart = (id, selectedSize) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.selectedSize === selectedSize)));
  };

  const updateQty = (id, selectedSize, qty) => {
    if (qty < 1) { removeFromCart(id, selectedSize); return; }
    setCart((prev) =>
      prev.map((i) =>
        i.id === id && i.selectedSize === selectedSize ? { ...i, qty } : i
      )
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, i) => sum + i.priceINR * (i.qty || 1), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;