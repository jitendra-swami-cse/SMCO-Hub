const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
  // No enum — new event types will appear over time
  // Common types: 'Client Created', 'Content Uploaded', 'Content Auto Deleted',
  //   'Backup Created', 'File Missing Detected', 'Client Archived'
  type: { type: String, required: true },
  entityType: {
    type: String,
    enum: ['Client', 'Content', 'Platform', 'System'],
  },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  contentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' },
  platformId: { type: mongoose.Schema.Types.ObjectId, ref: 'Platform' },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Most recent events first
ActivityLogSchema.index({ createdAt: -1 });
// Filter by client quickly
ActivityLogSchema.index({ clientId: 1 });

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);
