const movieService = require('../services/movieserive');

async function getAllMovies(req, res) {
  try {
    const movies = await movieService.getAllMovies();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
}

async function getMovieById(req, res) {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
}

async function createMovie(req, res) {
  try {
    // Expect req.body to contain:
    // title, description, posterUrl, languageTags (array), runtime, categoryId, availableDates (array)
    const movie = await movieService.createMovie(req.body);
    res.status(201).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create movie' });
  }
}

async function updateMovie(req, res) {
  try {
    const updatedMovie = await movieService.updateMovie(req.params.id, req.body);
    res.json(updatedMovie);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(500).json({ error: 'Failed to update movie' });
  }
}

async function deleteMovie(req, res) {
  try {
    await movieService.deleteMovie(req.params.id);
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(500).json({ error: 'Failed to delete movie' });
  }
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
