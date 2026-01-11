import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    id: 1,
    title: "The Taster",
    sub: "3-DAY TRIAL",
    price: "₹499",
    rating: "4.8",
    // Premium Earthy Beige
    // bgColor: "bg-[#E8E0D5]", 
    bgColor: "bg-[#fff3ce]", 
    btnColor: "text-[#8B7355]",
    btnBg: "bg-white",
    img: "https://images.unsplash.com/photo-1596812179986-c78ad0debed8?q=80&w=500&auto=format&fit=crop", // Almonds
    floatItem: "ri-leaf-line"
  },
  {
    id: 2,
    title: "The Daily Habit",
    sub: "1-WEEK POWER",
    price: "₹999",
    rating: "4.9",
    // Soft Sage Green (Nature feel)
    // bgColor: "bg-[#D3D9C9]", 
    bgColor: "bg-[#fff3ce]", 
    btnColor: "text-[#556B2F]",
    btnBg: "bg-white",
    img: "https://images.unsplash.com/photo-1626697556426-8a55a8af4999?q=80&w=500&auto=format&fit=crop", // Cashews
    floatItem: "ri-fire-line"
  },
  {
    id: 3,
    title: "The Lifestyle",
    sub: "1-MONTH FEAST",
    price: "₹2,999",
    rating: "5.0",
    // Warm Sand/Terracotta (Royal feel)
    // bgColor: "bg-[#E6CCBE]", 
    bgColor: "bg-[#fff3ce]", 
    btnColor: "text-[#8D5A46]",
    btnBg: "bg-white",
    img: "https://images.unsplash.com/photo-1615485737646-a0363aba01ec?q=80&w=500&auto=format&fit=crop", // Pistachios
    floatItem: "ri-crown-line"
  },
];

const FlavorPalette = () => {
  const container = useRef(null);

  useGSAP(() => {
    // Stagger Animation
    gsap.from(".flavor-card", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      }
    });

    // Tilted Text Animation
    gsap.from(".tilted-text", {
      x: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      }
    });

  }, { scope: container });

  return (
    <div ref={container} className="w-full bg-[#fdfbf7] py-20 overflow-hidden relative">
      
      {/* 1. HEADER SECTION (Minimal & Classy) */}
      <div className="relative w-full mb-20 md:mb-28 px-4 text-center">
        <h2 className="text-4xl md:text-6xl playfair font-bold text-[#4a3b2a] uppercase tracking-tight drop-shadow-lg">
            Curated Plans
          </h2>
        <p className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase mt-4 text-stone-500">
            Choose your wellness journey
        </p>
      </div>

      {/* 2. CARDS CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* GRID: Phone (1 col), Tablet/Laptop (3 col) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-24 gap-x-10 mt-10">
            
            {items.map((item) => (
                <Link to="/shop" key={item.id} className="flavor-card group relative flex flex-col items-center cursor-none " data-cursor="view">
                    
                    {/* CARD BODY */}
                    <div className={`${item.bgColor} w-full rounded-[40px] p-6 pt-24 pb-8 text-center text-[#4a3b2a] shadow-lg transition-transform duration-500 hover:-translate-y-3 relative overflow-visible`}>
                        
                        {/* FLOATING IMAGE (Circle Plate) */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-36 h-36 md:w-44 md:h-44 rounded-full border-[6px] border-[#fdfbf7] shadow-xl overflow-hidden bg-white z-20 group-hover:scale-105 transition-transform duration-500">
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                        </div>

                        {/* Floating Icon (Leaf/Fire/Crown) */}
                        <div className="absolute -top-20 -right-2 text-3xl md:text-4xl opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 group-hover:rotate-12 transition-all duration-700 text-[#4a3b2a] drop-shadow-md z-30 bg-white/40 backdrop-blur-md rounded-full p-2">
                            <i className={item.floatItem}></i>
                        </div>

                        {/* Text Content */}
                        <div className="mt-4">
                            <p className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60 mb-1">{item.sub}</p>
                            <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-2">{item.title}</h3>
                        </div>
                        
                        {/* Price & Rating */}
                        <div className="flex justify-center items-center gap-3 mb-8">
                            <span className="text-xl md:text-2xl font-black opacity-90">{item.price}</span>
                            <div className="flex items-center gap-1 bg-white/30 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                                <i className="ri-star-fill text-[#d4a017]"></i> {item.rating}
                            </div>
                        </div>

                        {/* Order Button (Pill Shape) */}
                        <button className={`w-full flex justify-between items-center ${item.btnBg} rounded-full p-1 pl-6 pr-1 shadow-sm hover:shadow-md transition-shadow group-hover:scale-[1.02] duration-300`}>
                            <span className={`text-sm font-bold uppercase tracking-wide ${item.btnColor}`}>Start Now</span>
                            <div className={`w-10 h-10 rounded-full bg-[#4a3b2a] flex items-center justify-center`}>
                                <i className="ri-arrow-right-line text-white"></i>
                            </div>
                        </button>

                    </div>
                </Link>
            ))}

        </div>

      </div>

    </div>
  );
};

export default FlavorPalette;