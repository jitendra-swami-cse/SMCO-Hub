const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// ---- Sub-schemas (embedded inside Client) ----

const SocialAccountSchema = new mongoose.Schema(
  {
    accountId: { type: String, default: uuidv4 },
    platformId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Platform',
      required: true,
    },
    username: { type: String, required: true },
    displayName: { type: String },
    profileUrl: { type: String },
    status: {
      type: String,
      enum: [
        'Active',
        'Inactive',
        'Suspended',
        'Closed'
      ],
      default: 'Active',
    },
    notes: { type: String },

    // Credential Vault
    // V1: Stored in plain text because application is local-only and requires password retrieval.
    // Future: Can migrate to encrypted storage if hosted deployment is ever introduced.
    credential: {
      password: { type: String },
      recoveryEmail: { type: String },
      recoveryPhone: { type: String },
    },

    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false } // We use accountId as the identifier
);

const ClientNoteSchema = new mongoose.Schema(
  {
    noteId: { type: String, default: uuidv4 },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  { _id: false }
);

// ---- Main Client Schema ----

const ClientSchema = new mongoose.Schema(
  {
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    tagIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],

    personalInfo: {
      fullName: { type: String, required: true },
      phone: { type: String },
      whatsapp: { type: String },
      email: { type: String },
      dob: { type: Date },
      address: { type: String },
    },

    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Closed'],
      default: 'Active',
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    deletedAt: { type: Date }, // Set when moved to Recycle Bin
    rating: { type: Number, min: 1, max: 10, default: 5 },
    ratingNote: { type: String },

    // Gmail is treated as just another account in this array
    accounts: [SocialAccountSchema],
    notes: [ClientNoteSchema],
  },
  { timestamps: true } // adds createdAt + updatedAt automatically
);

// Indexes
ClientSchema.index({ status: 1 });
ClientSchema.index({ categoryId: 1 });
ClientSchema.index({ 'personalInfo.fullName': 'text' });
// TTL Index — auto-delete documents 30 days after deletedAt is set
ClientSchema.index({ deletedAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

module.exports = mongoose.model('Client', ClientSchema);
