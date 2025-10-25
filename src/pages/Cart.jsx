import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import apiClient from '../api/axiosConfig';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cartItems, removeFromCart, updateItemQuantity, clearCart } = useCart();
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setLoading(true);
    const orderItems = cartItems.map(item => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to place an order.');
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      // THIS WILL FAIL UNTIL BACKEND CORS IS FIXED
      await apiClient.post('/orders', {
        items: orderItems,
      });

      toast.success('Order placed successfully!');
      clearCart();
      navigate('/');
    } catch (error) {
      toast.error('Failed to place order. (Check backend CORS settings)');
      console.error('Order error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 container mx-auto">
        <h1 className="text-4xl font-bold text-textPrimary">Your Cart is Empty</h1>
        <p className="text-textSecondary mt-4">
          Looks like you haven't added anything yet.
        </p>
        <div className="mt-8">
          {/* 1. Fixed Button: Removed 'as={Link}' and just used 'to' prop */}
          <Button to="/products">Start Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-textPrimary mb-8">
        Your Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="flex items-center bg-surface p-4 rounded-lg shadow-card"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />

              <div className="flex-grow ml-4">
                <h2 className="font-bold text-lg text-textPrimary">{item.name}</h2>
                <p className="text-textSecondary text-sm">
                  ${item.price.toFixed(2)}
                </p>

                <div className="flex items-center mt-2">
                  {/* 2. Fixed Minus Button: Added 'disabled' state */}
                  <button
                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                    className="p-1 border rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={item.quantity === 1}
                  >
                    <FiMinus />
                  </button>

                  <span className="px-4 font-bold">{item.quantity}</span>

                  <button
                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    className="p-1 border rounded-full"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-lg text-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
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

        {/* Order Summary */}
        <div className="bg-surface p-6 rounded-lg shadow-card h-fit">
          <h2 className="text-2xl font-bold text-textPrimary border-b pb-4">
            Order Summary
          </h2>

          <div className="flex justify-between items-center my-4">
            <span className="font-semibold text-textSecondary">Subtotal</span>
            <span className="font-bold text-xl text-textPrimary">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <p className="text-sm text-gray-400">
            Shipping and taxes will be calculated at checkout.
          </p>

          <div className="mt-6">
            <Button
              className="w-full"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Placing Order...' : 'Proceed to Checkout'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
