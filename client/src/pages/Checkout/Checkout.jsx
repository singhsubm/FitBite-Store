import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import API from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import {useToast}from'../../context/ToastContext';

const Checkout = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const { cartItems, cartTotal, setIsCartOpen, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  // Form State
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
    phone: '',
    email: '',
  });

  // 2. PRE-FILL EMAIL (Jaise hi page load ho, user ka email daal do)
  useEffect(() => {
    if (userInfo) {
      setFormData(prev => ({
        ...prev,
        email: userInfo.email // User ka default email
      }));
    }
  }, []);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    if (!userInfo) {
        // Agar user login nahi hai, to Login page par bhejo
        // 'state' ka use karke hum bata rahe hain ki wapas yahan aana hai
        navigate('/login', { state: { from: '/checkout' } });
    }
  }, [navigate]);

  // PLACE ORDER FUNCTION
  const placeOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend ko data bhejo
      const orderData = {
        orderItems: cartItems.map(item => ({
            name: item.name,
            qty: item.qty,
            image: item.images[0],
            price: item.price,
            product: item._id
        })),
        shippingAddress: formData,
        paymentMethod: 'COD', // Abhi ke liye hardcoded
        itemsPrice: cartTotal,
        taxPrice: 50, // Example Tax
        shippingPrice: 0, // Free Shipping
        totalPrice: cartTotal + 50,
      };

      const { data } = await API.post('/orders', orderData);
      
      // Success!
      showToast("Order Placed Successfully!", "success");
      clearCart();
      navigate('/');
      localStorage.removeItem('cartItems'); // Cart khaali karo (Logic context me bhi add karna hoga)
      window.location.href = '/'; // Home pe bhej do
      
    } catch (error) {
      console.error("Order Failed:", error);
      showToast("Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) return <div className="h-screen flex items-center justify-center">Your Cart is Empty</div>;

  return (
    <div className="w-full bg-[#fdfbf7] min-h-screen pt-32 pb-20 px-4 md:px-10">
      
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        
        {/* === LEFT: SHIPPING FORM === */}
        <div>
          <h2 className="text-3xl font-playfair font-bold text-[#4a3b2a] mb-8">Shipping Details</h2>
          
          <form onSubmit={placeOrder} className="space-y-6">
            
            <div className="flex flex-col gap-2">
               <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Address</label>
               <input 
                 type="text" name="address" required onChange={handleChange}
                 className="w-full bg-white border border-[#4a3b2a]/10 p-4 rounded-xl outline-none focus:border-[#d4a017] transition-all"
                 placeholder="123, Green Park, Main Road"
               />
            </div>

            {/* === NEW: CONTACT INFO SECTION === */}
             <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Contact Email</label>
                    <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email} 
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl outline-none focus:border-[#d4a017]"
                        placeholder="For order updates"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Phone Number</label>
                    <input 
                        type="tel" 
                        name="phone"
                        required
                        value={formData.phone} 
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl outline-none focus:border-[#d4a017]"
                        placeholder="+91 98765 43210"
                    />
                </div>
             </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-stone-500">City</label>
                   <input 
                     type="text" name="city" required onChange={handleChange}
                     className="w-full bg-white border border-[#4a3b2a]/10 p-4 rounded-xl outline-none focus:border-[#d4a017] transition-all"
                     placeholder="New Delhi"
                   />
                </div>
                <div className="flex flex-col gap-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Pincode</label>
                   <input 
                     type="text" name="postalCode" required onChange={handleChange}
                     className="w-full bg-white border border-[#4a3b2a]/10 p-4 rounded-xl outline-none focus:border-[#d4a017] transition-all"
                     placeholder="110001"
                   />
                </div>
            </div>

            <div className="flex flex-col gap-2">
               <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Country</label>
               <input 
                 type="text" name="country" value="India" readOnly
                 className="w-full bg-stone-100 border border-[#4a3b2a]/10 p-4 rounded-xl outline-none text-stone-500 cursor-not-allowed"
               />
            </div>

            {/* Hidden Submit Button for Enter Key support */}
            <button type="submit" className="hidden"></button>

          </form>
        </div>

        {/* === RIGHT: ORDER SUMMARY (Sticky) === */}
        <div className="h-fit md:sticky md:top-32">
            <div className="bg-white p-8 rounded-[30px] shadow-xl border border-[#4a3b2a]/5 relative overflow-hidden">
                {/* Decorative Top Border */}
                <div className="absolute top-0 left-0 w-full h-2 bg-[#d4a017]"></div>

                <h3 className="text-2xl font-playfair font-bold text-[#4a3b2a] mb-6">Order Summary</h3>

                {/* Items List */}
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {cartItems.map(item => (
                        <div key={item._id} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded bg-stone-100 overflow-hidden">
                                    <img src={item.images[0]} className="w-full h-full object-cover" />
                                </div>
                                <span className="text-stone-600 font-medium">
                                    {item.name} <span className="text-xs text-stone-400">x{item.qty}</span>
                                </span>
                            </div>
                            <span className="font-bold text-[#4a3b2a]">₹{item.price * item.qty}</span>
                        </div>
                    ))}
                </div>

                <div className="h-[1px] w-full bg-[#4a3b2a]/10 mb-6"></div>

                {/* Totals */}
                <div className="space-y-2 text-sm text-stone-600 mb-6">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{cartTotal}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax (Estimated)</span>
                        <span>₹50</span>
                    </div>
                    <div className="flex justify-between text-[#d4a017] font-bold">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                </div>

                <div className="flex justify-between text-xl font-bold text-[#4a3b2a] mb-8">
                    <span>Total</span>
                    <span>₹{cartTotal + 50}</span>
                </div>

                {/* PAY BUTTON */}
                <button 
                    onClick={placeOrder} 
                    disabled={loading}
                    className="w-full bg-[#4a3b2a] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#d4a017] transition-all duration-300 shadow-lg flex justify-center items-center gap-2 disabled:opacity-50"
                >
                    {loading ? (
                        <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span>
                    ) : (
                        <>
                           <span>Confirm Order</span>
                           <i className="ri-secure-payment-line"></i>
                        </>
                    )}
                </button>

                <p className="text-center text-[10px] text-stone-400 mt-4 uppercase tracking-wide">
                    <i className="ri-lock-line"></i> Secure SSL Encryption
                </p>

            </div>
        </div>

      </div>

    </div>
  );
};

export default Checkout;