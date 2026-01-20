const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// @desc    Register a new user
const registerUser = async (req, res, next) => {
  // Added next for safety
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    // Agar next use ho raha hai to yahan pass kar do, warna response bhejo
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login User
const authUser = async (req, res, next) => {
  // Added next
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
const getUserProfile = async (req, res, next) => {
  // Added next
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// === FIX IS HERE: Added 'next' parameter ===
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Update Error:", error.message);
    // Ab agar galti se next call bhi hoga, to crash nahi karega
    res.status(500).json({ message: error.message || "Update Failed" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Token Generate karo
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Token ko Hash karke DB me save karo (Security ke liye)
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // 10 minute ka time do
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  // Link banao (Frontend ka URL)
  // Maan le tera frontend localhost:5173 pe chal raha hai
  const resetUrl = `https://fitbite-store.vercel.app/password/reset/${resetToken}`;

  const message = `Click this link to reset your password: \n\n ${resetUrl}`;

  try {

    res
      .status(200)
      .json({ success: true, message: `Email sent to ${user.email}` });
      
    await sendEmail({
      email: user.email,
      subject: "FitBite Password Recovery",
      message,
    });

    
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({ message: "Email could not be sent" });
  }
};

// 2. RESET PASSWORD (Token lega, naya password set karega)
const resetPassword = async (req, res) => {
  // URL se token nikalo aur Hash karo (kyunki DB me hashed hai)
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }, // Check karo time bacha hai ya nahi
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or Expired Token" });
  }

  // Naya Password Set karo
  user.password = req.body.password; // Pre-save hook apne aap hash kar dega
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res
    .status(200)
    .json({ success: true, message: "Password Updated Successfully" });
};

module.exports = {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  forgotPassword,
  resetPassword,
};
