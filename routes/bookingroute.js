const express = require('express');
const {
  getUserBookings,
  getUserBookingById,
  getAllBookings,
  createBooking,
} = require('../controllers/bookingcontroller');

const { authenticate, authorizeRole } = require('../middlewears/usermiddlewear');

const router = express.Router();

// Authenticated user routes
router.use(authenticate);

router.get('/my-bookings', getUserBookings);
router.get('/my-bookings/:id', getUserBookingById);
router.post('/book', createBooking);

// Admin-only route
router.get('/all-bookings', authorizeRole, getAllBookings);

module.exports = router;
