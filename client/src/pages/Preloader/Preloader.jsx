import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Preloader = ({ onComplete, imageUrls = [] }) => {
  const lettersRef = useRef([]);
  const barRef = useRef(null);
  const containerRef = useRef(null);
  const [count, setCount] = useState(0);

  const text = ["F", "I", "T", " ", "B", "I", "T", "E", "."];
  const co = ["C", "O"];

  useEffect(() => {
    // 🔒 SCROLL LOCK (HARD LOCK)
    const scrollY = window.scrollY;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const preventScroll = (e) => {
      e.preventDefault();
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventScroll, { passive: false });

    // ✨ Text animation (start me ek baar)
    gsap.set(lettersRef.current, { y: -120, opacity: 0 });

    gsap.to(lettersRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power4.out",
      stagger: 0.07,
    });

    const startAnimation = () => {
      let progress = { val: 0 };

      gsap.to(progress, {
        val: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => {
          setCount(Math.round(progress.val));
          if (barRef.current) {
            barRef.current.style.width = `${progress.val}%`;
          }
        },
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.6,
            delay: 0.3,
            ease: "power2.out",
            onComplete: () => {
              // 🔓 RESTORE SCROLL
              const storedScroll = document.body.style.top;

              document.documentElement.style.overflow = "";
              document.body.style.overflow = "auto";
              document.body.style.position = "";
              document.body.style.top = "";
              document.body.style.width = "";

              window.removeEventListener("wheel", preventScroll);
              window.removeEventListener("touchmove", preventScroll);
              window.removeEventListener("keydown", preventScroll);

              window.scrollTo(0, parseInt(storedScroll || "0") * -1);

              onComplete();
            },
          });
        },
      });
    };

    if (imageUrls.length === 0) {
      startAnimation();
    } else {
      let loadedCount = 0;

      imageUrls.forEach((url) => {
        const img = new Image();
        img.src = url;

        img.onload = img.onerror = () => {
          loadedCount++;
          if (loadedCount === imageUrls.length) startAnimation();
        };
      });
    }

    // 🧹 CLEANUP
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "auto";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed w-screen h-screen z-[9999] bg-white flex flex-col items-center justify-center"
    >
      <div className="flex items-end overflow-hidden">
        {text.map((letter, i) => (
          <span
            key={i}
            ref={(el) => (lettersRef.current[i] = el)}
            className="text-[13vw] leading-[0.85] playfair font-black text-[#4a3b2a] uppercase tracking-tighter select-none"
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
        {co.map((letter, i) => (
          <span
            key={`co-${i}`}
            ref={(el) => (lettersRef.current[text.length + i] = el)}
            className="text-[13vw] leading-[0.85] playfair font-black text-[#d4a017] uppercase tracking-tighter select-none"
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="mt-20 w-[60vw] md:w-[40vw]">
        <div className="flex justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
            Loading
          </span>
          <span className="text-xs font-bold text-[#4a3b2a] tabular-nums">
            {count}%
          </span>
        </div>

        <div className="w-full h-[2px] bg-[#4a3b2a]/10 rounded-full overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-[#d4a017] rounded-full transition-all"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;