import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { allProducts } from '../data/mockDatabase';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify'; // ✅ Toast import

const ProductDetails = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const relatedProducts = allProducts
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  // ✅ Handler for adding to cart
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} ${product.name} added to cart!`);
  };

  if (!product) {
    return (
      <div className="text-center text-xl font-bold mt-10 py-20">
        Product not found!
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="w-full">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-card-hover object-cover"
          />
        </div>

        <div>
          <span className="text-sm font-semibold text-primary uppercase">
            {product.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-textPrimary mt-2">
            {product.name}
          </h1>
          <p className="text-textSecondary mt-4 text-lg">{product.description}</p>

          <div className="my-6">
            <span className="text-4xl font-bold text-textPrimary">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-green-600 font-semibold ml-4">In Stock</span>
          </div>

          {/* ✅ Quantity Selector */}
          <div className="flex items-center space-x-4">
            <label htmlFor="quantity" className="font-bold text-textPrimary">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-20 p-2 border border-border rounded-md text-center focus:ring-2 focus:ring-primary focus:outline-none"
              min="1"
            />
          </div>

          {/* ✅ Add to Cart Button */}
          <div className="mt-8">
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </div>
        </div>
      </div>

      {/* ✅ Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-textPrimary mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
