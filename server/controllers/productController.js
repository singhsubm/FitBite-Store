const Product = require("../models/Product");

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private (Owner Only)
const createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    originalPrice,
    category,
    images,
    stock,
    isFeatured,
    weight,
    nutrition,
  } = req.body;

  try {
    const product = new Product({
      name,
      description,
      price,
      originalPrice: originalPrice || 0, // Agar empty ho to 0
      user: req.user._id,
      category,
      images,
      stock,
      isFeatured,
      countInStock: stock || 0,
      weight: weight || "500g",
      nutrition: nutrition,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
  const {
    name,
    price,
    originalPrice, // <--- 1. YE ADD KIYA (Pehle missing tha)
    description,
    image, // Frontend se singular 'image' aa raha hai
    category,
    stock,
    weight,
    nutrition,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    
    // <--- 2. LOGIC FIX: Original Price Update
    product.originalPrice = originalPrice !== undefined ? originalPrice : product.originalPrice; 
    
    product.description = description || product.description;
    
    if (nutrition) {
      product.nutrition = nutrition;
    }

    // <--- 3. IMAGE LOGIC (Single String to Array)
    if (image) {
      // Check karo agar wo pehle se Array hai ya String hai
      if (Array.isArray(image)) {
        product.images = image;
      } else {
        product.images = [image]; // String ko Array me daal diya
      }
    }

    product.category = category || product.category;
    
    if (stock !== undefined) {
      product.stock = Number(stock);
      product.countInStock = Number(stock); // CountInStock bhi update hona chahiye
    }
    
    product.weight = weight || product.weight;

    try {
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } catch (error) {
      console.error("Save Error:", error.message);
      res.status(400).json({ message: "Invalid Data", error: error.message });
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  getProductById,
  deleteProduct,
};