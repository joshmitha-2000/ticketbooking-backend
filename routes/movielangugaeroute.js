const express = require('express');
const router = express.Router();
const movielanguageController = require('../controllers/movielanguagecontroller');

// POST /movielanguages - add language(s) to a movie
router.post('/', movielanguageController.addLanguage);

// GET /movielanguages/:movieId - get all languages of a movie
router.get('/:movieId', movielanguageController.getLanguages);

// PUT /movielanguages/:id - update a specific language entry by id
router.put('/:id', movielanguageController.updateLanguage);

// DELETE /movielanguages/:id - delete a specific language entry by id
router.delete('/:id', movielanguageController.deleteLanguage);

module.exports = router;
