const Client = require('../models/Client');
const Content = require('../models/Content');
const storageUtils = require('../utils/storageUtils');

// GET /api/v1/clients
// Populates category and tags for the list view
const getClients = async (req, res) => {
  try {
    const clients = await Client.find({ isArchived: false })
      .populate('categoryId', 'name')
      .populate('tagIds', 'name color')
      .sort({ updatedAt: -1 }); // Newest/recently updated first
    res.json({ success: true, data: clients });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// GET /api/v1/clients/:id
const getClientById = async (req, res) => {
  try {
    const client = await Client.findOne({ _id: req.params.id, isArchived: false })
      .populate('categoryId', 'name')
      .populate('tagIds', 'name color')
      .populate('accounts.platformId', 'name icon isCustom');

    if (!client) {
      return res.status(404).json({ success: false, error: { message: 'Client not found' } });
    }

    res.json({ success: true, data: client });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// POST /api/v1/clients
const createClient = async (req, res) => {
  try {
    const { personalInfo, categoryId, tagIds, status, rating, ratingNote } = req.body;

    if (!personalInfo || !personalInfo.fullName || !personalInfo.fullName.trim()) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Client full name is required' },
      });
    }

    // Block filesystem-unsafe characters: * ? " < > | : / \
    const UNSAFE_CHARS = /[*?"<>|:\\/]/;
    if (UNSAFE_CHARS.test(personalInfo.fullName)) {
      return res.status(400).json({
        success: false, 
        error: { message: 'Name contains characters not allowed (* ? " < > | : / \\)' }
      });
    }

    if (rating !== undefined && (rating < 1 || rating > 10)) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Rating must be between 1 and 10' },
      });
    }

    const client = await Client.create({
      personalInfo: {
        fullName: personalInfo.fullName.trim(),
        phone: personalInfo.phone?.trim() || undefined,
        whatsapp: personalInfo.whatsapp?.trim() || undefined,
        email: personalInfo.email?.trim() || undefined,
        dob: personalInfo.dob || undefined,
        address: personalInfo.address?.trim() || undefined,
      },
      categoryId: categoryId || undefined,
      tagIds: tagIds || [],
      status: status || 'Active',
      rating: rating || 5,
      ratingNote: ratingNote?.trim() || undefined,
      accounts: [], // Empty initially, managed via details page
      notes: [],    // Empty initially, managed via details page
    });

    res.status(201).json({ success: true, data: client });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// PUT /api/v1/clients/:id
const updateClient = async (req, res) => {
  try {
    const { personalInfo, categoryId, tagIds, status, rating, ratingNote } = req.body;

    if (!personalInfo || !personalInfo.fullName || !personalInfo.fullName.trim()) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Client full name is required' },
      });
    }

    // Block filesystem-unsafe characters: * ? " < > | : / \
    const UNSAFE_CHARS = /[*?"<>|:\\/]/;
    if (UNSAFE_CHARS.test(personalInfo.fullName)) {
      return res.status(400).json({
        success: false, 
        error: { message: 'Name contains characters not allowed (* ? " < > | : / \\)' }
      });
    }

    if (rating !== undefined && (rating < 1 || rating > 10)) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Rating must be between 1 and 10' },
      });
    }

    // Notice we don't update accounts or notes here. 
    // They are handled by separate sub-document endpoints.
    const updateData = {
      personalInfo: {
        fullName: personalInfo.fullName.trim(),
        phone: personalInfo.phone?.trim() || undefined,
        whatsapp: personalInfo.whatsapp?.trim() || undefined,
        email: personalInfo.email?.trim() || undefined,
        dob: personalInfo.dob || undefined,
        address: personalInfo.address?.trim() || undefined,
      },
      categoryId: categoryId || undefined,
      tagIds: tagIds || [],
      status: status || 'Active',
      rating: rating || 5,
      ratingNote: ratingNote?.trim() || undefined,
    };

    const oldClient = await Client.findById(req.params.id);
    if (!oldClient) {
      return res.status(404).json({ success: false, error: { message: 'Client not found' } });
    }

    const oldName = oldClient.personalInfo.fullName;
    const newName = updateData.personalInfo.fullName;

    // Safe client rename logic
    if (oldName !== newName) {
      const sanitizedOld = storageUtils.sanitizeFolderName(oldName);
      const sanitizedNew = storageUtils.sanitizeFolderName(newName);
      
      if (sanitizedOld !== sanitizedNew) {
        const { renamed } = storageUtils.safeRenameClientFolder(oldName, newName);
        
        if (renamed) {
          // Sync all mediaFile paths in Content documents for this client
          const contents = await Content.find({ clientId: req.params.id });
          for (const content of contents) {
            let changed = false;
            content.mediaFiles.forEach(file => {
              if (file.path.startsWith(sanitizedOld + '/')) {
                file.path = file.path.replace(sanitizedOld + '/', sanitizedNew + '/');
                changed = true;
              }
            });
            if (changed) await content.save();
          }
        }
      }
    }

    const client = await Client.findByIdAndUpdate(req.params.id, updateData, { new: true })
      .populate('categoryId', 'name')
      .populate('tagIds', 'name color');

    res.json({ success: true, data: client });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// Soft delete: sets isArchived to true
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, { isArchived: true }, { new: true });

    if (!client) {
      return res.status(404).json({ success: false, error: { message: 'Client not found' } });
    }

    res.json({ success: true, data: { message: 'Client deleted' } });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// GET /api/v1/clients/check-duplicate?name=Jane%20Doe
