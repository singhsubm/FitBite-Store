import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Preloader = ({ onComplete, imageUrls = [] }) => {
  const lettersRef = useRef([]);
  const barRef = useRef(null);
  const containerRef = useRef(null);
  const [count, setCount] = useState(0);
  const smoothProgress = useRef({ val: 0 }); // GSAP smooth tracking
  const realProgress = useRef(0); // actual loaded %

  const text = ["F", "I", "T", " ", "B", "I", "T", "E", "."];
  const co = ["C", "O"];

  // Smooth progress updater - real value tak smoothly jaata hai
  const updateSmoothProgress = (targetVal, onDone) => {
    gsap.killTweensOf(smoothProgress.current);
    gsap.to(smoothProgress.current, {
      val: targetVal,
      duration : targetVal === 10 ? 1.2 : 0.4,
      ease: "power2.out",
      onUpdate: () => {
        const v = Math.round(smoothProgress.current.val);
        setCount(v);
        if (barRef.current) {
          barRef.current.style.width = `${smoothProgress.current.val}%`;
        }
      },
      onComplete: onDone || null,
    });
  };

  const finishAndExit = () => {
    // 100% pe smoothly aao, phir fade out
    updateSmoothProgress(100, () => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: "power2.out",
        onComplete: () => {
          document.documentElement.style.overflow = "";
          document.body.style.overflow = "auto";
          document.body.style.position = "";
          document.body.style.top = "";
          document.body.style.width = "";
          onComplete();
        },
      });
    });
  };

  useEffect(() => {
    // Scroll lock
    const scrollY = window.scrollY;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const preventScroll = (e) => e.preventDefault();
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    // Letter animation
    gsap.set(lettersRef.current, { y: -120, opacity: 0 });
    gsap.to(lettersRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power4.out",
      stagger: 0.07,
    });

    if (imageUrls.length === 0) {
      // Koi image nahi - sirf animated fill karo
      updateSmoothProgress(100, () => finishAndExit());
      return;
    }

    let loadedCount = 0;
    const total = imageUrls.length;

    // Minimum visual progress guarantee (0 se 10% immediately)
    updateSmoothProgress(10);

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;

      img.onload = img.onerror = () => {
        loadedCount++;
        // Real progress calculate karo (10% already diya, baki 90% images ke liye)
        realProgress.current = 10 + Math.round((loadedCount / total) * 90);
        
        if (loadedCount === total) {
          finishAndExit();
        } else {
          updateSmoothProgress(realProgress.current);
        }
      };
    });

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "auto";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
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
            className="h-full bg-[#d4a017] rounded-full"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;