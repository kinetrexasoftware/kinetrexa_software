const express = require('express');
const router = express.Router();
const {
    submitContact,
    getContacts,
    updateContactStatus,
    deleteContact,
    replyToInquiry
} = require('../controllers/contactController');

// For now, removing 'protect' and 'authorize' middleware to allow testing without auth, 
// or I will assume protect middleware exists.
// Based on file list, middleware exists. I'll import it but maybe comment it out for the "connect" request unless user has auth set up?
// The user asked to connect frontend and backend.
// Public routes don't need auth.
const { protect } = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
// Assuming auth middleware exists (I saw 'auth.js' in middleware folder in Step 78)

// Public
router.post('/', submitContact);

// Protected (Admin only)
// Note: If auth is not fully set up or we want to test easily, we might want to temporarily bypass this.
// But for a proper backend, I'll include it.
// If the user hasn't set up admin users, they can't access these get routes.
// But the Frontend mainly needs POST for contact form right now.
router.get('/', protect, authorize('admin', 'super_admin'), getContacts);
router.put('/:id', protect, authorize('admin', 'super_admin'), updateContactStatus);
router.post('/:id/reply', protect, authorize('admin', 'super_admin'), replyToInquiry);
router.delete('/:id', protect, authorize('admin', 'super_admin'), deleteContact);

module.exports = router;
