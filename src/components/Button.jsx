import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, onClick, to, className = '', variant = 'primary' }) => {
  const baseStyles = `
    font-semibold py-3 px-8 rounded-lg
    transition-all duration-300 ease-in-out
    transform hover:-translate-y-1 focus:outline-none focus:ring-4
    inline-block text-center
  `;

  const variants = {
    primary: 'bg-primary text-white hover:bg-opacity-90 focus:ring-primary/50',
    secondary: 'bg-secondary text-white hover:bg-opacity-90 focus:ring-secondary/50',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/50'
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};

export default Button;