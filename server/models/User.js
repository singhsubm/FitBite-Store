const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: "" },
  address: { 
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String }
  },
  isAdmin: { type: Boolean, default: false },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, { timestamps: true });

// --- SECURITY: Password Hashing before saving ---
userSchema.pre('save', async function (next) {
  // === FIX IS HERE ===
  if (!this.isModified('password')) {
    return  // <--- 'return' LAGANA ZAROORI HAI!
  }
  // Agar return nahi lagaya, to ye code niche bhi chalega aur error dega
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// --- METHOD: Password Match Check ---
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);