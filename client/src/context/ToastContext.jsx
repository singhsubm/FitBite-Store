import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'info', // 'success', 'error', 'confirm'
    onConfirm: null, // Sirf 'confirm' type ke liye
  });

  // 1. Simple Alert (Success/Error)
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type, onConfirm: null });
    
    // Agar confirm nahi hai, to 3 sec baad apne aap band ho jaye
    if (type !== 'confirm') {
      setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3000);
    }
  };

  // 2. Confirm Dialog (Yes/No)
  const showConfirm = (message, onConfirmAction) => {
    setToast({
      show: true,
      message,
      type: 'confirm',
      onConfirm: () => {
        onConfirmAction();
        closeToast();
      }
    });
  };

  const closeToast = () => {
    setToast({ show: false, message: '', type: '', onConfirm: null });
  };

  return (
    <ToastContext.Provider value={{ showToast, showConfirm }}>
      {children}
      
      {/* === GLOBAL UI COMPONENT === */}
      {toast.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          {/* Overlay (Blur) */}
          <div 
            onClick={toast.type === 'confirm' ? null : closeToast} 
            className="absolute inset-0 bg-[#4a3b2a]/40 backdrop-blur-sm transition-opacity"
          ></div>

          {/* Modal Box */}
          <div className="bg-white rounded-[30px] p-8 max-w-sm w-full shadow-2xl relative z-10 text-center border border-[#4a3b2a]/10 animate-fade-in-up">
             
             {/* ICON Based on Type */}
             <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl 
                ${toast.type === 'error' || toast.type === 'confirm' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                
                {toast.type === 'success' && <i className="ri-check-double-line"></i>}
                {toast.type === 'error' && <i className="ri-error-warning-line"></i>}
                {toast.type === 'confirm' && <i className="ri-question-line"></i>}
             </div>

             <h3 className="text-2xl font-playfair font-bold text-[#4a3b2a] mb-2 capitalize">
                {toast.type === 'confirm' ? 'Are you sure?' : toast.type === 'error' ? 'Oops!' : 'Success!'}
             </h3>
             
             <p className="text-stone-500 text-sm mb-8">
                {toast.message}
             </p>

             {/* BUTTONS */}
             {toast.type === 'confirm' ? (
                 <div className="flex gap-4">
                    <button 
                      onClick={closeToast}
                      className="flex-1 py-3 rounded-full border border-[#4a3b2a]/20 text-[#4a3b2a] font-bold text-xs uppercase tracking-widest hover:bg-stone-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={toast.onConfirm}
                      className="flex-1 py-3 rounded-full bg-[#4a3b2a] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#d4a017] shadow-lg transition-colors"
                    >
                      Yes, Proceed
                    </button>
                 </div>
             ) : (
                 <button 
                   onClick={closeToast}
                   className="w-full py-3 rounded-full bg-[#4a3b2a] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#d4a017] shadow-lg transition-colors"
                 >
                   Okay, Got it
                 </button>
             )}

          </div>
        </div>
      )}

    </ToastContext.Provider>
  );
};