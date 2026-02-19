const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
// Controller import - check if controller exists, if not, create a placeholder or find it
// The controller list showed 'settings.js' in controllers dir previously?
// Let's check controllers list again or just assume it exists/create placeholder logic

// Placeholder for now as I need to verify controller existence
// Actually, previous `ls` of controllers showed `settings.js` in controllers!
const { getSettings, updateSettings } = require('../controllers/settings');

router.route('/')
    .get(getSettings)
    .put(protect, authorize('admin', 'superadmin'), updateSettings);

module.exports = router;
