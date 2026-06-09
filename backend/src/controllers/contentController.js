const Content = require('../models/Content');
const Client = require('../models/Client');

// Helper to auto-calculate global status
const recalculateGlobalStatus = async (contentId) => {
  const content = await Content.findById(contentId);
  if (!content) return;

  // If all platforms were removed, revert from 'Uploaded' to 'Approved'
  if (!content.platforms || content.platforms.length === 0) {
    if (content.globalStatus === 'Uploaded') {
      content.globalStatus = 'Approved';
      await content.save();
    }
    return;
  }

  // If ALL platforms are 'Uploaded', global status becomes 'Uploaded'
  const allUploaded = content.platforms.every(p => p.status === 'Uploaded');
  if (allUploaded && content.globalStatus !== 'Uploaded') {
    content.globalStatus = 'Uploaded';
    await content.save();
  }
  // If status was 'Uploaded' but a platform was un-uploaded, revert to 'Approved'
  if (!allUploaded && content.globalStatus === 'Uploaded') {
    content.globalStatus = 'Approved';
    await content.save();
  }
};

// GET /api/v1/content
const getContent = async (req, res) => {
  try {
    const { clientId, globalStatus, type } = req.query;
    
    // Only return non-deleted content by default
    const filter = { deletedAt: { $exists: false } };
    
    if (clientId) filter.clientId = clientId;
    if (globalStatus) filter.globalStatus = globalStatus;
    if (type) filter.type = type;

    const content = await Content.find(filter)
      .populate({ path: 'clientId', select: 'personalInfo.fullName' })
      .populate({ path: 'platforms.platformId', select: 'name icon' })
      .sort({ receivedDate: -1 });

    res.json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// GET /api/v1/content/:id
const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id)
      .populate({ path: 'clientId', select: 'personalInfo.fullName' })
      .populate({ path: 'platforms.platformId', select: 'name icon' });

    if (!content) return res.status(404).json({ success: false, error: { message: 'Content not found' } });
    
    res.json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// POST /api/v1/content
const createContent = async (req, res) => {
  try {
    const { clientId, title, type, caption, hashtags, source, notes } = req.body;

    if (!clientId || !title || !type) {
      return res.status(400).json({ success: false, error: { message: 'clientId, title, and type are required' } });
    }

    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ success: false, error: { message: 'Client not found' } });

    // Block filesystem-unsafe characters in title (since it might be used for folder name)
    const UNSAFE_CHARS = /[*?"<>|:\\/]/;
    if (UNSAFE_CHARS.test(title)) {
      return res.status(400).json({
        success: false, 
        error: { message: 'Title contains characters not allowed in folder names (* ? " < > | : / \\)' }
      });
    }

    const content = await Content.create({
      clientId,
      title,
      type,
      caption,
      hashtags,
      source,
      notes,
      globalStatus: 'Received'
    });

    res.status(201).json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// PUT /api/v1/content/:id
const updateContent = async (req, res) => {
  try {
    const { title, type, caption, hashtags, source, globalStatus, notes } = req.body;
    
    if (title !== undefined) {
      const UNSAFE_CHARS = /[*?"<>|:\\/]/;
      if (UNSAFE_CHARS.test(title)) {
        return res.status(400).json({
          success: false, 
          error: { message: 'Title contains characters not allowed in folder names (* ? " < > | : / \\)' }
        });
      }
    }

    const updateData = { title, type, caption, hashtags, source, notes };
    
    // globalStatus logic
    if (globalStatus) {
      updateData.globalStatus = globalStatus;
      if (globalStatus === 'Approved') updateData.approvedDate = Date.now();
    }

    // Filter out undefined fields
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    const content = await Content.findByIdAndUpdate(req.params.id, updateData, { new: true })
      .populate({ path: 'clientId', select: 'personalInfo.fullName' })
      .populate({ path: 'platforms.platformId', select: 'name icon' });

    if (!content) return res.status(404).json({ success: false, error: { message: 'Content not found' } });

    res.json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// DELETE /api/v1/content/:id (Soft Delete)
const deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { deletedAt: Date.now(), globalStatus: 'Recycle Bin' },
      { new: true }
    );

    if (!content) return res.status(404).json({ success: false, error: { message: 'Content not found' } });
    
    res.json({ success: true, data: { message: 'Content moved to recycle bin' } });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// ==========================================
// PLATFORM PUBLISHING SUB-DOCUMENT
// ==========================================

const Platform = require('../models/Platform');

const VALID_STATUSES = ['Pending', 'Approved', 'Scheduled', 'Uploaded'];

const addPlatform = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ success: false, error: { message: 'Content not found' } });

    const { platformId, status, scheduledDate, postUrl } = req.body;
    
    if (!platformId) {
      return res.status(400).json({ success: false, error: { message: 'platformId is required' } });
    }

    // Verify platform exists
    const platformExists = await Platform.findById(platformId);
    if (!platformExists) {
      return res.status(404).json({ success: false, error: { message: 'Platform not found' } });
    }

    // Validate status
    const finalStatus = status || 'Pending';
    if (!VALID_STATUSES.includes(finalStatus)) {
      return res.status(400).json({ success: false, error: { message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` } });
    }

    // Validate scheduledDate
    if (scheduledDate && isNaN(Date.parse(scheduledDate))) {
      return res.status(400).json({ success: false, error: { message: 'Invalid scheduledDate' } });
    }

    // Check if platform already added
    if (content.platforms.some(p => p.platformId.toString() === platformId)) {
      return res.status(409).json({ success: false, error: { message: 'Platform already assigned to this content' } });
    }

    content.platforms.push({ 
      platformId, 
      status: finalStatus, 
      scheduledDate, 
      postUrl,
      uploadedDate: finalStatus === 'Uploaded' ? Date.now() : undefined
    });
    
    await content.save();
    await recalculateGlobalStatus(content._id);
    
    const addedPlatform = content.platforms[content.platforms.length - 1];
    res.status(201).json({ success: true, data: addedPlatform });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

const updatePlatformStatus = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ success: false, error: { message: 'Content not found' } });

    const platform = content.platforms.find(p => p.platformId.toString() === req.params.platformId);
    if (!platform) return res.status(404).json({ success: false, error: { message: 'Platform not found on this content' } });

    const { status, scheduledDate, postUrl } = req.body;

    if (status !== undefined) {
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ success: false, error: { message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` } });
      }
      
      const wasUploaded = platform.status === 'Uploaded';
      platform.status = status;
      
      if (status === 'Uploaded' && !platform.uploadedDate) {
        platform.uploadedDate = Date.now();
      } else if (wasUploaded && status !== 'Uploaded') {
        platform.uploadedDate = undefined; // Clear if it leaves Uploaded state
      }
    }
    
    if (scheduledDate !== undefined) {
      if (scheduledDate !== null && isNaN(Date.parse(scheduledDate))) {
        return res.status(400).json({ success: false, error: { message: 'Invalid scheduledDate' } });
      }
      platform.scheduledDate = scheduledDate;
    }
    
    if (postUrl !== undefined) platform.postUrl = postUrl;

    await content.save();
    
    // Auto-calculate global status
    await recalculateGlobalStatus(content._id);

    res.json({ success: true, data: platform });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

const removePlatform = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ success: false, error: { message: 'Content not found' } });

    const initialLength = content.platforms.length;
    content.platforms = content.platforms.filter(p => p.platformId.toString() !== req.params.platformId);
    
    if (content.platforms.length === initialLength) {
      return res.status(404).json({ success: false, error: { message: 'Platform not found on this content' } });
    }

    await content.save();
    await recalculateGlobalStatus(content._id);

    res.json({ success: true, data: { message: 'Platform removed' } });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// ==========================================
