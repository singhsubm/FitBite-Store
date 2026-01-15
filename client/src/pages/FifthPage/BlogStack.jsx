import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ReactLenis } from "lenis/react";
import { Link } from 'react-router-dom'; // Click logic ke liye
import API from '../../api/axios'; // API call ke liye

gsap.registerPlugin(ScrollTrigger);

// === 1. STATIC DATA (Fallback) ===
const staticBlogs = [
  {
    id: 1,
    title: "The Art of Roasting",
    desc: "Unlock the secret flavors hidden inside raw nuts through our slow-roasting process.",
    img: "https://images.unsplash.com/photo-1455612693675-112974d4880b?q=80&w=2669&auto=format&fit=crop", 
    date: "OCT 12, 2025",
    theme: "dark" 
  },
  {
    id: 2,
    title: "A Morning Ritual",
    desc: "Why 5 soaked almonds daily can transform your energy levels and mental clarity.",
    img: "https://plus.unsplash.com/premium_photo-1669825050519-e89e6cf7c2c6?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    date: "NOV 05, 2025",
    theme: "light" 
  },
  {
    id: 3,
    title: "Festive Gifting Guide",
    desc: "Curating the perfect healthy hamper for your loved ones this Diwali season.",
    img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=2574&auto=format&fit=crop", 
    date: "DEC 20, 2025",
    theme: "dark"
  }
];

const BlogStack = () => {
  // === 2. STATE (Default = Static Data) ===
  const [displayBlogs, setDisplayBlogs] = useState(staticBlogs);
  const container = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // === 3. FETCH LOGIC ===
    const fetchBlogs = async () => {
      try {
        const { data } = await API.get('/blogs');
        
        // Agar data aaya, to use format karke state me daalo
        if (data && data.length > 0) {
          const formattedData = data.map((blog, index) => ({
            id: blog._id,
            title: blog.title,
            desc: blog.content ? blog.content.substring(0, 100) + "..." : "", // Content chhota kiya
            img: blog.image,
            date: new Date(blog.createdAt).toLocaleDateString(),
            theme: index % 2 === 0 ? 'dark' : 'light' // Theme logic maintain kiya
          }));
          setDisplayBlogs(formattedData);
        }
        // Agar API fail hui ya data nahi aaya, to State change nahi hogi (purana static dikhega)
      } catch (error) {
        console.log("API Error, showing static blogs.");
      }
    };

    fetchBlogs();
  }, []);

  // === 4. ANIMATION LOGIC (NO CHANGES, just added dependency) ===
  useGSAP(() => {
    // Agar blogs update huye to animation refresh hoga
    const cards = gsap.utils.toArray(".card-item");

    cards.forEach((card, index) => {
      if (index === cards.length - 1) return;

      const inner = card.querySelector(".card-inner");

      gsap.to(inner, {
        scrollTrigger: {
          trigger: card,
          start: "top 27%",
          end: "bottom top", 
          scrub: true,
        },
        // Animation effects same hain
      });
    });
  }, { scope: container, dependencies: [displayBlogs] }); // Dependency add ki taaki naye data pe animation chale

  return (
    <ReactLenis root>
      <div ref={container} className="w-full bg-[#fdfbf7] relative">
        
        {/* HEADER (Same) */}
        <div className="text-center sticky top-5 md:top-10 pt-16 pb-8 pointer-events-none z-10">
          <h2 className="text-4xl md:text-6xl playfair font-bold text-[#4a3b2a] uppercase tracking-tight mix-blend-hard-light drop-shadow-lg">
            Our Journal
          </h2>
          <p className="text-stone-600 font-medium tracking-widest text-xs md:text-sm mt-2 uppercase bg-[#d4a017]/70 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
            Stories & Insights
          </p>
        </div>

        {/* CARDS CONTAINER */}
        <div className="w-full relative px-4 md:px-10 mt-5 z-10">
          
          {/* Loop over displayBlogs (Dynamic or Static) */}
          {displayBlogs.slice(0, 3).map((blog, index) => (
            
            <div 
              key={blog.id} 
              className="card-item sticky top-[30vh] h-[70vh] w-full flex items-start justify-center pt-4"
            >
              
              <div className="card-inner relative w-full md:w-[95%] h-full rounded-[40px] overflow-hidden shadow-2xl origin-top will-change-transform bg-white">
                
                {/* Image */}
                <img 
                  src={blog.img} 
                  alt={blog.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 ${blog.theme === 'dark' ? 'bg-black/40' : 'bg-white/10'}`}></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  
                  <Link to="/blog" className="bg-white/10 backdrop-blur-lg border border-white/30 p-8 md:p-12 rounded-[30px] max-w-2xl shadow-lg cursor-none" data-cursor="view">
                    
                    <div className={`inline-block px-4 py-1 border rounded-full text-[10px] md:text-xs tracking-widest uppercase mb-4 ${blog.theme === 'dark' ? 'border-white/50 text-white' : 'border-black/50 text-black'}`}>
                      {blog.date}
                    </div>

                    <h2 className={`text-3xl md:text-5xl font-playfair font-bold mb-4 leading-tight ${blog.theme === 'dark' ? 'text-white' : 'text-[#2a2a2a]'}`}>
                      {blog.title}
                    </h2>

                    <p className={`text-sm md:text-base font-medium tracking-wide mb-8 opacity-90 line-clamp-3 ${blog.theme === 'dark' ? 'text-gray-200' : 'text-stone-700'}`}>
                      {blog.desc}
                    </p>

                    {/* CLICK LOGIC: Added Link to navigate */}
                    <Link to={`/blog`} className="group flex items-center justify-center gap-3 mx-auto cursor-pointer pointer-events-auto">
                        <div className="w-12 h-12 rounded-full bg-[#d4a017] text-white flex items-center justify-center shadow-lg group-hover:bg-white group-hover:text-[#d4a017] transition-all duration-300">
                          <i className="ri-arrow-right-up-line text-xl"></i>
                        </div>
                        <span className={`text-xs md:text-sm font-bold tracking-widest uppercase ${blog.theme === 'dark' ? 'text-white' : 'text-black'}`}>
                          Read Story
                        </span>
                    </Link>

                  </Link>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* <div className="h-[0vh]"></div> */}

      </div>
    </ReactLenis>
  );
};

export default BlogStack;