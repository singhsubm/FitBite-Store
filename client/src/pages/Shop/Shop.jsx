import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import API from "../../api/axios";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useLocation } from "react-router-dom";
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

const ITEMS_PER_PAGE = 15;

const Shop = () => {
  const location = useLocation();
  // Products ab empty start honge
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Filter ke liye alag state
  const initialCategory = location.state?.category || "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const container = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);

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
      filtered = products.filter(
        (item) =>
          item.name &&
          item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    } else if (activeCategory !== "All") {
      filtered = products.filter(
        (item) => item.category?.trim() === activeCategory.trim(),
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [activeCategory, searchQuery, products, loading]);

  useEffect(() => {
    if (filteredProducts.length === 0) return;

    gsap.killTweensOf(".product-card");

    gsap.to(".product-card", {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [filteredProducts]);

  // 2. FILTER LOGIC

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

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
    { scope: container, dependencies: [loading] },
  );

  useEffect(() => {
    if (location.state?.category) {
      setActiveCategory(location.state.category);
    }
  }, [location.state]);

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
            {/* 📱 MOBILE COMPACT FILTER BAR */}
            <div className="md:hidden bg-white p-4 rounded-2xl shadow-sm mb-6 border border-[#4a3b2a]/5 space-y-3">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#fdfbf7] rounded-full py-3 px-10 text-sm outline-none border border-[#4a3b2a]/10 focus:border-[#d4a017]"
                />
                <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              </div>

              {/* Category */}
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

            {/* Search Box */}
            <div className="hidden md:block bg-white p-6 rounded-[30px] shadow-sm mb-8 border border-[#4a3b2a]/5">
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
            <div className="hidden md:block bg-white p-6 md:p-8 rounded-[30px] shadow-sm border border-[#4a3b2a]/5">
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
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                  {Math.min(
                    currentPage * ITEMS_PER_PAGE,
                    filteredProducts.length,
                  )}{" "}
                  of {filteredProducts.length} results
                </p>

                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    {paginatedProducts.map((item) => (
                      <Link
                        to={`/shop/product/${item._id}`}
                        key={item._id}
                        className="product-card opacity-0 group relative bg-white rounded-[16px] sm:rounded-[20px] md:rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#4a3b2a]/5 cursor-default"
                      >
                        {/* Image Area */}
                        <div className="h-30 sm:h-45 md:h-54 lg:h-52 w-full overflow-hidden relative">
                          <img
                            src={
                              item.images[0] ||
                              "https://via.placeholder.com/300"
                            }
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />

                          {/* Badge */}

                          {/* 🔥 DISCOUNT BADGE — YAHAN */}
                          {item.originalPrice > item.price && (
                            <span
                              className={`absolute bottom-22 md:bottom-45 lg:bottom-5 right-2 md:right-4 px-2 py-1 rounded-full text-[7px] md:text-[10px] font-bold uppercase tracking-wider shadow-sm z-10
                              ${
                                item.stock === 0 || item.countInStock === 0
                                  ? "bg-red-600 text-white"
                                  : "bg-white/90 text-red-500"
                              }`}
                            >
                              {item.stock === 0 || item.countInStock === 0
                                ? "Out of Stock"
                                : `${Math.round(
                                    ((item.originalPrice - item.price) /
                                      item.originalPrice) *
                                      100,
                                  )}% OFF`}
                            </span>
                          )}
                        </div>

                        {/* Details Area */}
                        <div className="p-3 sm:p-4 md:p-6 relative flex flex-col">
                          <div className="absolute -top-4 md:-top-7 left-1/2 -translate-x-1/2 w-full translate-y-0 transition-transform duration-500  flex justify-center items-center">
                            <div className="bg-white w-10 h-10 md:w-15 md:h-15 rounded-full flex justify-center items-center">
                              <button
                                disabled={
                                  item.stock === 0 || item.countInStock === 0
                                }
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  addToCart(item, 1);
                                }}
                                className={`md:w-11 md:h-11 w-7 h-7 rounded-full bg-[#d4a017] ${
                                  item.stock === 0 || item.countInStock === 0
                                    ? "bg-stone-300 text-stone-500 cursor-not-allowed" // Disable Style
                                    : "bg-[#4a3b2a] text-white hover:bg-[#d4a017] cursor-pointer" // Normal Style
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
                          <div className="">
                            <div className="flex justify-between items-start pt-4 mb-2">
                              <h3 className="font-bold text-sm sm:text-base md:text-xl text-[#4a3b2a] leading-tight group-hover:text-[#d4a017] transition-colors">
                                {item.name}
                              </h3>
                              <div className="flex gap-1 text-xs text-[#d4a017]">
                                {/* <i className="ri-star-fill"></i>
                              <span className="text-stone-400">
                                {item.rating || 4.5}
                              </span> */}
                              </div>
                            </div>

                            <p className="text-stone-500 text-xs sm:text-sm mb-2 md:mb-4 line-clamp-2">
                              {item.weight || "500g"}
                              {"\u00A0"}|{"\u00A0"}
                              {item.category}
                              <p>
                                {(item.stock <= 5 && item.stock > 0) ||
                                (item.countInStock <= 5 &&
                                  item.countInStock > 0) ? (
                                  <p className="text-red-500 text-xs mt-1">
                                    Hurry! Only{" "}
                                    {item.stock || item.countInStock} left in
                                    stock.
                                  </p>
                                ) : null}
                              </p>
                            </p>

                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mt-auto">
                              {item.originalPrice > item.price ? (
                                <div className="flex flex-col">
                                  <span className="text-xs text-stone-400 line-through decoration-red-400">
                                    ₹{item.originalPrice}
                                  </span>
                                  <span className="text-sm sm:text-base md:text-xl font-bold text-[#4a3b2a]">
                                    ₹{item.price}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-xl font-bold text-[#4a3b2a]">
                                  ₹{item.price}
                                </span>
                              )}

                              <button className="hidden md:block border border-[#4a3b2a]/20 px-4 py-2 rounded-full text-xs font-bold uppercase text-nowrap text-center w-full sm:w-auto hover:bg-[#4a3b2a] hover:text-white transition-all duration-300 cursor-pointer">
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
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

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-12">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                      className="px-6 py-2 rounded-full border text-sm font-bold disabled:opacity-40"
                    >
                      Prev
                    </button>

                    <span className="text-sm font-medium">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className="px-6 py-2 rounded-full border text-sm font-bold disabled:opacity-40"
                    >
                      Next
                    </button>
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
