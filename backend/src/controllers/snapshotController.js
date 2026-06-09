const fs = require('fs');
const path = require('path');
const Client = require('../models/Client');
const Content = require('../models/Content');
const Snapshot = require('../models/Snapshot');
const { STORAGE_ROOT } = require('../utils/storageUtils');

// Helper: Calculate directory size
const getDirSize = (dirPath) => {
  let size = 0;
  if (!fs.existsSync(dirPath)) return 0;
  const files = fs.readdirSync(dirPath);
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(dirPath, files[i]);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) size += getDirSize(filePath);
    else size += stats.size;
  }
  return size;
};

// Get all snapshots
const getSnapshots = async (req, res) => {
  try {
    const snapshots = await Snapshot.find().sort({ createdAt: -1 });
    res.json({ success: true, data: snapshots });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// Generate a snapshot manually
const generateSnapshot = async (req, res) => {
  try {
    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    const totalClientsCount = await Client.countDocuments({ deletedAt: { $exists: false } });
    const activeClientsCount = await Client.countDocuments({ status: 'Active', deletedAt: { $exists: false } });

    const totalContentCount = await Content.countDocuments({ deletedAt: { $exists: false } });
    const uploadedContentCount = await Content.countDocuments({ globalStatus: 'Uploaded', deletedAt: { $exists: false } });
    const pendingContentCount = await Content.countDocuments({ globalStatus: { $in: ['Received', 'Approved'] }, deletedAt: { $exists: false } });

    const storageSizeBytes = getDirSize(STORAGE_ROOT);

    // Upsert: if a snapshot for this month exists, update it; otherwise create it
    const snapshot = await Snapshot.findOneAndUpdate(
      { month },
      {
        totalClients: totalClientsCount,
        activeClients: activeClientsCount,
        totalContent: totalContentCount,
        uploadedContent: uploadedContentCount,
        pendingContent: pendingContentCount,
        storageUsed: storageSizeBytes,
        createdAt: now
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, data: snapshot });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

module.exports = {
  getSnapshots,
  generateSnapshot
};
