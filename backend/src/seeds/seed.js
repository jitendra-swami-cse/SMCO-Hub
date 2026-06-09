/**
 * Seed Script — Populates the database with default platforms and categories.
 *
 * Run this once when setting up the project for the first time:
 *   node src/seeds/seed.js
 *
 * It is safe to run multiple times — it will skip items that already exist.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Platform = require('../models/Platform');
const Category = require('../models/Category');

const DEFAULT_PLATFORMS = [
  { name: 'Instagram', isCustom: false },
  { name: 'Facebook', isCustom: false },
  { name: 'YouTube', isCustom: false },
  { name: 'Pinterest', isCustom: false },
  { name: 'LinkedIn', isCustom: false },
  { name: 'Threads', isCustom: false },
  { name: 'X', isCustom: false },
  { name: 'TikTok', isCustom: false },
  { name: 'Google Business Profile', isCustom: false },
  { name: 'Gmail', isCustom: false }, // Treated as a platform per ERD decision
];

const DEFAULT_CATEGORIES = [
  { name: 'Individual', description: 'Personal brand or individual creator' },
  { name: 'Business', description: 'Small to medium business client' },
  { name: 'Agency', description: 'Agency or team account' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Seed Platforms
    for (const platform of DEFAULT_PLATFORMS) {
      const exists = await Platform.findOne({ name: platform.name });
      if (!exists) {
        await Platform.create(platform);
        console.log(`  ✅ Platform created: ${platform.name}`);
      } else {
        console.log(`  ⏭️  Platform already exists: ${platform.name}`);
      }
    }

    // Seed Categories
    for (const category of DEFAULT_CATEGORIES) {
      const exists = await Category.findOne({ name: category.name });
      if (!exists) {
        await Category.create(category);
        console.log(`  ✅ Category created: ${category.name}`);
      } else {
        console.log(`  ⏭️  Category already exists: ${category.name}`);
      }
    }

    console.log('\nSeeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
}

seed();
