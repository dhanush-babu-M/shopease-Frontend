import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import Button from './Button';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade'; // Import fade effect CSS

// === UPDATED LINES: Changed .jpg to .png ===
import banner1 from '../assets/images/ui/banner1.png';
import banner2 from '../assets/images/ui/banner2.png';
import banner3 from '../assets/images/ui/banner3.png';
// ===========================================

const slides = [
  {
    image: banner1,
    title: "Level Up Your Tech",
    subtitle: "Explore the latest in high-performance laptops and gadgets.",
    link: "/category/Laptops"
  },
  {
    image: banner2,
    title: "Smart Connections",
    subtitle: "Discover the new generation of flagship smartphones.",
    link: "/category/Mobiles"
  },
  {
    image: banner3,
    title: "Find Your Style",
    subtitle: "Shop the new collection for Men and Women.",
    link: "/category/Men"
  },
];

const HeroCarousel = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      effect="fade" // Use the fade effect
      fadeEffect={{
        crossFade: true
      }}
      pagination={{
        clickable: true,
        // Custom pagination bullets
        renderBullet: function (index, className) {
          return '<span class="' + className + ' w-3 h-3 bg-white/50 rounded-full mx-1 transition-all duration-300"></span>';
        },
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className="h-[70vh] w-full" // Set a height
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="relative">
          <img 
            src={slide.image} 
            alt={`Banner ${index + 1}`} 
            className="w-full h-full object-cover" 
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg mb-4">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 mb-8">
              {slide.subtitle}
            </p>
            <Button to={slide.link} variant="primary" className="text-lg">
              Shop Now
            </Button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousel;