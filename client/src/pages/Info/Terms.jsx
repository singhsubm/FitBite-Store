import React from 'react';
import SEO from '../../components/SEO';

const Terms = () => {
  return (
    <div className="pt-32 pb-20 px-4 md:px-10 min-h-screen bg-[#fdfbf7]">
      <SEO title="Terms of Use" description="Terms and conditions for using FitBite services." />
      
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-[40px] shadow-xl border border-[#4a3b2a]/5">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-[#4a3b2a] mb-4">Terms of Use</h1>
        <p className="text-xs text-stone-400 uppercase tracking-widest mb-10">Last Updated: January 2026</p>

        <div className="space-y-8 text-stone-600 leading-relaxed font-serif">
          <section>
            <h2 className="text-xl font-bold text-[#4a3b2a] mb-3 sans-serif">1. Acceptance of Terms</h2>
            <p>By accessing and using this website (FitBite), you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#4a3b2a] mb-3 sans-serif">2. Products and Pricing</h2>
            <p>All products listed on the website, their descriptions, and their prices are subject to change. We reserve the right to modify, suspend or discontinue the sale of any product at any time without notice.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#4a3b2a] mb-3 sans-serif">3. Shipping and Delivery</h2>
            <p>FitBite ships products to addresses within India. Shipping times are estimates and cannot be guaranteed. We are not liable for any delays in shipments.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#4a3b2a] mb-3 sans-serif">4. Return and Refund</h2>
            <p>We accept returns only if the product received is damaged or incorrect. You must report the issue within 24 hours of delivery with video proof.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#4a3b2a] mb-3 sans-serif">5. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of <strong>Varanasi, Uttar Pradesh</strong>.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;