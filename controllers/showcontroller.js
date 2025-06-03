const showService = require('../services/showservice'); // Assuming your current code is in showService.js

// Get all shows
async function getAllShows(req, res) {
  try {
    const shows = await showService.getAllShows();
    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a specific show by ID, optionally only available seats
async function getShowById(req, res) {
  try {
    const { id } = req.params;
    const onlyAvailableSeats = req.query.onlyAvailableSeats === 'true';
    const show = await showService.getShowById(id, onlyAvailableSeats);
    res.json(show);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// Create a new show
async function createShow(req, res) {
  try {
    const showData = req.body;
    const newShow = await showService.createShow(showData);
    res.status(201).json(newShow);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Update a show by ID
async function updateShowById(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedShow = await showService.updateShowById(id, updateData);
    res.json(updatedShow);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete a show by ID
async function deleteShowById(req, res) {
  try {
    const { id } = req.params;
    await showService.deleteShowById(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get available seats for a show
async function getAvailableSeats(req, res) {
  try {
    const { showId } = req.params;
    const seats = await showService.getAvailableSeats(showId);
    res.json(seats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getAllShows,
  getShowById,
  createShow,
  updateShowById,
  deleteShowById,
  getAvailableSeats,
};
