const express = require('express');
const router = express.Router();
const { getProducts, createProduct, updateProduct , getProductById, deleteProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware'); // <-- Guard Import

// Public Route (Koi bhi dekh sakta hai)
router.get('/', getProducts);

// Private Route (Sirf Owner add kar sakta hai)
// Pehle 'protect' chalega, agar token sahi hai tabhi 'createProduct' chalega
router.post('/', protect, createProduct);

// NEW ROUTE: ID wala route hamesha 'param' waale routes ke baad rakhte hain
router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

module.exports = router;