const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatcontroller');

// Create seats for a whole theatre (all shows)
router.post('/theatres/:theatreId/seats', seatController.postSeatsForTheatre);

// Create seats for a single show
router.post('/shows/:showId/seats', seatController.postSeatsForShow);

// Get available seats for a show
router.get('/shows/:showId/seats/available', seatController.getAvailableSeats);

module.exports = router;
