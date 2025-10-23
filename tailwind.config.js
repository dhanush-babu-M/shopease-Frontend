/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4F46E5',      // A deep, modern indigo
        'secondary': '#EC4899',    // A vibrant pink for accents
        'background': '#F8F9FA',  // A very light grey for the page background
        'textPrimary': '#111827',  // A dark grey for primary text
        'textSecondary': '#6B7280', // A lighter grey for secondary text
        'surface': '#FFFFFF',      // For cards and surfaces
        'border': '#E5E7EB',       // A light border color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // A clean, modern font
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)',
        'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      }
    },
  },
  plugins: [],
}