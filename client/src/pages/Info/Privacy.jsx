import React from 'react';
import SEO from '../../components/SEO';

const Privacy = () => {
  return (
    <div className="pt-32 pb-20 px-4 md:px-10 min-h-screen bg-[#fdfbf7]">
      <SEO title="Privacy Policy" description="FitBite Privacy Policy regarding data collection and usage." />
      
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-[40px] shadow-xl border border-[#4a3b2a]/5">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-[#4a3b2a] mb-4">Privacy Policy</h1>
        <p className="text-xs text-stone-400 uppercase tracking-widest mb-10">Last Updated: January 2026</p>

        <div className="space-y-8 text-stone-600 leading-relaxed font-serif">
          <section>
            <h2 className="text-xl font-bold text-[#4a3b2a] mb-3 sans-serif">1. Introduction</h2>
            <p>Welcome to FitBite. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#4a3b2a] mb-3 sans-serif">2. Data We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
               <li><strong>Identity Data:</strong> Name, username.</li>
               <li><strong>Contact Data:</strong> Billing address, delivery address, email address, and telephone numbers.</li>
               <li><strong>Technical Data:</strong> IP address, browser type, and version.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#4a3b2a] mb-3 sans-serif">3. How We Use Your Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
               <li>To register you as a new customer.</li>
               <li>To process and deliver your order.</li>
               <li>To manage our relationship with you.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#4a3b2a] mb-3 sans-serif">4. Data Security</h2>
            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal data to those employees who have a business need to know.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#4a3b2a] mb-3 sans-serif">5. Contact Us</h2>
            <p>If you have any questions about this privacy policy, please contact us at <strong className="text-[#d4a017]">privacy@fitbite.com</strong>.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;