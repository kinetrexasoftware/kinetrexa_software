const express = require('express');
const router = express.Router();
const {
    submitApplication,
    getApplications,
    getAllApplicationsAdmin,
    getApplication,
    updateStatus,
    addNotes,
    deleteApplication,
    getStats,
    trackApplication,
    verifyApplication,
    downloadDocument,
    createApplicationByAdmin
} = require('../controllers/applicationController');

const { protect } = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

const upload = require('../middleware/upload');

// Public
router.post('/', upload.single('resume'), submitApplication);
router.get('/track/:email', trackApplication);
router.post('/verify', verifyApplication);
router.post('/download', downloadDocument);

// Protected (Admin)
router.use(protect); // All routes below are protected
router.use(authorize('admin', 'super_admin'));

router.post('/admin/create', createApplicationByAdmin);
router.get('/admin', getAllApplicationsAdmin); // Admin-specific route
router.get('/', getApplications);
router.get('/stats/overview', getStats);
router.get('/:id', getApplication);
router.put('/:id/status', updateStatus);
router.put('/:id/notes', addNotes);
router.delete('/:id', deleteApplication);

module.exports = router;
