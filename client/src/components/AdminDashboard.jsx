import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { useToast } from "../context/ToastContext";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders"); // orders | products | add
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { showToast, showConfirm } = useToast();
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Pata chalega hum edit kar rahe hain ya add
  const [editProductId, setEditProductId] = useState(null); // Kis product ko edit karna hai
  const [queries, setQueries] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  const unseenCount = queries.filter((q) => q.status === "New").length;

  const [blogs, setBlogs] = useState([]);
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [blogFormData, setBlogFormData] = useState({
    id: "",
    title: "",
    category: "Health",
    image: "",
    content: "",
  });

  // Categories ki list (Wahi jo Shop page par thi)
  const categories = [
    "All",
    "Out of Stock",
    "Almonds",
    "Cashews",
    "Walnuts",
    "Pistachios",
    "Gifts",
    "Seeds",
    "Combo",
    "Fitness Pack",
  ];

  // FORM STATE (Product Add karne ke liye)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "Almonds",
    description: "",
    image: "",
    stock: "",
    weight: "",
    nutrition: {
      energy: "",
      protein: "",
      carbs: "",
      fat: "",
      fiber: "",
      sugar: "",
    },
  });

  const outOfStockCount = products.filter(
    (p) => p.stock === 0 || p.countInStock === 0,
  ).length;

  const changeStatusHandler = async (id, newStatus) => {
    try {
      // Backend ko naya status bhejo
      await API.put(`/orders/${id}/status`, { status: newStatus });
      showToast(`Order Status Updated to ${newStatus}`, "success");
      fetchOrders(); // List refresh
    } catch (error) {
      showToast("Error updating status", "error");
    }
  };

  const fetchOrders = async () => {
    const { data } = await API.get("/orders"); // Admin Route needed in backend
    setOrders(data);
  };

  const fetchProducts = async () => {
    const { data } = await API.get("/products");
    setProducts(data);
  };

  const filteredProducts = products.filter((product) => {
    // A. Category Check
    let matchCategory = false;
    if (filterCategory === "All") {
      matchCategory = true;
    } else if (filterCategory === "Out of Stock") {
      // Agar stock 0 hai to dikhao (Backend me field 'countInStock' ya 'stock' jo bhi tune rakha hai)
      matchCategory = product.stock === 0 || product.countInStock === 0;
    } else {
      matchCategory = product.category === filterCategory;
    }

    // B. Search Name Check (Case insensitive)
    const matchSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchCategory && matchSearch; // Jab dono sahi hon tab dikhana
  });

  const handleEditClick = (product) => {
    // 1. Form me purana data bharo
    setNewProduct({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || "",
      category: product.category,
      description: product.description,
      image: product.images[0], // Image array ka pehla item
      stock: product.countInStock || product.stock, // Backend field name 'countInStock' hai
      weight: product.weight,
      nutrition: product.nutrition || {
        energy: "",
        protein: "",
        carbs: "",
        fat: "",
        fiber: "",
        sugar: "",
      },
    });

    // 2. Editing mode on karo
    setIsEditing(true);
    setEditProductId(product._id);

    // 3. Tab change karke Form wala khol do
    setActiveTab("add");
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name: newProduct.name,
        price: newProduct.price,
        originalPrice: newProduct.originalPrice,
        category: newProduct.category,
        description: newProduct.description,
        stock: newProduct.stock,
        image: newProduct.image, // Backend controller array bana lega
        weight: newProduct.weight,
        nutrition: newProduct.nutrition, // Ye pura object bhej do
      };

      const updateData = {
        name: newProduct.name,
        price: newProduct.price,
        originalPrice: newProduct.originalPrice,
        description: newProduct.description,
        category: newProduct.category,
        stock: newProduct.stock,
        weight: newProduct.weight,

        // Agar newProduct.image me kuch hai to bhejo
        image: newProduct.image,
        nutrition: newProduct.nutrition, // Ye pura object bhej do
      };

      if (isEditing) {
        // === UPDATE LOGIC ===
        await API.put(`/products/${editProductId}`, updateData);
        showToast("Product Updated Successfully!", "success");
        setIsEditing(false); // Edit mode band
        setEditProductId(null);
      } else {
        // === CREATE LOGIC (Purana wala) ===
        // Yahan image array me convert karni padegi agar backend expect kar raha hai
        // Note: Controller logic check karlena, maine upar wale step me controller me array handling daal di hai
        await API.post("/products", productData);
        showToast("Product Added Successfully!", "success");
      }

      // Form Clear karo
      setNewProduct({
        name: "",
        price: "",
        category: "Almonds",
        description: "",
        image: "",
        stock: "",
        weight: "",
        nutrition: {
          energy: "",
          protein: "",
          carbs: "",
          fat: "",
          fiber: "",
          sugar: "",
        },
      });

      setActiveTab("products"); // List pe wapas jao
      fetchProducts(); // Data refresh
    } catch (error) {
      showToast(
        isEditing ? "Error updating product" : "Error adding product",
        "error",
      );
    }
  };

  // === BLOG LOGIC ===
  const fetchBlogs = async () => {
    try {
      const { data } = await API.get("/blogs");
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs");
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      if (blogFormData.id) {
        await API.put(`/blogs/${blogFormData.id}`, blogFormData);
        showToast("Blog Updated!", "success");
      } else {
        await API.post("/blogs", blogFormData);
        showToast("Blog Published!", "success");
      }
      setBlogFormData({
        id: "",
        title: "",
        category: "Health",
        image: "",
        content: "",
      });
      setIsEditingBlog(false);
      fetchBlogs();
    } catch (error) {
      showToast("Something went wrong", "error");
    }
  };

  const deleteBlog = (id) => {
    showConfirm("Delete this blog post?", async () => {
      try {
        await API.delete(`/blogs/${id}`);
        showToast("Blog deleted", "info");
        fetchBlogs();
      } catch (error) {
        showToast("Delete failed", "error");
      }
    });
  };

  const handleEditBlog = (blog) => {
    setBlogFormData({
      id: blog._id,
      title: blog.title,
      category: blog.category,
      image: blog.image,
      content: blog.content,
    });
    setIsEditingBlog(true);
    window.scrollTo(0, 0);
  };

  const markDelivered = async (id) => {
    if (window.confirm("Are you sure this order is delivered?")) {
      try {
        // 1. Backend API call (PUT request)
        // Header apne aap jayega (API config se)
        await API.put(`/orders/${id}/status`, { status: "Delivered" });

        // 2. Refresh List (Taaki status turant change ho jaye)
        fetchOrders();
      } catch (error) {
        alert("Error updating order");
        console.error(error);
      }
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]; // File pakdo
    const formData = new FormData();
    formData.append("image", file); // Form data me daalo

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data", // Zaroori hai file bhejne ke liye
        },
      };

      const { data } = await API.post("/upload", formData, config); // Backend ko bhejo

      // Backend se URL wapas aayega, use state me save kar lo
      setNewProduct({ ...newProduct, image: data.url });
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      alert("Image Upload Failed!");
    }
  };

  // Delete Handler
  const deleteHandler = async (id) => {
    showConfirm("Do you really want to delete this product?", async () => {
      try {
        await API.delete(`/products/${id}`);
        showToast("Product Deleted Successfully", "success");
        fetchProducts();
      } catch (error) {
        showToast("Error deleting product", "error");
      }
    });
  };

  const fetchQueries = async () => {
    try {
      const { data } = await API.get("/queries");
      setQueries(data);
    } catch (error) {
      console.error("Error fetching queries");
    }
  };

  const deleteQuery = (id) => {
    // window.confirm hataya, ab tera custom popup aayega
    showConfirm("Are you sure you want to delete this message?", async () => {
      try {
        await API.delete(`/queries/${id}`);
        showToast("Message deleted", "info");
        fetchQueries();
      } catch (error) {
        showToast("Error deleting", "error");
      }
    });
  };

  const markAsRead = async (id) => {
    try {
      await API.put(`/queries/${id}`); // Status 'Read' ho jayega
      fetchQueries(); // List refresh karo (badge apne aap update ho jayega)
    } catch (error) {
      console.error(error);
    }
  };

  // === 1. EXCEL DOWNLOAD FUNCTION (Ise copy kar) ===
  const downloadCSV = (data, filename) => {
    if (!data || data.length === 0)
      return showToast("No data to download", "error");

    let csvContent = "data:text/csv;charset=utf-8,";
    let flatData = [];

    // Data ko format karna Excel ke liye
    if (filename.includes("Orders")) {
      flatData = data.map((o) => ({
        OrderID: o._id,
        Date: o.createdAt.substring(0, 10),
        User: o.user?.name || "Guest",
        Email: o.shippingAddress?.email,
        Total: o.totalPrice,
        Status: o.orderStatus,
        Items: o.orderItems.map((i) => `${i.name} (x${i.qty})`).join(" | "),
      }));
    } else if (filename.includes("Subscribers")) {
      flatData = data.map((s) => ({
        Email: s.email,
        DateSubscribed: s.createdAt.substring(0, 10),
      }));
    }

    // Headers banana
    const headers = Object.keys(flatData[0]).join(",");
    csvContent += headers + "\n";

    // Rows banana
    flatData.forEach((row) => {
      const rowStr = Object.values(row)
        .map((val) => `"${val}"`)
        .join(",");
      csvContent += rowStr + "\n";
    });

    // Download Trigger karna
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // === 2. FETCH SUBSCRIBERS FUNCTION ===
  const fetchSubscribers = async () => {
    try {
      const { data } = await API.get("/newsletter");
      setSubscribers(data);
    } catch (e) {
      console.error("Error fetching subscribers");
    }
  };

  useEffect(() => {
    if (activeTab === "orders") fetchOrders();
    if (activeTab === "products") fetchProducts();
    if (activeTab === "queries") fetchQueries();
    if (activeTab === "blogs") fetchBlogs();
    if (activeTab === "subscribers") fetchSubscribers();
    // <--- Add this
    fetchOrders();
    fetchQueries();
    fetchProducts();
  }, [activeTab]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []); // Initial empty useEffect agar future me kuch karna ho to

  return (
    <div className="w-full min-h-screen bg-[#fdfbf7] pt-32 pb-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-playfair font-bold text-[#4a3b2a] mb-8">
          Admin Dashboard
        </h1>

        {/* TABS BUTTONS */}
        <div
          className="flex gap-2 sm:gap-3 mb-8 border-b border-[#4a3b2a]/10 pb-4
                overflow-x-auto lg:overflow-visible
                whitespace-nowrap scrollbar-hide"
        >
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 md:px-4 lg:px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs transition-all ${
              activeTab === "orders"
                ? "bg-[#4a3b2a] text-white"
                : "bg-white text-stone-500"
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs transition-all ${
              outOfStockCount > 0
                ? "bg-red-100 text-red-700 border border-red-300"
                : activeTab === "products"
                  ? "bg-[#4a3b2a] text-white"
                  : "bg-white text-stone-500"
            }
                  ${activeTab === "products" && outOfStockCount > 0
                    ? "bg-red-600 text-white border-red-600"
                    : ""
            }
                  
            `}
          >
            Manage Products
          </button>
          <button
            onClick={() => setActiveTab("add")}
            className={`px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs transition-all ${
              activeTab === "add"
                ? "bg-[#d4a017] text-white"
                : "bg-white text-stone-500"
            }`}
          >
            + Add New Product
          </button>

          {/* UPDATED QUERIES BUTTON */}
          <button
            onClick={() => setActiveTab("queries")}
            className={`px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs transition-all whitespace-nowrap relative ${
              activeTab === "queries"
                ? "bg-[#4a3b2a] text-white"
                : "bg-white text-stone-500"
            }`}
          >
            Queries
            {/* Sirf Unseen Count Dikhao */}
            {unseenCount > 0 && (
              <span className="ml-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] animate-pulse">
                {unseenCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs transition-all whitespace-nowrap ${
              activeTab === "blogs"
                ? "bg-[#4a3b2a] text-white"
                : "bg-white text-stone-500"
            }`}
          >
            <i className="ri-article-line mr-2"></i> Manage Blogs
          </button>

          <button
            onClick={() => setActiveTab("subscribers")}
            className={`px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs transition-all whitespace-nowrap ${
              activeTab === "subscribers"
                ? "bg-[#4a3b2a] text-white"
                : "bg-white text-stone-500"
            }`}
          >
            Newsletter
          </button>
        </div>

        {/* === CONTENT AREA === */}
        <div
          className="bg-white p-4 sm:p-6 md:p-8 
                rounded-[24px] md:rounded-[30px] 
                shadow-xl border border-[#4a3b2a]/5 min-h-[400px]"
        >
          {/* 1. ORDERS TAB */}
          {activeTab === "orders" && (
            <div>
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => downloadCSV(orders, "FitBite_Orders")}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-green-700 flex items-center gap-2"
                >
                  <i className="ri-file-excel-2-line text-lg"></i> Download
                  Orders
                </button>
              </div>
              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[1000px] text-left border-collapse">
                  <thead>
                    <tr className="text-xs font-bold uppercase tracking-widest text-stone-500 border-b border-[#4a3b2a]/10">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">User</th>
                      <th className="p-4">Items</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Phone No.</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order._id}
                        className="border-b border-[#4a3b2a]/5 hover:bg-stone-50"
                      >
                        <td className="p-4 text-xs font-mono">{order._id}</td>
                        <td className="p-4 font-bold text-[#4a3b2a]">
                          {order.user?.name || "User Deleted"}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => setSelectedOrder(order)} // Click krte hi is order ka data state me jayega
                            className="flex items-center text-nowrap gap-2 bg-[#4a3b2a]/10 text-[#4a3b2a] px-3 py-1 rounded-full text-xs font-bold hover:bg-[#4a3b2a] hover:text-white transition-all"
                          >
                            <i className="ri-eye-line"></i>
                            {order.orderItems.length} Items
                          </button>
                        </td>
                        <td className="p-4 text-sm text-stone-500">
                          {order.createdAt.substring(0, 10)}
                        </td>
                        <td className="p-4 text-sm text-stone-500">
                          {order.shippingAddress.email}
                        </td>
                        <td className="p-4 text-sm text-stone-500">
                          {order.shippingAddress.phone}
                        </td>
                        <td className="p-4 font-bold">₹{order.totalPrice}</td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                          ${
                            order.orderStatus === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : ""
                          }
                          ${
                            order.orderStatus === "Shipped"
                              ? "bg-blue-100 text-blue-700"
                              : ""
                          }
                          ${
                            order.orderStatus === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : ""
                          }
                          ${
                            order.orderStatus === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : ""
                          }`}
                          >
                            {order.orderStatus || "Pending"}
                            {/* (Fallback 'Pending' agar purane orders me field nahi hai) */}
                          </span>
                        </td>
                        {/* ACTION COLUMN (Dropdown) */}
                        <td className="p-4">
                          <select
                            value={order.orderStatus || "Pending"}
                            onChange={(e) =>
                              changeStatusHandler(order._id, e.target.value)
                            }
                            className="bg-white border border-[#4a3b2a]/20 text-[#4a3b2a] text-xs font-bold py-1 px-2 rounded-lg outline-none focus:border-[#d4a017] cursor-pointer"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        <td className="p-4">
                          {!order.isDelivered && (
                            <button
                              onClick={() => markDelivered(order._id)}
                              className="text-xs font-bold text-[#d4a017] hover:underline"
                            >
                              Mark Done
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 2. PRODUCTS LIST TAB */}
          {activeTab === "products" && (
            <div>
              {/* === NEW: FILTER & SEARCH BAR === */}
              <div
                className="mb-6 flex flex-col md:flex-col lg:flex-row gap-4 
                justify-between items-stretch lg:items-center"
              >
                {/* A. Search Input */}
                <div className="relative w-full lg:w-1/3">
                  <i className="ri-search-line absolute left-3 top-3 text-stone-400"></i>
                  <input
                    type="text"
                    placeholder="Search product..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-full text-sm outline-none focus:border-[#d4a017]"
                  />
                </div>

                {/* B. Category Filter (Scrollable on mobile) */}
                <div className="flex gap-2 overflow-x-auto w-full lg:w-2/3 pb-2 scrollbar-hide">
                  {categories.map((cat) => {
                    const isOutOfStockTab = cat === "Out of Stock";

                    return (
                      <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase whitespace-nowrap transition-all border flex items-center gap-1
      ${
        filterCategory === cat
          ? isOutOfStockTab
            ? "bg-red-600 text-white border-red-600"
            : "bg-[#4a3b2a] text-white border-[#4a3b2a]"
          : isOutOfStockTab && outOfStockCount > 0
            ? "bg-red-100 text-red-700 border-red-300"
            : "bg-white text-stone-500 border-stone-200 hover:border-[#d4a017]"
      }`}
                      >
                        {cat}

                        {/* Badge only for Out of Stock */}
                        {isOutOfStockTab && outOfStockCount > 0 && (
                          <span className="ml-1 bg-red-500 text-white px-2 py-0.5 rounded-full text-[9px] animate-pulse">
                            {outOfStockCount}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* ================================ */}

              {/* === UPDATED GRID (Ab 'products' ki jagah 'filteredProducts' use kar) === */}
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Check agar filter ke baad kuch bacha hi nahi */}
                {filteredProducts.length === 0 && (
                  <div className="col-span-2 text-center py-10 text-stone-400">
                    <i className="ri-emotion-unhappy-line text-2xl mb-2 block"></i>
                    No products found in this category.
                  </div>
                )}

                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="flex flex-col sm:flex-row gap-4 p-4 
           border border-[#4a3b2a]/10 rounded-xl
           items-start lg:items-center
           bg-white hover:shadow-md transition-all"
                  >
                    <img
                      src={product.images[0]}
                      alt=""
                      className="w-full sm:w-16 h-40 sm:h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-bold text-[#4a3b2a] line-clamp-1">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <span className="font-bold text-[#d4a017]">
                          ₹{product.price}
                        </span>
                        <span>•</span>
                        <span
                          className={`font-bold ${
                            product.stock === 0
                              ? "text-red-600"
                              : "text-stone-500"
                          }`}
                        >
                          {product.stock === 0
                            ? "⚠️ Out of Stock"
                            : `${product.stock} in Stock`}
                        </span>
                        {/* Category Badge */}
                        <span className="bg-stone-100 px-2 py-0.5 rounded text-[9px] uppercase tracking-wide">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    <div className="ml-auto flex gap-2">
                      {/* EDIT BUTTON */}
                      <button
                        onClick={() => handleEditClick(product)}
                        className="text-blue-500 hover:bg-blue-50 p-2 rounded-full transition-colors"
                      >
                        <i className="ri-pencil-line text-lg"></i>
                      </button>

                      {/* DELETE BUTTON */}
                      <button
                        onClick={() => deleteHandler(product._id)}
                        className="ml-auto text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors"
                      >
                        <i className="ri-delete-bin-line text-lg"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. ADD PRODUCT FORM */}
          {activeTab === "add" && (
            <form
              onSubmit={handleProductSubmit}
              className="max-w-2xl mx-auto space-y-6"
            >
              <h2 className="text-xl font-bold text-[#4a3b2a] mb-6">
                {isEditing ? `Edit Product` : `Add New Product`}
              </h2>
              <div className="grid gap-6">
                <div>
                  <label className="text-xs font-bold uppercase text-stone-500">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    className="w-full mt-1 p-3 border rounded-xl outline-none focus:border-[#d4a017]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold uppercase text-stone-500">
                      Selling Price (₹)
                    </label>
                    <input
                      type="number"
                      required
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                      }
                      className="w-full mt-1 p-3 border rounded-xl outline-none focus:border-[#d4a017]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-stone-500">
                      MRP (Original Price)
                    </label>
                    <input
                      type="number"
                      placeholder="Optional (e.g. 999)"
                      value={newProduct.originalPrice}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          originalPrice: e.target.value,
                        })
                      }
                      className="w-full mt-1 p-3 border rounded-xl outline-none focus:border-[#d4a017]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-stone-500">
                  Weight
                </label>
                <input
                  type="text"
                  placeholder="e.g. 500g, 1kg"
                  required
                  value={newProduct.weight}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, weight: e.target.value })
                  }
                  className="w-full mt-1 p-3 border rounded-xl outline-none focus:border-[#d4a017]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-stone-500">
                  Category
                </label>
                <select
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="w-full mt-1 p-3 border rounded-xl outline-none focus:border-[#d4a017]"
                >
                  {[
                    "Almonds",
                    "Cashews",
                    "Walnuts",
                    "Pistachios",
                    "Gifts",
                    "Seeds",
                    "Combo",
                    "Fitness Pack",
                  ].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold uppercase text-stone-500">
                    Stock
                  </label>
                  <input
                    type="number"
                    required
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, stock: e.target.value })
                    }
                    className="w-full mt-1 p-3 border rounded-xl outline-none focus:border-[#d4a017]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-stone-500">
                    Description
                  </label>
                  <textarea
                    required
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                    className="w-full mt-1 p-3 border rounded-xl outline-none focus:border-[#d4a017]"
                    rows="1"
                  ></textarea>
                </div>

                {/* === NUTRITION SECTION === */}
                <div
                  className="bg-stone-50 p-4 sm:p-5 lg:p-6 
                w-full col-span-full 
                rounded-xl border border-stone-200"
                >
                  <h3 className="text-sm font-bold uppercase text-[#4a3b2a] mb-4">
                    Nutrition Facts (Per 100g)
                  </h3>
                  <p className="text-xs text-stone-400 mb-4">
                    Leave empty to use default values.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      "energy",
                      "protein",
                      "carbs",
                      "fat",
                      "fiber",
                      "sugar",
                    ].map((item) => (
                      <div key={item}>
                        <label className="text-[10px] font-bold uppercase text-stone-500">
                          {item}
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 20g"
                          value={newProduct.nutrition[item]}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              nutrition: {
                                ...newProduct.nutrition,
                                [item]: e.target.value,
                              },
                            })
                          }
                          className="w-full mt-1 p-2 border rounded-lg text-sm outline-none focus:border-[#d4a017]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-stone-500">
                  Product Image
                </label>

                {/* File Input */}
                <input
                  type="file"
                  onChange={uploadFileHandler}
                  className="w-full mt-1 p-2 border rounded-xl outline-none focus:border-[#d4a017] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#4a3b2a] file:text-white hover:file:bg-[#d4a017]"
                />

                {/* Loading Spinner / Text */}
                {uploading && (
                  <p className="text-xs text-[#d4a017] mt-1 font-bold animate-pulse">
                    Uploading to Cloud...
                  </p>
                )}

                {/* Agar Upload ho gaya to URL dikhao (Confirmation ke liye) */}
                {newProduct.image && (
                  <div className="mt-2 flex items-center gap-2 bg-green-50 p-2 rounded-lg border border-green-200">
                    <i className="ri-check-double-line text-green-600"></i>
                    <span className="text-xs text-green-700 truncate max-w-full block">
                      {newProduct.image}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                {/* Cancel Button (Sirf Edit mode me dikhega) */}
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setNewProduct({
                        name: "",
                        price: "",
                        category: "Almonds",
                        description: "",
                        image: "",
                        stock: "",
                        weight: "",
                        nutrition: {
                          energy: "",
                          protein: "",
                          carbs: "",
                          fat: "",
                          fiber: "",
                          sugar: "",
                        },
                      });

                      setActiveTab("products");
                    }}
                    className="flex-1 py-4 rounded-xl font-bold uppercase border border-[#4a3b2a] text-[#4a3b2a]"
                  >
                    Cancel
                  </button>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="flex-1 bg-[#4a3b2a] text-white py-4 rounded-xl font-bold uppercase hover:bg-[#d4a017] shadow-lg"
                >
                  {isEditing ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          )}

          {/* 4. QUERIES TAB (Ab ye White Box ke andar hai) */}
          {activeTab === "queries" && (
            <div>
              {queries.length === 0 ? (
                <p className="text-center text-stone-400 py-10">
                  No messages found.
                </p>
              ) : (
                <div className="space-y-4">
                  {queries.map((q) => (
                    <div
                      key={q._id}
                      className={`border p-3 sm:p-4 md:p-5 lg:p-6 
              rounded-xl relative transition ${
                q.status === "New"
                  ? "bg-white border-[#d4a017] shadow-md"
                  : "bg-stone-50 border-transparent opacity-80"
              }`}
                    >
                      {/* New Badge */}
                      {q.status === "New" && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full font-bold shadow-sm animate-pulse">
                          NEW
                        </span>
                      )}

                      <div
                        className="flex flex-col sm:flex-row gap-3 
                justify-between items-start mb-2"
                      >
                        <div>
                          <h4 className="font-bold text-[#4a3b2a]">{q.name}</h4>
                          <p className="text-xs text-stone-500">
                            {q.email} •{" "}
                            {new Date(q.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {/* Mark as Read Button */}
                          {q.status === "New" && (
                            <button
                              onClick={() => markAsRead(q._id)}
                              className="text-xs bg-[#d4a017]/10 text-[#d4a017] px-3 py-1 rounded-full font-bold hover:bg-[#d4a017] hover:text-white transition"
                            >
                              Mark as Seen
                            </button>
                          )}
                          <button
                            onClick={() => deleteQuery(q._id)}
                            className="text-stone-300 hover:text-red-500"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>
                      <p
                        className="text-stone-600 bg-white/50 p-3 sm:p-4 
              rounded-lg mt-2 text-sm border border-stone-100 break-words"
                      >
                        {q.message}
                      </p>
                      <a
                        href={`mailto:${q.email}`}
                        className="inline-block mt-4 text-[#d4a017] text-xs font-bold uppercase tracking-widest hover:underline"
                      >
                        Reply via Email{" "}
                        <i className="ri-arrow-right-up-line"></i>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. NEW: SUBSCRIBERS TAB CONTENT */}
          {activeTab === "subscribers" && (
            <div>
              <div className="flex flex-col md:flex-row gap-3 justify-between md:items-center mb-6">
                <h3 className="font-bold text-lg text-[#4a3b2a]">
                  Newsletter Subscribers ({subscribers.length})
                </h3>
                <button
                  onClick={() =>
                    downloadCSV(subscribers, "FitBite_Subscribers")
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-green-700 flex items-center gap-2"
                >
                  <i className="ri-file-excel-2-line text-lg"></i> Download List
                </button>
              </div>

              <div className="overflow-x-auto bg-white rounded-xl border border-[#4a3b2a]/10">
                <table className="w-full min-w-[600px] text-left">
                  <thead className="bg-stone-50">
                    <tr className="border-b text-xs font-bold uppercase text-stone-500">
                      <th className="p-4">#</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Date Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((sub, index) => (
                      <tr
                        key={sub._id}
                        className="border-b hover:bg-stone-50 last:border-0"
                      >
                        <td className="p-4 text-xs font-mono text-stone-400">
                          {index + 1}
                        </td>
                        <td className="p-4 font-bold text-[#4a3b2a]">
                          {sub.email}
                        </td>
                        <td className="p-4 text-sm text-stone-500">
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {subscribers.length === 0 && (
                  <p className="text-center py-10 text-stone-400">
                    No subscribers yet.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 6. BLOGS TAB */}
          {activeTab === "blogs" && (
            <div>
              {/* BLOG FORM */}
              <form
                onSubmit={handleBlogSubmit}
                className="mb-12 bg-stone-50 p-6 rounded-2xl border border-stone-200"
              >
                <h3 className="font-bold text-[#4a3b2a] mb-4">
                  {isEditingBlog ? "Edit Blog" : "Write New Blog"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Title"
                    required
                    value={blogFormData.title}
                    onChange={(e) =>
                      setBlogFormData({
                        ...blogFormData,
                        title: e.target.value,
                      })
                    }
                    className="p-3 border rounded-xl outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    required
                    value={blogFormData.category}
                    onChange={(e) =>
                      setBlogFormData({
                        ...blogFormData,
                        category: e.target.value,
                      })
                    }
                    className="p-3 border rounded-xl outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Image URL"
                  required
                  value={blogFormData.image}
                  onChange={(e) =>
                    setBlogFormData({ ...blogFormData, image: e.target.value })
                  }
                  className="w-full p-3 border rounded-xl outline-none mb-4"
                />
                <textarea
                  rows="4"
                  placeholder="Content..."
                  required
                  value={blogFormData.content}
                  onChange={(e) =>
                    setBlogFormData({
                      ...blogFormData,
                      content: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-xl outline-none mb-4"
                ></textarea>

                <div className="flex gap-4">
                  {isEditingBlog && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingBlog(false);
                        setBlogFormData({
                          id: "",
                          title: "",
                          category: "Health",
                          image: "",
                          content: "",
                        });
                      }}
                      className="px-6 py-2 text-stone-500 font-bold uppercase"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-[#4a3b2a] text-white px-8 py-3 rounded-xl font-bold uppercase hover:bg-[#d4a017] shadow-lg"
                  >
                    {isEditingBlog ? "Update" : "Publish"}
                  </button>
                </div>
              </form>

              {/* BLOG LIST */}
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="flex gap-4 items-start md:items-start lg:items-center 
           bg-white p-4 rounded-xl border border-[#4a3b2a]/10 hover:shadow-md transition"
                  >
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-[#4a3b2a]">{blog.title}</h4>
                      <p className="text-xs text-stone-500">
                        {blog.category} •{" "}
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditBlog(blog)}
                        className="text-blue-500 p-2"
                      >
                        <i className="ri-pencil-line"></i>
                      </button>
                      <button
                        onClick={() => deleteBlog(blog._id)}
                        className="text-red-400 p-2"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                ))}
                {blogs.length === 0 && (
                  <p className="text-center text-stone-400">
                    No blogs published yet.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ye vo popup hai jo ki eye button pe click krne pe khulta hai */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop (Blur) */}
          <div
            onClick={() => setSelectedOrder(null)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          ></div>

          {/* Modal Content */}
          <div className="bg-white w-full max-w-lg rounded-[20px] shadow-2xl relative z-10 overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="bg-[#4a3b2a] p-4 flex justify-between items-center">
              <h3 className="text-white font-playfair font-bold text-lg">
                Order Details{" "}
                <span className="text-[#d4a017] text-sm ml-2">
                  #{selectedOrder._id}
                </span>
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-white/70 hover:text-white"
              >
                <i className="ri-close-circle-line text-2xl"></i>
              </button>
            </div>

            {/* Scrollable List */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {/* Customer Info */}
              <div className="mb-6 bg-stone-50 p-4 rounded-xl border border-stone-100">
                <p className="text-xs font-bold text-stone-400 uppercase">
                  Customer Contact
                </p>
                <div className="font-bold text-[#4a3b2a] mt-1">
                  {selectedOrder.user?.name || "Guest User"}
                </div>
                <div className="text-sm text-stone-500">
                  📞 {selectedOrder.shippingAddress?.phone}
                </div>
                <div className="text-sm text-stone-500">
                  📧 {selectedOrder.shippingAddress?.email}
                </div>
                <div className="text-xs text-stone-400 mt-2">
                  📍 {selectedOrder.shippingAddress?.address},{" "}
                  {selectedOrder.shippingAddress?.city},{" "}
                  {selectedOrder.shippingAddress?.postalCode}
                </div>
              </div>

              {/* Products List */}
              <h4 className="text-sm font-bold text-[#4a3b2a] mb-3 uppercase">
                Ordered Items
              </h4>
              <div className="space-y-4">
                {selectedOrder.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-center border-b border-stone-100 pb-4 last:border-0"
                  >
                    <img
                      src={item.image} // Make sure DB me 'image' field ho, ya 'images[0]'
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg border border-stone-200"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-[#4a3b2a] text-sm">
                        {item.name}
                      </p>
                      <p className="text-xs text-stone-500">
                        Qty:{" "}
                        <span className="font-bold text-[#d4a017]">
                          {item.qty}
                        </span>{" "}
                        x ₹{item.price}
                      </p>
                    </div>
                    <div className="font-bold text-[#4a3b2a]">
                      ₹{item.qty * item.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Total */}
            <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-between items-center">
              <span className="text-sm font-bold text-stone-500 uppercase">
                Total Amount
              </span>
              <span className="text-xl font-bold text-[#4a3b2a]">
                ₹{selectedOrder.totalPrice}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
