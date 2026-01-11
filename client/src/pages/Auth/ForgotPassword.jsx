import React, { useState } from 'react';
import API from '../../api/axios';
import { useToast } from '../../context/ToastContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/users/password/forgot', { email });
      showToast(data.message, "success");
    } catch (error) {
      showToast(error.response?.data?.message || "Error sending email", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[30px] shadow-xl w-full max-w-md border border-[#4a3b2a]/5">
        <h2 className="text-2xl font-playfair font-bold text-[#4a3b2a] mb-4">Forgot Password?</h2>
        <p className="text-xs text-stone-500 mb-6">Enter your email to receive a reset link.</p>
        
        <input 
          type="email" placeholder="Enter Email" required 
          value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-xl outline-none focus:border-[#d4a017] mb-4"
        />
        <button type="submit" className="w-full bg-[#4a3b2a] text-white py-3 rounded-xl font-bold uppercase hover:bg-[#d4a017]">Send Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;