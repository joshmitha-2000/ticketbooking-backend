const showService = require('../services/showservice');

async function getAllShows(req, res) {
  try {
    const shows = await showService.getAllShows();
    res.json(shows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch shows' });
  }
}

async function getShowById(req, res) {
  try {
    const show = await showService.getShowById(req.params.id);
    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }
    res.json(show);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch show' });
  }
}

async function createShow(req, res) {
  try {
    const show = await showService.createShow(req.body);
    res.status(201).json(show);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create show' });
  }
}

async function updateShow(req, res) {
  try {
    const updatedShow = await showService.updateShowById(req.params.id, req.body);
    res.json(updatedShow);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Show not found' });
    }
    res.status(500).json({ error: 'Failed to update show' });
  }
}

async function deleteShow(req, res) {
  try {
    await showService.deleteShowById(req.params.id);
    res.json({ message: 'Show deleted successfully' });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Show not found' });
    }
    res.status(500).json({ error: 'Failed to delete show' });
  }
}

module.exports = {
  getAllShows,
  getShowById,
  createShow,
  updateShow,
  deleteShow,
};
