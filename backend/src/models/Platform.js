const mongoose = require('mongoose');

const PlatformSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  icon: { type: String },
  description: { type: String },
  isCustom: { type: Boolean, default: true },
  isArchived: { type: Boolean, default: false },
});

module.exports = mongoose.model('Platform', PlatformSchema);
