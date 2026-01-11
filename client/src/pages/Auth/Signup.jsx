import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import { useToast } from '../../context/ToastContext'; // 1. Import Toast

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { showToast } = useToast(); // 2. Hook Use

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await API.post('/users/register', { name, email, password });
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      // 3. Success Toast
      showToast("Account Created Successfully!", "success");
      
      // Navigate (Reload hata diya taaki toast dikhe)
      setTimeout(() => {
        navigate('/shop');
      }, 1000); // 1 sec delay taaki user toast padh sake

    } catch (error) {
      // 4. Error Toast
      showToast(
        error.response?.data?.message || "Registration Failed. User might already exist.", 
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fdfbf7] flex items-center justify-center px-4 pt-20">
      
      <div className="bg-white w-full max-w-md p-8 md:p-12 rounded-[40px] shadow-2xl border border-[#4a3b2a]/5 text-center relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-2 bg-[#d4a017]"></div>

        <h2 className="text-4xl font-playfair font-bold text-[#4a3b2a] mb-2">Join FitBite</h2>
        <p className="text-stone-500 text-sm uppercase tracking-widest mb-10">Start your daily habit today</p>

        <form onSubmit={handleSignup} className="space-y-6 text-left">
            
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#4a3b2a]">Full Name</label>
              <input 
                type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 p-4 bg-[#fdfbf7] rounded-xl outline-none focus:border focus:border-[#d4a017] transition-all border border-transparent"
                placeholder="John Doe" required
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#4a3b2a]">Email Address</label>
              <input 
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 p-4 bg-[#fdfbf7] rounded-xl outline-none focus:border focus:border-[#d4a017] transition-all border border-transparent"
                placeholder="john@example.com" required
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#4a3b2a]">Password</label>
              <input 
                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 p-4 bg-[#fdfbf7] rounded-xl outline-none focus:border focus:border-[#d4a017] transition-all border border-transparent"
                placeholder="••••••••" required
              />
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full bg-[#4a3b2a] text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#d4a017] transition-all duration-300 shadow-lg mt-4 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

        </form>

        <div className="mt-8 text-sm text-stone-500">
           Already a member? <Link to="/login" className="text-[#d4a017] font-bold hover:underline">Login</Link>
        </div>

      </div>

    </div>
  );
};

export default Signup;