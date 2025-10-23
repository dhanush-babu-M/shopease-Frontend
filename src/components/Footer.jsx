import React from 'react';
// 1. IMPORTED FaLinkedin
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/images/ui/logo.png'; 

const Footer = () => {
  // 2. STORED YOUR LINKS HERE FOR CLEANLINESS
  const socialLinks = {
    // Note: I changed this from /saved/ to your main profile, as /saved/ is private to you
    instagram: "https://www.instagram.com/just._.dhanush69/", 
    linkedin: "https://www.linkedin.com/in/dhanush-babu-mamuduru-3863a2276/",
    github: "https://github.com/dhanush-babu-M",
    facebook: "https://www.facebook.com/"
  };

  // Helper function to prevent placeholder links from navigating
  const handlePlaceholderClick = (e) => {
    e.preventDefault();
    alert("This is a placeholder link!");
  };

  return (
    <footer className="bg-textPrimary text-white mt-24">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="ShopEase Logo" className="h-8 w-auto bg-white rounded-md p-1" />
              <span className="font-extrabold text-2xl">ShopEase</span>
            </Link>
            <p className="mt-4 text-gray-400">Your premium destination for the latest trends in tech and fashion.</p>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h3 className="font-bold text-lg mb-4 uppercase tracking-wider">Shop</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/category/Mobiles" className="hover:text-primary transition-colors">Mobiles</Link></li>
              <li><Link to="/category/Laptops" className="hover:text-primary transition-colors">Laptops</Link></li>
              <li><Link to="/category/Watches" className="hover:text-primary transition-colors">Watches</Link></li>
              <li><Link to="/products" className="hover:text-primary transition-colors">All Products</Link></li>
            </ul>
          </div>

          {/* Column 3: About (with fixes for href warnings) */}
          <div>
            <h3 className="font-bold text-lg mb-4 uppercase tracking-wider">About</h3>
              <ul className="space-y-2 text-gray-300">
                {/* 3. FIXED placeholder links to be valid and not navigate */}
                <li><a href="/about" onClick={handlePlaceholderClick} className="hover:text-primary transition-colors">Our Story</a></li>
                <li><a href="/careers" onClick={handlePlaceholderClick} className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="/press" onClick={handlePlaceholderClick} className="hover:text-primary transition-colors">Press</a></li>
              </ul>
          </div>
          
          {/* Column 4: Follow Us (with your links) */}
          <div>
            <h3 className="font-bold text-lg mb-4 uppercase tracking-wider">Follow Me</h3>
            <div className="flex space-x-5">
              
              {/* 4. ADDED YOUR LINKS + target="_blank" to open in new tab */}
              {/* Added rel="noopener noreferrer" for security */}
              
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary text-2xl transition-transform hover:scale-110"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin />
              </a>
              
              <a 
                href={socialLinks.github}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary text-2xl transition-transform hover:scale-110"
                aria-label="GitHub Profile"
              >
                <FaGithub />
              </a>

              <a 
                href={socialLinks.instagram}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary text-2xl transition-transform hover:scale-110"
                aria-label="Instagram Profile"
              >
                <FaInstagram />
              </a>

              <a 
                href={socialLinks.facebook}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary text-2xl transition-transform hover:scale-110"
                aria-label="Facebook Profile"
              >
                <FaFacebook />
              </a>

            </div>
          </div>

        </div>
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400">
          {/* 5. This personalized line is perfect! Kept as-is. */}
          <p>&copy; {new Date().getFullYear()} ShopEase. A Dhanush Babu Mamuduru e-commerce Project.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;