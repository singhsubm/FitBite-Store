const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProfile, updateUserProfile, forgotPassword, resetPassword} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

// Sign Up Route
router.post('/register', registerUser);

// Login Route
router.post('/login', authUser);

router.route('/profile')
  .get(protect, getUserProfile)      // Profile Dekhne ke liye
  .put(protect, updateUserProfile);  // Profile Update karne ke liye (<--- MISSING LINE)

router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword);

module.exports = router;