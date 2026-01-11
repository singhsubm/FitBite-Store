const mongoose = require('mongoose');

const querySchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'New' }, // New, Read, Resolved
}, { timestamps: true });

module.exports = mongoose.model('Query', querySchema);