const checkDuplicate = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: { message: 'Name is required' } });
    }

    const exists = await Client.exists({ 
      'personalInfo.fullName': new RegExp(`^${name.trim()}$`, 'i'), 
      isArchived: false 
    });

    res.json({ success: true, isDuplicate: !!exists });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// ==========================================
// ACCOUNTS SUB-DOCUMENT
// ==========================================

const addAccount = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ success: false, error: { message: 'Client not found' } });

    const { platformId, username, displayName, profileUrl, status, notes, credential } = req.body;

    if (!platformId || !username) {
      return res.status(400).json({ success: false, error: { message: 'platformId and username are required' } });
    }

    client.accounts.push({ platformId, username, displayName, profileUrl, status, notes, credential });
    await client.save();
    
    // Return the newly added account
    const addedAccount = client.accounts[client.accounts.length - 1];
    res.status(201).json({ success: true, data: addedAccount });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

const updateAccount = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ success: false, error: { message: 'Client not found' } });

    const account = client.accounts.find(a => a.accountId === req.params.accountId);
    if (!account) return res.status(404).json({ success: false, error: { message: 'Account not found' } });

    const { platformId, username, displayName, profileUrl, status, notes, credential } = req.body;

    if (platformId !== undefined) account.platformId = platformId;
    if (username !== undefined) account.username = username;
    if (displayName !== undefined) account.displayName = displayName;
    if (profileUrl !== undefined) account.profileUrl = profileUrl;
    if (status !== undefined) account.status = status;
    if (notes !== undefined) account.notes = notes;
    
    if (credential) {
      if (credential.password !== undefined) account.credential.password = credential.password;
      if (credential.recoveryEmail !== undefined) account.credential.recoveryEmail = credential.recoveryEmail;
      if (credential.recoveryPhone !== undefined) account.credential.recoveryPhone = credential.recoveryPhone;
    }
    
    account.updatedAt = Date.now();
    await client.save();

    res.json({ success: true, data: account });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ success: false, error: { message: 'Client not found' } });

    const initialLength = client.accounts.length;
    client.accounts = client.accounts.filter(a => a.accountId !== req.params.accountId);
    
    if (client.accounts.length === initialLength) {
      return res.status(404).json({ success: false, error: { message: 'Account not found' } });
    }

    await client.save();
    res.json({ success: true, data: { message: 'Account deleted' } });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// ==========================================
// NOTES SUB-DOCUMENT
// ==========================================

const addNote = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ success: false, error: { message: 'Client not found' } });

    const { content } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, error: { message: 'Note content is required' } });
    }

    client.notes.push({ content: content.trim() });
    await client.save();
    
    const addedNote = client.notes[client.notes.length - 1];
    res.status(201).json({ success: true, data: addedNote });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

const updateNote = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ success: false, error: { message: 'Client not found' } });

    const note = client.notes.find(n => n.noteId === req.params.noteId);
    if (!note) return res.status(404).json({ success: false, error: { message: 'Note not found' } });

    const { content } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, error: { message: 'Note content is required' } });
    }

    note.content = content.trim();
    note.updatedAt = Date.now();
    await client.save();

    res.json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

const deleteNote = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ success: false, error: { message: 'Client not found' } });

    const initialLength = client.notes.length;
    client.notes = client.notes.filter(n => n.noteId !== req.params.noteId);
    
    if (client.notes.length === initialLength) {
      return res.status(404).json({ success: false, error: { message: 'Note not found' } });
    }

    await client.save();
    res.json({ success: true, data: { message: 'Note deleted' } });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  checkDuplicate,
  addAccount,
  updateAccount,
  deleteAccount,
  addNote,
  updateNote,
  deleteNote,
};
