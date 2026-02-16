const express = require('express');
const router = express.Router();
const {
    getInternships,
    getInternship,
    createInternship,
    updateInternship,
    deleteInternship,
    toggleInternship,
    getStats
} = require('../controllers/internshipController');

const {
    submitApplication,
    submitApplicationAfterPayment
} = require('../controllers/applicationController');
const { protect, optionalAuth } = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const upload = require('../middleware/upload');

// Public
router.get('/', optionalAuth, getInternships);
router.get('/:id', optionalAuth, getInternship);

// Application Submission
router.post('/apply', upload.single('resume'), submitApplication);
router.post('/submit-application', upload.single('resume'), submitApplicationAfterPayment);

// Protected (Admin)
router.use(protect);
router.use(authorize('admin', 'super_admin'));

router.get('/stats/overview', getStats);
router.post('/', createInternship);
router.put('/:id', updateInternship);
router.put('/:id/toggle', toggleInternship);
router.delete('/:id', deleteInternship);

module.exports = router;
