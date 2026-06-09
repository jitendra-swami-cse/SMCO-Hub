const express = require('express');
const router = express.Router();
const {
  getPlatforms,
  createPlatform,
  updatePlatform,
  deletePlatform,
} = require('../controllers/platformController');

router.get('/', getPlatforms);
router.post('/', createPlatform);
router.put('/:id', updatePlatform);
router.delete('/:id', deletePlatform);

module.exports = router;
