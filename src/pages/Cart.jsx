import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import apiClient from '../api/axiosConfig'; // <-- IMPORT API CLIENT
import { toast } from 'react-toastify'; // <-- IMPORT TOAST

const Cart = () => {
    // 1. Get cart functions AND the clearCart function
    const { cartItems, removeFromCart, updateItemQuantity, clearCart } = useCart();
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 2. Create the checkout handler
    const handleCheckout = async () => {
        setLoading(true);

        // 3. Format cart data for the backend (as specified in your Day 2 DTOs)
        const orderItems = cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity
        }));

        // 4. Check if user is logged in (by checking for token)
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Please log in to place an order.");
            setLoading(false);
            navigate('/login');
            return;
        }

        try {
            // 5. Call the backend /orders endpoint
            // The JWT token is automatically attached by axiosConfig.js!
            await apiClient.post('/orders', {
                items: orderItems 
            });

            toast.success("Order placed successfully!");
            clearCart(); // Clear the cart from context
            setLoading(false);
            navigate('/'); // Go back home

        } catch (error) {
            setLoading(false);
            toast.error("Failed to place order. Please try again.");
            console.error("Order error:", error);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-20 container mx-auto">
                <h1 className="text-4xl font-bold text-textPrimary">Your Cart is Empty</h1>
                <p className="text-textSecondary mt-4">Looks like you haven't added anything yet.</p>
                <div className="mt-8">
                    <Button as={Link} to="/products">Start Shopping</Button> {/* Fixed Button usage */}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-extrabold text-textPrimary mb-8">Your Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex items-center bg-surface p-4 rounded-lg shadow-card">
                            <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                            <div className="flex-grow ml-4">
                                <h2 className="font-bold text-lg text-textPrimary">{item.name}</h2>
                                <p className="text-textSecondary text-sm">${item.price.toFixed(2)}</p>
                                <div className="flex items-center mt-2">
                                    <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="p-1 border rounded-full"><FiMinus /></button>
                                    <span className="px-4 font-bold">{item.quantity}</span>
                                    <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="p-1 border rounded-full"><FiPlus /></button>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700 mt-2"
                                    aria-label={`Remove ${item.name}`}
                                >
                                    <FiTrash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-surface p-6 rounded-lg shadow-card h-fit">
                    <h2 className="text-2xl font-bold text-textPrimary border-b pb-4">Order Summary</h2>
                    <div className="flex justify-between items-center my-4">
                        <span className="font-semibold text-textSecondary">Subtotal</span>
                        <span className="font-bold text-xl text-textPrimary">${totalPrice.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-400">Shipping and taxes will be calculated at checkout.</p>
                    <div className="mt-6">
                        {/* 6. Connect the handler to the checkout button */}
                        <Button className="w-full" onClick={handleCheckout} disabled={loading}>
                            {loading ? 'Placing Order...' : 'Proceed to Checkout'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;