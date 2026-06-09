const express = require('express');
const router = express.Router();
const multer = require('multer');
const backupController = require('../controllers/backupController');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/export', backupController.createBackup);
router.post('/restore/summary', upload.single('backup'), backupController.restoreSummary);
router.post('/restore/confirm', upload.single('backup'), backupController.restoreConfirm);

module.exports = router;
