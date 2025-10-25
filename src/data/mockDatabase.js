// Import existing images
import categoryMobiles from '../assets/images/categories/mobiles.jpg';
import categoryLaptops from '../assets/images/categories/laptops.jpg';
import categoryWatches from '../assets/images/categories/watches.jpg';
import categoryMens from '../assets/images/categories/mens.jpg';
import categoryWomens from '../assets/images/categories/womens.jpg';
import categoryToys from '../assets/images/categories/toys.jpg';

import productPixel from '../assets/images/products/pixel-ultra.jpg';
import productZenith from '../assets/images/products/zenith-pro-x.jpg';
import productChrono from '../assets/images/products/chrono-watch.jpg';
import productTitanium from '../assets/images/products/titanium-smartwatch.jpg';
import productDenim from '../assets/images/products/denim-jacket.jpg';
import productSamsungS24 from '../assets/images/products/samsung-s24.jpg';
import productOppoReno from '../assets/images/products/oppo-reno.jpg';
import productIqooNeo from '../assets/images/products/iqoo-neo.jpg';
import productDigitalWatch from '../assets/images/products/digital-watch.jpg';
import productMensShirt from '../assets/images/products/mens-shirt.jpg';
import productMensTrousers from '../assets/images/products/mens-trousers.jpg';
import productMensShoes from '../assets/images/products/mens-shoes.jpg';
import productMensPolo from '../assets/images/products/mens-polo.jpg';
import productWomensDress from '../assets/images/products/womens-dress.jpg';
import productWomensHandbag from '../assets/images/products/womens-handbag.jpg';
import productWomensHeels from '../assets/images/products/womens-heels.jpg';
import productWomensBlouse from '../assets/images/products/womens-blouse.jpg';
import productWomensJeans from '../assets/images/products/womens-jeans.jpg';

// === NEW TOY IMAGE IMPORTS ===
import productRobot from '../assets/images/products/toy-robot.jpg';
import productBlocks from '../assets/images/products/toy-blocks.jpg';
import productCar from '../assets/images/products/toy-car.jpg';
// =============================

export const categories = [
  { name: 'Mobiles', imageUrl: categoryMobiles, path: '/category/Mobiles' },
  { name: 'Laptops', imageUrl: categoryLaptops, path: '/category/Laptops' },
  { name: 'Watches', imageUrl: categoryWatches, path: '/category/Watches' },
  { name: 'Men', imageUrl: categoryMens, path: '/category/Men' },
  { name: 'Women', imageUrl: categoryWomens, path: '/category/Women' },
  { name: 'Toys', imageUrl: categoryToys, path: '/category/Toys' },
];

