const mongoose = require('mongoose');

const SnapshotSchema = new mongoose.Schema({
  month: { type: String, required: true, unique: true }, // e.g. "2026-06"
  totalClients: { type: Number, default: 0 },
  activeClients: { type: Number, default: 0 },
  totalContent: { type: Number, default: 0 },
  uploadedContent: { type: Number, default: 0 },
  pendingContent: { type: Number, default: 0 },
  storageUsed: { type: Number, default: 0 }, // bytes
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Snapshot', SnapshotSchema);
