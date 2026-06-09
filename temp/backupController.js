const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

const Client = require('../models/Client');
const Content = require('../models/Content');
const Category = require('../models/Category');
const Tag = require('../models/Tag');
const Platform = require('../models/Platform');
const ActivityLog = require('../models/ActivityLog');
const Snapshot = require('../models/Snapshot');

const APP_VERSION = '1.0';

// ---- Create Backup ----

const createBackup = async (req, res) => {
  try {
    const clients = await Client.find({});
    const content = await Content.find({});
    const categories = await Category.find({});
    const tags = await Tag.find({});
    const platforms = await Platform.find({});
    const activityLogs = await ActivityLog.find({});
    const snapshots = await Snapshot.find({});

    const metadata = {
      createdAt: new Date().toISOString(),
      appVersion: APP_VERSION,
      clientCount: clients.length,
      contentCount: content.length,
      tagCount: tags.length,
      categoryCount: categories.length,
      platformCount: platforms.length,
      logCount: activityLogs.length,
      snapshotCount: snapshots.length
    };

    const backupData = {
      clients,
      content,
      categories,
      tags,
      platforms,
      activityLogs,
      snapshots
    };

    const zip = new AdmZip();
    zip.addFile('metadata.json', Buffer.from(JSON.stringify(metadata, null, 2), 'utf8'));
    zip.addFile('backup.json', Buffer.from(JSON.stringify(backupData), 'utf8')); // Minified

    const zipBuffer = zip.toBuffer();

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    res.set('Content-Type', 'application/zip');
    res.set('Content-Disposition', `attachment; filename="IdentityHub_Backup_${timestamp}.zip"`);
    res.set('Content-Length', zipBuffer.length);
    res.send(zipBuffer);

    // Log the backup creation
    await ActivityLog.create({
      type: 'Backup Export',
      entityType: 'System',
      description: `Exported system backup containing ${clients.length} clients and ${content.length} content records.`
    });

  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// ---- Restore Summary (Step 1) ----

const restoreSummary = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: { message: 'No backup file provided' } });
    }

    const zip = new AdmZip(req.file.buffer);
    const zipEntries = zip.getEntries();
    
    const metadataEntry = zipEntries.find(e => e.entryName === 'metadata.json');
    if (!metadataEntry) {
      return res.status(400).json({ success: false, error: { message: 'Invalid backup format: missing metadata.json' } });
    }

    const metadata = JSON.parse(metadataEntry.getData().toString('utf8'));

    // Check backup.json existence
    const backupEntry = zipEntries.find(e => e.entryName === 'backup.json');
    if (!backupEntry) {
      return res.status(400).json({ success: false, error: { message: 'Invalid backup format: missing backup.json' } });
    }

    res.json({
      success: true,
      data: {
        summary: metadata
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// ---- Restore Confirm (Step 2) ----

const restoreConfirm = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: { message: 'No backup file provided' } });
    }

    const zip = new AdmZip(req.file.buffer);
    const backupEntry = zip.getEntries().find(e => e.entryName === 'backup.json');
    if (!backupEntry) {
      return res.status(400).json({ success: false, error: { message: 'Invalid backup format' } });
    }

    const backupData = JSON.parse(backupEntry.getData().toString('utf8'));

    // DANGEROUS: Wiping database
    await Client.deleteMany({});
    await Content.deleteMany({});
    await Category.deleteMany({});
    await Tag.deleteMany({});
    await Platform.deleteMany({});
    await ActivityLog.deleteMany({});
    await Snapshot.deleteMany({});

    // Inserting data
    if (backupData.clients?.length) await Client.insertMany(backupData.clients);
    if (backupData.content?.length) await Content.insertMany(backupData.content);
    if (backupData.categories?.length) await Category.insertMany(backupData.categories);
    if (backupData.tags?.length) await Tag.insertMany(backupData.tags);
    if (backupData.platforms?.length) await Platform.insertMany(backupData.platforms);
    if (backupData.activityLogs?.length) await ActivityLog.insertMany(backupData.activityLogs);
    if (backupData.snapshots?.length) await Snapshot.insertMany(backupData.snapshots);

    // Log the restore
    await ActivityLog.create({
      type: 'System Restore',
      entityType: 'System',
      description: `Restored system from backup file. Clients: ${backupData.clients?.length || 0}`
    });

    res.json({ success: true, message: 'Restore complete' });

  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

module.exports = {
  createBackup,
  restoreSummary,
  restoreConfirm
};
