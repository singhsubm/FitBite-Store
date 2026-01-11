const express = require('express');
const router = express.Router();
const { 
    getBlogs, 
    getBlogById, 
    createBlog, 
    deleteBlog, 
    updateBlog 
} = require('../controllers/blogController');

const { protect, admin } = require('../middleware/authMiddleware');

// Public Route: Sab dekh sakte hain
router.route('/').get(getBlogs);
router.route('/:id').get(getBlogById);

// Admin Routes: Sirf Admin create/delete/edit kar sakta hai
router.route('/').post(protect, admin, createBlog);
router.route('/:id').delete(protect, admin, deleteBlog).put(protect, admin, updateBlog);

module.exports = router;