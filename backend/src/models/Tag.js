const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  color: { type: String, default: '#6c5ce7' }, // Default to accent purple
});

module.exports = mongoose.model('Tag', TagSchema);
