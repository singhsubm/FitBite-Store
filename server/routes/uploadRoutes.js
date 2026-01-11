const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');

// Multer Setup (RAM me file rakhega temporary)
const storage = multer.diskStorage({});
const upload = multer({ storage });

// POST /api/upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Cloudinary pe upload karo
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'fitbite_products', // Cloudinary me folder ka naam
    });

    // Wapas URL bhejo Frontend ko
    res.json({ url: result.secure_url });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Upload failed' });
  }
});

module.exports = router;