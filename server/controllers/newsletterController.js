const Newsletter = require('../models/Newsletter');

const subscribe = async (req, res) => {
  const { email } = req.body;
  try {
    const exists = await Newsletter.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already subscribed" });

    await Newsletter.create({ email });
    res.status(201).json({ message: "Subscribed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getSubscribers = async (req, res) => {
  const subs = await Newsletter.find({}).sort({ createdAt: -1 });
  res.json(subs);
};

module.exports = { subscribe, getSubscribers };