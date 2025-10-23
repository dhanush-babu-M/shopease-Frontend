import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

// Custom hook to keep cart state in sync with localStorage
const usePersistentCart = () => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('shopease-cart');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Could not parse cart data:", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('shopease-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return [cartItems, setCartItems];
}

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = usePersistentCart();

    const addToCart = (product, quantity) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prevItems, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateItemQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};