export const allProducts = [
  // Mobiles
  {
    id: 1,
    name: 'Samsung S24 Ultra',
    brand: 'Samsung',
    category: 'Mobiles',
    price: 1299.0,
    imageUrl: productSamsungS24,
    description:
      'The latest flagship with a stunning display and pro-grade camera system.',
  },
  {
    id: 2,
    name: 'Pixel Ultra',
    brand: 'Google',
    category: 'Mobiles',
    price: 1199.0,
    imageUrl: productPixel,
    description:
      'Experience the pinnacle of smartphone photography and AI features.',
  },
  {
    id: 10,
    name: 'Oppo Reno Ace',
    brand: 'Oppo',
    category: 'Mobiles',
    price: 799.0,
    imageUrl: productOppoReno,
    description:
      'A powerful device with super-fast charging and a vibrant AMOLED display.',
  },
  {
    id: 11,
    name: 'iQOO Neo Pro',
    brand: 'iQOO',
    category: 'Mobiles',
    price: 899.0,
    imageUrl: productIqooNeo,
    description:
      'Built for gaming, with a high-refresh-rate screen and flagship performance.',
  },

  // Laptops
  {
    id: 4,
    name: 'Zenith Pro X',
    category: 'Laptops',
    price: 1850.0,
    imageUrl: productZenith,
    description:
      'Ultimate portability meets professional power. Perfect for business and travel.',
  },

  // Watches
  {
    id: 7,
    name: 'Chronograph Steel',
    category: 'Watches',
    price: 450.0,
    imageUrl: productChrono,
    description:
      'A timeless piece with a sophisticated design and leather strap.',
  },
  {
    id: 8,
    name: 'Titanium Smartwatch',
    category: 'Watches',
    price: 799.0,
    imageUrl: productTitanium,
    description:
      'Stay connected and track your fitness with this lightweight smartwatch.',
  },
  {
    id: 12,
    name: 'Minimalist Digital',
    category: 'Watches',
    price: 150.0,
    imageUrl: productDigitalWatch,
    description: 'A sleek and modern digital watch for everyday style.',
  },

  // Men's Fashion
  {
    id: 9,
    name: 'Classic Denim Jacket',
    category: 'Men',
    price: 120.0,
    imageUrl: productDenim,
    description:
      'A wardrobe staple, this denim jacket offers a timeless look and comfortable fit.',
  },
  {
    id: 13,
    name: 'Linen Casual Shirt',
    category: 'Men',
    price: 60.0,
    imageUrl: productMensShirt,
    description:
      'A breathable linen shirt perfect for warm weather and casual outings.',
  },
  {
    id: 14,
    name: 'Chino Trousers',
    category: 'Men',
    price: 75.0,
    imageUrl: productMensTrousers,
    description:
      'Versatile and stylish chino trousers for a smart-casual look.',
  },
  {
    id: 15,
    name: 'Leather Brogues',
    category: 'Men',
    price: 150.0,
    imageUrl: productMensShoes,
    description:
      'Classic leather brogues, perfect for formal and semi-formal occasions.',
  },
  {
    id: 16,
    name: 'Polo Shirt',
    category: 'Men',
    price: 45.0,
    imageUrl: productMensPolo,
    description: 'A comfortable and classic polo shirt for a sporty look.',
  },

  // Women's Fashion
  {
    id: 17,
    name: 'Elegant Maxi Dress',
    category: 'Women',
    price: 110.0,
    imageUrl: productWomensDress,
    description:
      'A flowing maxi dress for special occasions or a stylish day out.',
  },
  {
    id: 18,
    name: 'Stylish Leather Handbag',
    category: 'Women',
    price: 130.0,
    imageUrl: productWomensHandbag,
    description:
      'A chic and spacious leather handbag to complement any outfit.',
  },
  {
    id: 19,
    name: 'Classic High Heels',
    category: 'Women',
    price: 90.0,
    imageUrl: productWomensHeels,
    description: 'Elegant high heels to elevate your style for any event.',
  },
  {
    id: 20,
    name: 'Boho Chic Blouse',
    category: 'Women',
    price: 55.0,
    imageUrl: productWomensBlouse,
    description:
      'A beautiful and comfortable blouse with bohemian-inspired details.',
  },
  {
    id: 21,
    name: 'Comfort Fit Jeans',
    category: 'Women',
    price: 85.0,
    imageUrl: productWomensJeans,
    description:
      'Stylish and comfortable jeans designed for a perfect fit.',
  },

  // === NEW TOY PRODUCTS ===
  {
    id: 22,
    name: 'Interactive Robot Dog',
    category: 'Toys',
    price: 89.99,
    imageUrl: productRobot,
    description:
      'A fun and interactive robotic companion for kids, responds to voice commands.',
  },
  {
    id: 23,
    name: 'Wooden Building Blocks',
    category: 'Toys',
    price: 45.5,
    imageUrl: productBlocks,
    description:
      'A classic set of 100 wooden blocks to inspire creativity and learning.',
  },
  {
    id: 24,
    name: 'Remote Control Supercar',
    category: 'Toys',
    price: 65.0,
    imageUrl: productCar,
    description:
      'A high-speed, rechargeable remote control car with a sleek design.',
  },
  // ==========================
];
