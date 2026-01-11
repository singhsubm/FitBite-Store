const express = require('express');
const router = express.Router();
// 1. Controller se naye functions import kiye
const { addOrderItems, getMyOrders, getOrders, updateOrderToDelivered } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// 2. '/' Route par do kaam honge:
// - POST: Order place karna (User ke liye)
// - GET: Saare orders dekhna (Sirf Admin ke liye)
router.route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders);

// 3. '/myorders' Route:
// - GET: Apne khud ke orders dekhna (User ke liye)
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id/status').put(protect, admin, updateOrderToDelivered);

module.exports = router;