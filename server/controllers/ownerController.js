const Owner = require('../models/Owner');
const generateToken = require('../utils/generateToken'); // Ye hum baad me banayenge

// @desc    Register the Owner
// @route   POST /api/owner/register
// @access  Public (But Restricted by Logic)
const registerOwner = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Check: Are we in Development Mode?
    if (process.env.NODE_ENV !== 'development') {
      return res.status(403).json({ 
        message: " Security Alert: Owner creation is ONLY allowed in Development mode." 
      });
    }

    // 2. Check: Does an Owner already exist?
    const ownerExists = await Owner.findOne();
    if (ownerExists) {
      return res.status(400).json({ 
        message: " Security Alert: An Owner already exists. Multiple owners are not allowed." 
      });
    }

    // 3. Create Owner
    const owner = await Owner.create({
      name,
      email,
      password
    });

    if (owner) {
      res.status(201).json({
        _id: owner._id,
        name: owner.name,
        email: owner.email,
        token: generateToken(owner._id),
        message: " Owner created successfully. Now switch to Production mode to lock this.",
        // Token baad me add karenge
      });
    } else {
      res.status(400).json({ message: "Invalid owner data" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerOwner };