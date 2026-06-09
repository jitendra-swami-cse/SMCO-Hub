const Tag = require('../models/Tag');

// GET /api/v1/tags
const getTags = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ name: 1 });
    res.json({ success: true, data: tags });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// POST /api/v1/tags
const createTag = async (req, res) => {
  try {
    const { name, color } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Tag name is required' },
      });
    }

    // Check for duplicate name
    const existing = await Tag.findOne({ name: name.trim() });
    if (existing) {
      return res.status(409).json({
        success: false,
        error: { code: 'DUPLICATE', message: 'Tag with this name already exists' },
      });
    }

    const tag = await Tag.create({
      name: name.trim(),
      color: color || undefined, // Falls back to model default (#6c5ce7)
    });

    res.status(201).json({ success: true, data: tag });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// PUT /api/v1/tags/:id
const updateTag = async (req, res) => {
  try {
    const { name, color } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Tag name is required' },
      });
    }

    // Check for duplicate name (exclude current tag)
    const existing = await Tag.findOne({
      name: name.trim(),
      _id: { $ne: req.params.id },
    });
    if (existing) {
      return res.status(409).json({
        success: false,
        error: { code: 'DUPLICATE', message: 'Tag with this name already exists' },
      });
    }

    const tag = await Tag.findByIdAndUpdate(
      req.params.id,
      { name: name.trim(), color: color || undefined },
      { new: true }
    );

    if (!tag) {
      return res.status(404).json({
        success: false,
        error: { message: 'Tag not found' },
      });
    }

    res.json({ success: true, data: tag });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// DELETE /api/v1/tags/:id (permanent — config entities have no recycle bin)
const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);

    if (!tag) {
      return res.status(404).json({
        success: false,
        error: { message: 'Tag not found' },
      });
    }

    res.json({ success: true, data: { message: 'Tag deleted' } });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

module.exports = {
  getTags,
  createTag,
  updateTag,
  deleteTag,
};
