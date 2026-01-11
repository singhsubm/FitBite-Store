import React from 'react';
import 'remixicon/fonts/remixicon.css';

const HighlightText = () => {
  return (
    <div className="w-full bg-[#fdfbf7] py-24 px-4 md:px-10 flex items-center justify-center overflow-hidden">
      
      <div className=" playfair max-w-[1400px] mx-auto text-center leading-snug md:leading-tight">
        
        {/* LINE 1 */}
        <div className="block md:inline text-4xl md:text-7xl font-medium text-[#4a3b2a]">
          From 
           
           {/* Circular Image 1 */}
           <div className="inline-block align-middle mx-2 md:mx-4 hover:scale-110 transition-transform duration-300">
             <img 
               src="https://images.unsplash.com/photo-1596812179986-c78ad0debed8?q=80&w=200&h=200&fit=crop" 
               alt="Almonds" 
               className="w-16 h-16 md:w-28 md:h-28 rounded-full border-4 border-white shadow-md object-cover"
             />
           </div>

           <span className="relative inline-block">
             {/* Highlight Box Cyan */}
             <span className="absolute inset-0 bg-[#CDE8E5] -skew-x-6 top-2 bottom-1 md:top-4 md:bottom-2 -z-10"></span>
             <span className="relative z-10 px-2 bg-[#d4a017]/30">premium sourcing</span>
           </span>
        </div>

        {/* LINE 2 */}
        <div className="block md:inline text-4xl md:text-7xl font-playfair font-medium text-[#4a3b2a] mt-4 md:mt-0">
           <span> to </span>
           
           <span className="relative inline-block mx-2">
             {/* Highlight Box Purple */}
             <span className="absolute inset-0 bg-[#E2d4f5] -skew-x-6 top-2 bottom-1 md:top-4 md:bottom-2 -z-10"></span>
             <span className="relative z-10 px-2">hand-picked perfection,</span>
           </span>
        </div>

        {/* LINE 3 */}
        <div className="block mt-6 md:mt-8 text-4xl md:text-7xl font-playfair font-medium text-[#4a3b2a]">
           <span>discover </span>

           {/* Circular Image 2 */}
           <div className="inline-block align-middle mx-2 md:mx-4 hover:scale-110 transition-transform duration-300">
             <img 
               src="https://images.unsplash.com/photo-1626697556426-8a55a8af4999?q=80&w=200&h=200&fit=crop" 
               alt="Cashews" 
               className="w-16 h-16 md:w-28 md:h-28 rounded-full border-4 border-white shadow-md object-cover"
             />
           </div>

           <span className="relative inline-block">
             {/* Highlight Box Pink */}
             <span className="absolute inset-0 bg-[#FFB7B2] -skew-x-6 top-2 bottom-1 md:top-4 md:bottom-2 -z-10"></span>
             <span className="relative z-10 px-2">nature's energy and</span>
           </span>
        </div>

        {/* LINE 4 */}
        <div className="block mt-6 md:mt-8 text-4xl md:text-7xl font-playfair font-medium text-[#4a3b2a]">
           <span className='bg-[#d4a017]/50'> healthy habits </span>
           
           <span className="italic font-serif">à la</span> 

           {/* Brand Name / Final Word */}
           <span className="font-bold ml-3 relative inline-block">
              NATURE.
              {/* Decorative Dot */}
              <span className="absolute -top-2 -right-4 text-[#d4a017] text-2xl">✦</span>
           </span>
        </div>

      </div>

    </div>
  );
};

export default HighlightText;