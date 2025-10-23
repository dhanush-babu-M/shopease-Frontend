import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiPlus } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-surface rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300 group overflow-hidden">
      <Link to={`/product/${product.id}`} className="block relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white bg-black/50 px-4 py-2 rounded-full font-semibold">View Details</span>
        </div>
      </Link>
      <div className="p-4">
        <p className="text-sm text-textSecondary">{product.category}</p>
        <h3 className="text-lg font-bold text-textPrimary truncate mt-1">
          <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">{product.name}</Link>
        </h3>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-extrabold text-primary">${product.price.toFixed(2)}</p>
          <button 
            onClick={() => addToCart(product, 1)}
            className="bg-primary text-white p-2 rounded-full hover:bg-opacity-90 transition transform hover:scale-110"
            aria-label={`Add ${product.name} to cart`}
          >
            <FiPlus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;