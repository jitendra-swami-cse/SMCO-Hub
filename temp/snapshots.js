const express = require('express');
const router = express.Router();
const snapshotController = require('../controllers/snapshotController');

router.get('/', snapshotController.getSnapshots);
router.post('/generate', snapshotController.generateSnapshot);

module.exports = router;
