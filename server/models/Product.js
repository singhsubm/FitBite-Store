const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    default: 0, // Ye Selling Price hai
  },
  originalPrice: { 
    type: Number, 
    required: true, 
    default: 0 // Ye MRP hai (Strike ke liye)
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Almonds', 'Cashews', 'Walnuts', 'Pistachios', 'Gifts', 'Seeds', 'Combo', "Fitness Pack"] // Sirf yehi categories allow hongi
  },
  weight: { 
    type: String, 
    required: true, 
    default: '500g' // Default value
  },
  images: [{ type: String }], // Array of image URLs
  stock: { type: Number, required: true, default: 0 },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false }, // Landing page pe dikhane ke liye
  nutrition: {
    energy: { type: String, default: '579 kcal' },
    protein: { type: String, default: '21.2 g' },
    carbs: { type: String, default: '21.6 g' },
    fat: { type: String, default: '49.9 g' },
    fiber: { type: String, default: '12.5 g' },
    sugar: { type: String, default: '4.4 g' },
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);