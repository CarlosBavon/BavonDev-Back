const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');

// Single file upload (protected)
router.post('/', protect, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    // Return the file path relative to server root
    const filePath = `/uploads/${req.file.filename}`;
    res.status(200).json({ success: true, data: { imageUrl: filePath } });
});

module.exports = router;