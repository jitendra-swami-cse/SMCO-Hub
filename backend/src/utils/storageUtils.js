const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Root storage directory
const STORAGE_ROOT = path.join(__dirname, '../../../storage');

// Sanitize folder names defensively (removes invalid chars, trims spaces)
const sanitizeFolderName = (name) => {
  if (!name) return 'Untitled';
  // Replace anything that is not alphanumeric, space, dot, dash, underscore with empty string
  let sanitized = name.replace(/[*?"<>|:\\/]/g, '').trim();
  // Ensure we don't have purely dot names or empty names
  if (!sanitized || sanitized === '.' || sanitized === '..') sanitized = 'Untitled';
  return sanitized;
};

// Generate content folder name (e.g. CNT-1a2b3c_Title)
const getContentFolderName = (contentId, title) => {
  const shortId = contentId.toString().slice(-6);
  const safeTitle = sanitizeFolderName(title);
  return `CNT-${shortId}_${safeTitle}`;
};

// Get absolute path to client folder
const getClientFolderPath = (clientName) => {
  const safeClientName = sanitizeFolderName(clientName);
  return path.join(STORAGE_ROOT, safeClientName);
};

// Get absolute path to content folder
const getContentFolderPath = (clientName, contentId, title) => {
  const clientPath = getClientFolderPath(clientName);
  const contentFolderName = getContentFolderName(contentId, title);
  return path.join(clientPath, contentFolderName);
};

// Ensure a directory exists
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Clean up empty folder (and parent client folder if it becomes empty)
const cleanupEmptyFolder = (folderPath) => {
  try {
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);
      if (files.length === 0) {
        fs.rmdirSync(folderPath);
        // Also try cleaning up parent (client folder) if it's empty
        const parentFolder = path.dirname(folderPath);
        if (parentFolder !== STORAGE_ROOT && fs.existsSync(parentFolder)) {
          const parentFiles = fs.readdirSync(parentFolder);
          if (parentFiles.length === 0) {
            fs.rmdirSync(parentFolder);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error cleaning up folder:', error.message);
  }
};

// Safely rename client folder
const safeRenameClientFolder = (oldName, newName) => {
  const oldPath = getClientFolderPath(oldName);
  const newPath = getClientFolderPath(newName);

  if (!fs.existsSync(oldPath)) {
    // Old folder doesn't exist, nothing to rename
    return { success: true, renamed: false };
  }

  if (fs.existsSync(newPath)) {
    // New folder already exists, conflict
    throw new Error(`Target folder already exists: ${newPath}`);
  }

  try {
    fs.renameSync(oldPath, newPath);
    return { success: true, renamed: true, oldPath, newPath };
  } catch (error) {
    throw new Error(`Failed to rename folder: ${error.message}`);
  }
};

// Generate a unique collision-free filename
const generateUniqueFilename = (originalName) => {
  const ext = path.extname(originalName);
  const shortUuid = uuidv4().split('-')[0];
  const basename = path.basename(originalName, ext);
  // Example: a7f2_IMG_0001.jpg
  return `${shortUuid}_${sanitizeFolderName(basename)}${ext}`;
};

module.exports = {
  STORAGE_ROOT,
  sanitizeFolderName,
  getContentFolderName,
  getClientFolderPath,
  getContentFolderPath,
  ensureDirectoryExists,
  cleanupEmptyFolder,
  safeRenameClientFolder,
  generateUniqueFilename
};
