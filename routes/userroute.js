const express = require('express');
const { getProfile, updateProfile } = require('../controllers/usercontroller');
const { authenticate, authorizeRole } = require('../middlewears/usermiddlewear');

const router = express.Router();

// Only logged-in users with role 'USER' can access
router.get('/profile', authenticate, authorizeRole(['USER']), getProfile);
router.put('/profile', authenticate, authorizeRole(['USER']), updateProfile);

module.exports = router;
