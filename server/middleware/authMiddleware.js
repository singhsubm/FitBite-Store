const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // 1. Token Check karo (Bearer Token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Token nikaalo
      token = req.headers.authorization.split(' ')[1];

      // Decode karo
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // User find karo aur req.user me daal do
      // Note: Hum password nahi chahiye isliye .select('-password')
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
         throw new Error("User not found via Token");
      }

      next(); // Sab sahi hai, aage badho
    } catch (error) {
      console.error("Auth Middleware Error:", error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };