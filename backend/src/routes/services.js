const express = require('express');
const {
    getServices,
    getPublicServices,
    getService,
    createService,
    updateService,
    deleteService
} = require('../controllers/services');

const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

router.route('/public').get(getPublicServices);

router.route('/')
    .get(getServices)
    .post(protect, authorize('admin', 'super-admin'), createService);

router.route('/:id')
    .get(getService)
    .put(protect, authorize('admin', 'super_admin'), updateService)
    .delete(protect, authorize('admin', 'super_admin'), deleteService);

module.exports = router;
