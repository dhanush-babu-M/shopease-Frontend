import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import Button from '../components/Button';
import { categories, allProducts } from '../data/mockDatabase';
import { FiTruck, FiShield, FiHeadphones } from 'react-icons/fi';

import heroBackground from '../assets/images/ui/hero-background.png'; // <-- UPDATED TO .png

const ProductCarousel = ({ title, products }) => (
  <section>
    <h2 className="text-3xl font-bold text-textPrimary mb-6">{title}</h2>
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      className="pb-12" // Add padding for pagination
    >
      {products.map(product => (
        <SwiperSlide key={product.id}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

const Feature = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-textSecondary">{description}</p>
  </div>
);


const Home = () => {
  const deals = allProducts.slice(0, 8);
  const topElectronics = allProducts.filter(p => p.category === 'Mobiles' || p.category === 'Laptops');

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section 
        className="relative text-white flex items-center justify-center min-h-[60vh]"
        style={{ backgroundImage: `url(${heroBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">Discover Your Next Favorite Thing</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto opacity-90">Unbeatable deals, unmatched quality, and a seamless shopping experience.</p>
          <div className="mt-8">
            <Button to="/products" className="text-lg">Explore Collection</Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 space-y-24">
        {/* Categories Section */}
        <section>
          <h2 className="text-3xl font-bold text-textPrimary mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map(category => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
        </section>
        
        <ProductCarousel title="Today's Hot Deals" products={deals} />
        
        {/* Features Section */}
        <section className="bg-surface rounded-xl p-8 shadow-card">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Feature icon={<FiTruck size={28}/>} title="Fast Shipping" description="Get your orders delivered to your doorstep in no time." />
              <Feature icon={<FiShield size={28}/>} title="Secure Payments" description="Your payments are safe and secure with our encryption." />
              <Feature icon={<FiHeadphones size={28}/>} title="24/7 Support" description="Our team is here to help you around the clock." />
           </div>
        </section>

        <ProductCarousel title="Top Picks in Electronics" products={topElectronics} />
      </div>
    </div>
  );
};

export default Home;