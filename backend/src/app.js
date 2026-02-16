const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const config = require('./config/env');
const { errorHandler, notFound } = require('./middleware/error.middleware');
const { publicLimiter } = require('./middleware/rateLimit.middleware');
// const { sanitizeInput } = require('./middleware/validation'); // Removed in favor of schema validation
const requestLogger = require('./middleware/logger.middleware');
const corsMiddleware = require('./middleware/cors.middleware');
const visitTracker = require('./middleware/visitTracker');

// Initialize app
const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

// Request Logging
app.use(requestLogger);

// Global Visit Tracking
app.use(visitTracker);

// Security headers
app.use(helmet());

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser
app.use(cookieParser());

const path = require('path');

// Sanitize data (prevent NoSQL injection)
app.use(mongoSanitize());

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Enable CORS
app.use(corsMiddleware);

// Rate limiting
app.use('/api', publicLimiter);

// ==========================================
// ROUTES
// ==========================================

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/internships', require('./routes/internships'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/content', require('./routes/content'));
app.use('/api/products', require('./routes/products'));
app.use('/api/services', require('./routes/services'));
app.use('/api/training', require('./routes/training'));
app.use('/api/careers', require('./routes/careers'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/payments', require('./routes/payment'));

// 404 handler
app.use(notFound);

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;