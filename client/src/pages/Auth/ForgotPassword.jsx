import React, { useState } from 'react';
import API from '../../api/axios';
import { useToast } from '../../context/ToastContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await API.post('/users/password/forgot', { email });
      showToast(data.message, "success");
      setEmail("");
    } catch (error) {
      showToast(error.response?.data?.message || "Error sending email", "error");
    } finally {
      setLoading(false);
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
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#4a3b2a] text-white py-3 rounded-xl font-bold uppercase hover:bg-[#d4a017] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
              <span>Sending...</span>
            </>
          ) : (
            "Send Link"
          )}
        </button>

        {/* 👇 YE RAHI VO LINE (Sirf Loading ke time dikhegi) */}
        {loading && (
            <p className="text-[10px] text-stone-400 mt-3 text-center animate-pulse">
                It may take a few seconds. Please wait...
            </p>
        )}

      </form>
    </div>
  );
};

export default ForgotPassword;