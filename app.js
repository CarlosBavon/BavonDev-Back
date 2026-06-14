const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const corsConfig = require('./config/cors');

const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const githubRoutes = require('./routes/githubRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors(corsConfig));
app.use(compression());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Body Parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Rate Limiting (disabled for development)
//app.use('/api/', rateLimit.generalLimiter);
//app.use('/api/auth/login', rateLimit.authLimiter);
//app.use('/api/contact', rateLimit.contactLimiter);

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // ← added

// Routes
app.use('/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/upload', uploadRoutes);  // ← added

// 404 Handler
app.all('*', (req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;