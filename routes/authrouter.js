const express = require('express');
const { register, confirmEmail, login } = require('../controllers/authcontroller');

const router = express.Router();

router.post('/register', register);
router.get('/confirm/:token', confirmEmail);
router.post('/login', login);

module.exports = router;
