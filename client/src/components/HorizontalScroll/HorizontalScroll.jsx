import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// GSAP Plugin Register
gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 1,
    title: "Handpicked",
    subtitle: "FROM THE BEST FARMS",
    img: "https://images.unsplash.com/photo-1596812179986-c78ad0debed8?q=80&w=1170&auto=format&fit=crop", 
    theme: "text-white"
  },
  {
    id: 2,
    title: "Sorted",
    subtitle: "ONLY THE JUMBO SIZES",
    img: "https://images.unsplash.com/photo-1626697556426-8a55a8af4999?q=80&w=1170&auto=format&fit=crop", 
    theme: "text-[#d4a017]" 
  },
  {
    id: 3,
    title: "Roasted",
    subtitle: "TO PERFECTION",
    img: "https://images.unsplash.com/photo-1596421098407-9959661dec18?q=80&w=1170&auto=format&fit=crop", 
    theme: "text-white"
  },
  {
    id: 4,
    title: "Sealed",
    subtitle: "FRESHNESS LOCKED IN",
    img: "https://images.unsplash.com/photo-1615485737646-a0363aba01ec?q=80&w=735&auto=format&fit=crop", 
    theme: "text-white"
  },
  {
    id: 5,
    title: "Delivered",
    subtitle: "TO YOUR DOORSTEP",
    img: "https://plus.unsplash.com/premium_photo-1661342486992-2a08d4b466ef?q=80&w=1170&auto=format&fit=crop", 
    theme: "text-[#d4a017]" 
  }
];

const HorizontalScroll = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useGSAP(() => {
    
    // Logic: Total scroll width minus one screen width (taaki last slide screen pe ruke)
    const getScrollAmount = () => {
        let racesWidth = sectionRef.current.scrollWidth;
        return -(racesWidth - window.innerWidth);
    };

    const tween = gsap.to(sectionRef.current, {
      x: getScrollAmount, // Correct calculation for ending exactly at last slide
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: 1,
        stagger:1,
        // Duration logic: horizontal scroll distance ke barabar vertical scroll karega
        end: () => `+=${getScrollAmount() * -1}`, 
        invalidateOnRefresh: true, // Resize hone pe recalculate karega
      }
    });

    return () => {
        tween.kill(); // Cleanup
    }

  }, { scope: triggerRef });

  return (
    <div className='bg-[#fdfbf7] hidden lg:block'>
      
      {/* 1. TRIGGER WRAPPER (VIEWPORT) */}
      {/* CHANGE: Isko w-[400vw] se w-full kar diya. Ye Window hai. */}
      <div ref={triggerRef} className="relative h-screen w-full overflow-hidden">
        
        {/* 2. MOVING CONTAINER (LONG STRIP) */}
        {/* CHANGE: Width dynamic kar di 'style' ke through taaki slides badhane pe code na toote */}
        <div 
            ref={sectionRef} 
            className="flex h-full"
            style={{ width: `${slides.length * 100}%` }} 
        >
          
          {slides.map((slide, index) => (
            <div key={index} className="w-screen lg:cursor-none h-screen relative cursor-pointer flex-shrink-0 flex items-center justify-center overflow-hidden" data-cursor="trust">
              
              {/* BACKGROUND IMAGE */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={slide.img} 
                  alt={slide.title} 
                  className="w-full h-full object-cover brightness-[0.6]" 
                />
              </div>

              {/* HUGE TEXT CONTENT */}
              <div className="relative z-10 text-center mix-blend-normal">
                
                <div className="text-xl md:text-2xl font-cursive text-white/80 mb-4 tracking-widest">
                  0{index + 1} &nbsp; — &nbsp; PROCESS
                </div>

                <h1 className={`text-[12vw] md:text-[15vw] leading-none playfair font-bold uppercase tracking-tighter ${slide.theme} drop-shadow-2xl`}>
                  {slide.title}
                </h1>

                <h2 className="text-xl md:text-4xl font-light text-white/90 tracking-[0.3em] md:tracking-[0.5em] mt-2 uppercase font-sans">
                  {slide.subtitle}
                </h2>

              </div>
              
              {/* Artistic Line/Border */}
              <div className="absolute bottom-10 left-10 w-[90%] h-[1px] bg-white/30"></div>
              
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;