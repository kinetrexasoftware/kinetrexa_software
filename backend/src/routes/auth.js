const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  logout,
  getAdmins,
  deleteAdmin
} = require('../controllers/authController');
const { protect, optionalAuth } = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const { authLimiter } = require('../middleware/rateLimit.middleware');

// Public routes (with rate limiting)
router.post('/login', authLimiter, login);

// Protected routes (requires authentication)
router.get('/me', protect, getMe);
router.put('/update', protect, updateDetails);
router.put('/update-password', protect, updatePassword);
router.post('/logout', protect, logout);

// Super Admin only routes
router.post('/register', protect, authorize('super_admin'), register);
router.get('/admins', protect, authorize('super_admin'), getAdmins);
router.delete('/admins/:id', protect, authorize('super_admin'), deleteAdmin);

module.exports = router;