const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
    getTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
} = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');

router.get('/', getTestimonials);

router.post(
    '/',
    protect,
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('content').trim().notEmpty().withMessage('Content is required'),
        body('rating').isInt({ min: 1, max: 5 }),
    ],
    createTestimonial
);

router.put('/:id', protect, updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

module.exports = router;