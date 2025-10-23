import React from 'react';
import { useParams } from 'react-router-dom';
import { allProducts } from '../data/mockDatabase';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const products = allProducts.filter(p => p.category === categoryName);

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-extrabold text-textPrimary mb-8">
                Browsing: "{categoryName}"
            </h1>
            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-textSecondary text-lg py-16">
                    No products found in this category.
                </p>
            )}
        </div>
    );
};

export default CategoryPage;