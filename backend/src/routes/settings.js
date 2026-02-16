const express = require('express');
const {
    getSettings,
    updateSettings
} = require('../controllers/settings');

const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

router.route('/')
    .get(getSettings)
    .put(protect, authorize('admin', 'super_admin'), updateSettings);

module.exports = router;
