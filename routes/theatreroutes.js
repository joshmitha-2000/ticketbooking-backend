const express = require('express');
const router = express.Router();
const theatreController = require('../controllers/theatercontroller');
const { authenticate, authorizeRole } = require('../middlewears/usermiddlewear');

// Public routes
router.get('/', theatreController.getAllTheatres);
router.get('/:id', theatreController.getTheatreById);

// Admin protected routes
router.post('/', authenticate, authorizeRole(['ADMIN']), theatreController.createTheatre);
router.put('/:id', authenticate, authorizeRole(['ADMIN']), theatreController.updateTheatreById);
router.delete('/:id', authenticate, authorizeRole(['ADMIN']), theatreController.deleteTheatreById);

module.exports = router;
