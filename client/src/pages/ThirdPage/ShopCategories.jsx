import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Link } from "react-router-dom";


gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: 1,
    name: "Almonds",
    sub: "PREMIUM MAMRA",
    // Glass Jar Image Placeholder
    img: "https://images.unsplash.com/photo-1508779018996-601e37fa274e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    color: "bg-[#fff4d4]" // Soft Grey/Beige
  },
  {
    id: 2,
    name: "Cashews",
    sub: "W320 GRADE",
    // Glass Jar Image Placeholder
    img: "https://images.unsplash.com/photo-1627820752174-acae1b399128?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "bg-[#e1edff]" // Soft Blueish Grey
  },
  {
    id: 3,
    name: "Walnuts",
    sub: "KASHMIRI GIRI",
    // Glass Jar Image Placeholder
    img: "https://images.unsplash.com/photo-1597919926163-9419065218b4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "bg-[#ffe8e8]" // Soft Rose
  },
  {
    id: 4,
    name: "Pistachios",
    sub: "ROASTED & SALTED",
    // Glass Jar Image Placeholder
    img: "https://plus.unsplash.com/premium_photo-1663851517248-85c7c9538c30?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "bg-[#f8eeff]" // Soft Green
  }
];

const ShopCategories = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Staggered Animation for Bottles
    gsap.from(".category-card", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2, // Ek ke baad ek aayenge
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", // Jab section screen pe 80% dikhe tab start ho
      }
    });
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="w-full lg:py-10 py-0 pb-20">
      
      {/* Heading */}
      <div className="text-center mb-0">
        <h2 className="text-4xl md:text-6xl playfair font-bold text-[#4a3b2a] uppercase tracking-tight drop-shadow-lg">
            Shop by Category
          </h2>
        <p className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase mt-4 text-stone-500">Pure. Natural. Preserved.</p>
      </div>

      {/* GRID LOGIC (User Requirement):
        - Phone (default): grid-cols-2
        - Tablet (md): grid-cols-4
        - Desktop (lg): grid-cols-4
      */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 w-full px-4 md:px-10 max-w-[1600px] mx-auto">
        
        {categories.map((item) => (
          <Link 
            to={`/shop`} 
            key={item.id} 
            state={{ category: item.name }}
            className={`category-card group relative flex flex-col items-center justify-end h-[40vh] md:h-[60vh] overflow-hidden cursor-none transition-transform duration-500  hover:scale-105 `}
            data-cursor="natural"
          >
            
            {/* Background Color Block (Bottom me fade effect) */}
            <div className={`absolute bottom-0 w-full h-[80%] ${item.color}  rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl`}></div>

            {/* Bottle/Product Image */}
            {/* Hum yahan mix-blend-multiply use kar rhe hai taaki image background ke sath blend ho jaye (Clean look) */}
            <div className="relative z-10 w-[80%] h-[70%] transition-transform duration-700 ease-out group-hover:-translate-y-6">
                <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full object-cover shadow-lg md:shadow-none group-hover:shadow-2xl transition-all duration-500"
                />
                
                {/* Floating Elements (Just like reference - Butterfly/Leaf placeholder logic) */}
                
            </div>

            {/* Text Content (Bottom) */}
            <div className="relative z-10 text-center mt-6 mb-4 md:mb-10">
              <h3 className="text-2xl md:text-3xl font-playfair text-[#4a3b2a] group-hover:text-black transition-colors">
                {item.name}
              </h3>
              <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-stone-400 mt-1 uppercase group-hover:text-[#d4a017] transition-colors">
                {item.sub}
              </p>
            </div>

          </Link>
        ))}

      </div>

    </div>
  );
};

export default ShopCategories;