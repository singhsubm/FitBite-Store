import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { useLocation } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const redirectPath = location.state?.from || "/shop";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await API.post("/users/login", { email, password });

      // Data save
      localStorage.setItem("userInfo", JSON.stringify(data));

      navigate(redirectPath);

      // 4. Yahan CHANGE kiya hai: Hardcoded '/shop' ki jagah variable use kiya
      navigate(redirectPath);

      window.location.reload(); // Navbar update ke liye
    } catch (error) {
      showToast("Invalid Email or Password", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fdfbf7] flex items-center justify-center px-4 pt-20">
      <div className="bg-white w-full max-w-md p-8 md:p-12 rounded-[40px] shadow-2xl border border-[#4a3b2a]/5 text-center relative overflow-hidden">
        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-[#d4a017]"></div>

        <h2 className="text-4xl font-playfair font-bold text-[#4a3b2a] mb-2">
          Welcome Back
        </h2>
        <p className="text-stone-500 text-sm uppercase tracking-widest mb-10">
          Continue your healthy journey
        </p>

        <form onSubmit={handleLogin} className="space-y-6 text-left">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-[#4a3b2a]">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-4 bg-[#fdfbf7] rounded-xl outline-none focus:border focus:border-[#d4a017] transition-all border border-transparent"
              placeholder="john@example.com"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-[#4a3b2a]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-4 bg-[#fdfbf7] rounded-xl outline-none focus:border focus:border-[#d4a017] transition-all border border-transparent"
              placeholder="••••••••"
              required
            />
            <div className="text-right mb-4">
              <Link
                to="/forgot-password"
                className="text-xs text-[#d4a017] font-bold hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4a3b2a] text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#d4a017] transition-all duration-300 shadow-lg mt-4 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Login Now"}
          </button>
        </form>

        <div className="mt-8 text-sm text-stone-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#d4a017] font-bold hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
