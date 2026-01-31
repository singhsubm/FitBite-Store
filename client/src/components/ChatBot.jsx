import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [allProducts, setAllProducts] = useState([]);

  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userName = userInfo ? userInfo.name.split(" ")[0] : "Guest";

  const [messages, setMessages] = useState([
    {
      type: "text",
      text: `Hi ${userName}! 👋 I'm your FitBite Assistant. How can I help you today?`,
      sender: "bot",
    },
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setAllProducts(data);
      } catch (error) {
        console.error("Bot failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && messages.length === 1) {
        setHasUnread(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);


  // === SMART LOGIC ===
  const generateResponse = (text) => {
    const lowerText = text.toLowerCase();

    // 1. EXIT / END LOGIC
    if (
      lowerText.includes("end") ||
      lowerText.includes("exit") ||
      lowerText.includes("bye") ||
      lowerText.includes("quit") ||
      lowerText.includes("close") ||
      lowerText.includes("thank") ||
      lowerText.includes("thanks") ||
      lowerText.includes("see you") ||
      lowerText.includes("stop") ||
      lowerText.includes("goodbye")
    ) {
      // Chat close logic handleSend me setTimeout ke through karenge
      return {
        type: "text",
        text: "It was nice chatting with you! 👋 Have a healthy day ahead!",
        sender: "bot",
        closeChat: true,
      };
    }

    // 2. PRODUCT SUGGESTION (API)
    if (
      lowerText.includes("suggest") ||
      lowerText.includes("recommend") ||
      lowerText.includes("best") ||
      lowerText.includes("buy") ||
      lowerText.includes("snack") ||
      lowerText.includes("tasty") ||
      lowerText.includes("healthy") ||
      lowerText.includes("treat") ||
      lowerText.includes("craving") ||
      lowerText.includes("food") ||
      lowerText.includes("eat")
    ) {
      if (allProducts.length > 0) {
        const randomProduct =
          allProducts[Math.floor(Math.random() * allProducts.length)];
        return {
          type: "product",
          sender: "bot",
          product: {
            id: randomProduct._id,
            name: randomProduct.name,
            price: randomProduct.price,
            img: Array.isArray(randomProduct.images)
              ? randomProduct.images[0]
              : randomProduct.image,
            desc: randomProduct.description
              ? randomProduct.description.substring(0, 50) + "..."
              : "Healthy & Tasty!",
            link: `/shop`,
          },
        };
      } else {
        return {
          type: "text",
          text: "I recommend checking our 'Best Sellers' section in the Shop!",
          sender: "bot",
          action: { label: "Visit Shop", link: "/shop" },
        };
      }
    }

    // 3. KEYWORD MAPPING
    let replyText = "";
    let action = null;

    if (
      lowerText.includes("hi") ||
      lowerText.includes("hello") ||
      lowerText.includes("hey") ||
      lowerText.includes("greetings") ||
      lowerText.includes("good morning") ||
      lowerText.includes("good afternoon") ||
      lowerText.includes("good evening")
    ) {
      replyText = "Hello! Ready to snack healthy? 🥑 Select an option below!";
    } else if (
      lowerText.includes("track") ||
      lowerText.includes("order") ||
      lowerText.includes("status") ||
      lowerText.includes("shipping") ||
      lowerText.includes("delivery") ||
      lowerText.includes("where is my order") ||
      lowerText.includes("track my order") ||
      lowerText.includes("order status")
    ) {
      replyText = "You can track your live orders in the 'Profile' section.";
      action = { label: "Go to Orders", link: "/profile" };
    } else if (
      lowerText.includes("shipping") ||
      lowerText.includes("delivery") ||
      lowerText.includes("charge") ||
      lowerText.includes("cost") ||
      lowerText.includes("fee") ||
      lowerText.includes("ship") ||
      lowerText.includes("deliver")
    ) {
      replyText =
        "Great news! Shipping is FREE for orders above ₹500! 🚚 For smaller orders, it's just ₹50.";
    } else if (
      lowerText.includes("discount") ||
      lowerText.includes("coupon") ||
      lowerText.includes("offer") ||
      lowerText.includes("promo") ||
      lowerText.includes("code") ||
      lowerText.includes("deal") ||
      lowerText.includes("sale")
    ) {
      replyText =
        "Yes! Use code 'WELCOME10' for 10% OFF on your first order. 🎉";
    } else if (
      lowerText.includes("return") ||
      lowerText.includes("refund") ||
      lowerText.includes("policy") ||
      lowerText.includes("replace") ||
      lowerText.includes("exchange") ||
      lowerText.includes("money back") ||
      lowerText.includes("return policy")
    ) {
      replyText =
        "We have a 7-day return policy for damaged items. Just email us a photo at support@fitbite.com.";
    } else if (
      lowerText.includes("password") ||
      lowerText.includes("login") ||
      lowerText.includes("forgot")
    ) {
      replyText = "Trouble logging in? You can reset your password easily.";
      action = { label: "Reset Password", link: "/forgot-password" };
    } else if (
      lowerText.includes("payment") ||
      lowerText.includes("cod") ||
      lowerText.includes("cash on delivery") ||
      lowerText.includes("pay") ||
      lowerText.includes("mode") ||
      lowerText.includes("methods")
    ) {
      replyText = "We accept Cards, UPI, Net Banking, and Razorpay. COD is currently available only in select cities.";
    } else if (
      lowerText.includes("contact") ||
      lowerText.includes("support") ||
      lowerText.includes("call") ||
      lowerText.includes("help") ||
      lowerText.includes("customer service") ||
      lowerText.includes("care") ||
      lowerText.includes("phone") ||
      lowerText.includes("number") ||
      lowerText.includes("email") ||
      lowerText.includes("reach") ||
      lowerText.includes("talk") ||
      lowerText.includes("speak") ||
      lowerText.includes("representative")
    ) {
      replyText =
        "You can reach us at +91-9876543210 or email support@fitbite.com. We are available 9 AM - 6 PM.";
    } else if (
      lowerText.includes("okay") ||
      lowerText.includes("ok") ||
      lowerText.includes("got it") ||
      lowerText.includes("thanks") ||
      lowerText.includes("thank you") ||
      lowerText.includes("great") ||
      lowerText.includes("awesome") ||
      lowerText.includes("good") ||
      lowerText.includes("nice")
    ) {
      replyText = "You're welcome! 😊 If you have more questions, just ask!";
    } else if (
      lowerText.includes("bulk") ||
      lowerText.includes("corporate") ||
      lowerText.includes("gift") ||
      lowerText.includes("gifting") ||
      lowerText.includes("party") ||
      lowerText.includes("event") ||
      lowerText.includes("wedding") ||
      lowerText.includes("festival") ||
      lowerText.includes("occasion")
    ) {
      replyText =
        "Yes! We do corporate and bulk gifting. Please email 'support@fitbite.com' for special pricing.";
    } else {
      replyText =
        "I'm still learning! 🧠 Try asking 'Suggest a snack' or 'Track Order'.";
    }

    return { type: "text", text: replyText, sender: "bot", action: action };
  };

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { type: "text", text: text, sender: "user" },
    ]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(text);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);

      // Auto Close Logic for "Exit"
      if (response.closeChat) {
        setTimeout(() => {
          setIsClosing(true); // start animation
          setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
          }, 500); // animation duration
        }, 1000);
      }
    }, 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setHasUnread(false);
  };

  const clearChat = () => {
    setMessages([
      { type: "text", text: "Chat cleared. How can I help?", sender: "bot" },
    ]);
  };

  const faqOptions = [
    "Suggest a Snack 🥜",
    "Track Order 📦",
    "Return Policy 🔄",
    "Forgot Password 🔑",
    "Contact Support 📞",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end font-sans">

      {isOpen && (
        <div
          className={` bg-white/95 backdrop-blur-md w-[350px] h-[550px] rounded-2xl shadow-2xl flex flex-col mb-4 overflow-hidden transition-all duration-500 ease-in-out${isClosing ? "opacity-0 scale-90 translate-y-10" : "opacity-100 scale-100 translate-y-0"}`}
        >
          <div className="bg-gradient-to-r from-[#4a3b2a] to-[#2a2118] p-4 flex justify-between items-center text-white shadow-lg">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                  <i className="ri-robot-2-line text-xl"></i>
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#4a3b2a] rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">FitBite AI</h3>
                <p className="text-[10px] text-white/70">
                  Online | 24/7 Support
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearChat}
                title="Clear Chat"
                className="text-white/60 hover:text-white transition"
              >
                <i className="ri-delete-bin-line"></i>
              </button>
              <button
                onClick={toggleChat}
                className="text-white/80 hover:text-white transition"
              >
                <i className="ri-arrow-down-s-line text-xl"></i>
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-[#f4f2ed] space-y-4 custom-scrollbar overscroll-contain"
          onWheel={(e) => e.stopPropagation()}
          >
            <p className="text-center text-[10px] text-stone-400 font-bold uppercase tracking-widest my-2 opacity-50">
              Today
            </p>

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                {msg.type === "text" && (
                  <>
                    <div
                      className={`max-w-[85%] px-4 py-3 text-sm rounded-2xl shadow-sm ${msg.sender === "user" ? "bg-[#d4a017] text-white rounded-br-none" : "bg-white text-stone-700 rounded-bl-none border border-stone-200"}`}
                    >
                      {msg.text}
                    </div>
                    {msg.action && (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          navigate(msg.action.link);
                        }}
                        className="mt-2 text-xs bg-[#4a3b2a] text-white px-4 py-2 rounded-full hover:bg-[#d4a017] transition-all shadow-md self-start"
                      >
                        {msg.action.label}{" "}
                        <i className="ri-arrow-right-line ml-1"></i>
                      </button>
                    )}
                  </>
                )}

                {msg.type === "product" && (
                    <>
                  <div
                    className="bg-white p-3 rounded-2xl rounded-bl-none shadow-md border border-stone-200 w-52 group transition-all hover:shadow-xl cursor-pointer"
                    onClick={() => {
                        setIsOpen(false);
                        navigate(`/shop/product/${msg.product.id}`);
                    }}
                  >
                    <div className="h-32 w-full rounded-xl overflow-hidden mb-2 relative">
                      <img
                        src={msg.product.img}
                        alt="Product"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute top-2 right-2 bg-[#d4a017] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                        Try This
                      </span>
                    </div>
                    <h4 className="font-bold text-[#4a3b2a] text-sm leading-tight mb-1">
                      {msg.product.name}
                    </h4>
                    <p className="text-[10px] text-stone-500 mb-2 leading-tight">
                      {msg.product.desc}
                    </p>
                    <div className="flex justify-between items-center mt-2 border-t pt-2 border-dashed border-stone-200">
                      <span className="font-bold text-[#d4a017]">
                        ₹{msg.product.price}
                      </span>
                      <span className="text-[10px] bg-[#4a3b2a] text-white px-3 py-1.5 rounded-md">
                        VIEW
                      </span>
                    </div>
                  </div>
                  <div className="bg-[#4a3b2a] mt-2 text-white text-center py-1 rounded-2xl shadow-md border border-stone-200 w-52 group transition-all hover:shadow-xl cursor-pointer" onClick={()=> {
                    setIsOpen(false);
                    navigate("/shop");
                    }}>
                        Go to Shop <i className="ri-arrow-right-line ml-1"></i>
                    </div>
                    </>
                )}

                <span className="text-[9px] text-stone-400 mt-1 px-1 opacity-70">
                  {msg.sender === "bot" ? "FitBite Bot" : "You"} •{" "}
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start">
                <div className="bg-white border border-stone-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                  <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="bg-[#f4f2ed] px-1 pb-3 pt-3">
            <div className="flex flex-wrap gap-2 justify-center">
              {faqOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(opt)}
                  className="text-[10px] bg-white border border-[#4a3b2a]/10 px-3 py-1.5 rounded-full text-stone-600 hover:bg-[#4a3b2a] hover:text-white transition-all shadow-sm"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-stone-100 text-sm p-3 rounded-full outline-none focus:ring-1 focus:ring-[#d4a017] transition-all pl-4"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputValue.trim()}
              className="w-10 h-10 bg-[#4a3b2a] text-white rounded-full flex items-center justify-center hover:bg-[#d4a017] transition-all disabled:opacity-50 shadow-md"
            >
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>
      )}

      {/* Main Button (OLD STYLE: Brown) */}
      <button
        onClick={toggleChat}
        className="relative w-16 h-16 bg-[#4a3b2a] hover:bg-[#d4a017] text-white rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center group"
      >
        {isOpen ? (
          <i className="ri-close-line text-3xl transition-transform duration-300"></i>
        ) : (
          <>
            <i className="ri-chat-smile-3-fill text-3xl group-hover:scale-110 transition-transform"></i>
            {hasUnread && (
              <span className="absolute top-0 right-0 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
              </span>
            )}
          </>
        )}
      </button>
    </div>
  );
};

export default ChatBot;
