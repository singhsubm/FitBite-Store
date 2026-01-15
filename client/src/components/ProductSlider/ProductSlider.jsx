import React, { useRef } from 'react';
import 'remixicon/fonts/remixicon.css';
// Images wahi rahne de rha hu jo tune import kiye hain
import one from '../../../public/images/one.png';
import two from '../../../public/images/two.png';
import three from '../../../public/images/three.png';
import four from '../../../public/images/four.png';
import five from '../../../public/images/five.png';
import six from '../../../public/images/six.png';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: "Premium Almonds", image: one, price: "₹899", desc: "California Gold" },
  { id: 2, name: "Royal Cashews", image: two, price: "₹1,299", desc: "W320 Jumbo Grade" },
  { id: 3, name: "Pistachios", image: three, price: "₹1,499", desc: "Salted & Roasted" },
  { id: 4, name: "Walnuts", image: four, price: "₹1,099", desc: "Kashmiri Kagzi" },
  { id: 5, name: "Dried Figs", image: five, price: "₹999", desc: "Anjeer Premium" },
  { id: 6, name: "Mixed Nuts", image: six, price: "₹1,599", desc: "Healthy Snack Mix" },
  { id: 7, name: "Royal Cashews", image: two, price: "₹1,299", desc: "W320 Jumbo Grade" },
];

const ProductSlider = () => {
  const scrollRef = useRef(null);

  // Responsive Scroll Logic
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      // Mobile pe poora screen width scroll hoga, Desktop pe 300px
      const isMobile = window.innerWidth < 768;
      const scrollAmount = isMobile ? current.offsetWidth : 350; 
      
      current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="w-full md:py-10 py-0 px-4 md:px-10">
      
      {/* 1. GLASS CONTAINER */}
      <div className="relative max-w-7xl mx-auto bg-white/40 backdrop-blur-md border border-white/50 rounded-[30px] md:rounded-[40px] p-6 md:p-12 shadow-lg">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-16 gap-6">
          <div className="w-full md:w-auto text-center md:text-left">
            <h2 className="text-3xl md:text-4xl playfair font-bold text-[#4a3b2a]">
              Our Best Sellers
            </h2>
            <p className="text-gray-500 mt-2 font-medium">Daily nutrition, curated for you.</p>
          </div>
          
          {/* Custom Navigation Buttons */}
          <div className="hidden md:flex gap-4 justify-end w-auto">
            <button onClick={() => scroll('left')} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-stone-300 flex items-center justify-center hover:bg-[#d4a017] hover:text-white hover:border-[#d4a017] transition-all duration-300"
>
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <button onClick={() => scroll('right')} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-stone-300 flex items-center justify-center hover:bg-[#d4a017] hover:text-white hover:border-[#d4a017] transition-all duration-300"
>
              <i className="ri-arrow-right-line text-xl"></i>
            </button>
          </div>
        </div>

        {/* 2. SCROLLABLE PRODUCT TRACK */}
        <div 
          ref={scrollRef}
          className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-5 hide-scrollbar scroll-smooth snap-x snap-mandatory px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((item) => (
            
            // RESPONSIVE WIDTH FIX HERE:
            // Mobile: w-full (1 card)
            // Tablet (md): w-[45%] (2 cards)
            // Desktop (lg): w-[22%] (4 cards)
            <div 
              key={item.id} 
              className="snap-center md:snap-start flex-shrink-0 w-full md:w-[48%] lg:w-[23%] mt-12 group cursor-pointer"
            >
              
              {/* CARD BODY */}
              <div className="relative bg-[#d4a017]/30 backdrop:blur-2xl rounded-3xl p-4 pt-16 md:pt-20 text-center shadow-sm border border-stone-100 transition-all duration-300 group-hover:shadow-xl h-full flex flex-col justify-between">
                
                {/* FLOATING IMAGE (Circle) */}
                <div className="absolute -top-10 md:-top-12 left-1/2 -translate-x-1/2 w-24 h-24 md:w-32 md:h-32 bg-[#fdfbf7] rounded-full shadow-md flex items-center justify-center overflow-hidden transition-transform duration-500  ">
                   <img 
                    src={item.image} 
                    alt={item.name} 
                    loading='lazy'
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 drop-shadow-lg object-center"
                   />
                </div>

                {/* CONTENT */}
                <div>
                  <h3 className="font-playfair font-bold text-lg md:text-xl text-gray-800 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-800 mb-3">{item.desc}</p>
                  
                  
                </div>

                {/* Add Button */}
                <Link to="/shop" className="w-full py-3 bg-black text-white rounded-full text-sm font-semibold group-hover:bg-[#d4a017] transition-colors duration-300 flex items-center justify-center gap-2">
                  Order Now <i className="ri-shopping-cart-2-line"></i>
                </Link>

              </div>
            </div>
          ))}
        </div>
        {/* Mobile Navigation Buttons */}
<div className="flex md:hidden justify-center gap-4 mt-0">
  <button
    onClick={() => scroll('left')}
    className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center hover:bg-[#d4a017] hover:text-white hover:border-[#d4a017] transition-all duration-300"
  >
    <i className="ri-arrow-left-line text-xl"></i>
  </button>

  <button
    onClick={() => scroll('right')}
    className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center hover:bg-[#d4a017] hover:text-white hover:border-[#d4a017] transition-all duration-300"
  >
    <i className="ri-arrow-right-line text-xl"></i>
  </button>
</div>

      </div>
    </div>
  );
};

export default ProductSlider;