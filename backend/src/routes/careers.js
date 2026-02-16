const express = require('express');
const {
    getCareers,
    getCareer,
    createCareer,
    updateCareer,
    deleteCareer
} = require('../controllers/careers');

const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

router.route('/')
    .get(getCareers)
    .post(protect, authorize('admin', 'super-admin'), createCareer);

router.route('/:id')
    .get(getCareer)
    .put(protect, authorize('admin', 'super_admin'), updateCareer)
    .delete(protect, authorize('admin', 'super_admin'), deleteCareer);

module.exports = router;
