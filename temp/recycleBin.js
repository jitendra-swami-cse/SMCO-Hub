const express = require('express');
const router = express.Router();
const recycleBinController = require('../controllers/recycleBinController');

router.get('/', recycleBinController.getRecycleBin);
router.post('/restore', recycleBinController.restoreItem);
router.post('/delete', recycleBinController.hardDeleteItem);

module.exports = router;
