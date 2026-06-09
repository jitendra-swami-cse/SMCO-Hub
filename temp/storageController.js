const fs = require('fs');
const path = require('path');
const Client = require('../models/Client');
const Content = require('../models/Content');
const { STORAGE_ROOT } = require('../utils/storageUtils');

// Helper: Calculate directory size recursively
const getDirSize = (dirPath) => {
  let size = 0;
  if (!fs.existsSync(dirPath)) return 0;
  
  const files = fs.readdirSync(dirPath);
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(dirPath, files[i]);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      size += getDirSize(filePath);
    } else {
      size += stats.size;
    }
  }
  return size;
};

// Helper: Count files recursively
const countFilesAndFolders = (dirPath) => {
  let filesCount = 0;
  let foldersCount = 0;
  if (!fs.existsSync(dirPath)) return { filesCount, foldersCount };

  const items = fs.readdirSync(dirPath);
  for (let i = 0; i < items.length; i++) {
    const itemPath = path.join(dirPath, items[i]);
    const stats = fs.statSync(itemPath);
    if (stats.isDirectory()) {
      foldersCount++;
      const subCounts = countFilesAndFolders(itemPath);
      filesCount += subCounts.filesCount;
      foldersCount += subCounts.foldersCount;
    } else {
      filesCount++;
    }
  }
  return { filesCount, foldersCount };
};

const getOverview = async (req, res) => {
  try {
    const activeClients = await Client.find({ status: 'Active' }).select('_id personalInfo.fullName');
    const allContent = await Content.find({ deletedAt: { $exists: false } }).populate('clientId', 'personalInfo.fullName');

    const totalStorageBytes = getDirSize(STORAGE_ROOT);
    const { filesCount, foldersCount } = countFilesAndFolders(STORAGE_ROOT);

    // Calculate per-client size
    const clientUsage = [];
    const contentUsage = [];
    const missingFiles = [];

    // Optimize by creating map of paths
    for (const content of allContent) {
      if (!content.clientId) continue;

      let contentSizeBytes = 0;

      for (const file of content.mediaFiles) {
        const absolutePath = path.join(STORAGE_ROOT, file.path);
        
        // Detect Missing Files
        if (!fs.existsSync(absolutePath)) {
          missingFiles.push({
            contentId: content._id,
            contentTitle: content.title,
            clientId: content.clientId._id,
            clientName: content.clientId.personalInfo.fullName,
            fileName: file.fileName,
            expectedPath: file.path // Relative path inside STORAGE_ROOT
          });
        } else {
          const stats = fs.statSync(absolutePath);
          contentSizeBytes += stats.size;
        }
      }

      contentUsage.push({
        contentId: content._id,
        title: content.title,
        clientName: content.clientId.personalInfo.fullName,
        sizeBytes: contentSizeBytes
      });
    }

    // Now aggregate per client
    for (const client of activeClients) {
      const clientContent = contentUsage.filter(c => c.clientName === client.personalInfo.fullName);
      const totalClientBytes = clientContent.reduce((sum, c) => sum + c.sizeBytes, 0);
      
      // If we also want to measure the client's whole folder (which might include untracked files):
      // We can do that by taking their folder path directly, but summing tracked files is safer and more accurate for DB usage.
      // Let's use the actual folder size just in case there's orphaned files!
      const { getClientFolderPath } = require('../utils/storageUtils');
      const clientFolder = getClientFolderPath(client.personalInfo.fullName);
      const actualFolderBytes = fs.existsSync(clientFolder) ? getDirSize(clientFolder) : 0;

      clientUsage.push({
        clientId: client._id,
        name: client.personalInfo.fullName,
        sizeBytes: actualFolderBytes
      });
    }

    // Sort Top 10 Clients by size
    const topClients = clientUsage.sort((a, b) => b.sizeBytes - a.sizeBytes).slice(0, 10);
    
    // Sort Top 20 Content by size
    const topContent = contentUsage.sort((a, b) => b.sizeBytes - a.sizeBytes).slice(0, 20);

    res.json({
      success: true,
      data: {
        storageTotal: {
          sizeBytes: totalStorageBytes,
          filesCount,
          foldersCount
        },
        topClients,
        topContent,
        missingFiles
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// Fix a single missing file (remove reference)
const removeMissingFile = async (req, res) => {
  try {
    const { contentId, fileName } = req.body;
    
    const content = await Content.findById(contentId);
    if (!content) return res.status(404).json({ success: false, error: { message: 'Content not found' }});

    content.mediaFiles = content.mediaFiles.filter(f => f.fileName !== fileName);
    await content.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

module.exports = {
  getOverview,
  removeMissingFile
};
