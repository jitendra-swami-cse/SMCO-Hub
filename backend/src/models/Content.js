const mongoose = require('mongoose');

// ---- Sub-schemas (embedded inside Content) ----

const PlatformPublishingDataSchema = new mongoose.Schema(
  {
    platformId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Platform',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Scheduled', 'Uploaded'],
      default: 'Pending',
    },
    scheduledDate: { type: Date },
    uploadedDate: { type: Date },
    postUrl: { type: String },
  },
  { _id: false }
);

const ContentFileSchema = new mongoose.Schema(
  {
    path: { type: String, required: true },     // Relative path from storage root
    fileName: { type: String, required: true },
    size: { type: Number },                      // Bytes
  },
  { _id: false }
);

// ---- Main Content Schema ----

const ContentSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['Image', 'Carousel', 'Short Video', 'Video', 'Story', 'Text', 'Other'],
      required: true,
    },
    caption: { type: String },
    hashtags: [{ type: String }],

    source: {
      type: { type: String },   // e.g. "WhatsApp", "Email"
      value: { type: String },  // e.g. "Client sent via WhatsApp"
    },

    // Global lifecycle
    globalStatus: {
      type: String,
      enum: ['Received', 'Approved', 'Uploaded', 'Archived', 'Recycle Bin'],
      default: 'Received',
    },
    receivedDate: { type: Date, default: Date.now },
    approvedDate: { type: Date },
    deletedAt: { type: Date }, // Set when moved to Recycle Bin

    // The multi-platform publishing data
    platforms: [PlatformPublishingDataSchema],

    notes: { type: String, default: '' },
    mediaFiles: [ContentFileSchema],
  },
  { timestamps: true }
);

// Indexes for performance
ContentSchema.index({ clientId: 1 });
ContentSchema.index({ globalStatus: 1 });
ContentSchema.index({ 'platforms.scheduledDate': 1 });

// TTL Index — auto-delete documents 30 days after deletedAt is set
ContentSchema.index({ deletedAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

module.exports = mongoose.model('Content', ContentSchema);
