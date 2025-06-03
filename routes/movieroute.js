const express = require('express');
const router = express.Router();
const movieController = require('../controllers/moviecontroller');
const { authenticate, authorizeRole } = require('../middlewears/usermiddlewear');

// Public routes
router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);

// Admin protected routes
router.post('/', authenticate, authorizeRole(['ADMIN']), movieController.createMovie);
router.put('/:id', authenticate, authorizeRole(['ADMIN']), movieController.updateMovie);
router.delete('/:id', authenticate, authorizeRole(['ADMIN']), movieController.deleteMovie);

module.exports = router;
