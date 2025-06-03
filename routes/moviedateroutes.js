const express = require('express');
const router = express.Router();
const moviedateController = require('../controllers/moviedatecontroller');

// POST /moviedates - add a date for a movie
router.post('/', moviedateController.addDate);

// GET /moviedates/:movieId - get all dates for a movie
router.get('/:movieId', moviedateController.getDates);

// DELETE /moviedates - delete a date (movieId and date in body)
router.delete('/', moviedateController.deleteDate);

// PUT /moviedates - update a date (movieId, oldDate, newDate in body)
router.put('/', moviedateController.updateDate);

module.exports = router;
