import React, { useState, useEffect } from 'react'; // 1. ADDED useEffect
import ProductCard from '../components/ProductCard';
// import { allProducts } from '../data/mockDatabase'; // 2. REMOVED mock data
import apiClient from '../api/axiosConfig'; // 3. ADDED our API client

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]); // 4. ADDED state for products from API
  const [loading, setLoading] = useState(true); // ADDED loading state
  const [error, setError] = useState(null); // ADDED error state

  // 5. ADDED useEffect to fetch data when the page loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // This calls: http://localhost:8080/api/products
        const response = await apiClient.get('/products');
        setProducts(response.data); // Save backend data to state
        setError(null); // Clear any old errors
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false); // Always stop loading
      }
    };

    fetchProducts(); // Run the function
  }, []); // The empty [] means this runs only once when the page loads

  // 6. UPDATED this line to filter the 'products' state, not 'allProducts'
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 7. ADDED render logic for loading and error states
  if (loading) {
    return <div className="text-center p-12">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center p-12 text-red-600">{error}</div>;
  }

  // This is your original return, which is perfect!
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-textPrimary">Our Entire Collection</h1>
        <p className="text-textSecondary mt-2">Find exactly what you're looking for.</p>
        <input
          type="text"
          placeholder="Search for products..."
          className="mt-4 w-full max-w-lg mx-auto p-3 border border-border rounded-full shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none"
          onChange={e => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;