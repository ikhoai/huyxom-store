const express = require('express');
const router = express.Router();
const {
  getAllItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
  searchItems
} = require('../controllers/itemController');

// GET /api/items
router.get('/', getAllItems);

// GET /api/items/search
router.get('/search', searchItems);

// GET /api/items/:id
router.get('/:id', getItemById);

// POST /api/items
router.post('/', addItem);

// PUT /api/items/:id
router.put('/:id', updateItem);

// DELETE /api/items/:id
router.delete('/:id', deleteItem);

module.exports = router; 