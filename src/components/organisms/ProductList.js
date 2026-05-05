import React from "react";
import ProductCard from "../molecules/ProductCard";

const ProductList = ({ products }) => {
  return (
    <div>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductList;