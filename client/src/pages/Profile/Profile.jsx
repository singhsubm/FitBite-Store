import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import { useToast } from '../../context/ToastContext';

const Profile = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  // User Data State
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  
  // Edit Mode States
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Modal State (Order Details dekhne ke liye)
  const [selectedOrder, setSelectedOrder] = useState(null);

  // 1. Data Fetching
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    if (!userInfo) {
      navigate('/login');
    } else {
      setUser(userInfo);
      setName(userInfo.name);
      setEmail(userInfo.email);
      fetchMyOrders();
    }
  }, [navigate]);

  const fetchMyOrders = async () => {
     try {
         // Backend se orders mangao (Make sure backend route exists: GET /api/orders/myorders)
         const { data } = await API.get('/orders/myorders');
         setOrders(data);
     } catch (error) {
         console.error("Error fetching orders");
     }
  };

  // 2. Update Profile Handler
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    try {
      // Backend ko update bhejo
      const { data } = await API.put('/users/profile', { id: user._id, name, email, password });
      
      showToast("Profile Updated Successfully", "success");
      
      // LocalStorage & State update karo
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      setIsEditing(false); // Edit mode band
      setPassword(''); 
      setConfirmPassword('');
    } catch (error) {
      showToast(error.response?.data?.message || "Update Failed", "error");
    }
  };

  useEffect(() => {
    window.scroll(0,0);
    
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#fdfbf7] pt-32 pb-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* === LEFT COLUMN: USER PROFILE CARD === */}
        <div className="md:col-span-1">
           <div className="bg-white p-8 rounded-[30px] shadow-xl border border-[#4a3b2a]/5 text-center sticky top-32">
              
              <div className="w-24 h-24 bg-[#4a3b2a] text-[#d4a017] rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-6 shadow-lg">
                 {user.name?.charAt(0).toUpperCase()}
              </div>

              {isEditing ? (
                 /* EDIT FORM */
                 <form onSubmit={submitHandler} className="space-y-4 text-left">
                    <div>
                       <label className="text-xs font-bold text-stone-400 uppercase">Name</label>
                       <input type="text" autoComplete='name' value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded-lg text-sm outline-none focus:border-[#d4a017]" />
                    </div>
                    <div>
                       <label className="text-xs font-bold text-stone-400 uppercase">Email</label>
                       <input type="email" autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded-lg text-sm outline-none focus:border-[#d4a017]" />
                    </div>
                    <div>
                       <label className="text-xs font-bold text-stone-400 uppercase">New Password</label>
                       <input type="password" autoComplete='new-password' placeholder="Leave blank to keep same" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded-lg text-sm outline-none focus:border-[#d4a017]" />
                    </div>
                    <div>
                       <label className="text-xs font-bold text-stone-400 uppercase">Confirm Password</label>
                       <input type="password" autoComplete='confirm-password' placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 border rounded-lg text-sm outline-none focus:border-[#d4a017]" />
                    </div>

                    <div className="flex gap-2 mt-4">
                       <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-2 border border-stone-300 rounded-lg text-xs font-bold uppercase">Cancel</button>
                       <button type="submit" className="flex-1 py-2 bg-[#4a3b2a] text-white rounded-lg text-xs font-bold uppercase hover:bg-[#d4a017]">Save</button>
                    </div>
                 </form>
              ) : (
                 /* VIEW MODE */
                 <>
                    <h2 className="text-2xl font-playfair font-bold text-[#4a3b2a]">{user.name}</h2>
                    <p className="text-stone-500 text-sm mb-6">{user.email}</p>
                    
                    <button 
                       onClick={() => setIsEditing(true)}
                       className="w-full py-3 border border-[#4a3b2a] text-[#4a3b2a] rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#4a3b2a] hover:text-white transition-all"
                    >
                       Edit Profile
                    </button>
                 </>
              )}
           </div>
        </div>

        {/* === RIGHT COLUMN: ORDER HISTORY === */}
        <div className="md:col-span-2">
           <h2 className="text-3xl font-playfair font-bold text-[#4a3b2a] mb-6">My Orders</h2>
           
           {orders.length === 0 ? (
              <div className="bg-white p-10 rounded-[30px] text-center border border-dashed border-stone-300">
                 <p className="text-stone-400">You haven't ordered anything yet.</p>
              </div>
           ) : (
              <div className="bg-white rounded-[30px] shadow-xl border border-[#4a3b2a]/5 overflow-hidden">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead className="bg-[#fdfbf7] border-b border-[#4a3b2a]/10">
                          <tr className="text-xs font-bold uppercase text-stone-500">
                             <th className="p-5">Order ID</th>
                             <th className="p-5">Date</th>
                             <th className="p-5">Total</th>
                             <th className="p-5">Status</th>
                             <th className="p-5">Details</th>
                          </tr>
                       </thead>
                       <tbody>
                          {/* ORDERS SORTING: REVERSE() lagaya taki naya upar dikhe */}
                          {orders.slice().reverse().map((order) => (
                             <tr key={order._id} className="border-b border-[#4a3b2a]/5 last:border-0 hover:bg-stone-50 transition-colors">
                                <td className="p-5 font-mono text-xs text-[#4a3b2a]">#{order._id.substring(0, 10)}...</td>
                                <td className="p-5 text-sm text-stone-500">{order.createdAt.substring(0, 10)}</td>
                                <td className="p-5 font-bold text-[#4a3b2a]">₹{order.totalPrice}</td>
                                
                                {/* STATUS BADGE with Colors */}
                                <td className="p-5">
                                   <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                                      ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' : ''}
                                      ${order.orderStatus === 'Shipped' ? 'bg-blue-100 text-blue-700' : ''}
                                      ${order.orderStatus === 'Cancelled' ? 'bg-red-100 text-red-700' : ''}
                                      ${order.orderStatus === 'Pending' || !order.orderStatus ? 'bg-yellow-100 text-yellow-700' : ''}
                                   `}>
                                      {order.orderStatus || 'Pending'}
                                   </span>
                                </td>

                                {/* VIEW BUTTON */}
                                <td className="p-5">
                                   <button 
                                      onClick={() => setSelectedOrder(order)}
                                      className="w-8 h-8 rounded-full bg-[#fdfbf7] border border-[#4a3b2a]/10 flex items-center justify-center text-[#4a3b2a] hover:bg-[#4a3b2a] hover:text-white transition-all"
                                   >
                                      <i className="ri-eye-line"></i>
                                   </button>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           )}
        </div>

      </div>

      {/* === ORDER DETAILS MODAL (Same as Admin) === */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div onClick={() => setSelectedOrder(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
            <div className="bg-white w-full max-w-lg rounded-[20px] shadow-2xl relative z-10 overflow-hidden animate-fade-in-up">
                <div className="bg-[#4a3b2a] p-4 flex justify-between items-center">
                   <h3 className="text-white font-playfair font-bold text-lg">Order Details</h3>
                   <button onClick={() => setSelectedOrder(null)} className="text-white/70 hover:text-white"><i className="ri-close-circle-line text-2xl"></i></button>
                </div>
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                   
                   {/* Delivery Address */}
                   <div className="mb-4 bg-stone-50 p-3 rounded-lg text-xs text-stone-500">
                      <p className="font-bold uppercase mb-1">Delivering To:</p>
                      <p>{selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city}</p>
                      <p>Phone: {selectedOrder.shippingAddress.phone}</p>
                   </div>

                   <div className="space-y-4">
                      {selectedOrder.orderItems.map((item, index) => (
                         <div key={index} className="flex gap-4 items-center border-b border-stone-100 pb-4 last:border-0">
                            <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg border border-stone-200" />
                            <div className="flex-1">
                               <p className="font-bold text-[#4a3b2a] text-sm">{item.name}</p>
                               <p className="text-xs text-stone-500">Qty: {item.qty} x ₹{item.price}</p>
                            </div>
                            <div className="font-bold text-[#4a3b2a]">₹{item.qty * item.price}</div>
                         </div>
                      ))}
                   </div>
                </div>
                <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-between items-center">
                   <span className="text-sm font-bold text-stone-500">Total Paid</span>
                   <span className="text-xl font-bold text-[#4a3b2a]">₹{selectedOrder.totalPrice}</span>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default Profile;