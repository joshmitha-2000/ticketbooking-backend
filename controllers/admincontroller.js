const {
  getAllUsers,
  createMovie,
  removeMovie,
  createTheatre,
  removeTheatre,
  createShow,
} = require('../services/adminservice');

// Dashboard with user summary
async function adminDashboard(req, res) {
  try {
    const users = await getAllUsers();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Add Movie
async function addMovie(req, res) {
  try {
    const movie = await createMovie(req.body);
    res.status(201).json({ message: 'Movie added', movie });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete Movie
async function deleteMovie(req, res) {
  try {
    const id = parseInt(req.params.id);
    await removeMovie(id);
    res.status(200).json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Add Theatre
async function addTheatre(req, res) {
  try {
    const theatre = await createTheatre(req.body);
    res.status(201).json({ message: 'Theatre added', theatre });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete Theatre
async function deleteTheatre(req, res) {
  try {
    const id = parseInt(req.params.id);
    await removeTheatre(id);
    res.status(200).json({ message: 'Theatre deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Add Show (movie + theatre + time)
async function addShow(req, res) {
  try {
    const show = await createShow(req.body);
    res.status(201).json({ message: 'Show added', show });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  adminDashboard,
  addMovie,
  deleteMovie,
  addTheatre,
  deleteTheatre,
  addShow,
};
