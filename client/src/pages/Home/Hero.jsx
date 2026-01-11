import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import SEO from "../../components/SEO";
import { Link } from "react-router-dom";

const Hero = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".hero-text-line", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.5,
      });

      tl.to(".hero-btn", {
        opacity: 100,
        duration: 0.8,
        ease: "back.out(1.7)",
      });
    },
    { scope: containerRef }
  );

  return (
    <>
      <SEO
        title="Home"
        description="Welcome to FitBite. Discover the finest selection of premium dry fruits and daily health packs."
      />
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden bg-[#fdfbf7]"
      >
        {/* 1. BACKGROUND VIDEO CONTAINER */}
        {/* Isko position absolute diya hai */}
        <div className="relative m-auto mt-20 w-[98vw] h-[88vh] overflow-hidden rounded-3xl z-0 shadow-lg">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover scale-105 absolute"
          >
            {/* Working Direct MP4 Link */}
            <source
              src="https://www.pexels.com/download/video/6206250/"
              type="video/mp4"
            />
          </video>

          {/* Dark Overlay - Text padhne ke liye zaroori hai */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* 2. CENTER CONTENT CONTAINER */}
        {/* CHANGE: Isko 'absolute inset-0' diya taaki ye screen ke upar layer ho jaye */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pt-[10vh]">
          <h1 className="text-white mb-12">
            {/* Cursive Text */}
            <div className="mb-10 md:mb-3">
              <span className="cursive hero-text-line block text-3xl md:text-5xl  font-medium text-yellow-100 tracking-wide shadow-black drop-shadow-lg">
                We don't sell dry fruits
              </span>
            </div>

            {/* Main Bold Text */}
            <div className="overflow-hidden">
              <span className="playfair hero-text-line block text-6xl md:text-8xl font-bold uppercase tracking-tight leading-none  drop-shadow-xl">
                We Sell{" "}
                <span className="text-[#ffb700] italic">Daily Habits</span>
              </span>
            </div>
          </h1>

          {/* Button */}
          <Link to="/shop"
            className="hero-btn group relative flex items-center gap-3 md:gap-4 px-6 py-3 md:px-10 md:py-5 bg-white text-black rounded-full text-base md:text-lg font-playfair font-bold tracking-wide hover:bg-[#d4a017] hover:text-white transition-all duration-300 shadow-xl md:shadow-2xl hover:scale-105 z-10 opacity-0 cursor-none"
            data-cursor="view"
          >
            {/* Left Arrow (Hidden Initially) */}
            {/* Mobile pe width kam khulegi (w-5), Desktop pe jyada (w-6) */}
            <div className="w-0 overflow-hidden opacity-0 group-hover:w-5 md:group-hover:w-6 group-hover:opacity-100 transition-all duration-300 ease-in-out flex items-center justify-center">
              <i className="ri-arrow-right-line text-xl md:text-2xl"></i>
            </div>

            {/* Button Text */}
            <span className="whitespace-nowrap">Start Your Habit</span>

            {/* Right Arrow (Visible Initially) */}
            <div className="w-5 md:w-6 overflow-hidden opacity-100 group-hover:w-0 group-hover:opacity-0 transition-all duration-300 ease-in-out flex items-center justify-center">
              <i className="ri-arrow-right-line text-xl md:text-2xl"></i>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
