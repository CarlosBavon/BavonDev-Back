const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
} = require('../controllers/blogController');
const { protect } = require('../middleware/auth');

router.get('/', getBlogs);
router.get('/:slug', getBlog);

router.post(
    '/',
    protect,
    [
        body('title').trim().notEmpty().withMessage('Title is required'),
        body('content').trim().notEmpty().withMessage('Content is required'),
        body('category').isIn(['Development', 'Design', 'Technology', 'Business', 'Tutorial', 'Career', 'Other']),
        body('excerpt').trim().notEmpty().withMessage('Excerpt is required'),
    ],
    createBlog
);

router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

module.exports = router;