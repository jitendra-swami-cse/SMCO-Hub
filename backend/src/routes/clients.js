const express = require('express');
const router = express.Router();
const {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  addAccount,
  updateAccount,
  deleteAccount,
  addNote,
  updateNote,
  deleteNote,
  checkDuplicate,
} = require('../controllers/clientController');

// Main Client routes
router.get('/', getClients);
router.get('/check-duplicate', checkDuplicate);
router.get('/:id', getClientById);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

// Accounts sub-document routes
router.post('/:id/accounts', addAccount);
router.put('/:id/accounts/:accountId', updateAccount);
router.delete('/:id/accounts/:accountId', deleteAccount);

// Notes sub-document routes
router.post('/:id/notes', addNote);
router.put('/:id/notes/:noteId', updateNote);
router.delete('/:id/notes/:noteId', deleteNote);

module.exports = router;
