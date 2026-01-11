const Query = require('../models/Query');

// @desc    Submit a new query (Public)
const submitQuery = async (req, res) => {
  const { name, email, message } = req.body;
  
  if(!name || !email || !message) {
      return res.status(400).json({ message: "Please fill all fields" });
  }

  const query = await Query.create({ name, email, message });
  res.status(201).json(query);
};

// @desc    Get all queries (Admin)
const getQueries = async (req, res) => {
  const queries = await Query.find({}).sort({ createdAt: -1 });
  res.json(queries);
};

// @desc    Delete query (Admin)
const deleteQuery = async (req, res) => {
  const query = await Query.findById(req.params.id);
  if (query) {
    await query.deleteOne();
    res.json({ message: 'Query removed' });
  } else {
    res.status(404).json({ message: 'Query not found' });
  }
};

const markQueryAsRead = async (req, res) => {
  const query = await Query.findById(req.params.id);

  if (query) {
    query.status = 'Read'; // Status update kar diya
    await query.save();
    res.json({ message: 'Query marked as read' });
  } else {
    res.status(404).json({ message: 'Query not found' });
  }
};

module.exports = { submitQuery, getQueries, deleteQuery, markQueryAsRead };