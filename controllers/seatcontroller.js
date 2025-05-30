const seatService = require('../services/seatservice');

async function getSeatsByShow(req, res) {
  try {
    const showId = parseInt(req.params.showId);
    const seats = await seatService.getSeatsByShowId(showId);
    res.json(seats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createSeat(req, res) {
  try {
    const { showId, seatNumber, seatType, price } = req.body;
    const seat = await seatService.createSeat(showId, seatNumber, seatType, price);
    res.status(201).json(seat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateSeat(req, res) {
  try {
    const seatId = parseInt(req.params.id);
    const { seatNumber, seatType, price, isBooked } = req.body;
    const updatedSeat = await seatService.updateSeat(seatId, { seatNumber, seatType, price, isBooked });
    if (!updatedSeat) return res.status(404).json({ error: 'Seat not found' });
    res.json(updatedSeat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteSeat(req, res) {
  try {
    const seatId = parseInt(req.params.id);
    const deleted = await seatService.deleteSeat(seatId);
    if (!deleted) return res.status(404).json({ error: 'Seat not found' });
    res.json({ message: 'Seat deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getSeatsByShow,
  createSeat,
  updateSeat,
  deleteSeat,
};
