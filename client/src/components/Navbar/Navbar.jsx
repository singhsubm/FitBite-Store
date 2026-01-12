import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsCartOpen, cartItems } = useCart();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { showConfirm } = useToast();

  const navLinks = [
    { name: "Home", link: "/", icon: "ri-home-smile-line" },
    { name: "Story", link: "/story", icon: "ri-book-open-line" },
    { name: "Shop", link: "/shop", icon: "ri-store-2-line" },
    { name: "Blog", link: "/blog", icon: "ri-article-line" },
    // { name: "New Launches", link: "/new", icon: "ri-rocket-line" },
  ];

  const confirmLogout = () => {
    localStorage.removeItem("userInfo");
    setShowLogoutModal(false); // Modal band karo
    navigate("/login");
    window.location.reload();
  };

  // LocalStorage se check karo user hai ya nahi
  const handleLogoutClick = () => {
    setIsDropdownOpen(false); // Dropdown band karo

    showConfirm("Are you sure you want to logout?", () => {
      // Ye tab chalega jab user "Yes" dabayega
      localStorage.removeItem("userInfo");
      window.location.href = "/login";
    });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/20 backdrop-blur-lg bg-white/10 shadow-sm">
        {/* 1. Logo */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold tracking-tighter text-black cursor-pointer z-50"
        >
          FIT BITE.<span className="text-yellow-600">CO</span>
        </Link>

        {/* 2. Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-16">
          {navLinks.map((item, index) => (
            <NavLink
              key={index}
              to={item.link}
              end={item.link === "/"} // Home exact rahe, baaki prefix
            >
              {({ isActive }) => (
                <div
                  className={`group relative text-sm font-medium cursor-pointer transition-colors duration-300
          ${isActive ? "text-yellow-700" : "text-black hover:text-yellow-700"}`}
                >
                  {/* Left Icon */}
                  <span
                    className={`absolute -left-6 top-1/2 -translate-y-1/2 text-lg transition-all duration-300
            ${
              isActive
                ? "opacity-0 translate-x-0 text-yellow-700"
                : "opacity-0 -translate-x-2 text-yellow-700 group-hover:opacity-100 group-hover:translate-x-0"
            }`}
                  >
                    <i className={item.icon}></i>
                  </span>

                  {/* Text */}
                  <span>{item.name}</span>

                  {/* Underline */}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-yellow-700 transition-all duration-300
            ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                  ></span>
                </div>
              )}
            </NavLink>
          ))}
        </div>

        {/* 3. Right Side Icons & Button */}
        <div className="flex items-center gap-4 md:gap-6 z-50">
          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative cursor-pointer group"
          >
            <i className="ri-shopping-bag-3-line text-xl text-black hover:text-yellow-700 transition-colors"></i>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* USER AVATAR logic */}
          {userInfo ? (
            <div className="relative">
              {/* AVATAR BUTTON */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-9 h-9 rounded-full bg-[#4a3b2a] text-[#d4a017] flex items-center justify-center font-bold border-2 border-transparent hover:border-[#d4a017] transition-all"
              >
                {/* User ka first letter */}
                {userInfo.name.charAt(0).toUpperCase()}
              </button>

              {/* DROPDOWN MENU */}
              {isDropdownOpen && (
                <div className="absolute top-12 right-0 w-48 bg-white rounded-xl shadow-xl border border-[#4a3b2a]/10 overflow-hidden py-2 animate-fade-in-up">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="font-bold text-[#4a3b2a] truncate">
                      {userInfo.name}
                    </p>
                  </div>
                  {/* === NEW: ADMIN DASHBOARD LINK === */}
                  {/* Ye sirf tab dikhega jab user ADMIN hoga */}
                  {userInfo.isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center px-4 py-3 text-sm font-bold text-[#4a3b2a] hover:bg-[#fdfbf7] hover:text-[#d4a017] border-b border-gray-100 transition-colors"
                    >
                      <i className="ri-dashboard-line mr-2 text-lg"></i>
                      Admin Dashboard
                    </Link>
                  )}
                  {/* ================================= */}

                  <Link
                    to="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#fdfbf7] hover:text-[#d4a017]"
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogoutClick}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // LOGIN BUTTON (Agar user nahi hai)
            <Link to="/login">
              <button className="bg-[#4a3b2a] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#d4a017] transition-colors">
                Login
              </button>
            </Link>
          )}

          {/* --- NEW ANIMATED BUTTON STARTS HERE --- */}
          <Link
            to="/contact"
            className="group hidden lg:flex px-5 py-2.5 bg-black text-white text-xs font-semibold rounded-full hover:bg-gray-800 transition-all active:scale-95 items-center gap-2"
          >
            {/* Left Arrow (Initially Hidden) */}
            <div className="w-0 overflow-hidden opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300 ease-in-out">
              <i className="ri-arrow-right-line"></i>
            </div>

            <span>Raise a Query</span>

            {/* Right Arrow (Initially Visible) */}
            <div className="w-4 overflow-hidden opacity-100 group-hover:w-0 group-hover:opacity-0 transition-all duration-300 ease-in-out">
              <i className="ri-arrow-right-line"></i>
            </div>
          </Link>
          {/* --- NEW ANIMATED BUTTON ENDS HERE --- */}

          {/* Mobile Hamburger Menu */}
          <div
            className="lg:hidden cursor-pointer text-2xl"
            onClick={toggleMenu}
          >
            <i className={isMenuOpen ? "ri-close-line" : "ri-menu-4-line"}></i>
          </div>
        </div>
      </nav>

      {/* === CUSTOM LOGOUT MODAL === */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay (Blur Background) */}
          <div
            onClick={() => setShowLogoutModal(false)}
            className="absolute inset-0 bg-[#4a3b2a]/40 backdrop-blur-sm transition-opacity"
          ></div>

          {/* Modal Box */}
          <div className="bg-white rounded-[30px] p-8 max-w-sm w-full shadow-2xl relative z-10 text-center border border-[#4a3b2a]/10 transform transition-all scale-100">
            {/* Icon */}
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              <i className="ri-logout-circle-r-line"></i>
            </div>

            <h3 className="text-2xl font-playfair font-bold text-[#4a3b2a] mb-2">
              Signing Out?
            </h3>
            <p className="text-stone-500 text-sm mb-8">
              Are you sure you want to end your session? Your cart items will be
              saved.
            </p>

            <div className="flex gap-4">
              {/* No / Cancel Button */}
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 rounded-full border border-[#4a3b2a]/20 text-[#4a3b2a] font-bold text-xs uppercase tracking-widest hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>

              {/* Yes / Logout Button */}
              <button
                onClick={confirmLogout}
                className="flex-1 py-3 rounded-full bg-red-500 text-white font-bold text-xs uppercase tracking-widest hover:bg-red-600 shadow-lg transition-colors"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#fdfbf7] z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navLinks.map((item, index) => (
          <NavLink
            key={index}
            to={item.link}
            end={item.link === "/"}
            onClick={toggleMenu}
          >
            {({ isActive }) => (
              <div
                className={`text-2xl font-semibold flex items-center gap-3 transition-all
        ${
          isActive
            ? "text-yellow-700 scale-105"
            : "text-gray-800 hover:text-yellow-700"
        }`}
              >
                <i
                  className={`${item.icon} ${
                    isActive ? "text-yellow-600" : "text-yellow-600"
                  }`}
                ></i>
                {item.name}
              </div>
            )}
          </NavLink>
        ))}
        <Link
          to="/contact"
          onClick={toggleMenu}
          className="mt-5 px-8 py-3 bg-black text-white font-bold rounded-full"
        >
          Raise a Query
        </Link>
      </div>
    </>
  );
};

export default Navbar;
