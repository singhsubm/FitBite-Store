const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Author kon hai (Admin)
  },
  title: { type: String, required: true },
  image: { type: String, required: true },
  content: { type: String, required: true }, // HTML ya simple text
  category: { type: String, default: 'Health' },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);