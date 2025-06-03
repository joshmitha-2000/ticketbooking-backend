const bookingService = require('../services/bookingservice');

const getUserBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getUserBookings(req.user.id);
    res.json(bookings);
  } catch {
    res.status(500).json({ error: 'Failed to fetch bookings.' });
  }
};

const getUserBookingById = async (req, res) => {
  try {
    const booking = await bookingService.getUserBookingById(req.user.id, Number(req.params.id));
    if (!booking) return res.status(404).json({ error: 'Booking not found or unauthorized.' });
    res.json(booking);
  } catch {
    res.status(500).json({ error: 'Failed to fetch booking.' });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.json(bookings);
  } catch {
    res.status(500).json({ error: 'Failed to fetch all bookings.' });
  }
};

const createBooking = async (req, res) => {
  const { showId, seatIds } = req.body;

  try {
    const booking = await bookingService.createBooking(req.user.id, showId, seatIds);
    res.status(201).json({ message: 'Booking confirmed', booking });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Booking failed and was canceled.' });
  }
};

module.exports = {
  getUserBookings,
  getUserBookingById,
  getAllBookings,
  createBooking,
};

