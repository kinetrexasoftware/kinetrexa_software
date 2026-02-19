const express = require('express');
const router = express.Router();
const uploadCloud = require('../middleware/uploadCloud');
const { protect } = require('../middleware/auth.middleware');

// @route   POST /api/upload/image
// @access  Private/Admin
router.post('/image', protect, uploadCloud.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    res.status(200).json({
        success: true,
        imageUrl: req.file.path,
        publicId: req.file.filename
    });
});

module.exports = router;
