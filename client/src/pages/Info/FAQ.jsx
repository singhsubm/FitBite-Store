import React from 'react';
import SEO from '../../components/SEO'; // SEO Component

const FAQ = () => {
  return (
    <div className="pt-32 pb-20 px-4 md:px-10 min-h-screen bg-[#fdfbf7]">
      <SEO title="Frequently Asked Questions" description="Answers to common questions about FitBite orders, shipping, and products." />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#4a3b2a] mb-8 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-stone-500 text-center mb-16">
          Have questions? We're here to help.
        </p>

        <div className="space-y-12">
          
          {/* SECTION 1: ORDERS */}
          <div>
            <h2 className="text-2xl font-bold text-[#d4a017] mb-6 uppercase tracking-widest border-b border-[#d4a017]/20 pb-2">Orders & Payments</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-[#4a3b2a]/5 shadow-sm">
                <h3 className="font-bold text-[#4a3b2a] text-lg mb-2">How do I place an order?</h3>
                <p className="text-stone-600">Simply browse our shop, add items to your cart, and proceed to checkout. We currently support Cash on Delivery (COD) for ease of transaction.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#4a3b2a]/5 shadow-sm">
                <h3 className="font-bold text-[#4a3b2a] text-lg mb-2">Can I cancel my order?</h3>
                <p className="text-stone-600">Yes, you can cancel your order from your profile dashboard if it hasn't been shipped yet. Once shipped, cancellations are not possible.</p>
              </div>
            </div>
          </div>

          {/* SECTION 2: SHIPPING */}
          <div>
            <h2 className="text-2xl font-bold text-[#d4a017] mb-6 uppercase tracking-widest border-b border-[#d4a017]/20 pb-2">Shipping & Delivery</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-[#4a3b2a]/5 shadow-sm">
                <h3 className="font-bold text-[#4a3b2a] text-lg mb-2">Do you ship all over India?</h3>
                <p className="text-stone-600">Yes! We deliver premium dry fruits to almost every pincode in India via our trusted courier partners.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#4a3b2a]/5 shadow-sm">
                <h3 className="font-bold text-[#4a3b2a] text-lg mb-2">How long does delivery take?</h3>
                <p className="text-stone-600">Standard delivery takes 3-5 business days depending on your location. Metro cities usually receive orders within 2 days.</p>
              </div>
            </div>
          </div>

          {/* SECTION 3: QUALITY */}
          <div>
            <h2 className="text-2xl font-bold text-[#d4a017] mb-6 uppercase tracking-widest border-b border-[#d4a017]/20 pb-2">Product Quality</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-[#4a3b2a]/5 shadow-sm">
                <h3 className="font-bold text-[#4a3b2a] text-lg mb-2">Are your products organic?</h3>
                <p className="text-stone-600">We source the highest quality dry fruits directly from farms. While not all are certified organic, they are 100% natural and free from harmful preservatives.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FAQ;