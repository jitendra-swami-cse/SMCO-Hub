const Platform = require('../models/Platform');

// GET /api/v1/platforms
const getPlatforms = async (req, res) => {
  try {
    const platforms = await Platform.find().sort({ isCustom: 1, name: 1 });
    res.json({ success: true, data: platforms });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// POST /api/v1/platforms (only custom platforms can be created)
const createPlatform = async (req, res) => {
  try {
    const { name, icon, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Platform name is required' },
      });
    }

    // Block filesystem-unsafe characters
    const UNSAFE_CHARS = /[*?"<>|:\\/]/;
    if (UNSAFE_CHARS.test(name.trim())) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Name contains characters not allowed (* ? " < > | : / \\)' },
      });
    }

    // Check for duplicate name
    const existing = await Platform.findOne({ name: name.trim() });
    if (existing) {
      return res.status(409).json({
        success: false,
        error: { code: 'DUPLICATE', message: 'Platform with this name already exists' },
      });
    }

    const platform = await Platform.create({
      name: name.trim(),
      icon: icon?.trim() || undefined,
      description: description?.trim() || undefined,
      isCustom: true, // User-created platforms are always custom
    });

    res.status(201).json({ success: true, data: platform });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// PUT /api/v1/platforms/:id
const updatePlatform = async (req, res) => {
  try {
    const { name, icon, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Platform name is required' },
      });
    }

    // Block filesystem-unsafe characters
    const UNSAFE_CHARS = /[*?"<>|:\\/]/;
    if (UNSAFE_CHARS.test(name.trim())) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Name contains characters not allowed (* ? " < > | : / \\)' },
      });
    }

    // Check for duplicate name (exclude current platform)
    const existing = await Platform.findOne({
      name: name.trim(),
      _id: { $ne: req.params.id },
    });
    if (existing) {
      return res.status(409).json({
        success: false,
        error: { code: 'DUPLICATE', message: 'Platform with this name already exists' },
      });
    }

    const platformToUpdate = await Platform.findById(req.params.id);
    if (!platformToUpdate) {
      return res.status(404).json({
        success: false,
        error: { message: 'Platform not found' },
      });
    }

    // Built-in platforms cannot be renamed
    if (!platformToUpdate.isCustom && name.trim() !== platformToUpdate.name) {
      return res.status(403).json({
        success: false,
        error: { message: 'Built-in platforms cannot be renamed' },
      });
    }

    const platform = await Platform.findByIdAndUpdate(
      req.params.id,
      { name: name.trim(), icon: icon?.trim() || undefined, description: description?.trim() || undefined },
      { new: true }
    );

    res.json({ success: true, data: platform });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// DELETE /api/v1/platforms/:id (only custom platforms can be deleted)
const deletePlatform = async (req, res) => {
  try {
    const platform = await Platform.findById(req.params.id);

    if (!platform) {
      return res.status(404).json({
        success: false,
        error: { message: 'Platform not found' },
      });
    }

    // Built-in platforms cannot be deleted
    if (!platform.isCustom) {
      return res.status(403).json({
        success: false,
        error: { message: 'Built-in platforms cannot be deleted' },
      });
    }

    await Platform.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: { message: 'Platform deleted' } });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

module.exports = {
  getPlatforms,
  createPlatform,
  updatePlatform,
  deletePlatform,
};
