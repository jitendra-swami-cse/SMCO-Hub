const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure temp directory exists
const tempDir = path.join(__dirname, '../../../storage/.temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Configure multer for temp storage
const upload = multer({ 
  dest: tempDir,
  limits: { fileSize: 1024 * 1024 * 500 } // 500MB limit for local app
});
const {
  getContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
  addPlatform,
  updatePlatformStatus,
  removePlatform,
  uploadFile,
  deleteFile,
  getFiles
} = require('../controllers/contentController');

// Main Content CRUD
router.get('/', getContent);
router.get('/:id', getContentById);
router.post('/', createContent);
router.put('/:id', updateContent);
router.delete('/:id', deleteContent);

// Sub-document: Publishing Platforms
router.post('/:id/platforms', addPlatform);
router.put('/:id/platforms/:platformId', updatePlatformStatus);
router.delete('/:id/platforms/:platformId', removePlatform);

// Media Files Operations
router.get('/:id/files', getFiles);
router.post('/:id/files', upload.single('file'), uploadFile);
router.delete('/:id/files', deleteFile);

module.exports = router;
