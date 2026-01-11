import React, { useState } from 'react';
import API from '../../api/axios';
import { useToast } from '../../context/ToastContext';
import { Helmet } from 'react-helmet-async'; // SEO ke liye

const ContactSection = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post('/queries', formData);
      showToast("Query sent successfully! We'll contact you soon.", "success");
      setFormData({ name: '', email: '', message: '' }); // Form clear
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to send message.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 md:px-10 min-h-screen bg-[#fdfbf7]">
      <Helmet>
        <title>Contact Us | FitBite</title>
        <meta name="description" content="Have a question? Reach out to FitBite team." />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16">
           <h1 className="text-5xl md:text-7xl playfair font-bold text-[#4a3b2a] mb-4">Get in Touch</h1>
           <p className="text-stone-500 max-w-xl mx-auto">We'd love to hear from you. Whether you have a question about our products, pricing, or just want to say hi.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
           
           {/* LEFT SIDE: INFO & MAP */}
           <div className="space-y-8">
              
              {/* Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="bg-white p-6 rounded-2xl border border-[#4a3b2a]/5 shadow-sm">
                    <i className="ri-message-2-line text-3xl text-[#d4a017] mb-2 block"></i>
                    <h3 className="font-bold text-[#4a3b2a]">Chat to us</h3>
                    <p className="text-xs text-stone-500 mb-4">Our friendly team is here to help.</p>
                    
                    <div className="flex flex-col gap-3">
                        {/* 1. Email Link */}
                        <a href="mailto:hello@fitbite.com" className="flex items-center gap-2 text-[#4a3b2a] font-bold hover:text-[#d4a017] transition-colors">
                            <i className="ri-mail-line text-lg"></i> hello@fitbite.com
                        </a>

                        {/* 2. WhatsApp Link */}
                        {/* Note: Apna number yahan '919999999999' ki jagah daal dena */}
                        <a 
                            href="https://wa.me/917379712466" 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center gap-2 text-[#4a3b2a] font-bold hover:text-[#25D366] transition-colors"
                        >
                            <i className="ri-whatsapp-line text-lg"></i> Fit-Bite.com
                        </a>
                    </div>
                 </div>
                 <div className="bg-white p-6 rounded-2xl border border-[#4a3b2a]/5 shadow-sm">
                    <i className="ri-map-pin-line text-3xl text-[#d4a017] mb-2 block"></i>
                    <h3 className="font-bold text-[#4a3b2a]">Visit us</h3>
                    <p className="text-xs text-stone-500 mb-2">Come say hello at our office.</p>
                    <p className="text-[#4a3b2a] font-bold">Varanasi, Uttar Pradesh</p>
                 </div>
              </div>

              {/* MAP SECTION (Varanasi Default) */}
              <div className="w-full h-[300px] bg-stone-200 rounded-[30px] overflow-hidden shadow-lg border border-[#4a3b2a]/10 relative group">
                 <iframe 
                   title="map"
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110449.15628747914!2d82.9087071232005!3d25.32089491990974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2db76febcf4d%3A0x68131710853ff0b5!2sVaranasi%2C%20Uttar%20Pradesh!5e1!3m2!1sen!2sin!4v1768053780222!5m2!1sen!2sin" 
                   width="100%" 
                   height="100%" 
                    
                   allowFullScreen="" 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                   className="group-hover:grayscale-0 transition-all duration-700" // Hover karne par rangin ho jayega
                 ></iframe>
              </div>

           </div>

           {/* RIGHT SIDE: FORM */}
           <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-[#4a3b2a]/5 relative overflow-hidden">
              {/* Decorative Circle */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#d4a017]/10 rounded-full blur-3xl"></div>

              <h2 className="text-2xl font-playfair font-bold text-[#4a3b2a] mb-6">Raise a Query</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">Your Name</label>
                    <input 
                      type="text" required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full mt-2 p-4 bg-[#fdfbf7] border border-stone-200 rounded-xl outline-none focus:border-[#d4a017] focus:bg-white transition-colors"
                      placeholder="e.g. John Doe"
                    />
                 </div>

                 <div>
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      type="email" required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full mt-2 p-4 bg-[#fdfbf7] border border-stone-200 rounded-xl outline-none focus:border-[#d4a017] focus:bg-white transition-colors"
                      placeholder="john@example.com"
                    />
                 </div>

                 <div>
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">Message</label>
                    <textarea 
                      required rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full mt-2 p-4 bg-[#fdfbf7] border border-stone-200 rounded-xl outline-none focus:border-[#d4a017] focus:bg-white transition-colors resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                 </div>

                 <button 
                   type="submit" 
                   disabled={loading}
                   className="w-full bg-[#4a3b2a] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#d4a017] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    {loading ? "Sending..." : "Send Message"}
                 </button>
              </form>
           </div>

        </div>
      </div>
    </div>
  );
};

export default ContactSection;