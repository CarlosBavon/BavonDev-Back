const rateLimit = require('express-rate-limit');

const generalLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many requests. Please try again later.',
    },
    keyGenerator: (req) => req.ip,
});

const authLimiter = rateLimit({
    windowMs: 900000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many login attempts. Please try again after 15 minutes.',
    },
});

const contactLimiter = rateLimit({
    windowMs: 900000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many contact submissions. Please try again later.',
    },
});

module.exports = { generalLimiter, authLimiter, contactLimiter };