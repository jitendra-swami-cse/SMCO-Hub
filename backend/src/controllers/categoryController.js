const Category = require('../models/Category');

// GET /api/v1/categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// POST /api/v1/categories
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Category name is required' },
      });
    }

    // Check for duplicate name
    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return res.status(409).json({
        success: false,
        error: { code: 'DUPLICATE', message: 'Category with this name already exists' },
      });
    }

    const category = await Category.create({
      name: name.trim(),
      description: description?.trim() || undefined,
    });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// PUT /api/v1/categories/:id
const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Category name is required' },
      });
    }

    // Check for duplicate name (exclude current category)
    const existing = await Category.findOne({
      name: name.trim(),
      _id: { $ne: req.params.id },
    });
    if (existing) {
      return res.status(409).json({
        success: false,
        error: { code: 'DUPLICATE', message: 'Category with this name already exists' },
      });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: name.trim(), description: description?.trim() || undefined },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        error: { message: 'Category not found' },
      });
    }

    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

// DELETE /api/v1/categories/:id (permanent delete — config entities have no recycle bin)
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        error: { message: 'Category not found' },
      });
    }

    res.json({ success: true, data: { message: 'Category deleted' } });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
