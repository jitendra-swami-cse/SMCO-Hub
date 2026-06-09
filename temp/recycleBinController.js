const Client = require('../models/Client');
const Content = require('../models/Content');

const getRecycleBin = async (req, res) => {
  try {
    const deletedClients = await Client.find({ deletedAt: { $exists: true } }).lean();
    const deletedContent = await Content.find({ deletedAt: { $exists: true } }).populate('clientId', 'personalInfo.fullName').lean();

    const items = [
      ...deletedClients.map(c => ({
        _id: c._id,
        type: 'Client',
        title: c.personalInfo.fullName,
        deletedAt: c.deletedAt
      })),
      ...deletedContent.map(c => ({
        _id: c._id,
        type: 'Content',
        title: c.title,
        clientName: c.clientId?.personalInfo?.fullName,
        deletedAt: c.deletedAt
      }))
    ];

    items.sort((a, b) => new Date(b.deletedAt) - new Date(a.deletedAt));

    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

const restoreItem = async (req, res) => {
  try {
    const { id, type } = req.body;
    let Model = type === 'Client' ? Client : Content;

    const doc = await Model.findById(id);
    if (!doc) return res.status(404).json({ success: false, error: { message: 'Item not found' } });

    doc.deletedAt = undefined;
    if (type === 'Client') {
      doc.isArchived = false;
      doc.status = 'Active';
    } else {
      doc.globalStatus = 'Received';
    }

    await doc.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

const hardDeleteItem = async (req, res) => {
  try {
    const { id, type } = req.body;
    let Model = type === 'Client' ? Client : Content;

    await Model.findByIdAndDelete(id);
    
    // Note: To be safe, we could also attempt to wipe the storage directory here.
    // For V1, the filesystem footprint is small, but if requested, we could add `cleanupEmptyFolder`.

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

module.exports = {
  getRecycleBin,
  restoreItem,
  hardDeleteItem
};
