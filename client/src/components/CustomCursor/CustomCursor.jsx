import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const textRef = useRef(null);

  // null | "view" | "natural" | "trust"
  const [cursorType, setCursorType] = useState(null);

  useGSAP(() => {
    gsap.set(cursorRef.current, {
      xPercent: -50,
      yPercent: -50,
    });
    // 1. Setup Move Logic (Lag-free)
    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.3,
      ease: "power3",
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.3,
      ease: "power3",
    });

    // 2. Mouse Move Listener
    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 3. Hover Logic (View / Natural / Trust)
    const handleLinkHover = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        setCursorType(target.getAttribute("data-cursor"));
      } else {
        setCursorType(null);
      }
    };

    window.addEventListener("mouseover", handleLinkHover);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleLinkHover);
    };
  }, []);

  // 4. Animation for State Change (Normal vs Hover)
  useGSAP(() => {
    if (cursorType) {
      // Glassmorphism Big Circle State
      gsap.to(cursorRef.current, {
        width: 100,
        height: 100,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        duration: 0.3,
        ease: "back.out(1.7)",
      });

      // Show Text
      gsap.to(textRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
      });
    } else {
      // Normal Black Dot State
      gsap.to(cursorRef.current, {
        width: 16,
        height: 16,
        backgroundColor: "#000",
        backdropFilter: "blur(0px)",
        border: "none",
        duration: 0.3,
        ease: "power2.out",
      });

      // Hide Text
      gsap.to(textRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.2,
      });
    }
  }, [cursorType]);

  return (
    <div className="hidden lg:block">
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] 
                   
                   flex items-center justify-center overflow-hidden"
      >
        <span
          ref={textRef}
          className="text-white text-[10px] font-bold uppercase tracking-widest opacity-0"
        >
          {cursorType === "view" && "View More"}
          {cursorType === "natural" && "100% Natural"}
          {cursorType === "trust" && "Our Promise"}
        </span>
      </div>
    </div>
  );
};

export default CustomCursor;
