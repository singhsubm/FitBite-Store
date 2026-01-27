import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartSidebar = () => {
  // 1. addToCart aur decreaseQty nikaal lo Context se
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    cartTotal,
    addToCart, // <--- ADDED
    decreaseQty, // <--- ADDED
  } = useCart();

  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);

  // Animation Logic (Ye same rahega)
  useEffect(() => {
    if (isCartOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        display: "block",
      });
      gsap.to(sidebarRef.current, {
        x: "0%",
        duration: 0.5,
        ease: "power3.out",
      });
      // isko lagake scroll nhi hoga jb cart khulega


      // const scrollY = window.scrollY;

      // document.body.style.position = "fixed";
      // document.body.style.top = `-${scrollY}px`;
      // document.body.style.left = "0";
      // document.body.style.right = "0";
      // document.body.style.width = "100%";


    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        display: "none",
      });
      gsap.to(sidebarRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
      });

      // const scrollY = document.body.style.top;

      // document.body.style.position = "";
      // document.body.style.top = "";
      // document.body.style.left = "";
      // document.body.style.right = "";
      // document.body.style.width = "";

      // if (scrollY) {
      //   window.scrollTo(0, parseInt(scrollY) * -1);
      // }
    }
  }, [isCartOpen]);

  return (
    <>
      {/* OVERLAY */}
      <div
        ref={overlayRef}
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/40 z-[60] hidden opacity-0 backdrop-blur-sm"
      ></div>

      {/* SIDEBAR DRAWER */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-[85%] md:w-[400px] bg-[#fdfbf7] z-[70] shadow-2xl transform translate-x-full flex flex-col border-l border-[#4a3b2a]/10"
      >
        {/* HEADER */}
        <div className="p-6 border-b border-[#4a3b2a]/10 flex justify-between items-center bg-white">
          <h2 className="text-2xl font-playfair font-bold text-[#4a3b2a]">
            Your Cart ({cartItems.length})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-2xl hover:text-[#d4a017] transition-colors"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        {/* CART ITEMS LIST */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <i className="ri-shopping-cart-line text-6xl mb-4 text-stone-300"></i>
              <p>Your cart is empty.</p>
              <Link
                to="/shop"
                onClick={() => setIsCartOpen(false)}

                className="mt-4 text-[#d4a017] font-bold underline"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="flex gap-4">
                {/* Image */}
                <div className="w-20 h-20 bg-white rounded-xl overflow-hidden border border-[#4a3b2a]/10 shrink-0">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* Top Row: Name & Delete */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-[#4a3b2a] line-clamp-1 leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-stone-400 mt-1 uppercase tracking-wide">
                        {item.category} • {item.weight}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-stone-300 hover:text-red-500 transition-colors"
                    >
                      <i className="ri-delete-bin-line text-lg"></i>
                    </button>
                  </div>

                  {/* Bottom Row: Qty Controls & Price */}
                  <div className="flex justify-between items-end mt-3">
                    {/* === QTY CONTROLS (NEW UI) === */}
                    <div className="flex items-center gap-3 bg-stone-100 rounded-full px-3 py-1 border border-stone-200">
                      {/* Minus Button */}
                      <button
                        onClick={() => decreaseQty(item)}
                        className="w-5 h-5 flex items-center justify-center font-bold text-stone-500 hover:text-[#d4a017] transition-colors"
                      >
                        -
                      </button>

                      {/* Qty Value */}
                      <span className="text-sm font-bold text-[#4a3b2a] min-w-[1rem] text-center">
                        {item.qty}
                      </span>

                      {/* Plus Button */}
                      <button
                        onClick={() => addToCart(item)}
                        className="w-5 h-5 flex items-center justify-center font-bold text-stone-500 hover:text-[#d4a017] transition-colors"
                      >
                        +
                      </button>
                    </div>
                    {/* ============================= */}

                    <span className="font-bold text-[#4a3b2a] text-lg">
                      ₹{item.price * item.qty}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER (Checkout) */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#4a3b2a]/10 bg-white">
            <div className="flex justify-between items-center mb-4 text-xl font-bold text-[#4a3b2a]">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <p className="text-xs text-stone-400 mb-6 text-center">
              Shipping & taxes calculated at checkout.
            </p>

            <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
              <button className="w-full bg-[#4a3b2a] text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#d4a017] transition-all duration-300 shadow-lg">
                Checkout Now
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
