const express = require('express');
const router = express.Router();
const showController = require('../controllers/showcontroller');

// Get all shows
router.get('/', showController.getAllShows);

// Get show by ID with optional query param ?onlyAvailableSeats=true
router.get('/:id', showController.getShowById);

// Create a new show
router.post('/', showController.createShow);

// Update a show by ID
router.put('/:id', showController.updateShowById);

// Delete a show by ID
router.delete('/:id', showController.deleteShowById);

// Get available seats for a show
router.get('/:showId/seats/available', showController.getAvailableSeats);

module.exports = router;