// MEDIA FILES OPERATIONS
// ==========================================

const fs = require('fs');
const path = require('path');
const storageUtils = require('../utils/storageUtils');

const getFiles = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ success: false, error: { message: 'Content not found' } });
    
    res.json({ success: true, data: content.mediaFiles });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: { message: 'No file provided' } });
  }

  try {
    const content = await Content.findById(req.params.id).populate('clientId');
    if (!content) {
      // Cleanup temp file
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(404).json({ success: false, error: { message: 'Content not found' } });
    }

    const clientName = content.clientId.personalInfo.fullName;
    const targetFolder = storageUtils.getContentFolderPath(clientName, content._id, content.title);
    
    // Lazy Folder Creation: Create folder only when first file is uploaded
    storageUtils.ensureDirectoryExists(targetFolder);

    const uniqueFilename = storageUtils.generateUniqueFilename(req.file.originalname);
    const targetPath = path.join(targetFolder, uniqueFilename);

    // Move file from temp to final destination (Rename is fastest, no compression)
    fs.renameSync(req.file.path, targetPath);

    // Calculate relative path for database (e.g. "Jane Doe/CNT-1a2b_Title/file.jpg")
    const contentFolderName = storageUtils.getContentFolderName(content._id, content.title);
    const relativePath = path.join(storageUtils.sanitizeFolderName(clientName), contentFolderName, uniqueFilename).replace(/\\/g, '/');

    const newFileRecord = {
      path: relativePath,
      fileName: req.file.originalname,
      size: req.file.size
    };

    content.mediaFiles.push(newFileRecord);
    await content.save();

    res.status(201).json({ success: true, data: newFileRecord });
  } catch (error) {
    // Cleanup temp file on error
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

const deleteFile = async (req, res) => {
  try {
    const { filePath } = req.body;
    if (!filePath) return res.status(400).json({ success: false, error: { message: 'filePath is required' } });

    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ success: false, error: { message: 'Content not found' } });

    // Find file in DB
    const fileIndex = content.mediaFiles.findIndex(f => f.path === filePath);
    if (fileIndex === -1) {
      return res.status(404).json({ success: false, error: { message: 'File not found in content record' } });
    }

    // Disk + DB deletion sync
    const absolutePath = path.join(storageUtils.STORAGE_ROOT, filePath);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }

    content.mediaFiles.splice(fileIndex, 1);
    await content.save();

    // Empty folder cleanup
    const folderPath = path.dirname(absolutePath);
    storageUtils.cleanupEmptyFolder(folderPath);

    res.json({ success: true, data: { message: 'File deleted successfully' } });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

module.exports = {
  getContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
  addPlatform,
  updatePlatformStatus,
  removePlatform,
  getFiles,
  uploadFile,
  deleteFile
};
