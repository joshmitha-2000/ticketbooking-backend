const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categorycontroller');
const { authenticate, authorizeRole } = require('../middlewears/usermiddlewear');

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// Admin protected routes
router.post('/', authenticate, authorizeRole, categoryController.createCategory);
router.put('/:id', authenticate, authorizeRole, categoryController.updateCategory);
router.delete('/:id', authenticate, authorizeRole, categoryController.deleteCategory);

module.exports = router;
