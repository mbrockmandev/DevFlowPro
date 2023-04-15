const express = require('express');

const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Prefix: /api/users/
router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/current', protect, getCurrentUser);

module.exports = router;
