import React, { createContext, useState, useEffect, useContext } from "react";
import { useToast } from "./ToastContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { showToast } = useToast();

  // LocalStorage se data uthao agar hai to, nahi to empty array
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Jab bhi cart change ho, LocalStorage update karo
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // 1. ADD TO CART (Increase Qty)
  const addToCart = (product, qty = 1) => {
    const maxStock =
      product.countInStock !== undefined ? product.countInStock : product.stock;

    const existItem = cartItems.find((x) => x._id === product._id);
    const currentQtyInCart = existItem ? existItem.qty : 0;

    // === GUARDIAN LOGIC (Yahan Rokne Ka Kaam Hoga) ===
    if (currentQtyInCart + qty > maxStock) {
      showToast(`Oops! Only ${maxStock} items left in stock.`, "error");
      return; // Code yahi ruk jayega, aage nahi badhega
    }

    if (existItem) {
      setCartItems(
        cartItems.map((x) =>
          x._id === existItem._id ? { ...x, qty: existItem.qty + qty } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty }]);
      setIsCartOpen(true); // Sirf naya item add hone par cart khule
    }
  };

  // 2. DECREASE QUANTITY (Ye naya function hai)
  const decreaseQty = (product) => {
    const existItem = cartItems.find((x) => x._id === product._id);

    if (existItem.qty === 1) {
      // Agar 1 hai aur minus dabaya, to uda do
      setCartItems(cartItems.filter((x) => x._id !== product._id));
    } else {
      // Nahi to 1 kam kar do
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...x, qty: x.qty - 1 } : x
        )
      );
    }
  };

  // 3. REMOVE FROM CART (Direct Delete)
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((x) => x._id !== id));
  };

  // 4. CART TOTAL PRICE
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseQty, // <--- ISKO EXPORT KIYA
        removeFromCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        totalPrice: cartTotal, // Compatibility ke liye dono naam rakh liye
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
