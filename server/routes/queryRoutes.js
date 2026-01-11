const express = require('express');
const router = express.Router();
const { submitQuery, getQueries, deleteQuery, markQueryAsRead } = require('../controllers/queryController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(submitQuery)              // Public: Message bhejne ke liye
    .get(protect, admin, getQueries); // Admin: Message dekhne ke liye

router.route('/:id')
    .delete(protect, admin, deleteQuery)
    .put(protect, admin, markQueryAsRead);

module.exports = router;