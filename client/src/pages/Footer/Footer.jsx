import React, { useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import { Link } from 'react-router-dom'; // 1. Link Import kiya
import { useToast } from '../../context/ToastContext'; // 2. Toast Import kiya
import API from "../../api/axios"

const Footer = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');

  // Newsletter Logic
  const handleSubscribe = async (e) => {
  e.preventDefault();
  if (!email) return showToast("Please enter email", "error");

  try {
    // API Call
    await API.post('/newsletter', { email });
    showToast("Subscribed successfully! Welcome to the family.", "success");
    setEmail('');
  } catch (error) {
    // Agar duplicate hai to error dikhao
    showToast(error.response?.data?.message || "Subscription failed", "error");
  }
};

  return (
    <footer className="w-full bg-[#fdfbf7] pt-16 md:pt-32 pb-8 px-6 md:px-10 border-t border-[#4a3b2a]/10 overflow-hidden relative">
      
      <div className="max-w-[1600px] mx-auto">
        
        {/* 1. TOP SECTION: Newsletter & Links */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-0 mb-16 lg:mb-32">
          
          {/* Newsletter (Left Side) */}
          <div className="w-full lg:w-1/3">
            <h3 className="text-3xl md:text-4xl font-playfair font-bold text-[#4a3b2a] mb-6 leading-tight">
              Stay in the loop.
            </h3>
            
            {/* Form banaya taki Enter press karne par submit ho */}
            <form onSubmit={handleSubscribe} className="relative border-b border-[#4a3b2a]/30 pb-2 flex items-center">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="w-full bg-transparent outline-none text-[#4a3b2a] placeholder-stone-400 font-medium text-base md:text-lg"
              />
              <button type="submit" className="text-[#4a3b2a] hover:text-[#d4a017] transition-colors p-2">
                <i className="ri-arrow-right-up-line text-2xl"></i>
              </button>
            </form>
            
            <p className="text-xs text-stone-400 mt-4 tracking-wide">
              *No spam, just healthy vibes.
            </p>
          </div>

          {/* Links (Right Side) */}
          <div className="w-full lg:w-auto grid grid-cols-2 lg:flex gap-y-10 gap-x-4 lg:gap-24">
            
            {/* Column 1: Shop */}
            <div className="flex flex-col gap-3 lg:gap-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#d4a017] mb-2">Shop</h4>
              
              <Link to="/shop" className="text-[#4a3b2a] text-sm md:text-base font-medium hover:italic hover:translate-x-1 transition-all duration-300">Almonds</Link>
              <Link to="/shop" className="text-[#4a3b2a] text-sm md:text-base font-medium hover:italic hover:translate-x-1 transition-all duration-300">Cashews</Link>
              <Link to="/shop" className="text-[#4a3b2a] text-sm md:text-base font-medium hover:italic hover:translate-x-1 transition-all duration-300">Gift Boxes</Link>
              <Link to="/shop" className="text-[#4a3b2a] text-sm md:text-base font-medium hover:italic hover:translate-x-1 transition-all duration-300">Subscription</Link>
            </div>

            {/* Column 2: Company */}
            <div className="flex flex-col gap-3 lg:gap-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#d4a017] mb-2">Company</h4>
              
              <Link to="/story" className="text-[#4a3b2a] text-sm md:text-base font-medium hover:italic hover:translate-x-1 transition-all duration-300">Our Story</Link>
              <Link to="/blog" className="text-[#4a3b2a] text-sm md:text-base font-medium hover:italic hover:translate-x-1 transition-all duration-300">Journal</Link>
              <Link to="/contact" className="text-[#4a3b2a] text-sm md:text-base font-medium hover:italic hover:translate-x-1 transition-all duration-300">Contact</Link>
              <Link to="/faq" className="text-[#4a3b2a] text-sm md:text-base font-medium hover:italic hover:translate-x-1 transition-all duration-300">FAQ</Link>
            </div>

            {/* Column 3: Socials */}
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-4 mt-2 lg:mt-0">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#d4a017] mb-2">Socials</h4>
              <div className="flex gap-4">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#4a3b2a]/20 flex items-center justify-center text-[#4a3b2a] hover:bg-[#4a3b2a] hover:text-white transition-all duration-300">
                  <i className="ri-instagram-line text-lg md:text-xl"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#4a3b2a]/20 flex items-center justify-center text-[#4a3b2a] hover:bg-[#4a3b2a] hover:text-white transition-all duration-300">
                  <i className="ri-twitter-x-line text-lg md:text-xl"></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#4a3b2a]/20 flex items-center justify-center text-[#4a3b2a] hover:bg-[#4a3b2a] hover:text-white transition-all duration-300">
                  <i className="ri-youtube-line text-lg md:text-xl"></i>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* 2. MASSIVE BRAND NAME (Bottom) */}
        {/* Yahan 'playfair' class waisi ki waisi hai jaisi tune mangi thi */}
        <div className="w-full border-t border-[#4a3b2a]/10 pt-8 lg:pt-0 flex justify-center items-center overflow-hidden">
          <h1 className="text-[13vw] leading-[0.85] md:leading-[1.1] playfair font-black text-[#4a3b2a] uppercase tracking-tighter text-center whitespace-nowrap select-none opacity-90 hover:opacity-100 transition-opacity duration-500 cursor-default py-4 md:py-0">
            FIT BITE.<span className='text-[#d4a017]'>CO</span>
          </h1>
        </div>

        {/* 3. COPYRIGHT STRIP */}
        <div className="flex flex-col lg:flex-row justify-between items-center mt-6 lg:mt-8 text-[10px] lg:text-xs font-bold text-[#4a3b2a]/50 uppercase tracking-widest text-center md:text-left gap-4 md:gap-0">
           <div className="flex gap-6">
             <Link to="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
             <Link to="/terms" className="hover:text-black transition-colors">Terms of Use</Link>
           </div>
           <p>© 2026 FitBite. All Rights Reserved.</p>
           <p>Made with <span className='animate-pulse'>💖</span> by Shubham Singh</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;