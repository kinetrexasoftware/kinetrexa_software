const rateLimit = require('express-rate-limit');
const config = require('../config/env');

// Public Routes Limiter
const publicLimiter = rateLimit({
    windowMs: config.RATE_LIMIT_WINDOW || 15 * 60 * 1000, // 15 minutes
    max: config.RATE_LIMIT_MAX || 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later'
    }
});

// Admin/Auth Routes Limiter (Stricter)
const adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many admin requests, please try again later'
    }
});

// Auth specific limiter (Login/Register)
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // 10 attempts per hour
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many login attempts, please try again later'
    }
});

module.exports = {
    publicLimiter,
    adminLimiter,
    authLimiter
};
