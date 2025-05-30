const theatreService = require('../services/theatersservice');

async function getAllTheatres(req, res) {
  try {
    const theatres = await theatreService.getAllTheatres();
    res.json(theatres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch theatres' });
  }
}

async function getTheatreById(req, res) {
  try {
    const theatre = await theatreService.getTheatreById(req.params.id);
    if (!theatre) {
      return res.status(404).json({ error: 'Theatre not found' });
    }
    res.json(theatre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch theatre' });
  }
}

async function createTheatre(req, res) {
  try {
    // Expect req.body to contain: name, location, seatCapacity
    const theatre = await theatreService.createTheatre(req.body);
    res.status(201).json(theatre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create theatre' });
  }
}

async function updateTheatre(req, res) {
  try {
    const updatedTheatre = await theatreService.updateTheatre(req.params.id, req.body);
    res.json(updatedTheatre);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Theatre not found' });
    }
    res.status(500).json({ error: 'Failed to update theatre' });
  }
}

async function deleteTheatre(req, res) {
  try {
    await theatreService.deleteTheatre(req.params.id);
    res.json({ message: 'Theatre deleted successfully' });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Theatre not found' });
    }
    res.status(500).json({ error: 'Failed to delete theatre' });
  }
}

module.exports = {
  getAllTheatres,
  getTheatreById,
  createTheatre,
  updateTheatre,
  deleteTheatre,
};
