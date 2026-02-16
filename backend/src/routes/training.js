const express = require('express');
const {
    getTrainings,
    getPublicTrainings,
    getTraining,
    createTraining,
    updateTraining,
    deleteTraining
} = require('../controllers/training');

const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

router.route('/public').get(getPublicTrainings);

router.route('/')
    .get(getTrainings)
    .post(protect, authorize('admin', 'super_admin'), createTraining);

router.route('/:id')
    .get(getTraining)
    .put(protect, authorize('admin', 'super_admin'), updateTraining)
    .delete(protect, authorize('admin', 'super_admin'), deleteTraining);

module.exports = router;
