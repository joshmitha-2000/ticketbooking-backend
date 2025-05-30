const express = require('express');
const {
  adminDashboard,
  addMovie,
  deleteMovie,
  addTheatre,
  deleteTheatre,
  addShow,
} = require('../controllers/admincontroller');

const { authenticate, authorizeRole } = require('../middlewears/usermiddlewear');

const router = express.Router();

router.get('/dashboard', authenticate, authorizeRole(['ADMIN']), adminDashboard);
router.post('/movie', authenticate, authorizeRole(['ADMIN']), addMovie);
router.delete('/movie/:id', authenticate, authorizeRole(['ADMIN']), deleteMovie);

router.post('/theatre', authenticate, authorizeRole(['ADMIN']), addTheatre);
router.delete('/theatre/:id', authenticate, authorizeRole(['ADMIN']), deleteTheatre);

router.post('/show', authenticate, authorizeRole(['ADMIN']), addShow);

module.exports = router;
