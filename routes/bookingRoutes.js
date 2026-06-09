const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createBooking, getBookings, updateBookingStatus, deleteBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

router.post(
    '/',
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
        body('service').trim().notEmpty().withMessage('Service is required'),
    ],
    createBooking
);

router.get('/', protect, getBookings);
router.patch('/:id', protect, updateBookingStatus);
router.delete('/:id', protect, deleteBooking);

module.exports = router;