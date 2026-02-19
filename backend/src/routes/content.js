const express = require('express');
const router = express.Router();
const {
  getAllContent,
  getContentBySection,
  getAllContentAdmin,
  getContentById,
  createOrUpdateContent,
  updateContent,
  togglePublish,
  deleteContent,
  bulkUpdate,
  updateSectionContent
} = require('../controllers/contentController');
const { protect, optionalAuth } = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const validateObjectId = require('../middleware/validateObjectId');

// Public routes
router.get('/', getAllContent);
router.get('/:section', getContentBySection);

// Admin routes (protected)
router.get('/admin/all', protect, getAllContentAdmin);
router.get('/admin/:id', protect, validateObjectId('id'), getContentById);
router.post('/', protect, createOrUpdateContent);

// Specific section update (supports flat mission/vision)
router.put('/section/:section', protect, updateSectionContent);

router.put('/:id', protect, validateObjectId('id'), updateContent);
router.put('/:id/toggle', protect, validateObjectId('id'), togglePublish);
router.delete('/:id', protect, validateObjectId('id'), deleteContent);
router.put('/bulk/update', protect, bulkUpdate);

module.exports = router;