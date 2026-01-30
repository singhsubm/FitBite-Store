import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import API from "../../api/axios";
import { useCart } from "../../context/CartContext";
import SEO from "../../components/SEO";

const ProductDetails = () => {
  const { id } = useParams(); // URL se ID nikaali
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("desc"); // desc | nutrition
  const container = useRef(null);

  const { addToCart } = useCart();

  const isAvailable = Number(product?.countInStock || product?.stock || 0) > 0;

  // 1. Fetch Data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // 2. Animations
  useGSAP(
    () => {
      if (!loading && product) {
        gsap.from(".hero-img", {
          scale: 1.1,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
        });
        gsap.from(".details-content > *", {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          delay: 0.5,
        });
      }
    },
    { scope: container, dependencies: [loading] },
  );

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-[#d4a017]">
        Loading Luxury...
      </div>
    );
  if (!product)
    return (
      <div className="h-screen flex items-center justify-center">
        Product Not Found
      </div>
    );

  return (
    <>
      <SEO
        title={product.name}
        description={product.description.substring(0, 150)} // Description lamba ho sakta hai, isliye 150 chars liye
        image={product.images[0]} // Product ki photo Google/WhatsApp pe dikhegi
        url={`/shop/product/${id}`}
      />
      <div
        ref={container}
        className="w-full bg-[#fdfbf7] min-h-screen pt-32 pb-20 px-4 md:px-10"
      >
        {/* BREADCRUMB */}
        <div className="max-w-[1400px] mx-auto mb-8 text-xs font-bold tracking-widest uppercase text-stone-400">
          <Link to="/" className="hover:text-[#d4a017]">
            Home
          </Link>{" "}
          /
          <Link to="/shop" className="hover:text-[#d4a017] mx-2">
            Shop
          </Link>{" "}
          /<span className="text-[#4a3b2a] mx-2">{product.name}</span>
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* === LEFT: PRODUCT IMAGE (Sticky) === */}
          <div className="relative h-fit md:sticky md:top-32">
            <div className="hero-img w-full h-[50vh] md:h-[70vh] rounded-[40px] overflow-hidden shadow-2xl border border-[#4a3b2a]/5">
              <img
                src={product.images && product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]"
              />
              {/* Tag */}
              <span className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide text-[#4a3b2a]">
                {product.category}
              </span>
            </div>
          </div>

          {/* === RIGHT: DETAILS (Scrollable) === */}
          <div className="details-content flex flex-col justify-center">
            {/* Title & Price */}
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-[#4a3b2a] mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-2">
              {product.originalPrice > product.price ? (
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-[#d4a017]">
                    ₹{product.price}
                  </span>
                  <span className="text-xl text-stone-400 line-through decoration-stone-500">
                    ₹{product.originalPrice}
                  </span>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest animate-pulse">
                    Save{" "}
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100,
                    )}
                    %
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-[#d4a017]">
                  ₹{product.price}
                </span>
              )}

              {/* <div className="h-6 w-[1px] bg-stone-300"></div> */}
              {/* <div className="flex items-center gap-1 text-sm font-bold text-[#4a3b2a]">
                <i className="ri-star-fill text-[#d4a017]"></i>{" "}
                {product.rating || 4.8} (120 Reviews)
              </div> */}
            </div>
            <div className="mb-6">
              <p className="mb-2 font-normal text-red-500">
                {(product.countInStock < 5 && product.countInStock > 0) ||
                (product.stock < 5 && product.stock > 0)
                  ? ` Hurry! Only ${product.countInStock || product.stock} left in stock.`
                  : ""}
              </p>
              <span
                className="inline-block bg-stone-100 text-[#4a3b2a] 
                   px-4 py-2 rounded-full 
                   text-sm font-bold tracking-wide"
              >
                Weight: {product.weight}
              </span>
            </div>

            {/* Short Desc */}
            <p className="text-stone-600 text-lg leading-relaxed mb-10">
              {product.description}
              <br className="mb-4" />
              Sourced from the finest organic farms, handpicked for size and
              crunch. Perfectly roasted to preserve natural oils and flavor.
            </p>

            <p
              className={`mb-4 font-bold ${
                isAvailable ? "text-green-600" : "text-red-600"
              }`}
            >
              {isAvailable ? "In Stock" : "Currently Unavailable"}
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-3 gap-4 mb-10 border-y border-[#4a3b2a]/10 py-6">
              <div className="text-center">
                <i className="ri-plant-line text-2xl text-[#d4a017] mb-2 block"></i>
                <span className="text-xs font-bold uppercase tracking-wide">
                  100% Organic
                </span>
              </div>
              <div className="text-center border-x border-[#4a3b2a]/10">
                <i className="ri-heart-pulse-line text-2xl text-[#d4a017] mb-2 block"></i>
                <span className="text-xs font-bold uppercase tracking-wide">
                  Heart Healthy
                </span>
              </div>
              <div className="text-center">
                <i className="ri-shield-check-line text-2xl text-[#d4a017] mb-2 block"></i>
                <span className="text-xs font-bold uppercase tracking-wide">
                  Gluten Free
                </span>
              </div>
            </div>

            {/* Add to Cart Actions */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between border border-[#4a3b2a]/20 rounded-full px-6 py-4 w-full sm:w-40">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="text-xl hover:text-[#d4a017]"
                >
                  <i className="ri-subtract-line"></i>
                </button>
                <span className="font-bold text-xl">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="text-xl hover:text-[#d4a017]"
                >
                  <i className="ri-add-line"></i>
                </button>
              </div>

              {/* Main Button */}
              <button
                disabled={!isAvailable}
                onClick={() => addToCart(product, qty)}
                className={`flex-1 bg-[#4a3b2a] rounded-full py-4 px-8 font-bold uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group ${
                  !isAvailable
                    ? "bg-stone-300 text-stone-500 cursor-not-allowed"
                    : "bg-[#4a3b2a] text-white hover:bg-[#d4a017]"
                }`}
              >
                {!isAvailable ? "Sold Out" : "Add To Cart"}
                <i className="ri-shopping-bag-3-line group-hover:-translate-y-1 transition-transform"></i>
              </button>
            </div>

            {/* Info Tabs (Nutrition / Shipping) */}
            <div className="border-t border-[#4a3b2a]/10 pt-6">
              <div className="flex gap-8 mb-6">
                <button
                  onClick={() => setActiveTab("desc")}
                  className={`text-sm font-bold uppercase tracking-widest pb-2 border-b-2 transition-all ${
                    activeTab === "desc"
                      ? "border-[#d4a017] text-[#4a3b2a]"
                      : "border-transparent text-stone-400"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("nutrition")}
                  className={`text-sm font-bold uppercase tracking-widest pb-2 border-b-2 transition-all ${
                    activeTab === "nutrition"
                      ? "border-[#d4a017] text-[#4a3b2a]"
                      : "border-transparent text-stone-400"
                  }`}
                >
                  Nutrition Facts
                </button>
              </div>

              <div className="text-stone-600 text-sm leading-relaxed h-40">
                {activeTab === "desc" ? (
                  <p>
                    Our {product.name} are packed with nutrients. We use a
                    slow-roasting process that locks in the flavor without using
                    excessive oil. Great for snacking, baking, or topping your
                    morning oatmeal.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Dynamic Mapping */}
                    {product.nutrition &&
                      Object.entries(product.nutrition).map(
                        ([key, value]) =>
                          // Sirf wahi dikhao jo database se aaya hai (exclude _id if any)
                          key !== "_id" && (
                            <div
                              key={key}
                              className="bg-[#fdfbf7] p-3 rounded-xl border border-[#4a3b2a]/5 text-center"
                            >
                              <p className="text-xs text-stone-400 uppercase font-bold tracking-widest">
                                {key}
                              </p>
                              <p className="text-[#4a3b2a] font-bold mt-1">
                                {value}
                              </p>
                            </div>
                          ),
                      )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
