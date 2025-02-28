const { Item } = require('../models');
const { Op } = require('sequelize');

// @desc    Get all items
// @route   GET /api/items
// @access  Public (for now)
exports.getAllItems = async (req, res, next) => {
  try {
    // Add a small delay to simulate the frontend's behavior
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const items = await Item.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

// @desc    Add a new item
// @route   POST /api/items
// @access  Public (for now)
exports.addItem = async (req, res, next) => {
  try {
    // Add a small delay to simulate the frontend's behavior
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

// @desc    Update an existing item
// @route   PUT /api/items/:id
// @access  Public (for now)
exports.updateItem = async (req, res, next) => {
  try {
    // Add a small delay to simulate the frontend's behavior
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const { id } = req.params;
    const item = await Item.findByPk(id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    await item.update(req.body);
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Public (for now)
exports.deleteItem = async (req, res, next) => {
  try {
    // Add a small delay to simulate the frontend's behavior
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const { id } = req.params;
    const item = await Item.findByPk(id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    await item.destroy();
    res.status(200).json({ id });
  } catch (error) {
    next(error);
  }
};

// @desc    Search items by user ID or phone number
// @route   GET /api/items/search
// @access  Public (for now)
exports.searchItems = async (req, res, next) => {
  try {
    // Add a small delay to simulate the frontend's behavior
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const { searchTerm } = req.query;
    
    if (!searchTerm) {
      return res.status(400).json({ message: 'Search term is required' });
    }
    
    const items = await Item.findAll({
      where: {
        [Op.or]: [
          { userid: { [Op.iLike]: searchTerm } },
          { phone: searchTerm }
        ]
      },
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

// @desc    Get item by ID
// @route   GET /api/items/:id
// @access  Public (for now)
exports.getItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
}; 