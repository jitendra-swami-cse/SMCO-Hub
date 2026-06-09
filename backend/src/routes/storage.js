const express = require('express');
const router = express.Router();
const storageController = require('../controllers/storageController');

router.get('/overview', storageController.getOverview);
router.post('/missing-files/remove', storageController.removeMissingFile);

module.exports = router;
