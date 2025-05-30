const express = require('express');
const router = express.Router();
const showController = require('../controllers/showcontroller');
const { authenticate, authorizeRole} = require('../middlewears/usermiddlewear');

// Public routes
router.get('/', showController.getAllShows);
router.get('/:id', showController.getShowById);

// Admin protected routes
router.post('/', authenticate, authorizeRole, showController.createShow);
router.put('/:id', authenticate, authorizeRole, showController.updateShow);
router.delete('/:id', authenticate, authorizeRole, showController.deleteShow);

module.exports = router;
