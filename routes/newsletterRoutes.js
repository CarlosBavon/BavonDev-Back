const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { subscribe, getSubscribers, unsubscribe, deleteSubscriber } = require('../controllers/newsletterController');
const { protect } = require('../middleware/auth');

router.post(
    '/',
    [body('email').isEmail().withMessage('Valid email is required').normalizeEmail()],
    subscribe
);

router.get('/', protect, getSubscribers);
router.patch('/unsubscribe', unsubscribe);
router.delete('/:id', protect, deleteSubscriber);

module.exports = router;