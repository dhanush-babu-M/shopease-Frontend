import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link 
      to={category.path} 
      className="relative block group overflow-hidden rounded-xl shadow-card"
    >
      <img 
        src={category.imageUrl} 
        alt={category.name} 
        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"></div>
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-white text-xl font-bold drop-shadow-lg">
          {category.name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;