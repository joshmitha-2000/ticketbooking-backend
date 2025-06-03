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

module.exports = {
  addDate,
  getDates,
};
const movieLanguageService = require('../services/movielangugeservice');

async function addLanguage(req, res) {
  try {
    const newLanguage = await movieLanguageService.createMovieLanguage(req.body);
    res.status(201).json(newLanguage);
  } catch (error) {
    console.error('Error adding language:', error);
    res.status(500).json({ error: 'Failed to add language' });
  }
}

async function getLanguages(req, res) {
  try {
    const languages = await movieLanguageService.getLanguagesByMovieId(req.params.movieId);
    res.json(languages);
  } catch (error) {
    console.error('Error fetching languages:', error);
    res.status(500).json({ error: 'Failed to fetch languages' });
  }
}

async function updateLanguage(req, res) {
  try {
    const updatedLanguage = await movieLanguageService.updateMovieLanguage(req.params.id, req.body);
    res.json(updatedLanguage);
  } catch (error) {
    console.error('Error updating language:', error);
    res.status(500).json({ error: 'Failed to update language' });
  }
}

async function deleteLanguage(req, res) {
  try {
    const deleted = await movieLanguageService.deleteMovieLanguage(req.params.id);
    res.json({ message: 'Language deleted successfully', deleted });
  } catch (error) {
    if (error.message === 'Language not found') {
      return res.status(404).json({ error: 'Language not found' });
    }
    console.error('Error deleting language:', error);
    res.status(500).json({ error: 'Failed to delete language' });
  }
}

module.exports = {
  addLanguage,
  getLanguages,
  updateLanguage,
  deleteLanguage,
};
