import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import 'remixicon/fonts/remixicon.css';

// Placeholder Images
const IMG_1 = "https://images.unsplash.com/photo-1596812179986-c78ad0debed8?q=80&w=300&h=300&fit=crop"; 
const IMG_2 = "https://images.unsplash.com/photo-1626697556426-8a55a8af4999?q=80&w=300&h=300&fit=crop"; 
const IMG_3 = "https://images.unsplash.com/photo-1615485737646-a0363aba01ec?q=80&w=300&h=300&fit=crop"; 

const MarqueeSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Move Left Logic
    gsap.to(".marquee-move-left", {
      xPercent: -50,
      ease: "none",
      duration: 15, // Thoda tez kiya desktop ke liye
      repeat: -1
    });

    // 2. Move Right Logic
    gsap.fromTo(".marquee-move-right", 
      { xPercent: -50 },
      {
        xPercent: 0,
        ease: "none",
        duration: 15,
        repeat: -1
      }
    );
  }, { scope: containerRef });

  // Reusable Ribbon Component
  const Ribbon = ({ text, img, color, rotate, moveClass, textColor = "text-[#4a3b2a]", zIndex, margin }) => (
    <div className={`${color} ${rotate} ${zIndex} ${margin} w-[110vw] -ml-[5vw] py-6 md:py-16 flex overflow-hidden border-y-2 border-black/10 shadow-lg relative`}>
      
      {/* Track Wrapper */}
      <div className={`flex gap-8 md:gap-24 whitespace-nowrap ${moveClass} will-change-transform`}>
        
        {/* Loop Content */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-8 md:gap-24">
            
            {/* TEXT: Laptop pe 9vw (Bahut Bada) */}
            <span className={`text-6xl md:text-[9vw] playfair font-black uppercase tracking-tighter ${textColor} leading-none`}>
              {text}
            </span>
            
            {/* IMAGE: Laptop pe Bada Circle */}
            <div className="w-16 h-16 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/50 shadow-inner shrink-0">
               <img src={img} alt="icon" className="w-full h-full object-cover scale-110" />
            </div>
            
          </div>
        ))}

      </div>
    </div>
  );

  return (
    // CONTAINER: md:h-screen (Laptop pe full height), justify-center (Vertically Center)
    <div ref={containerRef} className="w-full mt-20 md:py-0 md:h-screen bg-[#fdfbf7] overflow-hidden flex flex-col justify-center items-center relative">
      
      {/* RIBBON 1 */}
      <Ribbon 
        text="100% Natural • Premium •" 
        img={IMG_1} 
        color="bg-[#F5F5F0]" 
        rotate="rotate-[-3deg] origin-center"
        zIndex="z-30"
        margin="mb-0" // Mobile spacing
        moveClass="marquee-move-left"
      />

      {/* RIBBON 2 (Overlap logic updated for massive size) */}
      <Ribbon 
        text="No Preservatives • Fresh •" 
        img={IMG_2} 
        color="bg-[#fffbeb]" 
        rotate="rotate-[2deg] origin-center"
        zIndex="z-20"
        margin="-mt-8 md:-mt-24" // Laptop pe zyada overlap (-mt-24)
        moveClass="marquee-move-right"
        textColor="text-[#d4a017]"
      />

      {/* RIBBON 3 */}
      <Ribbon 
        text="Healthy Habits • Power •" 
        img={IMG_3} 
        color="bg-[#F2F5F0]" 
        rotate="rotate-[-2deg] origin-center"
        zIndex="z-10"
        margin="-mt-8 md:-mt-24" // Laptop pe zyada overlap
        moveClass="marquee-move-left"
      />

    </div>
  );
};

export default MarqueeSection;