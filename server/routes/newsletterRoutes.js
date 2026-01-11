const express = require('express');
const router = express.Router();
const { subscribe, getSubscribers } = require('../controllers/newsletterController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', subscribe); // Public
router.get('/', protect, admin, getSubscribers); // Admin Only

module.exports = router;