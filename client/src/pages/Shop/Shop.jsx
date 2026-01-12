import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import API from "../../api/axios";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import SEO from "../../components/SEO";

const categories = [
  "All",
  "Almonds",
  "Cashews",
  "Pistachios",
  "Walnuts",
  "Gifts",
  "Seeds",
  "Combo",
  "Fitness Pack",
];

const Shop = () => {
  // Products ab empty start honge
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Filter ke liye alag state
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const container = useRef(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products"); // Backend call
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 2. FILTER LOGIC (Updated)
  useEffect(() => {
    if (loading) return;

    let filtered = products;

    if (searchQuery.trim()) {
      // 🔍 SEARCH → GLOBAL (ignore category)
      filtered = products.filter(
        (item) =>
          item.name &&
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (activeCategory !== "All") {
      // 📂 CATEGORY filter only when search empty
      filtered = products.filter(
        (item) => item.category?.trim() === activeCategory.trim()
      );
    }

    setFilteredProducts(filtered);

    if (filtered.length === 0) return;

    gsap.killTweensOf(".product-card");
    gsap.fromTo(
      ".product-card",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1 }
    );
  }, [activeCategory, searchQuery, products, loading]);

  // 2. FILTER LOGIC

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Initial Page Load Animation
  useGSAP(
    () => {
      if (!loading) {
        gsap.from(".shop-header", {
          y: -50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
        gsap.from(".shop-sidebar", {
          x: -50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
        });
      }
    },
    { scope: container, dependencies: [loading] }
  );

  return (
    <>
      <SEO
        title="Shop Premium Dry Fruits"
        description="Browse our exclusive collection of Almonds, Cashews, Walnuts and Combo packs at best prices."
      />

      <div
        ref={container}
        className="w-full bg-[#fdfbf7] min-h-screen pt-32 pb-20 px-4 md:px-10"
      >
        {/* HEADER */}
        <div className="shop-header text-center mb-16">
          <h1 className="text-5xl md:text-7xl playfair font-bold text-[#4a3b2a] mb-4">
            The Collection
          </h1>
          <p className="text-stone-500 uppercase tracking-widest text-xs md:text-sm">
            Pure. Organic. Handpicked.
          </p>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="flex flex-col md:flex-row gap-10 max-w-[1600px] mx-auto">
          {/* === SIDEBAR (FILTERS) === */}
          {/* Mobile: Full width, Desktop: Sticky 1/4 width */}
          <aside className="shop-sidebar w-full md:w-1/4 h-fit md:sticky md:top-32 z-10">
            {/* Search Box */}
            <div className="bg-white p-6 rounded-[30px] shadow-sm mb-8 border border-[#4a3b2a]/5">
              <h3 className="font-playfair font-bold text-xl mb-4 text-[#4a3b2a]">
                Search
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Find your favorite..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#fdfbf7] rounded-full py-3 px-10 outline-none border border-transparent focus:border-[#d4a017] transition-all text-sm font-medium"
                />
                <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 md:p-8 rounded-[30px] shadow-sm border border-[#4a3b2a]/5">
              <h3 className="font-playfair font-bold text-xl mb-4 md:mb-6 text-[#4a3b2a]">
                Categories
              </h3>

              {/* 📱 Mobile + Tablet → Dropdown */}
              <div className="md:hidden">
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full bg-[#fdfbf7] border border-[#4a3b2a]/10 rounded-full px-5 py-3 text-sm font-medium outline-none focus:border-[#d4a017]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <ul className="hidden md:flex flex-col gap-3">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`cursor-pointer flex justify-between items-center group ${
                      activeCategory === cat
                        ? "text-[#d4a017] font-bold"
                        : "text-stone-500"
                    }`}
                  >
                    <span className="transition-all duration-300 group-hover:translate-x-2">
                      {cat}
                    </span>
                    {activeCategory === cat && (
                      <i className="ri-arrow-right-s-line"></i>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* === PRODUCT GRID === */}
          <div className="w-full md:w-3/4">
            {loading ? (
              // LOADING SPINNER (Premium Style)
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#d4a017]"></div>
              </div>
            ) : (
              <>
                {/* Results Count */}
                <p className="text-sm text-stone-400 mb-6 font-medium">
                  Showing {filteredProducts.length} results
                </p>

                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((item) => (
                      <div
                        key={item._id}
                        className="product-card group relative bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#4a3b2a]/5"
                      >
                        {/* Image Area */}
                        <div className="h-64 md:h-72 w-full overflow-hidden relative">
                          <img
                            src={
                              item.images[0] ||
                              "https://via.placeholder.com/300"
                            }
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />

                          {/* Badge */}
                          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide text-[#4a3b2a]">
                            {item.category}
                          </span>
                          <span className="absolute top-4 right-4 bg-white/90 text-[#d4a017] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide shadow-md">
                            {item.weight}
                            {/* Agar stock 0 hai to ye dikhao */}
                            {(item.stock === 0 || item.countInStock === 0) && (
                              <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                                <span className="bg-red-600 text-white px-4 py-2 font-bold uppercase text-xs tracking-widest -rotate-12 shadow-xl">
                                  Out of Stock
                                </span>
                              </div>
                            )}
                          </span>
                          {/* 🔥 DISCOUNT BADGE — YAHAN */}
                          {item.originalPrice > item.price && (
                            <span className="absolute bottom-20 right-4 bg-white/80 text-red-500 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider  shadow-sm z-10">
                              {Math.round(
                                ((item.originalPrice - item.price) /
                                  item.originalPrice) *
                                  100
                              )}
                              % OFF
                            </span>
                          )}

                          {/* Quick Add Button (Appears on Hover) */}
                          <div className="absolute bottom-0 w-full  translate-y-0 transition-transform duration-500 bg-white/95 backdrop-blur-md p-4 border-t border-[#4a3b2a]/10 flex justify-between items-center">
                            <span className="text-sm font-bold text-[#4a3b2a]">
                              Quick Add
                            </span>
                            <button
                              disabled={
                                item.stock === 0 || item.countInStock === 0
                              }
                              onClick={() => addToCart(item, 1)}
                              className={`w-8 h-8 rounded-full bg-[#d4a017] ${
                                item.stock === 0 || item.countInStock === 0
                                  ? "bg-stone-300 text-stone-500 cursor-not-allowed" // Disable Style
                                  : "bg-[#4a3b2a] text-white hover:bg-[#d4a017]" // Normal Style
                              }`}
                            >
                              {item.stock === 0 || item.countInStock === 0 ? (
                                <i className="ri-add-line"></i>
                              ) : (
                                <i className="ri-add-line"></i>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Details Area */}
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-playfair font-bold text-xl text-[#4a3b2a] leading-tight group-hover:text-[#d4a017] transition-colors">
                              {item.name}
                            </h3>
                            <div className="flex gap-1 text-xs text-[#d4a017]">
                              {/* <i className="ri-star-fill"></i>
                              <span className="text-stone-400">
                                {item.rating || 4.5}
                              </span> */}
                            </div>
                          </div>

                          <p className="text-stone-500 text-sm mb-4 line-clamp-2">
                            {item.description ||
                              "Premium quality sourced directly from the best farms."}
                          </p>

                          <div className="flex justify-between items-center mt-auto">
                            {item.originalPrice > item.price ? (
                              <div className="flex flex-col">
                                <span className="text-xs text-stone-400 line-through decoration-red-400">
                                  ₹{item.originalPrice}
                                </span>
                                <span className="text-xl font-bold text-[#4a3b2a]">
                                  ₹{item.price}
                                </span>
                              </div>
                            ) : (
                              <span className="text-xl font-bold text-[#4a3b2a]">
                                ₹{item.price}
                              </span>
                            )}

                            <Link
                              to={`/shop/product/${item._id}`}
                              className="border border-[#4a3b2a]/20 px-4 py-2 rounded-full text-xs font-bold uppercase hover:bg-[#4a3b2a] hover:text-white transition-all duration-300"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // EMPTY STATE (Agar search me kuch na mile)
                  <div className="flex flex-col items-center justify-center h-64 text-center opacity-50">
                    <i className="ri-shopping-basket-line text-6xl mb-4 text-stone-300"></i>
                    <h3 className="text-2xl font-playfair font-bold text-[#4a3b2a]">
                      No Products Found
                    </h3>
                    <p className="text-stone-500">
                      Try adjusting your filters.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
