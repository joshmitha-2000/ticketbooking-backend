const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingcontroller');
const { authenticate } = require('../middlewears/usermiddlewear');  // User must be logged in

// List all bookings for logged in user
router.get('/', authenticate, bookingController.getUserBookings);

// Get details of a booking by ID (for logged in user)
router.get('/:id', authenticate, bookingController.getBookingById);

// Create a new booking (logged in user)
router.post('/', authenticate, bookingController.createBooking);

// Update a booking (logged in user) - e.g. change seats
router.put('/:id', authenticate, bookingController.updateBooking);

// Delete a booking (logged in user)
router.delete('/:id', authenticate, bookingController.deleteBooking);

module.exports = router;
