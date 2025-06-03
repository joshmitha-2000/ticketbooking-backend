const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categorycontroller');
const { authenticate, authorizeRole } = require('../middlewears/usermiddlewear');

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// Admin protected routes (role array passed correctly)
router.post('/', authenticate, authorizeRole(['ADMIN']), categoryController.createCategory);
router.put('/:id', authenticate, authorizeRole(['ADMIN']), categoryController.updateCategory);
router.delete('/:id', authenticate, authorizeRole(['ADMIN']), categoryController.deleteCategory);

module.exports = router;
