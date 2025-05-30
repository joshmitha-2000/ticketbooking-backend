const express = require('express');
const router = express.Router();
const movieController = require('../controllers/moviecontroller');
const { authenticate, authorizeRole } = require('../middlewears/usermiddlewear');

// Public routes
router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);

// Admin protected routes
router.post('/', authenticate, authorizeRole, movieController.createMovie);
router.put('/:id', authenticate, authorizeRole, movieController.updateMovie);
router.delete('/:id', authenticate, authorizeRole, movieController.deleteMovie);

module.exports = router;
