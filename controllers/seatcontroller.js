const {
  createSeatsForTheatre,
  createSeatsForShow,
  getSeatsByShowId,
} = require('../services/seatservice');

async function postSeatsForTheatre(req, res) {
  try {
    const { theatreId } = req.params;
    const message = await createSeatsForTheatre(theatreId);
    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function postSeatsForShow(req, res) {
  try {
    const { showId } = req.params;
    const message = await createSeatsForShow(showId);
    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAvailableSeats(req, res) {
  try {
    const showId = Number(req.params.showId);
    if (isNaN(showId)) return res.status(400).json({ message: 'Invalid show ID' });

    const seats = await getSeatsByShowId(showId);
    const availableSeats = seats.filter(seat => !seat.isBooked);

    res.json(availableSeats);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch available seats' });
  }
}

module.exports = {
  postSeatsForTheatre,
  postSeatsForShow,
  getAvailableSeats,
};
