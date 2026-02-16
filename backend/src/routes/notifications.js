const express = require('express');
const router = express.Router();
const {
    getNotifications,
    markAsRead,
    markAllRead,
    deleteNotification
} = require('../controllers/notificationController');

const { protect } = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

// All routes are protected and for admins only
router.use(protect);
router.use(authorize('admin', 'super_admin'));

router.get('/', getNotifications);
router.put('/read-all', markAllRead);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteNotification);

module.exports = router;
