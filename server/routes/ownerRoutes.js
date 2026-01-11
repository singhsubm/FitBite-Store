const express = require('express');
const router = express.Router();
const { registerOwner } = require('../controllers/ownerController');

// POST /api/owner/create
router.post('/create', registerOwner);

module.exports = router;