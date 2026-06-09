const express = require('express');
const router = express.Router();
const { login, refreshToken, logout, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

module.exports = router;