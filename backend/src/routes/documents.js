const express = require('express');
const router = express.Router();
const { generateOfferLetter, generateTaskAssignment } = require('../controllers/documentController');

// Route to generate and download offer letter
router.get('/offer-letter/:applicationId', generateOfferLetter);

// Route to get task assignment
router.get('/task-assignment/:applicationId', generateTaskAssignment);

// Route to generate and download internship certificate
router.get('/certificate/:applicationId', require('../controllers/documentController').generateCertificate);

module.exports = router;
