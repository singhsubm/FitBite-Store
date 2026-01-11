import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "remixicon/fonts/remixicon.css";
import SEO from "../../components/SEO";
import { useEffect } from "react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Story = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      // 1. Hero Text Animation
      gsap.from(".story-hero-text", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
      });

      // 2. The Dabba Problem Reveal
      gsap.from(".dabba-section", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: ".dabba-section",
          start: "top 75%",
        },
      });

      // 3. Ingredients Stagger
      gsap.from(".ingredient-card", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".ingredients-grid",
          start: "top 80%",
        },
      });
    },
    { scope: container }
  );

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div
      ref={container}
      className="w-full bg-[#fdfbf7] min-h-screen pt-32 pb-20 px-4 md:px-10 overflow-hidden"
    >
      <SEO
        title="Our Story"
        description="Discover the story behind FitBite.co - from identifying the 'Dabba' problem to creating personalized daily dry fruit packs for consistent nutrition."
      />

      {/* 1. HERO SECTION: 365 Days */}
      <div className="max-w-[1400px] mx-auto text-center mb-24 md:mb-32">
        <h1 className="story-hero-text text-[25vw] md:text-[20vw] leading-[0.8] playfair font-black text-[#4a3b2a] opacity-10 select-none">
          365
        </h1>
        <div className="story-hero-text -mt-8 md:-mt-16 relative z-10">
          <h2 className="text-4xl md:text-7xl playfair font-bold text-[#4a3b2a]">
            Days of <span className="text-[#d4a017] italic">Consistency</span>
          </h2>
          <p className="text-stone-500 tracking-[0.3em] uppercase mt-4 text-xs md:text-sm">
            It's not a diet, it's a lifestyle.
          </p>
        </div>
      </div>

      {/* 2. THE DABBA PROBLEM (Storytelling) */}
      <div className="dabba-section max-w-4xl mx-auto bg-white rounded-[40px] p-8 md:p-16 shadow-xl border border-[#4a3b2a]/5 mb-32 relative">
        {/* Decorative Quote Icon */}
        <div className="absolute -top-6 left-8 md:-top-8 md:-left-8 bg-[#d4a017] text-white w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-3xl shadow-lg">
          <i className="ri-double-quotes-l"></i>
        </div>

        <h3 className="text-3xl md:text-5xl playfair font-bold text-[#4a3b2a] mb-8">
          The "Dabba" Problem
        </h3>

        <div className="text-stone-600 text-lg md:text-xl leading-relaxed space-y-6 font-medium">
          <p>
            We noticed a pattern. You buy a{" "}
            <span className="text-[#4a3b2a] font-bold">1kg box of almonds</span>{" "}
            with high hopes. You eat them for 3 days.
          </p>
          <p>
            Then the box sits in the kitchen, forgotten. Buried behind the
            spices, gathering dust.
          </p>
          <hr className="border-[#4a3b2a]/10 w-1/3 my-6" />
          <p className="text-2xl md:text-3xl playfair font-bold text-[#4a3b2a]">
            Nutrition only works if it's consistent.
          </p>
          <p>
            That's why{" "}
            <span className="text-[#d4a017] font-bold playfair">
              FIT BITE.CO
            </span>{" "}
            was born. We don't just sell dry fruits; we sell a daily habit. We
            pre-portion premium Cashews, Almonds, and Walnuts into personalized
            daily packs.
          </p>
        </div>
      </div>

      {/* 3. THE INGREDIENTS */}
      <div className="max-w-[1400px] mx-auto mb-32">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]">
            What's Inside
          </span>
          <h3 className="text-4xl md:text-6xl playfair font-bold text-[#4a3b2a] mt-2">
            The Power Trio
          </h3>
        </div>

        <div className="ingredients-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Almonds */}
          <div className="ingredient-card bg-[#E8E0D5] rounded-[40px] p-8 text-center hover:-translate-y-2 transition-transform duration-500">
            <div className="w-32 h-32 mx-auto rounded-full bg-white border-4 border-[#fdfbf7] shadow-md mb-6 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1596812179986-c78ad0debed8?q=80&w=300&fit=crop"
                alt="Almond"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-2xl  font-bold text-[#4a3b2a] mb-2">
              Almonds (Badam)
            </h4>
            <p className="text-stone-600 leading-relaxed">
              Premium <span className="font-bold">Mamra almonds</span> rich in
              Vitamin E and brain-boosting healthy fats. The king of nuts.
            </p>
          </div>

          {/* Cashews */}
          <div className="ingredient-card bg-[#D3D9C9] rounded-[40px] p-8 text-center hover:-translate-y-2 transition-transform duration-500">
            <div className="w-32 h-32 mx-auto rounded-full bg-white border-4 border-[#fdfbf7] shadow-md mb-6 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1626697556426-8a55a8af4999?q=80&w=300&fit=crop"
                alt="Cashew"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-2xl font-bold text-[#4a3b2a] mb-2">
              Cashews (Kaju)
            </h4>
            <p className="text-stone-600 leading-relaxed">
              Creamy <span className="font-bold">W320 grade</span> cashews
              providing essential zinc and magnesium for instant energy.
            </p>
          </div>

          {/* Walnuts */}
          <div className="ingredient-card bg-[#E6CCBE] rounded-[40px] p-8 text-center hover:-translate-y-2 transition-transform duration-500">
            <div className="w-32 h-32 mx-auto rounded-full bg-white border-4 border-[#fdfbf7] shadow-md mb-6 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=300&fit=crop"
                alt="Walnut"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-2xl font-bold text-[#4a3b2a] mb-2">
              Walnuts (Akhrot)
            </h4>
            <p className="text-stone-600 leading-relaxed">
              Brain food loaded with <span className="font-bold">Omega-3s</span>{" "}
              to keep your focus sharp and memory strong all day.
            </p>
          </div>
        </div>
      </div>

      {/* 4. FINAL CTA (Streak) */}
      <div className="max-w-4xl mx-auto text-center bg-[#4a3b2a] rounded-[50px] p-10 md:p-20 relative overflow-hidden text-white shadow-2xl">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl playfair font-bold mb-6">
            Ready to build your{" "}
            <span className="text-[#d4a017] italic">Streak?</span>
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-xl mx-auto">
            Join thousands who have switched from "bulk buying" to "daily
            thriving".
          </p>

          <Link
            to="/shop"
            className="
    hero-btn group relative flex items-center justify-center gap-2 sm:gap-3 md:gap-4
    px-5 py-3 sm:px-7 sm:py-3.5 md:px-10 md:py-5
    bg-white text-black rounded-full
    text-sm sm:text-base md:text-lg
    font-playfair font-bold tracking-wide
    hover:bg-[#d4a017] hover:text-white
    transition-all duration-300 ease-out
    shadow-lg sm:shadow-xl md:shadow-2xl
    hover:scale-105
    z-10
    w-fit mx-auto
  "
            data-cursor="view"
          >
            {/* Left Arrow (Hidden Initially) */}
            <div
              className="
      w-0 overflow-hidden opacity-0
      group-hover:w-4 sm:group-hover:w-5 md:group-hover:w-6
      group-hover:opacity-100
      transition-all duration-300 ease-in-out
      flex items-center justify-center
    "
            >
              <i className="ri-arrow-right-line text-lg sm:text-xl md:text-2xl"></i>
            </div>

            {/* Button Text */}
            <span className="whitespace-nowrap">Start My Subscription</span>

            {/* Right Arrow (Visible Initially) */}
            <div
              className="
      w-4 sm:w-5 md:w-6
      overflow-hidden opacity-100
      group-hover:w-0 group-hover:opacity-0
      transition-all duration-300 ease-in-out
      flex items-center justify-center
    "
            >
              <i className="ri-arrow-right-line text-lg sm:text-xl md:text-2xl"></i>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Story;
