const bookingService = require('../services/bookingservice');

async function getUserBookings(req, res) {
  try {
    const userId = req.user.id;
    const bookings = await bookingService.getBookingsByUserId(userId);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getBookingById(req, res) {
  try {
    const bookingId = parseInt(req.params.id);
    const userId = req.user.id;
    const booking = await bookingService.getBookingByIdAndUserId(bookingId, userId);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createBooking(req, res) {
  try {
    const userId = req.user.id;
    const { showId, seatIds, totalPrice } = req.body;

    const booking = await bookingService.createBooking(userId, showId, seatIds, totalPrice);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateBooking(req, res) {
  try {
    const bookingId = parseInt(req.params.id);
    const userId = req.user.id;
    const { seatIds, totalPrice } = req.body;

    const updatedBooking = await bookingService.updateBooking(bookingId, userId, seatIds, totalPrice);
    if (!updatedBooking) return res.status(404).json({ error: 'Booking not found or not authorized' });
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteBooking(req, res) {
  try {
    const bookingId = parseInt(req.params.id);
    const userId = req.user.id;

    const deleted = await bookingService.deleteBooking(bookingId, userId);
    if (!deleted) return res.status(404).json({ error: 'Booking not found or not authorized' });
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getUserBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
};
