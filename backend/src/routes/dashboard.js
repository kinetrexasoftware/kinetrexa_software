const express = require('express');
const router = express.Router();
const { getDashboardStats, getChartData } = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

router.use(protect);
router.use(authorize('admin', 'super_admin'));

router.get('/stats', getDashboardStats);
router.get('/chart', getChartData);

module.exports = router;
