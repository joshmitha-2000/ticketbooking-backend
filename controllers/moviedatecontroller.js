const movieDateService = require('../services/moviedateservice');

async function addDate(req, res) {
  try {
    const newDate = await movieDateService.createMovieDate(req.body);
    res.status(201).json(newDate);
  } catch (error) {
    console.error('Error adding date:', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to add date' });
  }
}

async function getDates(req, res) {
  try {
    const dates = await movieDateService.getDatesByMovieId(req.params.movieId);
    res.json(dates);
  } catch (error) {
    console.error('Error fetching dates:', error);
    res.status(500).json({ error: 'Failed to fetch dates' });
  }
}

// New: DELETE /moviedates - expects JSON body with movieId and date
async function deleteDate(req, res) {
  try {
    const { movieId, date } = req.body;
    const deleted = await movieDateService.deleteMovieDate(movieId, date);
    res.json({ message: 'Date deleted successfully', deleted });
  } catch (error) {
    console.error('Error deleting date:', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to delete date' });
  }
}

// New: PUT /moviedates - expects JSON body with movieId, oldDate, newDate
async function updateDate(req, res) {
  try {
    const { movieId, oldDate, newDate } = req.body;
    const updated = await movieDateService.updateMovieDate(movieId, oldDate, newDate);
    res.json(updated);
  } catch (error) {
    console.error('Error updating date:', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to update date' });
  }
}

module.exports = {
  addDate,
  getDates,
  deleteDate,
  updateDate,
};
